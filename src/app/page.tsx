'use client';

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
  return (
    <>
      {/* Main content */}
      <Header />
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
