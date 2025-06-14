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
      className="w-screen h-screen flex flex-col items-center justify-center bg-[#053444] px-4 sm:px-6 md:px-12 lg:px-20 text-white"
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {!imageError && (
        <img
          src="/23722103_7yu8_f6h4_211228.svg"
          alt="Lost SVG"
          className="w-[clamp(200px,40vw,700px)] max-w-full object-contain mb-6 lg:mb-0 lg:mr-8"
          style={{
            pointerEvents: 'none',
          }}
        />
      )}

      <div className="text-center lg:text-right max-w-[90%] sm:max-w-[85%] md:max-w-[600px] space-y-4 z-20">
        <h1
          className={`font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl ${
            imageError ? 'text-[#0c878c]' : 'text-[#e0f7ff]'
          }`}
          style={{
            fontFamily: "'Fuzzy Bubbles', cursive",
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          LOOKS LIKE YOU'RE LOST...
        </h1>

        <p
          className={`text-xs sm:text-sm md:text-base leading-relaxed ${
            imageError ? 'text-[#a0aec0]' : 'text-[#d4eefb]'
          }`}
          style={{
            fontFamily: "'Fuzzy Bubbles', cursive",
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          STAY WHERE YOU ARE AND WE'LL SEND SOMEONE TO FIND YOU!
        </p>

        <Link
          to="/"
          className={`inline-block px-4 sm:px-5 md:px-6 py-2 text-green-600 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 ease-in-out shadow-md border-2 border-green-600 ${
            imageError
              ? 'hover:text-white hover:border-white'
              : 'hover:text-white hover:border-white'
          } hover:-translate-y-1 hover:scale-105 hover:shadow-xl active:scale-95`}
          style={{
            fontFamily: "'Fuzzy Bubbles', cursive",
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          OR RETURN TO THE ESTATE
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
