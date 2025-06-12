import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const imageUrl = '/23722103_7yu8_f6h4_211228.svg';
    const tempImage = new Image();
    tempImage.src = imageUrl;

    tempImage.onerror = () => {
      console.error(`Failed to load ${imageUrl}`);
      setImageError(true);
    };

    tempImage.onload = () => {
      setImageError(false);
    };
  }, []);

  return (
    <div
      className={`w-screen h-screen flex items-center justify-center ${
        imageError ? 'bg-[#1a202c]' : ''
      }`}
      style={{
        backgroundImage: imageError
          ? 'none'
          : "url('/23722103_7yu8_f6h4_211228.svg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: imageError ? '#1a202c' : '#ADD8E6',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="z-20 flex flex-col items-center justify-center text-center px-4 mt-[-15vh]">
        <h1
          className={`font-bold mb-2 text-4xl md:text-6xl lg:text-7xl ${
            imageError ? 'text-[#0c878c]' : 'text-[#4a5568]'
          }`}
          style={{
            fontFamily: "'Fuzzy Bubbles', cursive",
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          LOOKS LIKE YOU'RE LOST...
        </h1>

        <p
          className={`text-base md:text-xl max-w-[80%] leading-relaxed mb-8 ${
            imageError ? 'text-[#a0aec0]' : 'text-[#718096]'
          }`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          STAY WHERE YOU ARE AND WE'LL SEND SOMEONE TO FIND YOU!
        </p>

        <Link
          to="/"
          className={`px-8 py-3 text-white text-lg font-semibold rounded-full transition-all duration-300 ease-in-out shadow-md border-2 border-transparent ${
            imageError
              ? 'bg-[#0c878c] hover:bg-white hover:text-[#0c878c] hover:border-[#0c878c]'
              : 'bg-[#0c878c] hover:bg-white hover:text-[#0c878c] hover:border-[#0c878c]'
          } hover:translate-y-[-3px] hover:scale-105 hover:shadow-xl active:scale-95`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          RETURN TO MAINLAND
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
