import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('https://estatify-gc8a.onrender.com/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'Password reset email sent.');
      } else {
        setErrorMessage(data.message || 'Failed to send reset email.');
      }
    } catch (err) {
      setErrorMessage('Network error. Please try again.');
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

      {/* Logo */}
      <div className="fixed lg:top-60 sm:top-75 xs:top-75 top-80 z-20 flex justify-center w-full">
        <img
          src="/Estatify Colored Transparent.png"
          alt="Estatify Logo"
          className="w-[80px] h-[32px] lg:w-[140px] lg:h-[60px]"
        />
      </div>

      {/* Form container */}
      <div
        className="relative z-10 bg-black/90 backdrop-blur-xl rounded-lg w-full max-w-xs p-4 pt-16 mt-12 shadow-xl space-y-3
          lg:max-w-md lg:p-8 lg:pt-24 lg:space-y-6"
        style={{ border: '1px solid rgba(12, 135, 140, 0.2)' }}
      >
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
            {isLoading ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>

        <p className="text-center text-xs lg:text-sm text-gray-400">
          Remembered your password?{' '}
          <a href="/login" className="hover:underline" style={{ color: '#0c878c' }}>
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
