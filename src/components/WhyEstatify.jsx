import React from 'react'

// Modify the component to accept 'id' as a prop
const WhyEstatify = ({ id }) => { 
  return (
    // Apply the received 'id' prop to the section element
    <section id={id} className="bg-black py-20 px-6">
      <div className="flex justify-between items-start max-w-7xl mx-auto mb-16">
        {/* Left Text */}
        <div className="text-left max-w-[10rem] sm:max-w-xs lg:max-w-md">
          <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl mt-10 text-gray-300">
            We offer you access to premium residential solutions, with as little as possible. Filter by price, location, apartment type, and duration to find your next home.
          </p>
        </div>

        {/* Right Text */}
        <div className="text-right max-w-4xl">
          <h1 className="font-semibold text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-[#0c878c] leading-tight">
            WHY ESTATIFY?
          </h1>
          <p className="text-sm xs:text-lg sm:text-xl md:text-2xl lg:text-4xl mt-4 text-gray-300">
          Quality apartments <br />Trusted by millions of renters
          </p>
        </div>
      </div>

      {/* Icon Grid */}
      <div className="flex justify-between items-start mt-20 lg:mt-40 max-w-3xl xs:max-w-4xl sm:max-w-5xl md:max-w-6xl lg:max-w-7xl mx-auto space-x-4 sm:space-x-6 lg:space-x-20 text-center">
        {/* Icon Box 1 */}
        <div className="flex-1">
          <img src="/Fully furnished.svg" alt="Home" className="w-4 h-4 xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-4" />
          <h3 className="text-[6px] xs:text-[8px] sm:text-[10px] md:text-base lg:text-xl font-bold text-white">Fully Furnished Apartments</h3>
          <p className="text-gray-400 text-[4px] xs:text-[6px] sm:text-[8px] md:text-xs lg:text-sm mt-2">Find fully furnished apartments suited to the duration of your stay, a few months or a couple of years</p>
        </div>

        {/* Icon Box 2 */}
        <div className="flex-1">
          <img src="/Flexible payments.svg" alt="Location" className="w-4 h-4 xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-4" />
          <h3 className="text-[6px] xs:text-[8px] sm:text-[10px] md:text-base lg:text-xl font-bold text-white">Flexible Payment</h3>
          <p className="text-gray-400 text-[4px] xs:text-[6px] sm:text-[8px] md:text-xs lg:text-sm mt-2">Estatify offers monthly, quarterly or annual payment terms to fit your unique schedule</p>
        </div>

        {/* Icon Box 3 */}
        <div className="flex-1">
          <img src="/Co-sharing.svg" alt="Flexible" className="w-4 h-4 xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-4" />
          <h3 className="text-[6px] xs:text-[8px] sm:text-[10px] md:text-base lg:text-xl font-bold text-white">Co-sharing Option</h3>
          <p className="text-gray-400 text-[4px] xs:text-[6px] sm:text-[8px] md:text-xs lg:text-sm mt-2">Choose between having the space to yourself or flat-sharing with verified housemates</p>
        </div>

        {/* Icon Box 4 */}
        <div className="flex-1">
          <img src="/No hidden charges.svg" alt="Support" className="w-4 h-4 xs:w-6 xs:h-6 sm:w-8 sm:h-8 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto mb-4" />
          <h3 className="text-[6px] xs:text-[8px] sm:text-[10px] md:text-base lg:text-xl font-bold text-white">No Hidden Charges</h3>
          <p className="text-gray-400 text-[4px] xs:text-[6px] sm:text-[8px] md:text-xs lg:text-sm mt-2">For homes at Estatify, there are no extra hidden charges. No viewing or inspection fees. Pay once, pay all.</p>
        </div>
      </div>

      <style>
    {`
      details[open] > summary {
        color: #0c878c;
      }
    `}
    </style>

    <div>
    </div>
    </section>
  )
}

export default WhyEstatify