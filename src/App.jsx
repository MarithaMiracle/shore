import React from 'react';
import { About, Benefits, CTA, Faqs, Footer, Header, Hero, Integrations, Pricing, Testimonials } from "./exports";

const App = () => {
  return (
    <div style={{ fontFamily: 'Britannic Bold' }} className="relative min-h-screen overflow-x-hidden bg-black text-white">
      {/* Glowing Grid Overlay */}
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

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <Hero />
        {/* <About />
        <Benefits />
        <Integrations />
        <Pricing />
        <Testimonials /> */}
      </div>
    </div>
  );
};

export default App;
