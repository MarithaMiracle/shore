import { LogIn } from 'lucide-react';
import React from 'react';

const Header = () => {
  const array = ["Benefits", "About", "Integrations", "Testimonials"];
  return (
    <div>
      <header className='flex justify-between'>
        <h1>Shore</h1>
        <ul className="flex gap-4">
          {array.map((item, index) => (
            <li>
            <a href="#">{item}</a>
          </li>
          ))}
        </ul>
        <div>
          <button>Sign In<LogIn/></button>
        </div>
      </header>
      </div>
  )
}

export default Header