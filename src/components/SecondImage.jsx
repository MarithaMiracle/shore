import React from 'react'

const SecondImage = () => {
  return (
    <div
      className="w-full mt-10 sm:mt-20 overflow-hidden"
      style={{ height: 'auto', minHeight: '300px' }}
    >
      <img
        src="/modern-cozy-living-room-interior-with-brown-wall-stylish-furniture.jpg"
        alt="Decorative living room"
        className="w-full object-cover 
                   h-[300px] sm:h-[400px] md:h-[500px] lg:h-[750px] xl:h-[900px]"
        style={{
          marginTop: '-80px',     // crop top of the image
        }}
      />
    </div>
  )
}

export default SecondImage
