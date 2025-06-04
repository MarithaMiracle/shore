import React from 'react'


// Accept the 'id' prop here
const OurProducts = ({ id }) => { 
  return (
    // Apply the 'id' prop to the outermost section
    <section id={id} className='bg-black py-20 px-6 mt-10'>
      <h1 className='ml-5 lg:ml-20 font-semibold text-sm lg:text-xl text-[#0c878c] leading-tight'>OUR PRODUCTS
        <p className='mr-40 text-sm xs:text-base sm:text-xl lg:text-4xl mt-4 text-gray-300'>Are you looking to rent or lease an apartment? <br />We’ve got you covered</p>
      </h1>
      <div className="flex sm:flex-row flex-row gap-4 lg:gap-20 justify-center items-start mt-10 px-4">
        {/* Box 1 */}
        <div className="bg-black border border-gray-800 rounded-3xl overflow-hidden shadow-lg
                w-full max-w-xs lg:max-w-sm h-[200px] xs:h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] flex flex-col">

          <div className="h-1/2">
            <img
              src="/interior-decor-furniture-inspired-by-fruits-vegetables.jpg"
              alt="Image 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-1/2 p-4 text-white text-[7px] xs:text-[8px] md:text-sm lg:text-base flex flex-col justify-center">
            <h3 className="text-[10px] xs:text-sm md:text-lg lg:text-2xl font-semibold mt-0 mb-2 lg:mb-10 flex items-center gap-2">
              <img src="/marketplace.svg" alt="Store" className="w-4 h-4 md:w-6 md:h-6 lg:w-10 lg:h-10" />
              Marketplace
            </h3>
            <p>
            Find an apartment in Nigeria and pay monthly, quarterly or annually. No inspection, agency or legal fees required. Browse from our carefully curated listings, choose a space, pay and move in.
            </p>
          </div>
        </div>

        {/* Box 2 */}
        <div className="bg-black border border-gray-800 rounded-3xl overflow-hidden shadow-lg
                w-full max-w-xs lg:max-w-sm h-[200px] xs:h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] flex flex-col">

          <div className="h-1/2">
            <img
              src="/medium-shot-smiley-woman-inside.jpg"
              alt="Image 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-1/2 p-4 text-white text-[7px] xs:text-[8px] md:text-sm lg:text-base flex flex-col justify-center">
            <h3 className="text-[10px] xs:text-sm md:text-lg lg:text-2xl font-semibold mt-0 mb-6 xs:mb-4 lg:mb-10 flex items-center gap-2">
              <img src="/pay later.svg" alt="Market" className="w-4 h-4 md:w-6 md:h-6 lg:w-10 lg:h-10" />
              Rent Now, Pay Later
            </h3>
            <p>
            Estatify’s Rent Now Pay Later gives you access to low interest, no collateral loans up to N3,000,000 to finance rent payments.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurProducts