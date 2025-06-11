import React, { useState, useEffect, useRef } from 'react';

const amenityIcons = {
    "1 Bedroom": '/icons8-house-64.png',
    "2 Bedrooms": '/icons8-house-64.png',
    "3 Bedrooms": '/icons8-house-64.png',
    "4 Bedroom Duplex": '/icons8-house-64.png',
    "Studio Apartment": '/icons8-house-64.png',
    "Free Wi-Fi": '/icons8-wifi-100.png',
    "Air Conditioning": '/icons8-air-conditioner-64.png',
    "Equipped Kitchen": '/icons8-kitchen-50.png',
    "Parking Space": '/icons8-parking-64.png',
    "Swimming Pool": '/icons8-lap-pool-100.png',
    "Gym Facility": '/icons8-gym-100.png',
    "24/7 Security": '/icons8-security-shield-64.png',
    "Private Balcony": '/icons8-balcony-100.png',
    "Garden Area": '/icons8-trees-64.png',
    "High-Speed Internet": '/icons8-wifi-100.png',
    "Laundry Services": '/icons8-washing-machine-64.png',
    "Garage Parking": '/icons8-parking-64.png',
    "default": '/icons8-house-64.png',
};

const Listings = ({ searchCriteria, id }) => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryString = new URLSearchParams(searchCriteria).toString();
      const response = await fetch(`https://estatify-gc8a.onrender.com/api/properties?${queryString}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setProperties(result.data);
    } catch (err) {
      console.error("Failed to fetch properties:", err);
      setError("Failed to load properties. Please try again later.");
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [searchCriteria]);

  useEffect(() => {
    resetTimeout();
    if (properties.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setCurrent((prevIndex) => (prevIndex === properties.length - 1 ? 0 : prevIndex + 1));
      }, 6000);
    } else {
      setCurrent(0);
    }
    return () => resetTimeout();
  }, [current, properties]);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  if (loading) {
    return (
      // Increased top margin for loading state to provide ample space on all devices, especially Surface Duo
      <section id={id} className="bg-black py-20 px-6 lg:mt-[350px] mt-20 text-center text-gray-300">
        <p>Loading properties...</p>
      </section>
    );
  }

  if (error) {
    return (
      // Increased top margin for error state to provide ample space on all devices, especially Surface Duo
      <section id={id} className="bg-black py-20 px-6 lg:mt-[350px] mt-20 text-center text-red-500">
        <p>{error}</p>
      </section>
    );
  }

  if (properties.length === 0) {
    return (
      // Increased top margin for no properties found state to provide ample space on all devices, especially Surface Duo
      <section id={id} className="bg-black py-20 px-6 lg:mt-[350px] mt-20 text-center text-gray-300">
        <p>No properties found matching your criteria.</p>
      </section>
    );
  }

  return (
    // Main section with responsive padding and significantly increased top margin.
    // The `mt-[550px]` ensures a very large buffer for smaller screens (like Surface Duo),
    // and `lg:mt-[150px]` provides sufficient space for larger desktops.
    <section id={id} className="bg-black py-20 px-6 mt-[550px] xs:mt-[500px] sm:mt-[550px] md:mt-[750px] lg:mt-[150px] xl:mt-[200px]">
      {/* Top Text - maintain horizontal flex */}
      <div className="flex flex-col md:flex-col lg:flex-row justify-between items-start lg:max-w-7xl mx-auto mb-10 lg:mb-16 px-2 sm:px-4 md:px-6">
  {/* Left Text */}
  <div className="order-2 lg:order-none text-left w-full lg:w-[150px] xl:w-[150px] lg:mt-10 mt-5">
    <p className="text-gray-300 w-full xl:w-100 lg:w-130 md:w-100 sm:w-[180px] xs:w-[150px] text-xs sm:text-sm md:text-base lg:text-md xl:text-md">
      Estatify-managed apartments are move-in ready. When you subscribe, you enjoy more benefits than you can imagine, from cozy bedrooms to fully equipped kitchens, free high-speed Wi-Fi, modern air conditioning, and secure parking spaces. Plus, access to amenities like swimming pools, gym facilities, private balconies and gardens, 24/7 security, and convenient laundry services, all designed for your comfort and convenience.
    </p>
  </div>

  {/* Right Text */}
  <div className="order-1 lg:order-none text-right self-end max-w-4xl px-1 sm:px-2 md:px-4 -mt-10">
    <h1 className="font-semibold text-[#0c878c] leading-tight text-lg xs:text-lg sm:text-lg md:text-lg lg:text-xl xl:text-xl">
      LISTINGS
    </h1>
    <p className="text-gray-300 text-lg xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl lg:mt-4 mt-1">
      Find Your Perfect Stay <br />With Estatify
    </p>
  </div>
</div>


      {/* Carousel + Description */}
      <div className="lg:max-w-7xl max-w-full mx-auto lg:flex grid grid-cols-1 space-x-4 md:space-x-8 lg:space-x-10 items-center relative
                      px-2 sm:px-4 md:px-6">

        {/* Left - Carousel Images */}
        <div className="flex-1 relative
                        w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] xl:w-[400px]
                        h-[200px] sm:h-[220px] md:h-[250px] lg:h-[280px] xl:h-[280px]
                        overflow-hidden rounded-lg shadow-lg">
          {properties.map((item, index) => (
            <img
              key={item._id}
              src={item.images[0]}
              alt={`Rental ${item.title}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />
          ))}
        </div>

        {/* Right - Horizontal Sliding Description */}
        <div className="flex-1 max-w-3xl overflow-hidden px-2 sm:px-4 md:px-6">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {properties.map((item) => (
              <div key={item._id} className="flex-shrink-0 w-full px-2 sm:px-4 md:px-6">
                <p className="text-[#0c878c] font-semibold lg:mb-4 mb-1 w-full
                              text-sm xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl mt-5">
                  From ₦{item.price.toLocaleString()} monthly
                </p>
                <h3 className="text-white font-bold lg:mb-2 mb-1
                              text-sm xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs xs:text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm lg:mb-4 mb-2">
                  {item.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
                  {[item.title, ...item.amenities].map((amenity, idx) => (
                    <div key={idx} className="flex space-x-3 items-start text-left">
                      <img
                        src={amenityIcons[amenity] || amenityIcons.default}
                        alt={amenity}
                        className="w-5 h-5 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
                      />
                      <div>
                        <h3 className="text-white font-bold text-sm xs:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base">
                          {amenity}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        <div
          className="absolute lg:bottom-[-80px] bottom-[-40px] left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 cursor-pointer"
          style={{ width: 'fit-content' }}
        >
          {properties.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`rounded-full transition-all duration-300
                          w-2 h-2 sm:w-3 sm:h-3 lg:w-3 lg:h-3
                          ${current === idx ? 'bg-[#0c878c] scale-125 shadow-lg' : 'bg-gray-600 hover:bg-[#0a6c70]'}`}
              aria-label={`Go to listing ${idx + 1}`}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Listings;
