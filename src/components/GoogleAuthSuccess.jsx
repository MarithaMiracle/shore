import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To access URL query parameters
  const [message, setMessage] = useState('Logging you in...');

  useEffect(() => {
    const handleGoogleAuthSuccess = () => {
      try {
        // Parse query parameters from the URL
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        // --- CHANGE START ---
        const userId = params.get('userId');
        const userName = params.get('userName');
        const userEmail = params.get('userEmail');
        // --- CHANGE END ---

        // Now check for all the parameters that are actually being sent
        if (token && userId && userName && userEmail) { // Check for all required params
          // Store the token and user data individually
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          localStorage.setItem('userName', userName);
          localStorage.setItem('userEmail', userEmail); // Store email if needed on frontend
          
          setMessage('Login successful! Redirecting...');
          // Redirect to your main application dashboard or home page
          setTimeout(() => {
            navigate('/'); // Redirect to home or dashboard
          }, 2000); // Short delay for user to see the message
        } else {
          setMessage('Login failed: Missing authentication data. Please try again.');
          // Log the actual state of parameters for debugging
          console.error('GoogleAuthSuccess: Missing token or user data in URL.', {
            token: token,
            userId: userId,
            userName: userName,
            userEmail: userEmail
          });
          // Redirect to login or an error page after a delay
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      } catch (error) {
        console.error('Error handling Google Auth success:', error);
        setMessage('An error occurred during login. Please try again.');
        setTimeout(() => {
            navigate('/login');
          }, 2000);
      }
    };

    handleGoogleAuthSuccess();
  }, [location, navigate]); // Rerun effect if URL or navigate function changes

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
      

      {/* Message Container */}
      <div className="relative z-10 bg-black/90 border border-[#0c878c]/20 backdrop-blur-xl rounded-xl max-w-md w-full p-8 pt-20 shadow-xl space-y-6 mt-16 text-center">
        <h2 className="text-3xl font-semibold text-white">
          Google Authentication
        </h2>
        <p className="text-xl text-[#0c878c]">{message}</p>
        <div className="flex justify-center items-center h-20">
          {/* Simple loading spinner or animation */}
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0c878c]"></div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuthSuccess;