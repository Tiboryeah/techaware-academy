import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password/:token" element={<ResetPassword />} />
                <Route path="register" element={<Register />} />
                <Route path="privacy" element={<PrivacyPolicy />} />
                <Route path="terms" element={<TermsOfService />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="modules" element={<Modules />} />
                  <Route path="courses/:id" element={<CourseDetail />} />
                  <Route path="lessons/:id" element={<LessonView />} />
                  <Route path="quiz/:id" element={<QuizTaker />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="cases" element={<RealCases />} />
                  <Route path="cases/:id" element={<CaseDetail />} />
                  <Route path="profile" element={<Profile />} />
                </Route>

                <Route path="*" element={<div className="p-10 text-center">404 - Página no encontrada</div>} />
              </Route>
            </Routes>
          </Router>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
