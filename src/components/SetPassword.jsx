import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const SetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsValidToken(false);
      setMessage('No token found in the URL. Please use the link from your email.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (!isValidToken) {
      setMessage('Cannot set password: Invalid or missing link.');
      setLoading(false);
      return;
    }

    if (!password || !confirmPassword) {
      setMessage('Please enter and confirm your new password.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/auth/set-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Password has been set successfully!');
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          setTimeout(() => navigate('/'), 2000);
        } else {
          setTimeout(() => navigate('/login'), 2000);
        }
      } else {
        setMessage(data.message || 'Failed to set password. Please try again.');
      }
    } catch (error) {
      setMessage('Network error or server is unreachable. Please try again later.');
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
      <div className="fixed lg:top-45 sm:top-65 xs:top-65 top-68 z-20 flex justify-center w-full">
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
        <h2 className="text-center text-base lg:text-2xl font-semibold">
          Set Your Password
        </h2>

        {message && (
          <p
            aria-live="polite"
            className={`text-center text-xs lg:text-sm ${
              message.toLowerCase().includes('success')
                ? 'text-[#0c878c]'
                : 'text-red-400'
            }`}
          >
            {message}
          </p>
        )}

        {!isValidToken ? (
          <p className="text-center text-red-400 text-xs lg:text-sm">
            {message || 'Invalid or missing password set link. Please request a new one.'}
          </p>
        ) : (
          <form className="space-y-2 lg:space-y-4" onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
              className="w-full px-2 py-1.5 text-xs lg:text-base lg:px-4 lg:py-2.5 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none"
              style={{ caretColor: '#0c878c' }}
              onFocus={(e) => (e.target.style.borderColor = '#0c878c')}
              onBlur={(e) => (e.target.style.borderColor = 'rgb(75 85 99)')}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
              className="w-full px-2 py-1.5 text-xs lg:text-base lg:px-4 lg:py-2.5 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none"
              style={{ caretColor: '#0c878c' }}
              onFocus={(e) => (e.target.style.borderColor = '#0c878c')}
              onBlur={(e) => (e.target.style.borderColor = 'rgb(75 85 99)')}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 text-xs lg:text-base lg:py-2.5 rounded-md border border-[#0c878c] hover:border-[#0c878c] text-white bg-[#0c878c] hover:bg-black hover:text-[#0c878c] font-semibold transition-colors duration-300 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Setting Password...' : 'Set Password'}
            </button>
          </form>
        )}

        <div className="flex items-center justify-center space-x-2 text-gray-400 text-xs lg:text-sm">
          <span className="h-px w-16 bg-gray-700" />
          <span>OR</span>
          <span className="h-px w-16 bg-gray-700" />
        </div>

        <p className="text-center text-xs lg:text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="hover:underline" style={{ color: '#0c878c' }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SetPassword;
