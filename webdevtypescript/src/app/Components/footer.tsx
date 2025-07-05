import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

 {/*Instead of direct change can just add class name to make change in footer ex.*/}
interface FooterProps {
  className?: string;
}

 {/*Functional React Component that accepts className prop*/}
const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-gray-900 text-white ${className}`}>
      {/*Setting max width of container 7xl, mx-auto to center L/R, px- for padding small/large screens*/}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         {/*Create grid contianer, 1 col to stack elemnts vertically, on medium screen and above 4 cols*/}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Gerenal Info,  small screen 1 col medium 2col */}
          <div className="col-span-1 md:col-span-2">
            {/* txt font and margin botton 4spacing */}
            <h3 className="text-2xl font-bold mb-4">  <div className="flex-shrink-0">
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
          </div></h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Exploring the ever-changing world of software development, one project at a time. 
              Always learning, always building, always evolving.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons Github, Then Linkedin */}
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.305-5.466-1.334-5.466-5.933 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.243 2.874.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.625-5.475 5.922.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-gray-300 hover:text-white transition-colors">
                  Academics
                </Link>
              </li>
              <li>
                <Link href="/capstone" className="text-gray-300 hover:text-white transition-colors">
                  Capstone
                </Link>
              </li>
              <li>
                <Link href="/ai" className="text-gray-300 hover:text-white transition-colors">
                  Ai Model
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <span className="block">Somewhere in Canada</span>
                <span className="block">Konohagakure, HQ 1234</span>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li>
                <a href="" className="hover:text-white transition-colors">
                  Youalreadyknow@wheretoreachme.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 ArkTech. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;