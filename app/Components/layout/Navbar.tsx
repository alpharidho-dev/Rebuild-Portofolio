'use client';

import Link from 'next/link';
import { useState } from 'react';
import { JetBrains_Mono } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Work', href: '/#work' },
    { name: 'Tech', href: '/#tech' },
    { name: 'Lab', href: '/#lab' },
    { name: 'About', href: '/#about' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center items-start h-[58px] pointer-events-none">
      <div
        className={`
          w-full max-w-7xl mx-4 mt-3 
          bg-[#201F1F]/70 backdrop-blur-md
          border-b border-[#3B494B]/10 
          rounded-2xl h-[58px] 
          flex items-center px-6 
          pointer-events-auto
          ${jetbrainsMono.className}
          tracking-[1.2px]
        `}
      >
        <div className="w-full flex items-center justify-between relative">
          {/* LOGO */}
          <Link
            href="/"
            className="text-white text-xl md:text-sm font-bold tracking-tight hover:text-gray-300 transition-colors flex-shrink-0"
          >
            Alpharidho
          </Link>

          {/* MENU TENGAH - font-normal (tidak bold) */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white text-xs font-normal hover:text-gray-300 transition-colors duration-200 whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* SISI KANAN */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              href="/#connect"
              className="hidden md:inline-block text-black bg-white hover:bg-white/90 px-6 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Connect
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="absolute top-[66px] left-0 w-full px-4 pointer-events-none">
          <div
            className={`
              w-full max-w-7xl mx-auto 
              bg-[#201F1F]/95 backdrop-blur-md 
              border border-[#3B494B]/10 
              rounded-2xl py-6 
              flex flex-col items-center gap-4 
              pointer-events-auto
              ${jetbrainsMono.className}
              tracking-[1.2px]
            `}
          >
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white text-sm font-normal hover:text-gray-300 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/#connect"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-black bg-white hover:bg-white/80 px-8 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Connect
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};