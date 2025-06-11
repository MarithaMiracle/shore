import { LogIn, AlignRight, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const array = ["Listings", "Testimonials", "FAQs", "Products", "Features"];
  
  // Use a state to hold combined user info, including name
  const [user, setUser] = useState(null); 
  // State to hold just the display name
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('userName'); // Get the stored name

    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Set the user ID from the token for internal checks
        setUser({ id: decoded.id }); 
        
        // Use the name from localStorage for display
        if (storedUserName) {
          setDisplayName(storedUserName.split(' ')[0]); // Get first name
        } else {
          // Fallback if name is not in localStorage (e.g., old login)
          setDisplayName('User'); // Default display name
        }
      } catch (err) {
        console.error('Invalid token:', err);
        setUser(null);
        setDisplayName(null);
      }
    } else {
      setUser(null);
      setDisplayName(null);
    }
  }, []); // Empty dependency array means this runs once on mount

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // Also remove other user data
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setUser(null);
    setDisplayName(null);
    window.location.reload(); // Reload to refresh auth state across app
  };

  const getSectionId = (itemName) => {
    switch (itemName) {
      case "Listings": return "listings-section";
      case "Testimonials": return "testimonials-section";
      case "FAQs": return "faqs-section";
      case "Products": return "our-products-section";
      case "Features": return "why-estatify-main";
      default: return "";
    }
  };

  return (
    <header className='fixed top-0 z-50 w-full bg-black grid grid-cols-[auto_1fr_auto] items-center 2xl:px-[10rem] xl:px-[6rem] lg:px-[3rem] px-[1rem] 2xl:h-[6rem] lg:h-[5rem] h-[4rem]'>

      {/* Logo */}
      <img
  src='/Estatify Colored Transparent.png'
  alt='Logo'
  className='lg:h-[70px] lg:w-[150px] h-[60px] w-[60px] mr-30 object-contain'
/>

      {/* Desktop Navigation */}
      <div className="lg:flex justify-center hidden">
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

      {/* User/Auth & Mobile Menu */}
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

        {/* Mobile Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <AlignRight className="text-gray-300 2xl:hidden lg:hidden block" size={40} />
          </SheetTrigger>

          <SheetContent className={"bg-[#0d0f14] border border-black h-120 rounded-4xl p-8"}>
            <SheetClose asChild>
              <button className="absolute right-4 top-4 text-gray-300 hover:text-white">
                <X size={30} />
              </button>
            </SheetClose>

            {/* Mobile Navigation */}
            <ul className='flex flex-col gap-2 mt-[3rem]'>
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

            {/* Mobile Auth */}
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
  );
};

export default Header;
