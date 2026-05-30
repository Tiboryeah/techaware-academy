import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminUsuarios = lazy(() => import('./pages/admin/AdminUsuarios'));
const AdminReportes = lazy(() => import('./pages/admin/AdminReportes'));
const AdminCursos = lazy(() => import('./pages/admin/AdminCursos'));
const AdminLecciones = lazy(() => import('./pages/admin/AdminLecciones'));
const AdminPreguntas = lazy(() => import('./pages/admin/AdminPreguntas'));
const AdminCasos = lazy(() => import('./pages/admin/AdminCasos'));
const AdminRecursos = lazy(() => import('./pages/admin/AdminRecursos'));

const Modules = lazy(() => import('./pages/Modules'));
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const QuizTaker = lazy(() => import('./pages/QuizTaker'));
const RealCases = lazy(() => import('./pages/RealCases'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const LessonView = lazy(() => import('./pages/LessonView'));
const CaseDetail = lazy(() => import('./pages/CaseDetail'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Profile = lazy(() => import('./pages/Profile'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const VerifyAccount = lazy(() => import('./pages/VerifyAccount'));
const NotFound = lazy(() => import('./pages/NotFound'));

const RouteFallback = () => (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#fafafb] dark:bg-[#0a0c10] transition-colors">
        <div className="h-10 w-10 rounded-full border-4 border-indigo-100 border-t-indigo-600 dark:border-gray-800 dark:border-t-indigo-400 animate-spin" />
    </div>
);

function LegacyTokenRedirect({ basePath }) {
    const { token } = useParams();
    return <Navigate to={`/${basePath}/${token}`} replace />;
}

function LegacyCourseRedirect() {
    const { id } = useParams();
    return <Navigate to={`/cursos/${id}`} replace />;
}

function LegacyLessonRedirect() {
    const { id } = useParams();
    return <Navigate to={`/lecciones/${id}`} replace />;
}

function LegacyQuizRedirect() {
    const { id } = useParams();
    const normalizedId = id === 'diagnostic' ? 'diagnostico' : id;
    return <Navigate to={`/evaluacion/${normalizedId}`} replace />;
}

function LegacyCaseRedirect() {
    const { id } = useParams();
    return <Navigate to={`/casos/${id}`} replace />;
}

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <ToastProvider>
                    <Router>
                        <Suspense fallback={<RouteFallback />}>
                            <Routes>
                            {/* Admin routes — separate layout, role=Admin required */}
                            <Route element={<AdminRoute />}>
                                <Route path="/admin" element={<AdminLayout />}>
                                    <Route index element={<AdminDashboard />} />
                                    <Route path="usuarios" element={<AdminUsuarios />} />
                                    <Route path="reportes" element={<AdminReportes />} />
                                    <Route path="cursos" element={<AdminCursos />} />
                                    <Route path="lecciones" element={<AdminLecciones />} />
                                    <Route path="preguntas" element={<AdminPreguntas />} />
                                    <Route path="casos" element={<AdminCasos />} />
                                    <Route path="recursos" element={<AdminRecursos />} />
                                </Route>
                            </Route>

                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="iniciar-sesion" element={<Login />} />
                                <Route path="recuperar-contrasena" element={<ForgotPassword />} />
                                <Route path="restablecer-contrasena/:token" element={<ResetPassword />} />
                                <Route path="verificar" element={<VerifyAccount />} />
                                <Route path="verificar/:token" element={<VerifyAccount />} />
                                <Route path="registro" element={<Register />} />
                                <Route path="privacidad" element={<PrivacyPolicy />} />
                                <Route path="terminos" element={<TermsOfService />} />
                                <Route path="contactanos" element={<ContactPage />} />
                                <Route path="login" element={<Navigate to="/iniciar-sesion" replace />} />
                                <Route path="contacto" element={<Navigate to="/contactanos" replace />} />
                                <Route path="forgot-password" element={<Navigate to="/recuperar-contrasena" replace />} />
                                <Route
                                    path="reset-password/:token"
                                    element={<LegacyTokenRedirect basePath="restablecer-contrasena" />}
                                />
                                <Route path="verify" element={<Navigate to="/verificar" replace />} />
                                <Route path="verify/:token" element={<LegacyTokenRedirect basePath="verificar" />} />
                                <Route path="register" element={<Navigate to="/registro" replace />} />
                                <Route path="privacy" element={<Navigate to="/privacidad" replace />} />
                                <Route path="terms" element={<Navigate to="/terminos" replace />} />

                                {/* Rutas públicas — sin login */}
                                <Route path="casos-y-guias" element={<RealCases />} />
                                <Route path="casos" element={<Navigate to="/casos-y-guias" replace />} />
                                <Route path="casos/:id" element={<CaseDetail />} />
                                <Route path="cases" element={<Navigate to="/casos-y-guias" replace />} />
                                <Route path="cases/:id" element={<LegacyCaseRedirect />} />

                                <Route element={<ProtectedRoute />}>
                                    <Route path="cursos" element={<Modules />} />
                                    <Route path="cursos/:id" element={<CourseDetail />} />
                                    <Route path="lecciones/:id" element={<LessonView />} />
                                    <Route
                                        path="evaluacion/diagnostic"
                                        element={<Navigate to="/evaluacion/diagnostico" replace />}
                                    />
                                    <Route path="evaluacion/:id" element={<QuizTaker />} />
                                    <Route path="panel" element={<Dashboard />} />
                                    <Route path="perfil" element={<Profile />} />
                                    <Route path="modules" element={<Navigate to="/cursos" replace />} />
                                    <Route path="courses/:id" element={<LegacyCourseRedirect />} />
                                    <Route path="lessons/:id" element={<LegacyLessonRedirect />} />
                                    <Route path="quiz/:id" element={<LegacyQuizRedirect />} />
                                    <Route path="dashboard" element={<Navigate to="/panel" replace />} />
                                    <Route path="profile" element={<Navigate to="/perfil" replace />} />
                                </Route>

                                <Route path="*" element={<NotFound />} />
                            </Route>
                            </Routes>
                        </Suspense>
                    </Router>
                </ToastProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
