import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  ArrowRight,
  Play,
  BookOpen,
  Clock,
  CheckCircle,
  Youtube,
  ShieldCheck,
  MessageSquare,
  Search,
  Target,
  BarChart3
} from 'lucide-react';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import avatarUrl from '../utils/avatarUrl';

// Animated counter hook
const useCountUp = (target, duration = 1200) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
};

// Individual animated stat item
const StatItem = ({ icon, label, value, isText }) => {
  const count = useCountUp(isText ? 0 : value);
  return (
    <div className="text-center space-y-2 group">
      <div className="mx-auto w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 transition-transform group-hover:scale-110">
        {icon}
      </div>
      <div className="text-3xl font-black text-gray-900 dark:text-white tabular-nums tracking-tighter">
        {isText ? value : count}
      </div>
      <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</div>
    </div>
  );
};

// Stats grid displayed on guest landing page with real data
const StatsGrid = ({ stats }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mt-16 sm:mt-24 md:mt-40 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-12 bg-white/50 dark:bg-[#161b22]/50 backdrop-blur-xl rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] border border-white/20 dark:border-gray-800 shadow-2xl"
  >
    <StatItem icon={<BookOpen className="w-5 h-5" />} label="Programas de formación" value={stats.courses} />
    <StatItem icon={<ShieldCheck className="w-5 h-5" />} label="Lecciones teóricas" value={stats.lessons} />
    <StatItem icon={<Search className="w-5 h-5" />} label="Casos de estudio" value={stats.cases} />
    <StatItem icon={<Lock className="w-5 h-5" />} label="Privacidad de datos" value="SSL/TLS" isText />
  </motion.div>
);

const Home = () => {
  const { user } = useContext(AuthContext);
  const [progress, setProgress] = useState({ completed: 0, total: 0 });
  const [nextItem, setNextItem] = useState(null);
  const [loadingNext, setLoadingNext] = useState(true);
  const [roadmapCourses, setRoadmapCourses] = useState([]);
  const [platformStats, setPlatformStats] = useState({ courses: 0, lessons: 0, cases: 0, loaded: false });

  useEffect(() => {
    if (!user) {
      setLoadingNext(false);
      setRoadmapCourses([]);
      return;
    }

    api.get('/api/progress/summary/all')
      .then((res) => {
        const { completedLessons, totalLessons } = res.data || {};
        setProgress({ completed: completedLessons || 0, total: totalLessons || 0 });
      })
      .catch((err) => console.error('Error fetching progress:', err));

    api.get('/api/progress/next-step')
      .then((res) => setNextItem(res.data))
      .catch((err) => console.error('Error fetching next item:', err))
      .finally(() => setLoadingNext(false));

    api.get('/api/content/courses')
      .then(async (res) => {
        const courses = Array.isArray(res.data) ? res.data : [];
        const roadmapData = await Promise.all(
          courses.map(async (course) => {
            try {
              const [detailsRes, progressRes] = await Promise.all([
                api.get(`/api/content/courses/${course._id}`),
                api.get(`/api/progress/course/${course._id}`)
              ]);

              const modules = Array.isArray(detailsRes.data?.modules) ? detailsRes.data.modules.length : 0;
              const completedLessons = Array.isArray(progressRes.data?.completedLessons) ? progressRes.data.completedLessons.length : 0;
              const completedModules = Array.isArray(progressRes.data?.completedModules) ? progressRes.data.completedModules.length : 0;

              let status = 'Pendiente';
              if (progressRes.data?.isCourseCompleted) status = 'Completado';
              else if (completedLessons > 0 || completedModules > 0) status = 'En progreso';

              return {
                id: course._id,
                title: course.title,
                desc: course.description,
                modules,
                status
              };
            } catch (error) {
              console.error(`Error fetching roadmap data for ${course._id}:`, error);
              return {
                id: course._id,
                title: course.title,
                desc: course.description,
                modules: 0,
                status: 'Pendiente'
              };
            }
          })
        );
        setRoadmapCourses(roadmapData);
      })
      .catch((err) => {
        console.error('Error fetching roadmap courses:', err);
        setRoadmapCourses([]);
      });
  }, [user]);

  // Fetch public stats for guest landing page
  useEffect(() => {
    if (user) return; // only needed on landing page
    api.get('/api/content/stats')
      .then((res) => {
        const { courses = 0, lessons = 0, cases = 0 } = res.data || {};
        setPlatformStats({ courses, lessons, cases, loaded: true });
      })
      .catch(() => setPlatformStats({ courses: 3, lessons: 42, cases: 3, loaded: true }));
  }, [user]);

  const percentage = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;

  if (user) {
    let continueLink = '/cursos';
    let continueLabel = 'Continuar Aprendiendo';
    let subText = '';

    if (loadingNext) {
      continueLabel = 'Cargando...';
    } else if (nextItem) {
      if (nextItem.type === 'lesson') {
        continueLink = `/lecciones/${nextItem.id}`;
        continueLabel = 'Continuar Lección';
        subText = nextItem.title;
      } else if (nextItem.type === 'quiz') {
        const evaluationId = nextItem.id === 'diagnostic' ? 'diagnostico' : nextItem.id;
        continueLink = `/evaluacion/${evaluationId}`;
        continueLabel = 'Presentar Examen';
        subText = nextItem.title;
      } else if (nextItem.type === 'complete') {
        continueLabel = '¡Curso Completado!';
      }
    }

    return (
      <div className="min-h-screen bg-[#fafafb] dark:bg-[#0a0c10] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#161b22] rounded-[2rem] sm:rounded-[3rem] p-5 sm:p-8 md:p-10 shadow-2xl border border-gray-100 dark:border-gray-800">
            <div className="flex flex-col lg:flex-row items-center gap-5 sm:gap-8">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border-[4px] sm:border-[6px] border-white dark:border-[#0a0c10] shadow-2xl bg-white dark:bg-gray-800 shrink-0">
                {user.avatar ? (
                  <img src={avatarUrl(user.avatar)} alt="Perfil" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/50 text-3xl sm:text-5xl font-black text-indigo-500 dark:text-indigo-300 uppercase">
                    {user.name?.charAt(0)}
                  </div>
                )}
              </div>

              <div className="flex-grow space-y-4 sm:space-y-5 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
                  <ShieldCheck className="w-3 h-3" /> Estado de avance
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tighter">
                  Bienvenido, {user?.name ? user.name.split(' ')[0] : 'Guardián'}
                </h2>
                <div className="space-y-3 max-w-xl mx-auto lg:mx-0">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <span>Índice de progreso</span>
                    <span className="text-indigo-600 dark:text-indigo-400">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-5 p-1 border border-gray-200 dark:border-gray-700">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 1.2, ease: 'circOut' }} className="bg-indigo-600 h-full rounded-full" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-center lg:justify-start gap-3 italic">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Progreso: <span className="font-bold text-gray-900 dark:text-white">{progress.completed}</span> de {progress.total} lecciones dominadas.
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-auto lg:max-w-xs flex flex-col gap-3">
                <Link to={continueLink} title={subText || continueLabel} className="px-6 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-[0.2em] rounded-[2rem] shadow-2xl shadow-indigo-600/30 transition-all flex items-center justify-between gap-4 active:scale-95 group w-full">
                  <Play className="w-5 h-5 flex-shrink-0 fill-current group-hover:rotate-12 transition-transform" />
                  <span className="flex-grow text-center">{continueLabel}</span>
                  <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-2 transition-transform" />
                </Link>
                {subText && (
                  <div className="text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 text-center lg:text-right w-full px-2 line-clamp-2 leading-tight">
                    <span className="text-indigo-500 uppercase tracking-widest text-[9px] block mb-0.5">Siguiente destino:</span>
                    {subText}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="space-y-6 sm:space-y-10">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-1 w-10 sm:w-12 bg-indigo-600 rounded-full" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Mapa de Formación Académica</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {roadmapCourses.map((course, idx) => (
                <div key={course.id || idx} className="flex gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 bg-white dark:bg-[#161b22] rounded-[1.5rem] sm:rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl group hover:border-indigo-500/30 transition-all">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg ${course.status === 'Completado' ? 'bg-green-500 text-white' : course.status === 'En progreso' ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 group-hover:text-indigo-500'}`}>
                    {idx + 1}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-black text-gray-900 dark:text-white leading-tight">{course.title}</h3>
                      <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full border ${course.status === 'Completado' ? 'bg-green-500/10 text-green-600 border-green-500/20' : course.status === 'En progreso' ? 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20' : 'bg-gray-500/10 text-gray-500 border-gray-500/20'}`}>
                        {course.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium italic">{course.desc}</p>
                    <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-500 opacity-60">
                      <ShieldCheck className="w-3 h-3" /> {course.modules} {course.modules === 1 ? 'Módulo' : 'Módulos'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { icon: <BarChart3 className="text-blue-500" />, title: 'Mi Panel', desc: 'Ver estadísticas detalladas de seguridad.', link: '/panel' },
              { icon: <Target className="text-purple-500" />, title: 'Explorar Cursos', desc: 'Aprende nuevas técnicas de protección.', link: '/cursos' },
              { icon: <ShieldCheck className="text-indigo-500" />, title: 'Casos y guías', desc: 'Analiza incidentes reales y consulta guías prácticas.', link: '/casos-y-guias' }
            ].map((card, i) => (
              <Link key={i} to={card.link}>
                <motion.div whileHover={{ y: -5 }} className="p-5 sm:p-6 md:p-8 bg-white dark:bg-[#161b22] rounded-[1.5rem] sm:rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl hover:border-indigo-500/20 transition-all flex flex-col gap-3 sm:gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center">{card.icon}</div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">{card.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">{card.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="space-y-6 sm:space-y-12">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-1 w-10 sm:w-12 bg-indigo-600 rounded-full" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Educación Multimedia</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
              {[
                { id: '4-V7vXkHkf0', title: 'Cómo activar los controles parentales en Roblox', channel: 'Resuelve En Un Click', time: '3 min' },
                { id: '6NB8NAFwis4', title: 'Cómo usar Microsoft Family Safety', channel: 'Entorno Simple', time: '4 min' },
                { id: 'tuoHAYJdetw', title: 'Cómo configurar YouTube para niños', channel: 'Cómo hacer', time: '5 min' }
              ].map((video, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 * idx }} className="group bg-white dark:bg-[#161b22] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-2xl transition-all hover:border-indigo-500/30">
                  <div className="relative aspect-video">
                    <iframe className="w-full h-full object-cover" src={`https://www.youtube.com/embed/${video.id}`} title={video.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-white flex items-center gap-2 border border-white/10">
                      <Clock className="w-3 h-3 text-indigo-400" /> {video.time}
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 md:p-8 space-y-3 sm:space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight min-h-[3rem] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{video.title}</h3>
                    <div className="flex items-center gap-3 text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest border-t border-gray-100 dark:border-gray-800 pt-6">
                      <div className="p-2 bg-red-500/10 text-red-500 rounded-lg"><Youtube className="w-4 h-4" /></div>
                      {video.channel}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fafafb] dark:bg-[#0a0c10] transition-colors duration-500 pb-32">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[150px] opacity-50" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[150px] opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-16 sm:pt-24 md:pt-32 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 sm:space-y-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-2 sm:py-2.5 rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-black text-[10px] tracking-[0.3em] uppercase shadow-lg shadow-indigo-500/5">
            <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4" /> Inteligencia digital para familias
          </motion.div>

          <div className="space-y-4 sm:space-y-6">
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'circOut' }} className="text-[4.5rem] sm:text-7xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter text-gray-900 dark:text-white leading-[0.75]">
              Kuxi
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 via-indigo-600 to-indigo-400 dark:from-indigo-600 dark:via-indigo-400 dark:to-indigo-200">pilli</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6 sm:mt-12 max-w-2xl mx-auto text-base sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed italic font-medium px-2 sm:px-0">
              La primera plataforma diseñada para convertir a padres y educadores en aliados más fuertes para la seguridad digital infantil.
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} className="mt-8 sm:mt-16 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-0">
            <Link to="/registro" className="px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-[2rem] shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:bg-indigo-700 hover:-translate-y-2 transition-all active:scale-95">Comenzar Ahora</Link>
            <Link to="/cursos" className="px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 bg-white dark:bg-[#161b22] text-gray-900 dark:text-white font-black text-xs uppercase tracking-[0.2em] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl hover:-translate-y-2 transition-all active:scale-95">Ver Programas</Link>
          </motion.div>
        </div>

        <StatsGrid stats={platformStats} />
      </div>
    </div>
  );
};

export default Home;
