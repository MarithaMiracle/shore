import { LogIn, AlignRight, X } from 'lucide-react';
import React from 'react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";


const Header = () => {
  const array = ["For Renters", "For Landlords", "Shortlet", "Blog", "About Us"];
  return (
    <div>
      <header className='flex justify-between items-center 2xl:px-[10rem] lg:px-[4rem] px-[1rem] 2xl:h-[6rem] lg:h-[5rem] h-[4rem]'>
        <div className='relative right-20 top-1'>
        <img src='/new logo.svg' alt='Logo' className='2xl:h-100 lg:h-80 h-60 object-contain'/>
        </div>
        <ul className="lg:flex gap-6 items-center px-[3rem] py-3 bg-[#141618] rounded-full border hidden border-gray-700">
          {array.map((item, index) => (
            <li>
            <a href="#" className='text-gray-300 font-medium text-lg hover:text-[#0c878c] transition duration-200'>{item}</a>
          </li>
          ))}
        </ul>
        <div className='flex items-center justify-between gap-4'>
          <button className='2xl:flex lg:flex hidden items-center justify-between gap-1 bg-[#0c878c] text-white 2xl:text-[17px] lg:text-sm text-sm font-medium 2xl:px-5 lg:px-6 px-4 2xl:py-3 lg:py-2 py-1 rounded-full cursor-pointer hover:bg-white hover:text-[#0c878c]'>Sign In<LogIn className='w-6 h-6' strokeWidth={"3"}/></button>        
          <button className='2xl:flex lg:flex hidden items-center justify-between gap-1 bg-[#0c878c] text-white 2xl:text-[17px] lg:text-sm text-sm font-medium 2xl:px-5 lg:px-6 px-4 2xl:py-3 lg:py-2 py-1 rounded-full cursor-pointer hover:bg-white hover:text-[#0c878c]'>
  Create Account
  <svg
    className="w-6 h-6 stroke-current transition duration-300"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 20V19C4 16.2386 6.23858 14 9 14H12.75M17.5355 13.9645V17.5M17.5355 17.5V21.0355M17.5355 17.5H21.0711M17.5355 17.5H14M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</button>
            <Sheet>
              <SheetTrigger asChild>
                <AlignRight className="text-gray-300 2xl:hidden lg:hidden block" size={40} />
              </SheetTrigger>
              <SheetContent className={"bg-[#14161B] p-8"}>
                <SheetClose asChild>
                  <button className="absolute right-4 top-4 text-gray-300 hover:text-white">
                    <X size={30}/>
                  </button>
                </SheetClose>
                <ul className='flex flex-col gap-8 mt-[3rem]'>
                  {array?.map((item, index) => (
                    <li className='text-gray-300 font-medium text-lg hover:text-[#0c878c] transition duration-75'>{item}</li>
                  ))}
                </ul>
        
                <div className='flex flex-col gap-4 mt-[3rem] items-start'>
                <button className='flex items-center justify-between gap-1 bg-[#0c878c] text-white 2xl:text-[17px] lg:text-sm text-sm font-medium 2xl:px-5 lg:px-6 px-4 2xl:py-3 lg:py-2 py-1 rounded-full cursor-pointer hover:bg-white hover:text-[#0c878c]'>Sign In<LogIn className='w-6 h-6' strokeWidth={"3"}/></button>
                <button className='flex items-center justify-between gap-1 bg-[#0c878c] text-white 2xl:text-[17px] lg:text-sm text-sm font-medium 2xl:px-5 lg:px-6 px-4 2xl:py-3 lg:py-2 py-1 rounded-full cursor-pointer hover:bg-white hover:text-[#0c878c]'>
  Create Account
  <svg
    className="w-6 h-6 stroke-current transition duration-300"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 20V19C4 16.2386 6.23858 14 9 14H12.75M17.5355 13.9645V17.5M17.5355 17.5V21.0355M17.5355 17.5H21.0711M17.5355 17.5H14M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</button>
                </div>
              </SheetContent>
            </Sheet>
        </div>
      </header>
      </div>
  )
}

export default Header;