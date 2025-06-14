import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);
    console.log("Search initiated with:", criteria);

    const listingsSection = document.getElementById('listings-section');
    if (listingsSection) {
      listingsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Tawk.to Script Injection
  useEffect(() => {
    const tawkScript = document.createElement('script');
    tawkScript.src = 'https://embed.tawk.to/684cfa3c47f3b9190ba0016a/1itmb2vs1';
    tawkScript.async = true;
    tawkScript.charset = 'UTF-8';
    tawkScript.setAttribute('crossorigin', '*');
    document.body.appendChild(tawkScript);

    return () => {
      document.body.removeChild(tawkScript);
    };
  }, []);

  // Token capture from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      window.history.replaceState({}, document.title, '/');
    }
  }, []);

  // Smooth scroll to hash element
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1);
      const targetElement = document.getElementById(elementId);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);

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
        <DesignedForLiving id="features-section" />
        <OurProducts id="our-products-section" />
        <SecondImage />
        <WhyEstatify id="why-estatify-main" />
        <Testimonials id="testimonials-section" />
        <Listings id="listings-section" searchCriteria={searchCriteria} />
        <Faqs id="faqs-section" />
        <ThirdImage />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
