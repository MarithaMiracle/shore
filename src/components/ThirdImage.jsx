import React from 'react';

const ThirdImage = () => {
  return (
    <div
      className="w-full mt-20 overflow-hidden"
      style={{ height: 'auto', minHeight: '700px' }}
    >
      <img
        src="/last.svg"
        alt="Decorative living room"
        className="w-full object-cover 
                   h-[700px] sm:h-[700px] md:h-[700px] lg:h-[990px] xl:h-[990px]"
        style={{
          marginTop: '-300px', // crop top by moving image up
        }}
      />
    </div>
  );
};

export default ThirdImage;
