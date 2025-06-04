import { LogIn, AlignRight, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // This import will NOT be changed again.

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const array = ["Listings", "Testimonials", "FAQs", "Products", "Features"];
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error('Invalid token:', err);
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.reload();
  };

  // Helper function to get the section ID based on the item name
  const getSectionId = (itemName) => {
    switch (itemName) {
      case "Listings": return "listings-section";
      case "Testimonials": return "testimonials-section";
      case "FAQs": return "faqs-section";
      case "Products": return "our-products-section";
      case "Features": return "why-estatify-main"; // This is exactly as you provided
      default: return "";
    }
  };

  return (
    // This wrapper div ensures the fixed header can take full width
    <div className="w-full">
      {/* Header - Adjusted to be fixed at the very top, full width, with a high z-index */}
      <header className='fixed top-[-80px] z-50 w-full grid grid-cols-[auto_1fr_auto] items-center 2xl:px-[10rem] xl:px-[6rem] lg:px-[3rem] px-[1rem] 2xl:h-[6rem] lg:h-[5rem] h-[4rem]'>

        {/* Logo (Left Column - auto width) */}
        <Link to="/" className='lg:-ml-8 xl:-ml-12 2xl:-ml-16'>
          {/* Logo Image - Keeping your specified heights */}
          <img src='/new logo.svg' alt='Logo' className='h-50 lg:h-60 xl:h-70 2xl:h-80 w-auto object-contain' />
        </Link>

        {/* Desktop Navigation Wrapper (Middle Column - 1fr takes all available space) */}
        <div className="flex justify-center hidden lg:flex">
          <ul className="flex gap-6 items-center px-[3rem] py-3 bg-[#141618] rounded-full border border-gray-700 mx-auto">
            {array.map((item, index) => (
              <li key={index}>
                <Link to={`/#${getSectionId(item)}`} className='text-gray-300 font-medium text-lg hover:text-[#0c878c] transition duration-200'>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* User/Auth & Mobile Menu Toggle Section (Right Column - auto width) */}
        <div className='flex items-center justify-end gap-4'>
          {user ? (
            <div className="flex items-center lg:gap-3 xl:gap-4">
              <span className="text-white text-xl hidden lg:block max-w-[100px] truncate">
                Welcome, {user.name?.split(' ')[0]}
              </span>
              <button
                onClick={handleLogout}
                className="2xl:flex xl:flex lg:flex hidden items-center justify-center bg-[#0c878c] text-white 2xl:text-[17px] xl:text-sm lg:text-sm font-medium 2xl:px-5 xl:px-4 lg:px-3 2xl:py-3 xl:py-2 lg:py-1 rounded-full cursor-pointer hover:bg-white hover:text-[#0c878c]"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center lg:gap-3 xl:gap-4">
              <Link to="/login">
                <button className='2xl:flex xl:flex lg:flex hidden items-center justify-between gap-1 bg-[#0c878c] text-white 2xl:text-[17px] xl:text-sm lg:text-sm font-medium 2xl:px-5 xl:px-4 lg:px-3 2xl:py-3 xl:py-2 lg:py-1 rounded-full cursor-pointer hover:bg-white hover:text-[#0c878c]'>
                  Sign In
                  <LogIn className='w-6 h-6' strokeWidth={"3"} />
                </button>
              </Link>

              <Link to="/create-account">
                <button className='2xl:flex xl:flex lg:flex hidden items-center justify-between gap-1 bg-[#0c878c] text-white 2xl:text-[17px] xl:text-sm lg:text-sm font-medium 2xl:px-5 xl:px-4 lg:px-3 2xl:py-3 xl:py-2 lg:py-1 rounded-full cursor-pointer hover:bg-white hover:text-[#0c878c]'>
                  Create Account
                  <svg className="w-6 h-6 stroke-current transition duration-300" viewBox="0 0 24 24" fill="none">
                    <path d="M4 20V19C4 16.2386 6.23858 14 9 14H12.75M17.5355 13.9645V17.5M17.5355 17.5V21.0355M17.5355 17.5H21.0711M17.5355 17.5H14M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </Link>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <AlignRight className="text-gray-300 2xl:hidden lg:hidden block" size={40} />
            </SheetTrigger>

            <SheetContent className={"bg-[#14161B] p-8"}>
              <SheetClose asChild>
                <button className="absolute right-4 top-4 text-gray-300 hover:text-white">
                  <X size={30} />
                </button>
              </SheetClose>

              {/* Mobile Navigation */}
              <ul className='flex flex-col gap-8 mt-[3rem]'>
                {array.map((item, index) => (
                  <li key={index} className='text-gray-300 font-medium text-lg hover:text-[#0c878c] transition duration-75'>
                    <SheetClose asChild>
                      <Link to={`/#${getSectionId(item)}`} className='block w-full h-full text-inherit no-underline'>
                        {item}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>

              {/* Mobile Auth/User section within the sheet */}
              <div className='flex flex-col gap-4 mt-[3rem] items-start'>
                {!user ? (
                  <>
                    <Link to="/login">
                      <button className='flex items-center justify-between gap-1 bg-[#0c878c] text-white text-sm font-medium px-4 py-1 rounded-full cursor-pointer hover:bg-white hover:text-[#0c878c]'>
                        Sign In
                        <LogIn className='w-6 h-6' strokeWidth={"3"} />
                      </button>
                    </Link>

                    <Link to="/create-account">
                      <button className='flex items-center justify-between gap-1 bg-[#0c878c] text-white text-sm font-medium px-4 py-1 rounded-full cursor-pointer hover:bg-white hover:text-[#0c878c]'>
                        Create Account
                        <svg className="w-6 h-6 stroke-current transition duration-300" viewBox="0 0 24 24" fill="none">
                          <path d="M4 20V19C4 16.2386 6.23858 14 9 14H12.75M17.5355 13.9645V17.5M17.5355 17.5V21.0355M17.5355 17.5H21.0711M17.5355 17.5H14M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <span className="text-white text-xl">Welcome, {user.name?.split(' ')[0]}</span>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center bg-[#0c878c] text-white text-sm font-medium px-4 py-1 rounded-full cursor-pointer hover:bg-white hover:text-[#0c878c]"
                    >
                      Log Out
                    </button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
};

export default Header;