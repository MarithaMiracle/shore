import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const CreateAccount = () => {
  const navigate = useNavigate(); // Initialize navigate hook
  const [errorMessage, setErrorMessage] = useState(''); // State for displaying error messages
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
    setIsLoading(true); // Set loading state to true

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

      if (res.ok) {
        console.log('Account created:', data);
        // Store token and navigate to a dashboard or success page
        if (data.token) {
          localStorage.setItem('token', data.token);
          // You might want to navigate to a success page or dashboard
          navigate('/'); // Navigate to home or dashboard after successful registration
        }
      } else {
        // Handle specific error messages from the backend
        console.error('Backend Error:', data.message);
        setErrorMessage(data.message || 'An unexpected error occurred during registration.');

        // You can use data.action for more specific frontend logic if needed
        if (data.action === 'LOGIN_EXISTING_EMAIL_PASSWORD') {
          // Maybe offer to redirect to login page
          // navigate('/login');
        } else if (data.action === 'GOOGLE_AUTH_EXISTING_EMAIL_NO_PASSWORD') {
          // Maybe suggest signing up with Google or setting a password
        }
      }
    } catch (err) {
      console.error('Request failed:', err);
      setErrorMessage('Network error or server is unreachable. Please try again.');
    } finally {
      setIsLoading(false); // Reset loading state
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
      <div className="absolute top-30 z-20 flex justify-center w-full">
        <img src="/well logo.png" alt="Estatify Logo" className="h-50" />
      </div>

      {/* Form Container */}
      <div
        className="relative z-10 bg-black/90 backdrop-blur-xl rounded-xl max-w-md w-full p-8 pt-20 shadow-xl space-y-6 mt-16"
        style={{ border: '1px solid rgba(12, 135, 140, 0.2)' }}
      >
        <h2 className="text-center text-2xl font-semibold text-white">
          Create an Account
        </h2>

        {/* Display Error Message */}
        {errorMessage && (
          <div className="text-red-400 text-center text-sm">{errorMessage}</div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none"
            style={{ caretColor: '#0c878c' }}
            onFocus={(e) => (e.target.style.borderColor = '#0c878c')}
            onBlur={(e) => (e.target.style.borderColor = 'rgb(75 85 99)')}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none"
            style={{ caretColor: '#0c878c' }}
            onFocus={(e) => (e.target.style.borderColor = '#0c878c')}
            onBlur={(e) => (e.target.style.borderColor = 'rgb(75 85 99)')}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none"
            style={{ caretColor: '#0c878c' }}
            onFocus={(e) => (e.target.style.borderColor = '#0c878c')}
            onBlur={(e) => (e.target.style.borderColor = 'rgb(75 85 99)')}
            required
          />
          <button
            type="submit"
            className="w-full py-2 rounded-lg border border-[#0c878c] hover:border-[#0c878c] text-white bg-[#0c878c] hover:bg-black hover:text-[#0c878c] font-semibold transition-colors duration-300 cursor-pointer"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
          <span className="h-px w-16 bg-gray-700" />
          <span>OR</span>
          <span className="h-px w-16 bg-gray-700" />
        </div>

        {/* Google Auth */}
        <button
          onClick={() => {
            // This is correct, redirects to backend for Google OAuth
            window.location.href = 'http://localhost:5000/auth/google';
          }}
          className="w-full py-2 flex items-center justify-center gap-2 border bg-white text-black rounded-lg font-semibold hover:bg-black hover:text-white transition cursor-pointer"
          disabled={isLoading} // Disable button when loading
        >
          <img src="/icons8-google-48.png" alt="Google" className="h-5 w-5" />
          Sign up with Google
        </button>

        {/* Already have account */}
        <p className="text-center text-sm text-gray-400">
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