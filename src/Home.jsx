import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // <--- Import useLocation
import {
  Footer,
  Header,
  Hero,
  ThirdImage,
  Faqs,
  WhyEstatify,
  SecondImage,
  OurProducts,
  DesignedForLiving,
  Testimonials,
  Listings
} from "./exports"; // Assuming exports contains all these components

const Home = () => {
  const [searchCriteria, setSearchCriteria] = useState({});
  const location = useLocation(); // <--- Get the location object

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
    console.log("Search initiated with:", criteria);

    const listingsSection = document.getElementById('listings-section');
    if (listingsSection) {
      listingsSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll for better UX
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      window.history.replaceState({}, document.title, '/');
    }
  }, []);

  // NEW useEffect for hash scrolling on Home page
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1); // Remove the '#'
      // console.log(`Attempting to scroll to ID: ${elementId}`); // Debugging line
      const targetElement = document.getElementById(elementId);
      if (targetElement) {
        // console.log('Target element found, scrolling...'); // Debugging line
        setTimeout(() => { // Small delay to ensure element is fully rendered
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]); // <--- Rerun effect when hash changes

  return (
    <div style={{ fontFamily: 'Britannic Bold' }} className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <div
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          boxShadow: '0 0 12px rgba(0, 255, 255, 0.1)',
        }}
      />
      <div className="relative z-10">
        <Header />
        <Hero id="hero-section" onSearch={handleSearch} />
        {/* --- ENSURE THESE COMPONENTS HAVE THE CORRECT IDs --- */}
        <DesignedForLiving id="features-section" /> {/* Confirmed ID */}
        <OurProducts id="our-products-section" />   {/* Confirmed ID */}
        <SecondImage />
        <WhyEstatify id="why-estatify-main" />     {/* Confirmed ID */}
        <Testimonials id="testimonials-section" /> {/* Confirmed ID */}
        <Listings id="listings-section" searchCriteria={searchCriteria} /> {/* Confirmed ID */}
        <Faqs id="faqs-section" />                 {/* Confirmed ID */}
        <ThirdImage />
        <Footer />
      </div>
    </div>
  );
};

export default Home;