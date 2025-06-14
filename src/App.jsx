import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import CreateAccount from './components/CreateAccount';
import Login from './components/LogIn';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import SetPassword from './components/SetPassword';
import GoogleAuthSuccess from './components/GoogleAuthSuccess';
import GoogleAuthError from './components/GoogleAuthError';
import LegalPage from './components/LegalPage';
import ResetPasswordWithOtp from './components/ResetPasswordWithOtp';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Password reset/set routes */}
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/set-password/:token" element={<SetPassword />} />
      <Route path="/reset-password-otp" element={<ResetPasswordWithOtp />} />

      {/* Google auth callback routes */}
      <Route path="/auth/success" element={<GoogleAuthSuccess />} />
      <Route path="/auth/error" element={<GoogleAuthError />} />

      {/* Legal page */}
      <Route path="/legal" element={<LegalPage />} />

      {/* ✅ Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
