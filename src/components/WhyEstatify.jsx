import React from 'react'

// Modify the component to accept 'id' as a prop
const WhyEstatify = ({ id }) => { 
  return (
    // Apply the received 'id' prop to the section element
    <section id={id} className="bg-black lg:mt-20 py-20 px-6">
      <div className="flex flex-col lg:flex-row justify-between items-start max-w-7xl mx-auto mb-16">
        {/* Left Text */}
        <div className="order-2 lg:order-none lg:text-left sm:max-w-xs lg:max-w-md">
          <p className="text-sm text-center lg:text-left max-w-full lg:max-w-xl xs:text-sm sm:text-base md:text-lg lg:text-xl lg:mt-10 mt-3 text-gray-300">
            We offer you access to premium residential solutions, with as little as possible. Filter by price, location, apartment type, and duration to find your next home.
          </p>
        </div>

        {/* Right Text */}
        <div className="text-right self-end max-w-5xl">
          <h1 className="order-1 lg:order-none text-right -mt-10 lg:text-right font-semibold text-lg xs:text-lg sm:text-lg md:text-lg lg:text-xl text-[#0c878c] leading-tight">
            WHY ESTATIFY?
          </h1>
          <p className="text-lg xs:text-lg sm:text-xl md:text-2xl lg:text-4xl lg:mt-4 mt-2 text-gray-300">
          Quality apartments <br className='text-left'/>Trusted by millions of renters
          </p>
        </div>
      </div>

      {/* Icon Grid */}
      <div className="grid grid-cols-1 lg:flex justify-between items-start -mt-5 lg:mt-40 max-w-3xl xs:max-w-4xl sm:max-w-5xl md:max-w-6xl lg:max-w-7xl mx-auto lg:gap-x-4 gap-x-10 sm:space-x-6 lg:space-x-20 text-center">
        {/* Icon Box 1 */}
        <div className="flex-1">
          <img src="/Fully furnished.svg" alt="Home" className="w-12 h-12 xs:w-12 xs:h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto lg:mb-4 mb-2" />
          <h3 className="text-md xs:text-md sm:text-md md:text-base lg:text-xl font-bold text-white">Fully Furnished Apartments</h3>
          <p className="text-gray-400 text-sm xs:text-sm sm:text-sm md:text-sm lg:text-sm lg:mt-2 lg:mb-5 mb-5">Find fully furnished apartments suited to the duration of your stay, a few months or a couple of years</p>
        </div>

        {/* Icon Box 2 */}
        <div className="flex-1">
          <img src="/Flexible payments.svg" alt="Location" className="w-12 h-12 xs:w-12 xs:h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto lg:mb-4 mb-2" />
          <h3 className="text-md xs:text-md sm:text-md md:text-base lg:text-xl font-bold text-white">Flexible Payment</h3>
          <p className="text-gray-400 text-sm xs:text-sm sm:text-sm md:text-sm lg:text-sm lg:mt-2 mb-5">Estatify offers monthly, quarterly or annual payment terms to fit your unique schedule</p>
        </div>

        {/* Icon Box 3 */}
        <div className="flex-1">
          <img src="/Co-sharing.svg" alt="Flexible" className="w-12 h-12 xs:w-12 xs:h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto lg:mb-4 mb-2" />
          <h3 className="text-md xs:text-md sm:text-md md:text-base lg:text-xl font-bold text-white">Co-sharing Option</h3>
          <p className="text-gray-400 text-sm xs:text-sm sm:text-sm md:text-sm lg:text-sm lg:mt-2 lg:mb-5 mb-5">Choose between having the space to yourself or flat-sharing with verified housemates</p>
        </div>

        {/* Icon Box 4 */}
        <div className="flex-1">
          <img src="/No hidden charges.svg" alt="Support" className="w-12 h-12 xs:w-12 xs:h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mx-auto lg:mb-4 mb-2" />
          <h3 className="text-md xs:text-md sm:text-md md:text-base lg:text-xl font-bold text-white">No Hidden Charges</h3>
          <p className="text-gray-400 text-sm xs:text-sm sm:text-sm md:text-sm lg:text-sm lg:mt-2">For homes at Estatify, there are no extra hidden charges. No viewing or inspection fees. Pay once, pay all.</p>
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