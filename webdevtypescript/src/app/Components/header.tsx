"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  className?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string | null;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  //Check if user is logged in on component mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  //Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const checkAuthStatus = async () => {
    try {
      //Check if there's a token in cookies by making a request to get user profile
      const response = await fetch('/api/user/profilePicture', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        setUser({
          ...userData.user,
          profilePicture: sanitizeUrl(userData.user.profilePicture)
        });
      } else {
        //Fallback to basic auth check
        const authResponse = await fetch('/api/auth/logincheck', {
          method: 'GET',
          credentials: 'include',
        });

        if (authResponse.ok) {
          const authData = await authResponse.json();
          setUser({
            ...authData.user,
            profilePicture: sanitizeUrl(authData.user.profilePicture)
          });
        } else {
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const sanitizeUrl = (url: any): string | null => {
    if (!url || typeof url !== 'string' || url === 'null' || url === 'undefined') return null;
    return url.startsWith('/uploads/') || url.startsWith('http') ? url : null;
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      setUser(null);
      setIsProfileOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  //Get user initials for profile circle
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  //Check if user has a valid profile picture
  const hasValidProfilePicture = () => {
    return !!(user?.profilePicture && !imageError);
  };

  //Profile Avatar Component
  const ProfileAvatar = ({ size = 'w-8 h-8', textSize = 'text-sm' }: { size?: string, textSize?: string }) => {
    if (hasValidProfilePicture()) {
      return (
        <img
          src={user!.profilePicture!}
          alt="Profile"
          className={`${size} rounded-full object-cover`}
          onError={() => setImageError(true)}
        />
      );
    }

    return (
      <div className={`${size} bg-blue-600 text-white rounded-full flex items-center justify-center ${textSize} font-medium`}>
        {getUserInitials(user!.name)}
      </div>
    );
  };

  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 relative ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 z-10">
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

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
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

          {/* Auth Section */}
          <div className="hidden md:flex items-center">
            {isLoading ? (
              //Loading spinner
              <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            ) : user ? (
              //Profile dropdown when logged in
              <div className="relative z-50" ref={profileRef}>
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1 relative z-50"
                >
                  <ProfileAvatar />
                  <span className="hidden lg:block text-sm font-medium">{user.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-[999] border border-gray-200 min-w-max">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-gray-500">{user.email}</div>
                    </div>
                    <Link
                      href="/Profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors relative z-[999] cursor-pointer"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors relative z-[999] cursor-pointer"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Home
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors relative z-[999] cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              //Login button when not logged in
              <Link href="/Login" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden z-10">
            <button
              type="button"
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 p-2"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
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
        <div className="md:hidden absolute top-full left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/Academics" 
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              Academics
            </Link>
            <Link 
              href="/Capstone" 
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              Capstone
            </Link>
            <Link 
              href="/AiModel" 
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              Ai Model
            </Link>
            <Link 
              href="/Chess" 
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              Chess
            </Link>
            
            {/* Mobile auth section */}
            {user ? (
              <>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex items-center px-3 py-2">
                    <div className="mr-3">
                      <ProfileAvatar />
                    </div>
                    <div>
                      <div className="text-base font-medium text-gray-800">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <Link 
                    href="/Profile" 
                    className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  <Link 
                    href="/" 
                    className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-red-700 hover:text-red-900 hover:bg-red-50 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <Link 
                href="/Login" 
                className="bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;