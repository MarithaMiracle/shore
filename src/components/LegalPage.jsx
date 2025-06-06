// frontend/src/pages/LegalPage.jsx

import React, { useEffect } from 'react';
import { Header, Footer } from '../exports';
import { useLocation } from 'react-router-dom';

const LegalPage = () => {
  const location = useLocation(); // Get the location object

  useEffect(() => {
    // Get the hash from the location object
    const hash = location.hash;
    if (hash) {
      // Remove the '#' prefix to get the ID
      const elementId = hash.substring(1);
      const targetElement = document.getElementById(elementId);
      if (targetElement) {
        // Scroll to the element after a small delay to ensure it's rendered
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // 100ms delay
      }
    }
  }, [location.hash]); // Add location.hash to the dependency array

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

        {/* Main Content Area for Combined Legal Information */}
        <section className="lg:max-w-6xl md:max-w-4xl sm:max-w-2xl xs:max-w-lg max-w-xs mx-auto py-20 px-6 sm:px-8 lg:px-10 text-gray-300">

          {/* Terms of Service Section */}
          <h1 className="text-xl xs:text-xl sm:text-2xl md:text-2xl lg:text-4xl font-semibold text-[#0c878c] mt-10 lg:mt-20 lg:mb-8 mb-4 text-center">Terms of Service</h1>

          <p className="mb-4 lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs md:text-md leading-relaxed">
            Welcome to Estatify! These Terms of Service ("Terms") govern your use of the Estatify website and services (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
          </p>

          <h2 className="text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-white mt-8 lg:mt-10 lg:mb-4 mb-2">1. Use of Service</h2>
          <p className="lg:mb-4 mb-2 lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs md:text-md leading-relaxed">
            Estatify provides a platform for landlords and tenants to connect for rental agreements. You agree to use the Service only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the Service. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our Service.
          </p>

          <h2 className="text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-white mt-8 lg:mb-4 mb-2">2. User Accounts</h2>
          <p className="lg:mb-4 mb-2 lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs md:text-md leading-relaxed">
            When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
          </p>

          <h2 className="text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-white mt-8 lg:mb-4 mb-2">3. Content</h2>
          <p className="lg:mb-4 mb-2 lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs md:text-md leading-relaxed">
            Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness. By posting Content on or through the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service.
          </p>

          <h2 className="text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-white mt-8 lg:mb-4 mb-2">4. Termination</h2>
          <p className="lg:mb-4 mb-2 lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs md:text-md leading-relaxed">
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
          </p>

          <h2 className="text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-white mt-8 lg:mb-4 mb-2">5. Governing Law</h2>
          <p className="lg:mb-8 mb-2 lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs md:text-md leading-relaxed">
            These Terms shall be governed and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions.
          </p>

          <p className="lg:mb-12 mb-6 lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs md:text-md leading-relaxed">
          <span 
          id="privacy-policy-section"
          className="font-bold">Disclaimer:</span> Please consult with a legal professional to draft terms specific to your business and jurisdiction.
          </p>

          {/* Privacy Policy Section - Added ID here */}
          <h1
            className="text-xl lg:text-4xl sm:text-5xl font-semibold text-[#0c878c] lg:mb-8 mb-4 text-center lg:mt-20 mt-10"
          >
            Privacy Policy
          </h1>

          <p className="mb-4 lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs md:text-md leading-relaxed">
            Your privacy is important to us. This Privacy Policy describes how Estatify ("we," "us," or "our") collects, uses, and discloses information that we obtain about visitors to our website (www.estatify.com) and the services available through our site (collectively, the "Service").
          </p>

          <h2 className="text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-white mt-8 lg:mt-12 lg:mb-4 mb-2">1. Information We Collect</h2>
          <p className="lg:mb-4 mb-2 lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs md:text-md leading-relaxed">
            We collect information about you directly from you, from third parties, and automatically through your use of our Service.
          </p>
          <h3 className="text-sm xs:text-md sm:text-lg md:text-xl lg:text-xl font-bold text-white mt-8 lg:mb-4 mb-2">Information You Provide Directly to Us:</h3>
          <ul className="list-disc list-inside lg:mb-4 mb-2 lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs md:text-md leading-relaxed pl-4">
            <li>Personal Information: Such as your name, email address, phone number, and payment information when you register for an account, list a property, or contact us.</li>
            <li>Property Information: Details about properties you list, including addresses, descriptions, and images.</li>
          </ul>

          <h3 className="text-sm xs:text-md sm:text-lg md:text-xl lg:text-xl font-bold text-white mt-8 lg:mb-4 mb-2">Information We Collect Automatically:</h3>
          <ul className="list-disc list-inside lg:mb-4 mb-2 lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs md:text-md leading-relaxed pl-4">
            <li>Usage Data: Information about how you access and use the Service, including your IP address, browser type, operating system, referring URLs, access times, and pages viewed.</li>
            <li>Cookies: We use cookies to track activity on our Service and hold certain information.</li>
          </ul>

          <h2 className="text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-white mt-8 lg:mb-4 mb-2">2. How We Use Your Information</h2>
          <p className="lg:mb-4 mb-2 lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs md:text-md leading-relaxed">
            We use the information we collect for various purposes, including to:
          </p>
          <ul className="list-disc list-inside lg:mb-4 mb-2 lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs md:text-md leading-relaxed pl-4">
            <li>Provide, maintain, and improve our Service.</li>
            <li>Process transactions and send related information.</li>
            <li>Communicate with you about your account or our Service.</li>
            <li>Respond to your inquiries and provide customer support.</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our Service.</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities.</li>
          </ul>

          <h2 className="text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-white mt-8 lg:mb-4 mb-2">3. Sharing Your Information</h2>
          <p className="lg:mb-4 mb-2 lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs md:text-md leading-relaxed">
            We may share your information with third parties in the following circumstances:
          </p>
          <ul className="list-disc list-inside lg:mb-4 mb-2 lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs md:text-md leading-relaxed pl-4">
            <li>Service Providers: With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</li>
            <li>Legal Compliance: In response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law, regulation, or legal process.</li>
            <li>With Your Consent: We may share your information with your consent or at your direction.</li>
          </ul>

          <h2 className="text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-white mt-8 lg:mb-4 mb-2">4. Data Security</h2>
          <p className="lg:mb-4 mb-2 lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs md:text-md leading-relaxed">
            We take reasonable measures to protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
          </p>

          <h2 className="text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-white mt-8 lg:mb-4 mb-2">5. Your Choices</h2>
          <p className="lg:mb-4 mb-2 lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs md:text-md leading-relaxed">
            You may review, update, or delete personal information by logging into your account. You can also opt-out of receiving promotional communications from us by following the instructions in those communications.
          </p>

          <h2 className="text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl font-bold text-white mt-8 lg:mb-4 mb-2">6. Changes to This Policy</h2>
          <p className="lg:mb-8 mb-2 lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs md:text-md leading-relaxed">
            We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising the "Last Updated" date at the bottom of this policy and, in some cases, we may provide you with additional notice (such as adding a statement to our homepage or sending you a notification).
          </p>

          <p className="lg:mb-20 mb-10 lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs md:text-md leading-relaxed">
          <span className="font-bold">Disclaimer:</span> Please consult with a legal professional to draft terms specific to your business and jurisdiction.
          </p>
          <p className="lg:mb-10 md:mb-50 sm:mb-50 xs:mb-50 lg:text-xl md:text-lg sm:text-md xs:text-sm text-xs md:text-md leading-relaxed text-gray-400 text-center mb-50">Last Updated: June 3, 2025</p>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default LegalPage;