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
      className="w-screen h-screen flex items-center justify-between bg-[#053444] px-6 md:px-20"
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {!imageError && (
        <img
          src="/23722103_7yu8_f6h4_211228.svg"
          alt="Lost SVG"
          className="w-[700px] max-w-[100%] object-contain"
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
      )}

      <div className="ml-auto text-right max-w-[600px] space-y-4 z-20">
        <h1
          className={`font-bold text-3xl md:text-4xl ${
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
          className={`text-sm md:text-base leading-relaxed ${
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
          className={`inline-block px-6 py-2 text-white text-base font-semibold rounded-lg transition-all duration-300 ease-in-out shadow-md border-2 border-transparent ${
            imageError
              ? 'hover:bg-white hover:text-black hover:border-black border-white'
              : 'hover:bg-white hover:text-black hover:border-black border-white'
          } hover:-translate-y-1 hover:scale-105 hover:shadow-xl active:scale-95`}
          style={{
            fontFamily: "'Fuzzy Bubbles', cursive",
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          }}
        >
          RETURN TO MAINLAND
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
