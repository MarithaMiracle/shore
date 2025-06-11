import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (!email || !password) {
      setErrorMsg('Please enter email and password.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://estatify-gc8a.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.action === 'REQUIRES_GOOGLE_AUTH') {
          setErrorMsg(data.message + ' Please click "Continue with Google" below.');
        } else {
          setErrorMsg(data.message || 'Login failed. Please check your credentials.');
        }
        setLoading(false);
        return;
      }

      const { token, user } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Store the user's name separately for consistent Header display
      if (user && user.name) {
        localStorage.setItem('userName', user.name); 
      }

      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg('An error occurred during login. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ fontFamily: 'Britannic Bold' }}
      className="relative min-h-screen bg-black text-white flex items-center justify-center px-2"
    >
      {/* Background grid */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
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

        <h2 className="text-center text-base lg:text-2xl font-semibold">Welcome Back</h2>

        {errorMsg && (
          <p className="text-red-400 text-center text-xs lg:text-sm">{errorMsg}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-2 lg:space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-2 py-1.5 text-xs lg:text-base lg:px-4 lg:py-2.5 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            style={{ caretColor: '#0c878c' }}
            onFocus={(e) => (e.target.style.borderColor = '#0c878c')}
            onBlur={(e) => (e.target.style.borderColor = 'rgb(75 85 99)')}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-2 py-1.5 text-xs lg:text-base lg:px-4 lg:py-2.5 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            style={{ caretColor: '#0c878c' }}
            onFocus={(e) => (e.target.style.borderColor = '#0c878c')}
            onBlur={(e) => (e.target.style.borderColor = 'rgb(75 85 99)')}
            required
          />

          <div className="text-right text-[10px] lg:text-sm">
            <Link to="/forgot-password" className="text-[#0c878c] hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-xs lg:text-base lg:py-2.5 rounded-md border border-[#0c878c] hover:border-[#0c878c] text-white bg-[#0c878c] hover:bg-black hover:text-[#0c878c] font-semibold transition-colors duration-300 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2 text-gray-400 text-[10px] lg:text-sm">
          <span className="h-px w-8 bg-gray-700" />
          <span>OR</span>
          <span className="h-px w-8 bg-gray-700" />
        </div>

        <button
          onClick={() => {
            window.location.href = 'https://estatify-gc8a.onrender.com/auth/google';
          }}
          disabled={loading}
          className="w-full py-2 text-xs lg:text-base lg:py-2.5 flex items-center justify-center gap-2 border bg-white text-black rounded-md font-semibold hover:bg-black hover:text-white transition cursor-pointer disabled:opacity-50"
        >
          <img src="/icons8-google-48.png" alt="Google" className="h-4 w-4 lg:h-5 lg:w-5" />
          Continue with Google
        </button>

        <p className="text-center text-xs lg:text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/create-account" className="text-[#0c878c] hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;