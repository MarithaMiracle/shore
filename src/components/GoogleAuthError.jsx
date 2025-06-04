import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const GoogleAuthError = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState('An unknown error occurred during Google authentication.');

  useEffect(() => {
    // Attempt to extract an error message from URL query parameters
    const params = new URLSearchParams(location.search);
    const message = params.get('message'); // Assuming backend sends error message via 'message' query param

    if (message) {
      setErrorMessage(message);
    }
  }, [location]);

  return (
    <div
      style={{ fontFamily: 'Britannic Bold' }}
      className="relative min-h-screen bg-black text-white flex items-center justify-center px-4"
    >
      {/* Glowing Grid Background */}
      <div
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          boxShadow: '0 0 12px rgba(0, 255, 255, 0.1)',
        }}
      />

      {/* Logo Positioned Outside the Form Box */}
      <div className="absolute top-38 z-20 flex justify-center w-full">
        <img src="/well logo.png" alt="Estatify Logo" className="h-50" />
      </div>

      {/* Message Container */}
      <div className="relative z-10 bg-black/90 border border-[#0c878c]/20 backdrop-blur-xl rounded-xl max-w-md w-full p-8 pt-20 shadow-xl space-y-6 mt-16 text-center">
        <h2 className="text-3xl font-semibold text-white">
          Authentication Failed
        </h2>
        <p className="text-xl text-red-500 mb-6">{errorMessage}</p>

        <p className="text-center text-sm text-gray-400">
          Please try again or choose a different method.
        </p>

        {/* Action Buttons / Links */}
        <div className="space-y-4">
          <button
            onClick={() => {
              // Option to retry Google login
              window.location.href = 'http://localhost:5000/auth/google';
            }}
            className="w-full py-2 flex items-center justify-center gap-2 border bg-white text-black rounded-lg font-semibold hover:bg-black hover:text-white transition cursor-pointer"
          >
            <img src="/icons8-google-48.png" alt="Google" className="h-5 w-5" />
            Retry with Google
          </button>

          <Link
            to="/login"
            className="w-full inline-block py-2 rounded-lg border border-[#0c878c] hover:border-[#0c878c] text-white bg-[#0c878c] hover:bg-black hover:text-[#0c878c] font-semibold transition-colors duration-300 cursor-pointer"
          >
            Go to Login
          </Link>
          <Link
            to="/create-account"
            className="w-full inline-block py-2 rounded-lg border border-gray-600 hover:border-[#0c878c] text-white bg-transparent hover:text-[#0c878c] font-semibold transition-colors duration-300 cursor-pointer"
          >
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuthError;