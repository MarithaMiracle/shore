import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(''); // Clear previous error messages
    setLoading(true); // Set loading state

    if (!email || !password) {
      setErrorMsg('Please enter email and password.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific actions/messages from the backend's authController.login
        if (data.action === 'REQUIRES_GOOGLE_AUTH') {
          setErrorMsg(data.message + ' Please click "Continue with Google" below.');
        } else {
          setErrorMsg(data.message || 'Login failed. Please check your credentials.');
        }
        setLoading(false);
        return;
      }

      const { token, user } = data;

      // Save token and user info to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to your protected page, e.g., dashboard
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg('An error occurred during login. Please check your internet connection.');
    } finally {
      setLoading(false); // Reset loading state
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
          Welcome Back
        </h2>

        {errorMsg && <p className="text-red-500 text-center text-sm">{errorMsg}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#0c878c]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#0c878c]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          {/* Forgot Password Link */}
          <div className="text-right text-sm">
            <Link to="/forgot-password" className="text-[#0c878c] hover:underline">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 border border-[#0c878c] hover:border-[#0c878c] bg-[#0c878c] hover:bg-black hover:text-[#0c878c] rounded-lg text-white font-semibold transition cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
          <span className="h-px w-16 bg-gray-700" />
          <span>OR</span>
          <span className="h-px w-16 bg-gray-700" />
        </div>

        <button
          onClick={() => {
            // This is correct, redirects to backend for Google OAuth
            window.location.href = 'http://localhost:5000/auth/google';
          }}
          className="w-full py-2 flex items-center justify-center gap-2 border bg-white text-black rounded-lg font-semibold hover:bg-black hover:text-white transition cursor-pointer"
          disabled={loading} // Disable button when loading
        >
          <img src="/icons8-google-48.png" alt="Google" className="h-5 w-5" />
          Continue with Google
        </button>

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

export default Login;