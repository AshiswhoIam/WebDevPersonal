"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';


 {/*Instead of direct change can just add class name to make change in header ex.*/}
interface HeaderProps {
  className?: string;
}

{/*Declare using interfaces, Hook use state for menu action->inital default val menu closed=false.*/}
const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

{/*If isMenuOpen is false, this will change to true. If it’s true,becomes false.*/}
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      {/*Setting max width of container 7xl, mx-auto to center L/R, px- for padding small/large screens*/}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex box layout container, justify spaced evenly, items center to center h for hieght */}
        <div className="flex justify-between items-center h-16">
          {/* Logo, flex-shrink-0 prevents shrinking when in flex containter*/}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/LOGOA.png"
                alt="Site Logo"
                width={65}
                height={65}
                priority
                className="hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Navigation, hide elements on small screens,flexbox medium screens,horizontal spacing. */}
          <nav className="hidden md:flex space-x-8">
            {/*px py padding hori and vertical, rounded-md round corners, text small size, trans-color for hovering smooth effect*/} 
            <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Home
            </Link>
            <Link href="/Academics" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Academics
            </Link>
            <Link href="/Capstone" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Capstone
            </Link>
            <Link href="/AiModel" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Ai Model
            </Link>
            <Link href="/Chess" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Chess
            </Link>
          </nav>

          {/* Login Button */}
          <div className="hidden md:flex">
            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              Login
            </Link>
          </div>

          {/* Mobile menu button hidden when 768px or larger */}
          <div className="md:hidden">
            {/*focus ring-> edge of the outline of the button.*/}
            <button
              type="button"
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              {/* setting h and w, viewbox coord sys and sizing for icons, stroke for thicc, the numbers are lines to display X when to close the menu, the other is triple - */}
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            <Link href="/" className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="/Academics" className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              Academics
            </Link>
            <Link href="/Capstone" className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              Capstone
            </Link>
            <Link href="/ai" className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              Ai Model
            </Link>
            <Link href="/chess" className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
              Chess
            </Link>
            <Link href="/login" className="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;