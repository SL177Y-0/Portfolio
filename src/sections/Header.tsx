'use client';

import { FC, useEffect, useState } from 'react';
import Button from "@/components/Button";

const Header1: FC = () => {
  const [theme, setTheme] = useState('light');
  const [menuOpen, setMenuOpen] = useState(false);

  // Set the initial theme based on localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Toggle the theme between light and dark
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save the theme in localStorage
  };

  // Toggle the dropdown menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle smooth scroll to target section
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent default link behavior
    const href = e.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }

    setMenuOpen(false); // Close the menu after navigation
  };

  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/80 dark:bg-black/50 z-50">
      <div className="container !max-w-full">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <div>
            <a href="/">
              <span className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase">
                Rishi_<span className="text-orange-500">Rawat</span>
              </span>
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Contact Me Button - Shown in Dropdown on Mobile */}
            <a
              href="https://www.linkedin.com/in/sl177y/"
              target="_blank"
              rel="noopener noreferrer"
              className="md:hidden order-1"
            >
              <Button variant="primary" className="inline-flex">
                Connect
              </Button>
            </a>

            {/* Circle with SVG button */}
            <div className="relative z-10 order-2">
              <button
                onClick={toggleMenu}
                className={`w-11 h-11 border border-stone-400 rounded-full flex items-center justify-center bg-stone-200 dark:bg-stone-700 transform transition-transform ${
                  menuOpen ? 'rotate-90' : ''
                }`}
              >
                <svg
                  className="w-6 h-6 fill-current text-black dark:text-white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="3" y="15" width="18" height="2" fill="currentColor" />
                  <rect x="3" y="7" width="18" height="2" fill="currentColor" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                  <ul className="py-2">
                    <li>
                      <a
                        href="#intro"
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={handleSmoothScroll}
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        href="#projects"
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={handleSmoothScroll}
                      >
                        Projects
                      </a>
                    </li>
                    <li>
                      <a
                        href="#testimonials"
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={handleSmoothScroll}
                      >
                        Skills
                      </a>
                    </li>
                    <li>
                      <a
                        href="#faqs"
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={handleSmoothScroll}
                      >
                        FAQs
                      </a>
                    </li>
                    <li>
                      <a
                        href="#touch"
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={handleSmoothScroll}
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle Switch */}
            <div className="relative flex items-center justify-center md:order-3">
              <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggleTheme}
                className="hidden"
                id="theme-toggle"
              />
              <label
                htmlFor="theme-toggle"
                className="cursor-pointer flex items-center justify-between w-12 h-6 rounded-full p-1 transition-all duration-300 ease-in-out"
                style={{
                  backgroundColor: theme === 'light' ? '#000' : '#fff',
                }}
              >
                <span
                  className={`w-4 h-4 rounded-full transform transition-transform duration-300 ${
                    theme === 'dark'
                      ? 'bg-black translate-x-6'
                      : 'bg-white translate-x-0'
                  }`}
                ></span>
              </label>
            </div>

            {/* Contact Me Button - Larger screens */}
            <a
              href="https://www.linkedin.com/in/sl177y/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex"
            >
              <Button variant="primary">Connect</Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header1;
