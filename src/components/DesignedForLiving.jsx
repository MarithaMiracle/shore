import React from 'react';

const DesignedForLiving = () => {
  return (
    
    <div className="px-4 py-8"> 
      <h1 className='text-center font-semibold lg:text-xl text-[#0c878c] leading-tight mt-20 lg:mt-50 md:mt-50 sm:mt-50'>
        DESIGNED FOR LIVING
        <p className='text-center text-lg lg:text-4xl md:text-3xl mt-4 px-4 mx-auto text-gray-300 max-w-s'>
          Easy-to-use tools for landlords and tenants
        </p>
      </h1>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 2xl:mt-32"> 

        {/* Image Box */}
        <div className="bg-black border border-[#0c878c] rounded-3xl overflow-hidden shadow-lg
                    w-full mx-auto xs:max-w-xs max-w-md h-64 sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] flex flex-col">
          <img
            src="/use this.png"
            alt="First image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default DesignedForLiving;