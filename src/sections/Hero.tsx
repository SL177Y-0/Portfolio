'use client';

import { FC, useEffect, useState, useRef } from "react";
import heroImage from "@/assets/images/hero-image.jpg";
import Image from "next/image";
import Button from "@/components/Button";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero: FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const scrollingDiv = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollingDiv,
    offset: ["start end", "end end"],
  });

  const portraitWidth = useTransform(scrollYProgress, [0, 1], ["100%", "240%"]);

  const checkScreenSize = () => {
    if (window.innerWidth <  757 || window.innerHeight < 766) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const splitTextIntoWords = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span
        key={index}
        className="fade-in-text"
        style={{
          animationDelay: `${index * 0.1}s`,
        }}
      >
        {word}{" "}
      </span>
    ));
  };

  return (
    <section className="relative">
      <div className="grid md:grid-cols-12 md:h-screen items-stretch sticky top-0">
        <div className="md:col-span-7 flex flex-col justify-center">
          <div className="container !max-w-full">
            <h1 className="text-5xl md:text-6xl lg:text-7xl mt-40 md:mt-0">
              {splitTextIntoWords(
                "Crafting Web Experiences @ One Pixel Per MilliSecond"
              )}
            </h1>
            <div className="flex flex-col md:flex-row md:items-center mt-10 items-start gap-6">
              <Button
                variant="secondary"
                onClick={() => {
                  const projectsSection = document.getElementById("projects");
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`fade-in-text`}
                style={{
                  animationDelay: `1s`,
                }}
                iconAfter={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                    />
                  </svg>
                }
              >
                <span>View My Projects</span>
              </Button>
              <Button
                variant="text"
                className={`fade-in-text`}
                style={{
                  animationDelay: `1.5s`,
                }}
              >
                <a
                  href="https://github.com/SL177Y-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 relative">
          {isSmallScreen ? (
            <div className="relative mt-6">
              <Image
                src={heroImage}
                alt="My Portrait"
                className="w-full h-full object-cover z-0"
              />
            </div>
          ) : (
            <motion.div
              className="absolute top-[4rem] md:top-[6rem] md:right-0 w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)]"
              style={{
                width: portraitWidth,
              }}
            >
              <Image
                src={heroImage}
                alt="My Portrait"
                className="w-full h-full object-cover z-0"
              />
            </motion.div>
          )}
        </div>
      </div>
      {/* Adjust the height for small screens */}
      <div
        className={isSmallScreen ? "h-[120vh]" : "h-[200vh]"}
        ref={scrollingDiv}
      ></div>
    </section>
  );
};

export default Hero;
