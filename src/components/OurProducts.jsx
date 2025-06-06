import React from 'react';

const OurProducts = ({ id }) => {
  return (
    <section id={id} className="bg-black py-10 px-6 mt-10">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl text-[#0c878c] leading-tight mb-6">
          OUR PRODUCTS
        </h1>
        <p className="text-sm sm:text-base md:text-xl lg:text-3xl text-gray-300">
          Are you looking to rent or lease an apartment? <br />
          We’ve got you covered
        </p>

        <div className="flex flex-col sm:flex-row gap-6 lg:gap-12 justify-center items-stretch mt-10">
          {/* Product Box 1 */}
          <div className="flex flex-col bg-black border border-gray-800 rounded-3xl overflow-hidden shadow-lg flex-1 min-h-[320px]">
            <div className="w-full h-[40vw] sm:h-[250px] md:h-[300px] lg:h-[320px] xl:h-[340px]">
              <img
                src="/interior-decor-furniture-inspired-by-fruits-vegetables.jpg"
                alt="Marketplace"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-white flex flex-col justify-between flex-grow">
              <h3 className="text-base sm:text-lg lg:text-2xl font-semibold mb-4 flex items-center gap-2">
                <img
                  src="/marketplace.svg"
                  alt="Store Icon"
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8"
                />
                Marketplace
              </h3>
              <p className="text-xs sm:text-sm md:text-base">
                Find an apartment in Nigeria and pay monthly, quarterly or annually. No inspection, agency or legal fees required. Browse from our carefully curated listings, choose a space, pay and move in.
              </p>
            </div>
          </div>

          {/* Product Box 2 */}
          <div className="flex flex-col bg-black border border-gray-800 rounded-3xl overflow-hidden shadow-lg flex-1 min-h-[320px]">
            <div className="w-full h-[40vw] sm:h-[250px] md:h-[300px] lg:h-[320px] xl:h-[340px]">
              <img
                src="/medium-shot-smiley-woman-inside.jpg"
                alt="Pay Later"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-white flex flex-col justify-between flex-grow">
              <h3 className="text-base sm:text-lg lg:text-2xl font-semibold mb-4 flex items-center gap-2">
                <img
                  src="/pay later.svg"
                  alt="Pay Later Icon"
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8"
                />
                Rent Now, Pay Later
              </h3>
              <p className="text-xs sm:text-sm md:text-base">
                Estatify’s Rent Now Pay Later gives you access to low interest, no collateral loans up to N3,000,000 to finance rent payments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
