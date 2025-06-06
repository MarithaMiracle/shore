import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fullName, email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setErrorMessage(data.message || 'Registration failed.');
      }
    } catch (err) {
      setErrorMessage('Network error. Try again.');
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
      <div className="fixed lg:top-30 sm:top-55 xs:top-55 top-60 z-20 flex justify-center w-full">
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
        <h2 className="text-center text-base lg:text-2xl font-semibold">Create an Account</h2>

        {errorMessage && (
          <div className="text-red-400 text-center text-xs lg:text-sm">{errorMessage}</div>
        )}

        <form className="space-y-2 lg:space-y-4" onSubmit={handleSubmit}>
          <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            className="w-full px-2 py-1.5 text-xs lg:text-base lg:px-4 lg:py-2.5 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none"
            style={{ caretColor: '#0c878c' }}
            onFocus={(e) => (e.target.style.borderColor = '#0c878c')}
            onBlur={(e) => (e.target.style.borderColor = 'rgb(75 85 99)')}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full px-2 py-1.5 text-xs lg:text-base lg:px-4 lg:py-2.5 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none"
            style={{ caretColor: '#0c878c' }}
            onFocus={(e) => (e.target.style.borderColor = '#0c878c')}
            onBlur={(e) => (e.target.style.borderColor = 'rgb(75 85 99)')}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-2 py-1.5 text-xs lg:text-base lg:px-4 lg:py-2.5 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none"
            style={{ caretColor: '#0c878c' }}
            onFocus={(e) => (e.target.style.borderColor = '#0c878c')}
            onBlur={(e) => (e.target.style.borderColor = 'rgb(75 85 99)')}
            required
          />
          <button
            type="submit"
            className="w-full py-2 text-xs lg:text-base lg:py-2.5 rounded-md border border-[#0c878c] hover:border-[#0c878c] text-white bg-[#0c878c] hover:bg-black hover:text-[#0c878c] font-semibold transition-colors duration-300 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2 text-gray-400 text-[10px] lg:text-sm">
          <span className="h-px w-8 bg-gray-700" />
          <span>OR</span>
          <span className="h-px w-8 bg-gray-700" />
        </div>

        <button
          onClick={() => {
            window.location.href = 'http://localhost:5000/auth/google';
          }}
          className="w-full py-2 text-xs lg:text-base lg:py-2.5 flex items-center justify-center gap-2 border bg-white text-black rounded-md font-semibold hover:bg-black hover:text-white transition cursor-pointer"
          disabled={isLoading}
        >
          <img src="/icons8-google-48.png" alt="Google" className="h-4 w-4 lg:h-5 lg:w-5" />
          Sign up with Google
        </button>

        <p className="text-center text-xs lg:text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="hover:underline" style={{ color: '#0c878c' }}>
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
