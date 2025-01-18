'use client';

import { useEffect, useState } from 'react';
import Header from "@/sections/Header";
import Hero from "@/sections/Hero";
import Intro from "@/sections/Intro";
import Projects from "@/sections/Projects";
import Testimonials from "@/sections/Testimonials";
import FAQs from "@/sections/FAQs";
import Touch from "@/sections/Touch";
import Footer from "@/sections/Footer";
import './globals.css'; // Import global styles

export default function Home() {
  const [theme, setTheme] = useState('light');

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

  return (
    <>
      {/* Main content */}
      <Header/>
      <Hero />
      <Intro />
      <Projects />
      <Testimonials />
      <FAQs />
      <Touch />
      <Footer />
    </>
  );
}
