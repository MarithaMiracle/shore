import React, { useState } from 'react';
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";


const Hero = () => {
  const [showPriceOptions, setShowPriceOptions] = useState(false);
  const [showDurationOptions, setShowDurationOptions] = useState(false);

  return (
    <div className="relative text-white">
      {/* Badge */}
      <div className="flex flex-col items-center justify-center mt-15">
        <span className="bg-[#181A20] px-5 py-1 text-center border border-[#0c878c] font-medium text-xs text-[#0c878c] rounded-full mb-1">
          Introducing Estatify
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="text-center font-semibold text-7xl leading-tight capitalize mt-1">
        The better way to <span className="text-[#0c878c]">Rent</span>
      </h1>

      {/* Subheading */}
      <h2 className="text-center text-2xl mt-4 px-4 max-w-4xl mx-auto text-gray-300">
        Estatify is a complete rental management solution for landlords and tenants in Africa. List an apartment for free, rent an apartment and pay flexibly, verify your tenants and collect rent automatically with our rental management tools.
      </h2>

      {/* Filter Box */}
      <div className="mt-20 bg-[#1f2128] rounded-full p-6 shadow-lg max-w-4xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4 px-6">
        {/* Location */}
        <div className="flex-1 min-w-[120px] border-r border-gray-600 pr-4 last:border-r-0">
          <h3 className="text-xs text-gray-300 font-bold mb-1">LOCATION</h3>
          <p className="text-xs text-gray-400">Where would you love to stay?</p>
        </div>

        {/* Price Dropdown */}
        <div className="flex-1 relative min-w-[120px] border-r border-gray-600 pr-4 last:border-r-0">
          <h3 className="text-xs text-gray-300 font-bold mb-1">PRICE</h3>
          <div
            className="flex items-center text-xs text-gray-400 cursor-pointer"
            onClick={() => setShowPriceOptions(!showPriceOptions)}
          >
            <span>Choose a price range</span>
            <span className="ml-4 mt-1 text-[8px] text-[#0c878c]">
              {showPriceOptions ? '▲' : '▼'}
            </span>
          </div>

          {showPriceOptions && (
            <div className="absolute left-0 w-30 bg-[#2a2d35] mt-2 py-3 px-4 rounded-lg z-10 text-sm shadow-lg mt-6">
              <div className="flex flex-col gap-2 mb-2 -ml-1">
                <input
                  type="number"
                  placeholder="From"
                  className="w-full px-2 py-1 text-xs rounded bg-[#1f2128] focus:outline-none text-white"
                />
                <input
                  type="number"
                  placeholder="To"
                  className="w-full px-2 py-1 text-xs rounded bg-[#1f2128] focus:outline-none text-white"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button className="text-xs px-2 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition">
                  Clear
                </button>
                <button className="text-xs px-2 py-1 bg-[#0c878c] text-white rounded hover:opacity-80 transition">
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Duration Dropdown */}
        <div className="flex-1 relative min-w-[120px]">
          <h3 className="text-xs text-gray-300 font-bold mb-1">DURATION</h3>
          <div
            className="flex items-center text-xs text-gray-400 cursor-pointer"
            onClick={() => setShowDurationOptions(!showDurationOptions)}
          >
            <span>Select duration</span>
            <span className="ml-4 mt-1 text-[8px] text-[#0c878c]">
              {showDurationOptions ? '▲' : '▼'}
            </span>
          </div>

          {showDurationOptions && (
            <div className="absolute left-0 w-30 bg-[#2a2d35] mt-2 py-3 px-4 rounded-lg z-10 text-sm shadow-lg mt-6">
              <div className="flex flex-col gap-2 text-xs">
                {['Daily', 'Monthly', 'Quarterly', 'Biannually', 'Annually'].map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox h-3 w-3 text-[#0c878c]" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-2 mt-3">
                <button className="text-xs px-2 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition">
                  Clear
                </button>
                <button className="text-xs px-2 py-1 bg-[#0c878c] text-white rounded hover:opacity-80 transition">
                  Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Find a Home Button */}
        <div className="flex-none">
          <button className="w-full sm:w-auto px-4 py-2 bg-[#0c878c] text-white rounded-full text-sm font-semibold hover:scale-105 transition whitespace-nowrap">
            Find a home
          </button>
        </div>
      </div>

      {/* Full-width Image below everything */}
      <div
  className="w-full mt-20 overflow-hidden"
  style={{ height: '750px' }} // total visible height (image height - crop top - crop bottom)
>
  <img
    src="/armchair-green-living-room-with-copy-space.jpg"
    alt="Decorative living room"
    className="w-full object-cover"
    style={{
      height: '750px',      // image height (container height + cropped top + cropped bottom)
      marginTop: '-150px',   // crop top by moving image up
    }}
  />
</div>
<div>
  <h1 className='text-center font-semibold text-xl text-[#0c878c] leading-tight mt-1'>DESIGNED FOR LIVING
  <p className='text-center text-4xl mt-4 px-4 mx-auto text-gray-300'>Easy-to-use tools for landlords and tenants</p>
</h1>
<div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-15">
  {/* Image Box 1 */}
  <div className="bg-black border border-[#0c878c] rounded-3xl overflow-hidden shadow-lg max-w-4xl w-full h-[600px] flex flex-col">
  <img
    src="/use this.png"
    alt="First image"
    className="w-full h-full object-cover"
  />
</div>



</div>
<section className='bg-black py-20 px-6 mt-30'>
<h1 className='ml-20 font-semibold text-xl text-[#0c878c] leading-tight'>OUR PRODUCTS
  <p className='mr-40 text-4xl mt-4 text-gray-300'>Are you looking to rent or lease an apartment? <br />We’ve got you covered</p>
</h1>
<div className="flex flex-col sm:flex-row gap-20 justify-center items-start mt-10 px-4">
  {/* Box 1 */}
  <div className="bg-black border border-gray-800 rounded-3xl overflow-hidden shadow-lg max-w-sm w-full h-[500px] flex flex-col">
    <div className="h-1/2">
      <img
        src="/interior-decor-furniture-inspired-by-fruits-vegetables.jpg"
        alt="Image 1"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="h-1/2 p-4 text-white text-md flex flex-col justify-center">
      <h3 className="text-2xl font-semibold mt-0 mb-10 flex items-center gap-2">
        <img src="/marketplace.svg" alt="Store" className="w-10 h-10" />
        Marketplace
      </h3>
      <p>
      Find an apartment in Nigeria and pay monthly, quarterly or annually. No inspection, agency or legal fees required. Browse from our carefully curated listings, choose a space, pay and move in.
      </p>
    </div>
  </div>

  {/* Box 2 */}
  <div className="bg-black border border-gray-800 rounded-3xl overflow-hidden shadow-lg max-w-sm w-full h-[500px] flex flex-col">
    <div className="h-1/2">
      <img
        src="/medium-shot-smiley-woman-inside.jpg"
        alt="Image 2"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="h-1/2 p-4 text-white text-md flex flex-col justify-center">
      <h3 className="text-2xl font-semibold mt-0 mb-10 flex items-center gap-2">
        <img src="/pay later.svg" alt="Market" className="w-10 h-10" />
        Rent Now, Pay Later
      </h3>
      <p>
      Estatify’s Rent Now Pay Later gives you access to low interest, no collateral loans up to N3,000,000 to finance rent payments.
      </p>
    </div>
  </div>
</div>


</section>

{/* Full-width Image below everything */}
<div
  className="w-full mt-20 overflow-hidden"
  style={{ height: '700px' }} // total visible height (image height - crop top - crop bottom)
>
  <img
    src="/modern-cozy-living-room-interior-with-brown-wall-stylish-furniture.jpg"
    alt="Decorative living room"
    className="w-full object-cover"
    style={{
      height: '990px',      // image height (container height + cropped top + cropped bottom)
      marginTop: '-400px',   // crop top by moving image up
    }}
  />
</div>

<section className="bg-black py-20 px-6">
  <div className="flex justify-between items-start max-w-7xl mx-auto mb-16">
    {/* Left Text */}
    <div className="text-left max-w-md">
      <p className="text-xl mt-10 text-gray-300">
        We offer you access to premium residential solutions, with as little as possible. Filter by price, location, apartment type, and duration to find your next home.
      </p>
    </div>

    {/* Right Text */}
    <div className="text-right max-w-4xl">
      <h1 className="font-semibold text-xl text-[#0c878c] leading-tight">
        WHY ESTATIFY?
      </h1>
      <p className="text-4xl mt-4 text-gray-300">
      Quality apartments <br />Trusted by millions of renters
      </p>
    </div>
  </div>

  {/* Icon Grid */}
  <div className="flex justify-between items-start mt-40 max-w-7xl mx-auto space-x-20 text-center">
    {/* Icon Box 1 */}
    <div className="flex-1">
      <img src="/Fully furnished.svg" alt="Home" className="w-16 h-16 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-white">Fully Furnished Apartments</h3>
      <p className="text-gray-400 text-sm mt-2">Find fully furnished apartments suited to the duration of your stay, a few months or a couple of years</p>
    </div>

    {/* Icon Box 2 */}
    <div className="flex-1">
      <img src="/Flexible payments.svg" alt="Location" className="w-16 h-16 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-white">Flexible Payment</h3>
      <p className="text-gray-400 text-sm mt-2">Estatify offers monthly, quarterly or annual payment terms to fit your unique schedule</p>
    </div>

    {/* Icon Box 3 */}
    <div className="flex-1">
      <img src="/Co-sharing.svg" alt="Flexible" className="w-16 h-16 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-white">Co-sharing Option</h3>
      <p className="text-gray-400 text-sm mt-2">Choose between having the space to yourself or flat-sharing with verified housemates</p>
    </div>

    {/* Icon Box 4 */}
    <div className="flex-1">
      <img src="/No hidden charges.svg" alt="Support" className="w-16 h-16 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-white">No Hidden Charges</h3>
      <p className="text-gray-400 text-sm mt-2">For homes at Estatify, there are no extra hidden charges. No viewing or inspection fees. Pay once, pay all.</p>
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

<section className="bg-black py-20 px-6 mt-30">
  {/* Heading & Subheading */}
  <h1 className="ml-20 font-semibold text-xl text-[#0c878c] leading-tight">
    COMMON QUESTIONS
    <p className="mr-40 text-4xl mt-4 text-gray-300">Frequently asked questions</p>
  </h1>

  {/* Small Description Below the Texts */}
  <p className="mt-4 ml-20 text-md text-gray-400 max-w-xl">
    Get quick answers to all your questions and concerns about Estatify and Estatify homes. Whether as a member, host or just a visitor, we will have an answer waiting for you.
  </p>

  {/* Accordion Section (stretched right with equal margin) */}
  <div className="mt-10 ml-20 mr-20 space-y-4">
    {/* Question 1 */}
    <details className="border-b border-gray-700">
      <summary className="cursor-pointer flex justify-between items-center text-lg font-medium hover:text-[#0c878c] pb-6">
        How does Estatify work?
        <span className="text-[#0c878c] text-2xl">⌄</span>
      </summary>
      <p className="mt-2 text-sm text-gray-400">
        At Estatify, we offer access to premium residential solutions with options of monthly, quarterly, and biannual subscription. Once you find a space you like, simply create a booking along with a few details about yourself. This request is then processed within a few hours.
        <p className="mt-4 pb-6">
          No payment is taken until the booking is accepted. We will charge you the rent upfront plus a one-off booking fee and security deposit. You will then receive a confirmation email with the details of your new space.
        </p>
      </p>
    </details>

    {/* Question 2 */}
    <details className="border-b border-gray-700">
      <summary className="cursor-pointer flex justify-between items-center text-lg font-medium hover:text-[#0c878c] pb-6">
        Does Estatify organize viewings?
        <span className="text-[#0c878c] text-2xl">⌄</span>
      </summary>
      <p className="mt-2 text-sm text-gray-400 pb-6">
        Yes, we do.
      </p>
    </details>

    {/* Question 3 */}
    <details className="border-b border-gray-700">
      <summary className="cursor-pointer flex justify-between items-center text-lg font-medium hover:text-[#0c878c] pb-6">
        Does Estatify own the spaces listed?
        <span className="text-[#0c878c] text-2xl">⌄</span>
      </summary>
      <p className="mt-2 text-sm text-gray-400 pb-6">
        No Estatify does not own the spaces listed, as we have homeowners that list these spaces on our platform.
      </p>
    </details>
  </div>
</section>


{/* Full-width Image below everything */}
<div
  className="w-full mt-20 overflow-hidden"
  style={{ height: '700px' }} // total visible height (image height - crop top - crop bottom)
>
  <img
    src="/last.svg"
    alt="Decorative living room"
    className="w-full object-cover"
    style={{
      height: '990px',      // image height (container height + cropped top + cropped bottom)
      marginTop: '-300px',   // crop top by moving image up
    }}
  />
</div>

<section className="bg-black text-white w-full px-6 md:px-20 py-12 mt-30">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-12 border-b border-gray-700 pb-15 pt-15">
        {/* Logo and Description */}
        <div className="flex-1">
          <img src="/well logo.png" alt="Estatify Logo" className="h-40 w-40 -mt-15 -mb-12 -ml-8" />
          <p className="text-sm text-white mr-20">
          Estatify’s mission is a future where landlords and tenants in Nigeria experience efficient and affordable rental management. Our products help you find an apartment and pay monthly, carry out due diligence and verify your tenants, request facility management for your property and apply for rental loans. How can we help you today?
          </p>
        </div>

        {/* Links Columns */}
        <div className="flex flex-[2] justify-between mt-8 flex-wrap gap-8">
          <div>
            <h4 className="font-semibold mb-3 text-[#0c878c]">WHY ESTATIFY</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>Features</li>
              <li>Pricing</li>
              <li>Testimonials</li>
              <li>Partners</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-[#0c878c]">COMPANY</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Newsroom</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-[#0c878c]">GET IN TOUCH</h4>
            <ul className="space-y-2 text-sm text-white">
              <li>Contact</li>
              <li>Support</li>
              <li>FAQs</li>
              <li>Live Chat</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center text-md text-white pt-6 gap-4">
        <div className="flex flex-wrap gap-31 justify-center md:justify-start">
          <span>© Estatify 2025</span>
          <span className="cursor-pointer hover:text-white">Terms of Service</span>
          <span className="cursor-pointer hover:text-white">Privacy Policy</span>
        </div>
        <div className="flex gap-4 text-2xl">
          <FaInstagram className="cursor-pointer hover:text-[#0c878c]" />
          <FaLinkedin className="cursor-pointer hover:text-[#0c878c]" />
          <FaTwitter className="cursor-pointer hover:text-[#0c878c]" />
          <FaFacebook className="cursor-pointer hover:text-[#0c878c]" />
        </div>
      </div>
    </section>

</div>
    </div>
  );
};

export default Hero;
