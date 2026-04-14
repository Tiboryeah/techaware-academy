import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Modules from './pages/Modules';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import QuizTaker from './pages/QuizTaker';
import RealCases from './pages/RealCases';
import Login from './pages/Login';
import Register from './pages/Register';
import CourseDetail from './pages/CourseDetail';
import LessonView from './pages/LessonView';
import CaseDetail from './pages/CaseDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Profile from './pages/Profile';
import ContactPage from './pages/ContactPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyAccount from './pages/VerifyAccount';
import NotFound from './pages/NotFound';

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
                        <Routes>
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
                                    <Route path="casos-y-guias" element={<RealCases />} />
                                    <Route path="casos" element={<Navigate to="/casos-y-guias" replace />} />
                                    <Route path="casos/:id" element={<CaseDetail />} />
                                    <Route path="perfil" element={<Profile />} />
                                    <Route path="modules" element={<Navigate to="/cursos" replace />} />
                                    <Route path="courses/:id" element={<LegacyCourseRedirect />} />
                                    <Route path="lessons/:id" element={<LegacyLessonRedirect />} />
                                    <Route path="quiz/:id" element={<LegacyQuizRedirect />} />
                                    <Route path="dashboard" element={<Navigate to="/panel" replace />} />
                                    <Route path="cases" element={<Navigate to="/casos-y-guias" replace />} />
                                    <Route path="cases/:id" element={<LegacyCaseRedirect />} />
                                    <Route path="profile" element={<Navigate to="/perfil" replace />} />
                                </Route>

                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Routes>
                    </Router>
                </ToastProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
