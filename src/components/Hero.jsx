import React, { useState } from 'react';

// Hero component accepts an `onSearch` prop AND an `id` prop
const Hero = ({ id, onSearch }) => {
  const [showPriceOptions, setShowPriceOptions] = useState(false);
  const [showDurationOptions, setShowDurationOptions] = useState(false);

  // State for search inputs
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [location, setLocation] = useState('');

  // Handler for price input changes
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (name === 'minPrice') {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }
  };

  // Handler for duration checkbox changes
  const handleDurationChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedDurations((prev) => [...prev, value]);
    } else {
      setSelectedDurations((prev) => prev.filter((d) => d !== value));
    }
  };

  // Function to clear price inputs
  const handleClearPrice = () => {
    setMinPrice('');
    setMaxPrice('');
    setShowPriceOptions(false);
  };

  // Function to save price (and close dropdown)
  const handleSavePrice = () => {
    setShowPriceOptions(false);
  };

  // Function to clear duration checkboxes
  const handleClearDuration = () => {
    setSelectedDurations([]);
    setShowDurationOptions(false);
  };

  // Function to save duration (and close dropdown)
  const handleSaveDuration = () => {
    setShowDurationOptions(false);
  };

  // Main search handler when "Find a home" is clicked
  const handleFindHome = () => {
    const criteria = {};

    if (minPrice) {
      criteria.minPrice = minPrice;
    }
    if (maxPrice) {
      criteria.maxPrice = maxPrice;
    }

    const durationMap = {
        'Daily': undefined,
        'Monthly': 1,
        'Quarterly': 3,
        'Biannually': 6,
        'Annually': 12,
    };

    if (selectedDurations.length > 0) {
        const firstValidDuration = selectedDurations.find(d => durationMap[d] !== undefined);
        if (firstValidDuration) {
            criteria.duration = durationMap[firstValidDuration];
        }
    }

    if (onSearch) {
      onSearch(criteria);
    }
    setShowPriceOptions(false);
    setShowDurationOptions(false);
  };


  return (
    // Apply the received 'id' prop to the outermost div
    <div id={id} className="relative text-white top-16 sm:top-25 px-4 sm:px-0">
      {/* Badge */}
      <div className="flex flex-col items-center justify-center mt-8 sm:mt-15">
        <span className="bg-[#181A20] px-5 py-1 text-center border border-[#0c878c] font-medium text-xs text-[#0c878c] rounded-full mb-1">
          Introducing Estatify
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="text-center font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight capitalize mt-1">
        The better way to <span className="text-[#0c878c]">Rent</span>
      </h1>

      {/* Subheading */}
      <h2 className="text-center text-base sm:text-lg md:text-xl lg:text-2xl mt-4 px-4 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto text-gray-300">
        Estatify is a complete rental management solution for landlords and tenants in Africa. List an apartment for free, rent an apartment and pay flexibly, verify your tenants and collect rent automatically with our rental management tools.
      </h2>

      {/* Filter Box - ID added here */}
      <div
        id="hero-search-box"
        className="mt-10 sm:mt-20 bg-[#1f2128] rounded-t-lg lg:rounded-full p-4 sm:p-6 shadow-lg
                   max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto
                   flex flex-row items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6"
      >
        {/* Location */}
        <div className="flex-1 border-r border-gray-600 pr-2 sm:pr-4">
          <h3 className="text-[8px] sm:text-xs text-gray-300 font-bold mb-1">LOCATION</h3>
          <p className="text-[6px] sm:text-[10px] lg:text-xs text-gray-400">Where would you love to stay?</p>
          {/* You could add an input here:
          <input
            type="text"
            placeholder="e.g., Lagos"
            className="w-full px-2 py-1 text-xs rounded bg-[#1f2128] focus:outline-none text-white mt-1"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          */}
        </div>

        {/* Price Dropdown */}
        <div className="flex-1 relative border-r border-gray-600 pr-2 sm:pr-4">
          <h3 className="text-[8px] sm:text-xs text-gray-300 font-bold mb-1">PRICE</h3>
          <div
            className="flex items-center text-[6px] sm:text-[10px] lg:text-xs text-gray-400 cursor-pointer whitespace-nowrap"
            onClick={() => setShowPriceOptions(!showPriceOptions)}
          >
            <span>{minPrice || maxPrice ? `₦${minPrice} - ₦${maxPrice}` : 'Choose a price range'}</span>
            <span className="ml-1 sm:ml-4 text-[6px] sm:text-[8px] text-[#0c878c]">
              {showPriceOptions ? '▲' : '▼'}
            </span>
          </div>

          {showPriceOptions && (
            <div className="absolute left-0 w-full sm:w-30 bg-[#2a2d35] py-3 px-2 sm:px-4 rounded-lg z-10 text-sm shadow-lg mt-6"> {/* Reduced px-2 for smallest screens */}
              <div className="flex flex-col gap-2 mb-2">
                <input
                  type="number"
                  placeholder="From"
                  name="minPrice"
                  value={minPrice}
                  onChange={handlePriceChange}
                  className="w-full px-2 py-1 text-xs rounded bg-[#1f2128] focus:outline-none text-white"
                />
                <input
                  type="number"
                  placeholder="To"
                  name="maxPrice"
                  value={maxPrice}
                  onChange={handlePriceChange}
                  className="w-full px-2 py-1 text-xs rounded bg-[#1f2128] focus:outline-none text-white"
                />
              </div>
              <div className="flex justify-end gap-1 sm:gap-2"> {/* Reduced gap-1 for smallest screens */}
                <button
                    onClick={handleClearPrice}
                    className="text-[9px] lg:text-[11px] md:text-[11px] sm:text-[11px] xs:text-[11px] px-2 sm:px-2 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition" // Reduced px-1 for smallest screens
                >
                  Clear
                </button>
                <button
                    onClick={handleSavePrice}
                    className="text-[9px] lg:text-[11px] md:text-[11px] sm:text-[11px] xs:text-[11px] px-2 sm:px-2 py-1 bg-[#0c878c] text-white rounded hover:opacity-80 transition" // Reduced px-1 for smallest screens
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Duration Dropdown */}
        <div className="flex-1 relative">
          <h3 className="text-[8px] sm:text-xs text-gray-300 font-bold mb-1">DURATION</h3>
          <div
            className="flex items-center text-[6px] sm:text-[10px] lg:text-xs text-gray-400 cursor-pointer whitespace-nowrap"
            onClick={() => setShowDurationOptions(!showDurationOptions)}
          >
            <span>{selectedDurations.length > 0 ? selectedDurations.join(', ') : 'Select duration'}</span>
            <span className="ml-1 sm:ml-4 text-[6px] sm:text-[8px] text-[#0c878c]">
              {showDurationOptions ? '▲' : '▼'}
            </span>
          </div>

          {showDurationOptions && (
            <div className="absolute left-0 w-full sm:w-30 bg-[#2a2d35] py-3 px-2 sm:px-4 rounded-lg z-10 text-sm shadow-lg mt-6"> {/* Reduced px-2 for smallest screens */}
              <div className="flex flex-col gap-2 text-[7px] lg:text-[11px] md:text-[11px] xs:text-[11px] sm:text-[11px]">
                {['Daily', 'Monthly', 'Quarterly', 'Biannually', 'Annually'].map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={option}
                      checked={selectedDurations.includes(option)}
                      onChange={handleDurationChange}
                      className="form-checkbox h-3 w-3 text-[#0c878c]"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-1 sm:gap-2"> {/* Reduced gap-1 for smallest screens */}
                <button
                    onClick={handleClearDuration}
                    className="text-[7px] lg:text-[11px] md:text-[11px] sm:text-[11px] xs:text-[9px] px-1 sm:px-2 xs:px-2 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition mt-2" // Reduced px-1 for smallest screens
                >
                  Clear
                </button>
                <button
                    onClick={handleSaveDuration}
                    className="text-[7px] lg:text-[11px] md:text-[11px] sm:text-[11px] xs:text-[9px] px-1 sm:px-2 xs:px-2 py-1 bg-[#0c878c] text-white rounded hover:opacity-80 transition mt-2" // Reduced px-1 for smallest screens
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Find a Home Button */}
        <div className="flex-none">
          <button
            onClick={handleFindHome}
            className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-[#0c878c] hover:bg-white hover:text-[#0c878c] text-white rounded-full text-[6px] sm:text-xs lg:text-sm font-semibold hover:scale-105 transition whitespace-nowrap cursor-pointer"
          >
            Find a home
          </button>
        </div>
      </div>

      {/* Full-width Image below everything */}
      <div
        className="w-full mt-10 sm:mt-20 overflow-hidden"
        style={{ height: 'auto', minHeight: '300px' }}
      >
        <img
          src="/armchair-green-living-room-with-copy-space.jpg"
          alt="Decorative living room"
          className="w-full object-cover h-[300px] sm:h-[400px] md:h-[500px] lg:h-[750px]"
          style={{
            marginTop: '-50px',
          }}
        />
      </div>
    </div>
  );
};

export default Hero;