import React, { useState, useEffect, useRef } from 'react';

const testimonialsData = [
  {
    quote: "Estatify made house-hunting seamless and stress-free. I found the perfect apartment within days!",
    author: "— Sarah A., Lagos",
  },
  {
    quote: "Their service is exceptional! They helped me find a home that fits my budget and style.",
    author: "— John M., Abuja",
  },
  {
    quote: "I highly recommend Estatify. Professional, quick, and reliable!",
    author: "— Linda K., Port Harcourt",
  },
  {
    quote: "A seamless experience from start to finish. The team really listens to your needs.",
    author: "— Emeka O., Abuja",
  },
  {
    quote: "Excellent customer support and great properties. Estatify made buying my first home easy!",
    author: "— Chidinma U., Enugu",
  },
];

const Testimonials = ({ id }) => { 
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prevIndex) => (prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    return () => resetTimeout();
  }, [current]);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  return (
    <section
      id={id}
      className="lg:flex grid grid-cols-1 bg-black w-full lg:mt-20 mt-10 h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[80vh]"
    >

      
      {/* Left Side */}
      <div className="flex-1 order-2 lg:order-none bg-black text-white -mt-20 flex flex-col justify-center relative px-10 py-12">
        <h2 className="text-[#0c878c] text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-semibold lg:mb-4 mb-2">TESTIMONIALS</h2>
        <p className="text-sm xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl lg:mt-4 mt-2 text-gray-300">Why Customers Love Us</p>

        {/* Carousel */}
        <div
          className="relative lg:mt-20 mt-10 h-48"
          onMouseEnter={resetTimeout}
          onMouseLeave={() => {
            timeoutRef.current = setTimeout(() => {
              setCurrent((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
            }, 5000);
          }}
        >
          {testimonialsData.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{ transform: index === current ? 'scale(1)' : 'scale(0.95)', transition: 'transform 1s ease' }}
            >
              <blockquote className="text-gray-300 text-[10px] xs:text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed italic relative pl-10 pr-10">
                <span
                  className="absolute left-0 top-0 text-[#0c878c] text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl select-none"
                  aria-hidden="true"
                  style={{ fontFamily: "'Times New Roman', serif" }}
                >
                  “
                </span>
                {item.quote}
                <span
                  className="absolute right-0 bottom-[-12] text-[#0c878c] text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl select-none"
                  aria-hidden="true"
                  style={{ fontFamily: "'Times New Roman', serif" }}
                >
                  ”
                </span>
              </blockquote>
              <p className="text-[#0c878c] lg:mt-12 mt-6 text-[10px] lg:text-lg font-bold tracking-wide">{item.author}</p>
            </div>
          ))}
        </div>

        {/* Dots slider */}
        <div className="flex justify-center -mt-20 space-x-3 lg:mt-8">
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-1 h-1 lg:w-3 lg:h-3 cursor-pointer rounded-full transition-all duration-300 ${
                current === idx ? 'bg-[#0c878c] scale-125 shadow-lg' : 'bg-gray-600 hover:bg-[#0a6c70]'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex order-1 lg:none justify-end items-center h-full">
        <img
          src="/Testimonials.png"
          alt="Testimonials"
          className="h-full w-auto object-cover"
          style={{ maxHeight: '100%', maxWidth: '100%' }}
        />
      </div>
    </section>
  );
};

export default Testimonials;