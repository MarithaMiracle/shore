import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // For success or error messages
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setLoading(true);

    if (!email) {
      setMessage('Please enter your email address.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'If an account exists, a password reset link has been sent to your email.');
      } else {
        // Backend's forgot-password intentionally gives a generic message for security,
        // but we'll display what it sends if it's an actual error message.
        setMessage(data.message || 'Failed to send password reset link. Please try again.');
      }
    } catch (error) {
      console.error('Forgot password request error:', error);
      setMessage('Network error or server is unreachable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

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

      {/* Form Container */}
      <div className="relative z-10 bg-black/90 border border-[#0c878c]/20 backdrop-blur-xl rounded-xl max-w-md w-full p-8 pt-20 shadow-xl space-y-6 mt-16">
        <h2 className="text-center text-3xl font-semibold text-white">
          Forgot Password?
        </h2>

        {message && (
          <p className={`text-center text-sm ${message.includes('error') || message.includes('failed') ? 'text-red-500' : 'text-[#0c878c]'}`}>
            {message}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#0c878c]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 border border-[#0c878c] hover:border-[#0c878c] bg-[#0c878c] hover:bg-black hover:text-[#0c878c] rounded-lg text-white font-semibold transition cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Sending Link...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
          <span className="h-px w-16 bg-gray-700" />
          <span>OR</span>
          <span className="h-px w-16 bg-gray-700" />
        </div>

        {/* Existing account links */}
        <p className="text-center text-sm text-gray-400">
          Remember your password?{' '}
          <Link to="/login" className="text-[#0c878c] hover:underline">
            Sign In
          </Link>
        </p>
        <p className="text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/create-account" className="text-[#0c878c] hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;