'use client';

import { FC, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import image1 from "@/assets/images/testimonial-1.jpg";
import image2 from "@/assets/images/testimonial-2.jpg";
import image3 from "@/assets/images/testimonial-3.jpg";

const testimonials = [
  {
    name: "| HTML5 | CSS3 | JavaScript",
    company: "| Vue.js | Tailwind CSS | Typescript |",
    role: "| React.js | Vite.js ",
    quote:
      "Frontend is the art of transforming code into stunning, interactive experiences that bring websites to life at the fingertips of users.",
    image: image1,
    imagePositionY: 0.2,
  },
  {
    name: "| Node.js | PHP |",
    company: " Python | Laravel |",
    role: " Express.js |",
    quote:
      "Backend is the powerhouse where logic, data, and seamless connectivity work behind the scenes to make every digital experience possible.",
    image: image2,
    imagePositionY: 0.1,
  },
  {
    name: "| PostgreSQL | MySQL | Oracle | MongoDB |",
    company: " Cloudflare | AWS | GCP |",
    role: " Gemini | ChatGPT |",
    quote:
      "Databases power organized insights, while the cloud unlocks boundless scalability and innovation, together driving the heartbeat of modern technology.",
    image: image3,
    imagePositionY: 0.55,
  },
];

const Testimonials: FC = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const titleRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "end start"],
  });

  const transformTop = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const transformBottom = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const currentTestimonial = testimonials[testimonialIndex];

  // Typewriter Effect Logic
  useEffect(() => {
    const words = currentTestimonial.quote.split(" ");
    if (typingIndex < words.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => (prev ? `${prev} ${words[typingIndex]}` : words[typingIndex]));
        setTypingIndex(typingIndex + 1);
      }, 150); // Delay between words
      return () => clearTimeout(timeout);
    }
  }, [typingIndex, currentTestimonial]);

  useEffect(() => {
    // Reset typewriter effect on testimonial change
    setTypedText("");
    setTypingIndex(0);
  }, [testimonialIndex]);

  // Navigation functions
  const handlePrev = () =>
    setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const handleNext = () =>
    setTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  return (
    <section id="testimonials" className="section">
      {/* Animated Title */}
      <h2
        className="text-4xl md:text-6xl lg:text-7xl flex flex-col overflow-hidden tracking-tighter"
        ref={titleRef}
      >
        <motion.span
          className="whitespace-nowrap"
          style={{
            x: transformBottom,
          }}
        >
          Tech Stack Used Till Date
        </motion.span>
        <motion.span
          className="whitespace-nowrap self-end text-red-orange-500"
          style={{
            x: transformTop,
          }}
        >
          Skills I Possess Over The Years
        </motion.span>
      </h2>

      {/* Testimonials Content */}
      <div className="container mt-16 lg:mt-12">
        <div className="grid md:grid-cols-5 md:gap-4 lg:gap-8 md:items-center">
          {/* Image with 3D Panel and Swipe Effect */}
          <div className="relative md:col-span-2 rounded-lg overflow-hidden shadow-lg perspective-1000 bg-black">
            <motion.div
              key={currentTestimonial.image.src}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg shadow-md bg-black transform rotateY-0"
            >
              <Image
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                className="w-full h-auto object-cover rounded-lg"
              />
            </motion.div>
          </div>

          {/* Quote with Word-by-Word Typewriter Effect */}
          <blockquote className="md:col-span-3">
            <div className="text-3xl md:text-5xl lg:text-6xl mt-6 md:mt-0">
              <span></span>
              <motion.span key={typedText} className="inline-block">
                {typedText}
              </motion.span>
              <span></span>
            </div>
            <cite className="mt-4 md:mt-6 not-italic block md:text-lg lg:text-xl">
              {[currentTestimonial.name, currentTestimonial.role, currentTestimonial.company]
                .filter(Boolean) // Filters out any empty strings or null values
                .join(" ")}
            </cite>
          </blockquote>
        </div>
      </div>

      {/* Navigation Buttons with 3D Effect */}
      <div className="flex gap-4 mt-8 lg:mt-12 justify-center">
        <button
          onClick={handlePrev}
          className="border border-stone-400 size-11 inline-flex items-center justify-center rounded-full shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-110 transition-transform duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="border border-stone-400 size-11 inline-flex items-center justify-center rounded-full shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-110 transition-transform duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
