import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import CreateAccount from './components/CreateAccount';
import Login from './components/LogIn';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword'; // This is likely for link-based reset
import SetPassword from './components/SetPassword';
import GoogleAuthSuccess from './components/GoogleAuthSuccess';
import GoogleAuthError from './components/GoogleAuthError';
import LegalPage from './components/LegalPage';

// --- NEW IMPORT: For your OTP-based password reset page ---
import ResetPasswordWithOtp from './components/ResetPasswordWithOtp'; // Assuming it's in components folder

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Routes for Password Reset/Set */}
      {/* This is your existing link-based reset route */}
      <Route path="/reset-password/:token" element={<ResetPassword />} /> 
      {/* This is your existing set password for Google users */}
      <Route path="/set-password/:token" element={<SetPassword />} />

      {/* --- NEW ROUTE FOR OTP-BASED RESET --- */}
      <Route path="/reset-password-otp" element={<ResetPasswordWithOtp />} /> 

      {/* Routes for Google Authentication Callbacks */}
      <Route path="/auth/success" element={<GoogleAuthSuccess />} />
      <Route path="/auth/error" element={<GoogleAuthError />} />

      {/* Route for the Legal Page */}
      <Route path="/legal" element={<LegalPage />} />
    </Routes>
  );
};

export default App;