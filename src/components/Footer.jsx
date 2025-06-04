// frontend/src/components/Footer.jsx
import React from 'react';
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom'; // Ensure Link is imported

const Footer = () => {

  // This handleScrollOrBounce will now primarily be used for elements that DON'T navigate pages,
  // like the social icons or other in-page only effects.
  const handleScrollOrBounce = (event, targetId) => {
    event.preventDefault(); // Prevent default link behavior if it was an <a> tag

    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.warn(`Target element with ID '${targetId}' not found on the page. Please ensure this ID exists.`);
    }
  };

  const handleHoverBounce = (targetIds, delayPerItem = 100) => {
    targetIds.forEach((id, index) => {
      setTimeout(() => {
        const targetElement = document.getElementById(id);
        if (targetElement) {
          targetElement.classList.remove('jumping-series-animation');
          void targetElement.offsetWidth;
          targetElement.classList.add('jumping-series-animation');

          const animationDuration = 2500;
          setTimeout(() => {
            targetElement.classList.remove('jumping-series-animation');
          }, animationDuration);
        }
      }, index * delayPerItem);
    });
  };

  // Helper function to get the section ID based on the item name
  // Note: 'Features' now correctly maps to 'features-section' from DesignedForLiving
  const getFooterSectionId = (itemName) => {
    switch (itemName) {
      // WHY ESTATIFY
      case "Features": return "why-estatify-main";
      case "Listings": return "listings-section";
      case "Testimonials": return "testimonials-section";
      case "Mission": return "footer-mission-text"; // This ID is inside the footer itself.
      // COMPANY
      case "About Us": return "hero-section";
      case "Find A Property": return "hero-search-box";
      case "Products": return "our-products-section";
      // GET IN TOUCH
      case "Contact": return "faqs-section";
      case "Support": return "faqs-section";
      case "FAQs": return "faqs-section";
      case "Live Chat": return "faqs-section";
      default: return "";
    }
  };

  return (
    <section className="bg-black text-white w-full px-6 md:px-20 py-12 mt-10 lg:mt-30">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between lg:gap-12 gap-6 border-b border-gray-700 lg:pb-15 lg:pt-15">
        {/* Logo and Description */}
        <div className="flex-1">
          <img src="/well logo.png" alt="Estatify Logo" className="lg:h-40 lg:w-40 h-20 w-20 lg:-mt-15 -mt-70 lg:-mb-12 lg:-ml-8 -ml-4" />
          <p id="footer-mission-text" className="lg:text-sm -mt-5 text-xs text-white mr-20">
          Estatify’s mission is a future where landlords and tenants in Nigeria experience efficient and affordable rental management. Our products help you find an apartment and pay monthly, carry out due diligence and verify your tenants, request facility management for your property and apply for rental loans. How can we help you today?
          </p>
        </div>

        {/* Links Columns */}
        <div className="flex flex-[2] justify-between lg:mt-8 -mt-30 flex-wrap lg:gap-8 gap-2">
          {/* WHY ESTATIFY Column */}
          <div id="why-estatify-footer">
            <h4 className="font-semibold lg:mb-3 mb-1 text-xs lg:text-base text-[#0c878c]">WHY ESTATIFY</h4>
            <ul className="space-y-2 text-sm text-white">
              {/* Features - CONVERTED TO LINK */}
              <li className='hover:text-[#0c878c] cursor-pointer'>
                <Link to={`/#${getFooterSectionId('Features')}`} className='block w-full h-full text-inherit text-xs lg:text-sm no-underline'>Features</Link>
              </li>
              {/* Listings - CONVERTED TO LINK */}
              <li className='hover:text-[#0c878c] cursor-pointer'>
                <Link to={`/#${getFooterSectionId('Listings')}`} className='block w-full h-full text-inherit text-xs lg:text-sm no-underline'>Listings</Link>
              </li>
              {/* Testimonials - CONVERTED TO LINK */}
              <li className='hover:text-[#0c878c] cursor-pointer'>
                <Link to={`/#${getFooterSectionId('Testimonials')}`} className='block w-full h-full text-inherit text-xs lg:text-sm no-underline'>Testimonials</Link>
              </li>
              {/* Mission - CONVERTED TO LINK for consistency in navigation */}
              <li className='hover:text-[#0c878c] cursor-pointer'
                  onMouseEnter={() => { // Keep onMouseEnter for hover effect
                      const missionTextElement = document.getElementById('footer-mission-text');
                      if (missionTextElement) {
                          missionTextElement.classList.remove('animate-glance');
                          void missionTextElement.offsetWidth;
                          missionTextElement.classList.add('animate-glance');
                          setTimeout(() => {
                            missionTextElement.classList.remove('animate-glance');
                          }, 2000);
                      }
                  }}
              >
                <Link to={`/#${getFooterSectionId('Mission')}`} className='block w-full h-full text-inherit text-xs lg:text-sm no-underline'>Mission</Link>
              </li>
            </ul>
          </div>
          {/* COMPANY Column */}
          <div id="company-footer">
            <h4 className="font-semibold lg:mb-3 mb-1 text-xs lg:text-base text-[#0c878c]">COMPANY</h4>
            <ul className="space-y-2 text-sm text-white">
              {/* About Us - CONVERTED TO LINK */}
              <li className='hover:text-[#0c878c] cursor-pointer'>
                <Link to={`/#${getFooterSectionId('About Us')}`} className='block w-full h-full text-inherit text-xs lg:text-sm no-underline'>About Us</Link>
              </li>
              {/* Find A Property - CONVERTED TO LINK */}
              <li className='hover:text-[#0c878c] cursor-pointer'>
                <Link to={`/#${getFooterSectionId('Find A Property')}`} className='block w-full h-full text-inherit text-xs lg:text-sm no-underline'>Find A Property</Link>
              </li>
              {/* Legal - Already uses Link */}
              <li
                className='hover:text-[#0c878c] cursor-pointer'
                onMouseEnter={() => handleHoverBounce(['terms-footer', 'privacy-footer'], 150)}
              >
                <Link to="/legal" className='block w-full h-full text-inherit text-xs lg:text-sm no-underline'>Legal</Link>
              </li>
              {/* Products - CONVERTED TO LINK */}
              <li className='hover:text-[#0c878c] cursor-pointer'>
                <Link to={`/#${getFooterSectionId('Products')}`} className='block w-full h-full text-inherit text-xs lg:text-sm no-underline'>Products</Link>
              </li>
            </ul>
          </div>
          {/* GET IN TOUCH Column */}
          <div id="get-in-touch-footer">
            <h4 className="font-semibold lg:mb-3 mb-1 text-xs lg:text-base text-[#0c878c]">GET IN TOUCH</h4>
            <ul className="space-y-2 text-sm text-white">
              {/* Contact - CONVERTED TO LINK */}
              <li
                className='hover:text-[#0c878c] cursor-pointer'
                onMouseEnter={() => handleHoverBounce(['social-instagram', 'social-linkedin', 'social-twitter', 'social-facebook'], 100)}
              >
                <Link to={`/#${getFooterSectionId('Contact')}`} className='block w-full h-full text-inherit text-xs lg:text-sm no-underline'>Contact</Link>
              </li>
              {/* Support - CONVERTED TO LINK */}
              <li
                className='hover:text-[#0c878c] cursor-pointer'
                onMouseEnter={() => handleHoverBounce(['social-instagram', 'social-linkedin', 'social-twitter', 'social-facebook'], 100)}
              >
                <Link to={`/#${getFooterSectionId('Support')}`} className='block w-full h-full text-inherit text-xs lg:text-sm no-underline'>Support</Link>
              </li>
              {/* FAQs - CONVERTED TO LINK */}
              <li className='hover:text-[#0c878c] cursor-pointer'>
                <Link to={`/#${getFooterSectionId('FAQs')}`} className='block w-full h-full text-inherit text-xs lg:text-sm no-underline'>FAQs</Link>
              </li>
              {/* Live Chat - CONVERTED TO LINK */}
              <li className='hover:text-[#0c878c] cursor-pointer'>
                <Link to={`/#${getFooterSectionId('Live Chat')}`} className='block w-full h-full text-inherit text-xs lg:text-sm no-underline'>Live Chat</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section (already uses Link as discussed) */}
      <div className="flex flex-row justify-between items-center text-md text-white pt-6 lg:gap-4 gap-2">
        <div className="flex flex-wrap lg:gap-31 gap-4 text-[12px] lg:text-sm justify-center md:justify-start">
          <span>© Estatify 2025</span>
          <span
            id="terms-footer"
            className="cursor-pointer hover:text-[#0c878c]"
            onClick={(e) => {
              handleHoverBounce(['terms-footer']);
            }}
          >
            <Link to="/legal" className='block w-full h-full text-inherit text-[12px] lg:text-sm no-underline'>
                Terms of Service
            </Link>
          </span>
          <span
            id="privacy-footer"
            className="cursor-pointer hover:text-[#0c878c]"
            onClick={(e) => {
              handleHoverBounce(['privacy-footer']);
            }}
          >
            <Link to="/legal#privacy-policy-section" className='block w-full h-full text-inherit text-[12px] lg:text-sm no-underline'>
                Privacy Policy
            </Link>
          </span>
        </div>
        <div id="social-icons-group" className="flex lg:gap-4 gap-2 text-xs lg:text-2xl">
          <FaInstagram id="social-instagram" className="cursor-pointer hover:text-[#0c878c]" />
          <FaLinkedin id="social-linkedin" className="cursor-pointer hover:text-[#0c878c]" />
          <FaTwitter id="social-twitter" className="cursor-pointer hover:text-[#0c878c]" />
          <FaFacebook id="social-facebook" className="cursor-pointer hover:text-[#0c878c]" />
        </div>
      </div>
    </section>
  );
};

export default Footer;