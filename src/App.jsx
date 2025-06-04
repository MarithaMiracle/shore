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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Routes for Password Reset/Set */}
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/set-password/:token" element={<SetPassword />} />

      {/* Routes for Google Authentication Callbacks */}
      <Route path="/auth/success" element={<GoogleAuthSuccess />} />
      <Route path="/auth/error" element={<GoogleAuthError />} />

      {/* --- ADD THE ROUTE FOR THE NEW LEGAL PAGE --- */}
      <Route path="/legal" element={<LegalPage />} />
      {/* --- END NEW ROUTE --- */}
    </Routes>
  );
};

export default App;