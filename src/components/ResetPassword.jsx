import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(''); // For success or error messages
  const [loading, setLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true); // State to check token validity on mount

  // Optional: You might want to verify the token with the backend on component mount
  // to give early feedback if the link is invalid/expired before the user types
  useEffect(() => {
    const verifyToken = async () => {
      // You could make a lightweight GET request to your backend to verify the token
      // For this example, we'll assume the backend's PATCH request will handle validity.
      // If you implement a GET /auth/verify-reset-token/:token endpoint, uncomment and use it.
      /*
      try {
        const res = await fetch(`http://localhost:5000/auth/verify-reset-token/${token}`);
        if (!res.ok) {
          setIsValidToken(false);
          setMessage('This password reset link is invalid or has expired.');
        }
      } catch (error) {
        console.error('Token verification error:', error);
        setIsValidToken(false);
        setMessage('Could not verify token. Please try again.');
      }
      */
    };

    if (!token) {
      setIsValidToken(false);
      setMessage('No reset token found in the URL. Please use the link from your email.');
    } else {
      // verifyToken(); // Uncomment if you add a backend endpoint for verification
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setLoading(true);

    if (!isValidToken) {
      setMessage('Cannot reset password: Invalid or expired link.');
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
      const response = await fetch(`http://localhost:5000/auth/reset-password/${token}`, {
        method: 'PATCH', // Or POST, depending on your backend
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }), // Only send the new password
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Password has been reset successfully!');
        // Optionally, log the user in directly if backend sends token
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          // Redirect to a success page or dashboard after a short delay
          setTimeout(() => navigate('/'), 2000);
        } else {
          // If no token, redirect to login page
          setTimeout(() => navigate('/login'), 2000);
        }
      } else {
        setMessage(data.message || 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Reset password request error:', error);
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
          Reset Password
        </h2>

        {message && (
          <p className={`text-center text-sm ${message.includes('success') || message.includes('successfully') ? 'text-[#0c878c]' : 'text-red-500'}`}>
            {message}
          </p>
        )}

        {!isValidToken ? (
          <p className="text-center text-red-500 text-sm">
            {message || 'Invalid or expired password reset link. Please request a new one.'}
          </p>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#0c878c]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#0c878c]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 border border-[#0c878c] hover:border-[#0c878c] bg-[#0c878c] hover:bg-black hover:text-[#0c878c] rounded-lg text-white font-semibold transition cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
          <span className="h-px w-16 bg-gray-700" />
          <span>OR</span>
          <span className="h-px w-16 bg-gray-700" />
        </div>

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

export default ResetPassword;