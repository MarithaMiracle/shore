import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Set your backend base URL
  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'https://estatify-gc8a.onrender.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrorMessage('');
    setIsLoading(true);

    try {
      // Call /auth/request-otp instead of /auth/forgot-password
      const res = await fetch(`${API_BASE_URL}/auth/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // IMPORTANT: Specify the purpose as 'password_reset'
        body: JSON.stringify({ email, purpose: 'password_reset' }), 
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'OTP sent! Please check your email to reset your password.');
        // NEW: Redirect to the OTP reset page, passing the email via state
        navigate('/reset-password-otp', { state: { email: email } });
      } else {
        setErrorMessage(data.message || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Network error. Please try again.');
      console.error('Request OTP error:', err); // Log error for debugging
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{ fontFamily: 'Britannic Bold' }}
      className="relative min-h-screen bg-black text-white flex items-center justify-center px-2"
    >
      {/* Background grid */}
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

      {/* Form container */}
      <div
        className="relative z-10 bg-black/90 backdrop-blur-xl rounded-lg w-full max-w-xs p-4 pt-16 mt-12 shadow-xl space-y-3
          lg:max-w-md lg:p-8 lg:pt-24 lg:space-y-6"
        style={{ border: '1px solid rgba(12, 135, 140, 0.2)' }}
      >
        {/* LOGO MOVED HERE, INSIDE THE FORM CONTAINER, with adjusted margins */}
        <div className="flex justify-center w-full mb-8 lg:mb-10 -mt-10 lg:-mt-20">
          <img
            src="/Estatify Colored Transparent.png"
            alt="Estatify Logo"
            className="w-[80px] h-[32px] lg:w-[140px] lg:h-[60px]"
          />
        </div>

        <h2 className="text-center text-base lg:text-2xl font-semibold">Forgot Password?</h2>

        {message && (
          <div className="text-green-400 text-center text-xs lg:text-sm">{message}</div>
        )}
        {errorMessage && (
          <div className="text-red-400 text-center text-xs lg:text-sm">{errorMessage}</div>
        )}

        <form className="space-y-2 lg:space-y-4" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-2 py-1.5 text-xs lg:text-base lg:px-4 lg:py-2.5 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none"
            style={{ caretColor: '#0c878c' }}
            onFocus={(e) => (e.target.style.borderColor = '#0c878c')}
            onBlur={(e) => (e.target.style.borderColor = 'rgb(75 85 99)')}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 text-xs lg:text-base lg:py-2.5 rounded-md border border-[#0c878c] hover:border-[#0c878c] text-white bg-[#0c878c] hover:bg-black hover:text-[#0c878c] font-semibold transition-colors duration-300 cursor-pointer"
          >
            {isLoading ? 'Sending OTP...' : 'Send Reset OTP'}
          </button>
        </form>

        <p className="text-center text-xs lg:text-sm text-gray-400">
          Remembered your password?{' '}
          <Link to="/login" className="hover:underline" style={{ color: '#0c878c' }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
