// frontend/src/pages/ResetPasswordWithOtp.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPasswordWithOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '']); // Array for 4 OTP digits
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const inputRefs = useRef([]); // Ref for OTP input elements

  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'; // Ensure this matches your backend URL

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      setError('Please provide your email to reset password. Redirecting...');
      setTimeout(() => navigate('/forgot-password'), 3000);
    }
  }, [location.state, navigate]);

  // Handler for individual OTP input changes
  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (value.length > 1) return; // Prevent pasting more than one digit

    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);

    // Auto-focus to next input
    if (value && index < otpDigits.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handler for backspace key in OTP inputs
  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    const otp = otpDigits.join(''); // Combine digits to form the full OTP string

    if (!email || !otp || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      setIsLoading(false);
      return;
    }

    if (otp.length !== 4) { // Validate OTP length (assuming 4 digits now)
        setError('Please enter a 4-digit OTP.');
        setIsLoading(false);
        return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/auth/reset-password-otp`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword, purpose: 'password_reset' }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'Password reset successfully! You can now log in.');
        setOtpDigits(['', '', '', '']); // Clear OTP fields
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => navigate('/login'), 2000); 
      } else {
        setError(data.message || 'Password reset failed. Invalid OTP or expired.');
      }
    } catch (err) {
      setError('Network error. Could not connect to the server.');
      console.error('Reset password with OTP error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{ fontFamily: 'Britannic Bold' }}
      className="relative min-h-screen bg-black text-white flex items-center justify-center px-2"
    >
      {/* Background grid - Same design */}
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

      {/* Logo - Same design */}
      <div className="fixed lg:top-30 sm:top-55 xs:top-55 top-60 z-20 flex justify-center w-full">
        <img
          src="/Estatify Colored Transparent.png"
          alt="Estatify Logo"
          className="w-[80px] h-[32px] lg:w-[140px] lg:h-[60px]"
        />
      </div>

      {/* Form container - Same design */}
      <div
        className="relative z-10 bg-black/90 backdrop-blur-xl rounded-lg w-full max-w-xs p-4 pt-16 mt-12 shadow-xl space-y-3
          lg:max-w-md lg:p-8 lg:pt-24 lg:space-y-6"
        style={{ border: '1px solid rgba(12, 135, 140, 0.2)' }}
      >
        <h2 className="text-center text-base lg:text-2xl font-semibold">Reset Password</h2>
        <p className="text-center text-gray-400 text-xs lg:text-sm">
          Enter the OTP sent to <strong>{email || 'your email'}</strong> and your new password.
        </p>

        {message && (
          <div className="text-green-400 text-center text-xs lg:text-sm">{message}</div>
        )}
        {error && (
          <div className="text-red-400 text-center text-xs lg:text-sm">{error}</div>
        )}

        <form className="space-y-2 lg:space-y-4" onSubmit={handleResetPassword}>
          {/* OTP Input Boxes */}
          <div className="flex justify-center space-x-2 lg:space-x-4">
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1" // Only one character per box
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)} // Store ref to each input
                className="w-10 h-10 lg:w-12 lg:h-12 text-center text-xl lg:text-2xl font-bold bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none"
                style={{ caretColor: '#0c878c', borderColor: digit ? '#0c878c' : 'rgb(75 85 99)' }} // Highlight active/filled boxes
                onFocus={(e) => (e.target.style.borderColor = '#0c878c')}
                onBlur={(e) => (e.target.style.borderColor = digit ? '#0c878c' : 'rgb(75 85 99)')}
                disabled={isLoading}
              />
            ))}
          </div>

          {/* New Password Input */}
          <input
            name="newPassword"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-2 py-1.5 text-xs lg:text-base lg:px-4 lg:py-2.5 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none"
            style={{ caretColor: '#0c878c' }}
            onFocus={(e) => (e.target.style.borderColor = '#0c878c')}
            onBlur={(e) => (e.target.style.borderColor = 'rgb(75 85 99)')}
            required
            disabled={isLoading}
          />
          
          {/* Confirm Password Input */}
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-2 py-1.5 text-xs lg:text-base lg:px-4 lg:py-2.5 bg-transparent border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none"
            style={{ caretColor: '#0c878c' }}
            onFocus={(e) => (e.target.style.borderColor = '#0c878c')}
            onBlur={(e) => (e.target.style.borderColor = 'rgb(75 85 99)')}
            required
            disabled={isLoading}
          />
          
          {/* Reset Button */}
          <button
            type="submit"
            className="w-full py-2 text-xs lg:text-base lg:py-2.5 rounded-md border border-[#0c878c] hover:border-[#0c878c] text-white bg-[#0c878c] hover:bg-black hover:text-[#0c878c] font-semibold transition-colors duration-300 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordWithOtp;