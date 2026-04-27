import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  BarChart3,
  ChevronDown,
  ChevronRight,
  Layers,
  Sparkles
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
    <div className="text-center space-y-1.5 sm:space-y-2 group min-w-0">
      <div className="mx-auto w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 transition-transform group-hover:scale-110">
        {icon}
      </div>
      <div className={`${isText ? 'text-2xl sm:text-[2rem]' : 'text-2xl sm:text-3xl'} font-black text-gray-900 dark:text-white tabular-nums tracking-tighter`}>
        {isText ? value : count}
      </div>
      <div className="max-w-[10rem] mx-auto text-[9px] sm:text-[10px] font-black uppercase tracking-[0.22em] text-gray-400 leading-relaxed">{label}</div>
    </div>
  );
};

// Stats grid displayed on guest landing page with real data
const StatsGrid = ({ stats }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative z-10 mt-8 sm:mt-10 md:mt-12 mx-4 sm:mx-6 lg:mx-auto max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 py-5 sm:py-6 md:py-7 px-4 sm:px-5 md:px-6 bg-white/55 dark:bg-[#161b22]/55 backdrop-blur-xl rounded-[1.75rem] sm:rounded-[2.25rem] border border-white/20 dark:border-gray-800 shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
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
  const [expandedCourse, setExpandedCourse] = useState(null);
  const navigate = useNavigate();
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

              const moduleList = Array.isArray(detailsRes.data?.modules) ? detailsRes.data.modules : [];
              const completedLessonIds = new Set((progressRes.data?.completedLessons || []).map(String));
              const completedModuleIds = new Set((progressRes.data?.completedModules || []).map(String));

              // Only count lessons that actually exist in the current course structure
              const allCurrentLessonIds = new Set(
                moduleList.flatMap(m => (m.lessonOrder || []).map(l => String(l._id || l)))
              );
              const actualCompletedLessons = [...completedLessonIds].filter(id => allCurrentLessonIds.has(id)).length;
              const totalLessons = allCurrentLessonIds.size;

              let status = 'Pendiente';
              if (progressRes.data?.isCourseCompleted) status = 'Completado';
              else if (actualCompletedLessons > 0 || completedModuleIds.size > 0) status = 'En progreso';

              return {
                id: course._id,
                title: course.title,
                desc: course.description,
                modules: moduleList.length,
                moduleList: moduleList.map(m => ({
                  id: m._id,
                  title: m.title,
                  lessons: m.lessonOrder?.length || 0,
                  completed: completedModuleIds.has(String(m._id)),
                })),
                totalLessons,
                completedLessons: actualCompletedLessons,
                completedModules: completedModuleIds.size,
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
              {roadmapCourses.map((course, idx) => {
                const isExpanded = expandedCourse === course.id;
                const progress = course.totalLessons > 0 ? Math.round((course.completedLessons / course.totalLessons) * 100) : 0;
                return (
                  <motion.div
                    key={course.id || idx}
                    layout
                    className={`bg-white dark:bg-[#161b22] rounded-[1.5rem] sm:rounded-[2.5rem] border shadow-xl transition-colors overflow-hidden ${isExpanded ? 'border-indigo-500/40' : 'border-gray-100 dark:border-gray-800 hover:border-indigo-500/30'}`}
                  >
                    {/* Card header — always visible */}
                    <button
                      onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                      className="w-full flex gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 text-left group"
                    >
                      <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg ${course.status === 'Completado' ? 'bg-green-500 text-white' : course.status === 'En progreso' ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 group-hover:text-indigo-500'}`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white leading-tight">{course.title}</h3>
                            <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full border ${course.status === 'Completado' ? 'bg-green-500/10 text-green-600 border-green-500/20' : course.status === 'En progreso' ? 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20' : 'bg-gray-500/10 text-gray-500 border-gray-500/20'}`}>
                              {course.status}
                            </span>
                          </div>
                          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          </motion.div>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium italic line-clamp-2">{course.desc}</p>
                        {/* Progress bar */}
                        {course.totalLessons > 0 && (
                          <div className="pt-2 space-y-1">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                              <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> {course.modules} módulos</span>
                              <span>{progress}% completado</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className={`h-full rounded-full ${course.status === 'Completado' ? 'bg-green-500' : 'bg-indigo-500'}`}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>

                    {/* Expandable module list */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          key="modules"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-8 pb-6 space-y-2 border-t border-gray-100 dark:border-white/5 pt-4">
                            {(course.moduleList || []).map((mod, mIdx) => (
                              <div key={mod.id || mIdx} className="flex items-center gap-3 py-2">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${mod.completed ? 'bg-green-500' : 'bg-gray-100 dark:bg-gray-800'}`}>
                                  {mod.completed
                                    ? <CheckCircle className="w-3 h-3 text-white" />
                                    : <span className="text-[9px] font-black text-gray-400">{mIdx + 1}</span>
                                  }
                                </div>
                                <span className={`text-sm font-medium flex-1 ${mod.completed ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
                                  {mod.title}
                                </span>
                                <span className="text-[10px] text-gray-400 font-black">{mod.lessons} lec.</span>
                              </div>
                            ))}
                            <button
                              onClick={() => navigate(`/cursos/${course.id}`)}
                              className="mt-4 w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                            >
                              {course.status === 'Pendiente' ? 'Comenzar curso' : course.status === 'Completado' ? 'Repasar curso' : 'Continuar curso'}
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
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
    <div className="bg-[#fafafb] dark:bg-[#0a0c10] transition-colors duration-500">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[150px] opacity-50" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[150px] opacity-50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 md:pt-32 pb-12 text-center space-y-8 sm:space-y-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-black text-[10px] tracking-[0.3em] uppercase">
            <ShieldCheck className="w-3 h-3" /> Educación digital parental · México
          </motion.div>
          <div className="space-y-6">
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'circOut' }}
              className="text-[4rem] sm:text-7xl md:text-[8rem] lg:text-[9rem] font-black tracking-tighter text-gray-900 dark:text-white leading-[0.8]">
              Kuxi<span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-indigo-500 to-violet-400 dark:from-indigo-400 dark:via-indigo-300 dark:to-violet-200">pilli</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="max-w-xl mx-auto text-lg sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Protege a tu hijo/a en internet.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="max-w-2xl mx-auto text-base text-gray-500 dark:text-gray-400 leading-relaxed">
              La plataforma educativa para madres, padres y tutores que quieren entender los riesgos reales de los videojuegos, redes sociales y streaming — y actuar con criterio.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
            <Link to="/registro" className="px-10 py-4 bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95">
              Comenzar gratis
            </Link>
            <Link to="/iniciar-sesion" className="px-10 py-4 bg-white dark:bg-[#161b22] text-gray-900 dark:text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:-translate-y-1 transition-all active:scale-95">
              Ya tengo cuenta
            </Link>
          </motion.div>
        </div>
        <StatsGrid stats={platformStats} />
      </div>

      {/* ── RIESGOS CON DATOS ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center space-y-3">
          <p className="text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em]">Por qué importa</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Los riesgos son reales<br className="hidden sm:block" /> y están creciendo.
          </h2>
          <p className="max-w-xl mx-auto text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Datos respaldados por fuentes públicas y estudios académicos sobre riesgos digitales que enfrentan niñas, niños y adolescentes.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />,
              stat: 'Riesgos documentados',
              desc: 'Una investigación de Revealing Reality difundida por The Guardian documentó que menores podían encontrar contenido sexualizado e interactuar con adultos en Roblox, pese a los controles de seguridad existentes.',
              source: 'The Guardian, "Risks to children playing Roblox \'deeply disturbing\', say researchers", 14 abril 2025. Investigación basada en Revealing Reality.',
              color: 'from-red-500/8 to-orange-500/8 border-red-500/20',
              badge: 'Roblox · 2025',
              badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
            },
            {
              icon: <Lock className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
              stat: '79.7%',
              desc: 'de las niñas y niños de 6 a 11 años en México usó internet en 2024, según la ENDUTIH. En el grupo de 12 a 17 años, la proporción fue de 95.1%.',
              source: 'INEGI, ENDUTIH 2024. Resultados presentados el 6 de mayo de 2025.',
              color: 'from-amber-500/8 to-yellow-500/8 border-amber-500/20',
              badge: 'México · 2025',
              badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
            },
            {
              icon: <Play className="w-6 h-6 text-violet-600 dark:text-violet-400" />,
              stat: 'Exposición documentada',
              desc: 'Un estudio académico con personas sintéticas de Brasil y Estados Unidos encontró que perfiles menores de edad fueron expuestos a juegos para adultos, títulos sexualizados y mensajes tóxicos en chats de Twitch.',
              source: 'Gonçalves, Soriano, Marques-Neto y Almeida, "Potential Exposure of Kids to Age-Inappropriate Content on Twitch: A Comparative Cross-Country Study", Springer, 11 diciembre 2025.',
              color: 'from-violet-500/8 to-purple-500/8 border-violet-500/20',
              badge: 'Twitch · 2025',
              badgeColor: 'bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-500/20',
            },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${item.color} border rounded-[2rem] p-7 space-y-4`}>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#161b22] border border-gray-100 dark:border-gray-800 flex items-center justify-center shadow-sm">
                  {item.icon}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full border ${item.badgeColor}`}>{item.badge}</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">{item.stat}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 italic border-t border-gray-200 dark:border-gray-700 pt-3">{item.source}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CÓMO FUNCIONA ── */}
      <div className="bg-white dark:bg-[#0d1117] border-y border-gray-100 dark:border-gray-800 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center space-y-3">
            <p className="text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em]">El proceso</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">¿Cómo funciona?</h2>
            <p className="max-w-lg mx-auto text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Tres pasos para convertirte en el primer escudo digital de tu hijo/a.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            <div className="hidden md:block absolute top-10 left-[calc(33%-1rem)] right-[calc(33%-1rem)] h-px bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-300 dark:from-indigo-800 dark:via-violet-800 dark:to-indigo-800" />
            {[
              { step: '01', icon: <Target className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />, title: 'Diagnóstico inicial', desc: 'Responde el examen de 12 preguntas que detecta tus brechas de conocimiento en videojuegos, redes sociales y streaming.' },
              { step: '02', icon: <BookOpen className="w-7 h-7 text-violet-600 dark:text-violet-400" />, title: 'Aprende a tu ritmo', desc: 'Accede a 3 programas con más de 80 lecciones. Cada módulo incluye artículos, guías en video y casos reales analizados.' },
              { step: '03', icon: <ShieldCheck className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />, title: 'Protege con criterio', desc: 'Acredita los programas, descarga tu certificado y aplica herramientas concretas de control parental en casa.' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center gap-5">
                <div className="relative w-20 h-20 rounded-3xl bg-gray-50 dark:bg-[#161b22] border border-gray-100 dark:border-gray-800 flex items-center justify-center shadow-lg z-10">
                  {s.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center">{s.step}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">{s.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROGRAMAS ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center space-y-3">
          <p className="text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em]">Programas de formación</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">3 rutas de aprendizaje</h2>
          <p className="max-w-xl mx-auto text-gray-500 dark:text-gray-400 text-sm leading-relaxed">Cada programa cubre las plataformas que más usan los niños de 6 a 12 años en México.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <ShieldCheck className="w-8 h-8 text-white" />, title: 'Videojuegos', platforms: 'Roblox · Minecraft', modules: 6, topics: ['Seguridad de cuenta', 'Compras digitales', 'Grooming en chats', 'Bienestar digital'], gradient: 'from-red-500 to-orange-500', border: 'border-red-500/20 hover:border-red-500/40' },
            { icon: <MessageSquare className="w-8 h-8 text-white" />, title: 'Redes Sociales', platforms: 'TikTok · Discord · Instagram', modules: 7, topics: ['Privacidad y huella digital', 'Ciberacoso', 'Contacto con desconocidos', 'Desinformación'], gradient: 'from-pink-500 to-violet-500', border: 'border-pink-500/20 hover:border-pink-500/40' },
            { icon: <Play className="w-8 h-8 text-white" />, title: 'Streaming', platforms: 'YouTube · Twitch', modules: 7, topics: ['Consumo infantil seguro', 'Monetización engañosa', 'Tiempo de pantalla', 'Control parental'], gradient: 'from-purple-500 to-indigo-500', border: 'border-purple-500/20 hover:border-purple-500/40' },
          ].map((prog, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`bg-white dark:bg-[#161b22] border ${prog.border} rounded-[2rem] overflow-hidden shadow-xl transition-all group`}>
              <div className={`bg-gradient-to-br ${prog.gradient} p-8 flex items-center justify-between`}>
                <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">{prog.icon}</div>
                <span className="text-white/80 text-[10px] font-black uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full">{prog.modules} módulos</span>
              </div>
              <div className="p-7 space-y-5">
                <div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white">{prog.title}</h3>
                  <p className="text-xs text-gray-400 font-bold mt-1">{prog.platforms}</p>
                </div>
                <ul className="space-y-2">
                  {prog.topics.map((t, ti) => (
                    <li key={ti} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" /> {t}
                    </li>
                  ))}
                </ul>
                <Link to="/registro" className="block text-center py-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
                  Ver programa →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── POR QUÉ KUXIPILLI ── */}
      <div className="bg-white dark:bg-[#0d1117] border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/40 dark:to-violet-950/40 border border-indigo-200/60 dark:border-indigo-800/40 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-16">
            <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16">
              <div className="flex-shrink-0 flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-500/20">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <span className="text-indigo-500 text-[10px] font-black uppercase tracking-widest">Etimología</span>
              </div>
              <div className="space-y-6 flex-1">
                <div>
                  <p className="text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-[0.3em] mb-2">¿Por qué Kuxipilli?</p>
                  <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                    Una palabra, dos culturas.
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                  <span className="font-black text-gray-900 dark:text-white">Kuxipilli</span> une dos lenguas originarias de México:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-[#161b22] border border-indigo-100 dark:border-indigo-900/40 rounded-2xl p-5 space-y-2 shadow-sm">
                    <p className="text-indigo-500 text-[10px] font-black uppercase tracking-widest">Lengua maya</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">Kuxi</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      Del maya <em className="text-indigo-600 dark:text-indigo-400">kuxtal</em>, "vida" o "vivir". Representa el bienestar y la vida cotidiana del menor en el entorno digital.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-[#161b22] border border-violet-100 dark:border-violet-900/40 rounded-2xl p-5 space-y-2 shadow-sm">
                    <p className="text-violet-500 text-[10px] font-black uppercase tracking-widest">Lengua náhuatl</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">Pilli</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      Del náhuatl <em className="text-violet-600 dark:text-violet-400">pilli</em>, "niño" o "hijo". Referencia directa al sujeto que se busca proteger: los niños y niñas de 6 a 12 años.
                    </p>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm italic leading-relaxed max-w-xl border-l-4 border-indigo-300 dark:border-indigo-700 pl-4">
                  "Kuxipilli" significa, en esencia, <span className="text-gray-900 dark:text-white font-bold">"la vida del niño"</span> — un recordatorio de que detrás de cada pantalla hay una infancia que merece ser protegida.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── CTA FINAL ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Tu hijo/a ya está en línea.<br className="hidden sm:block" />
            <span className="text-indigo-600">¿Estás preparado/a?</span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-500 dark:text-gray-400 text-base leading-relaxed">
            Únete gratis y comienza con el diagnóstico inicial — en menos de 10 minutos sabrás exactamente dónde fortalecer tu conocimiento.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/registro" className="px-12 py-5 bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:bg-indigo-700 hover:-translate-y-1 transition-all active:scale-95">
            Comenzar gratis
          </Link>
          <Link to="/iniciar-sesion" className="px-12 py-5 bg-white dark:bg-[#161b22] text-gray-900 dark:text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:-translate-y-1 transition-all active:scale-95">
            Ya tengo cuenta
          </Link>
        </motion.div>
      </div>

    </div>
  );
};

export default Home;
