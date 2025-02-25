import { FC, useState, useEffect } from "react";
import Button from "@/components/Button";

const navitems = [
  { href: "#", label: "Home" },
  { href: "#projects", label: "ProjeKt" },
  { href: "#testimonials", label: "Skill" },
  { href: "#faqs", label: "FAQs" },
  { href: "#touch", label: "Contact" },
];

const Footer: FC = () => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(true);
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
    <footer className="bg-stone-900 text-white py-12">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="md:w-1/2">
          {/* Availability */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-purple-700"></div>
            <span className="text-sm font-medium uppercase tracking-wide">
              Working At Cluster Protocol
            </span>
          </div>

          {/* Main Text with Typewriter Effect */}
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight"
            style={{
              animation: hasLoaded
                ? "fadeInFromBottom 2s ease-out forwards"
                : "none",
            }}
          >
            {splitTextIntoWords("Enough talk. Let's make something great together.")}
          </h2>

          {/* Contact Button wrapped in an anchor tag for mailto: */}
          <a href="mailto:sl177y.log0@gmail.com">
            <Button
              variant="secondary"
              className="mt-8 inline-flex items-center gap-2 text-lg px-6 py-3 border border-red-500 text-black hover:bg-red-500 hover:text-white transition"
              iconAfter={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              }
            >
              sl177y.log0@gmail.com
            </Button>
          </a>
        </div>

        {/* Right Navigation Section */}
        <nav className="mt-12 md:mt-0 md:w-1/3 flex flex-col gap-6 text-lg items-end">
          {navitems.map(({ href, label }) => (
            <a
              href={href}
              key={label}
              className="hover:underline hover:text-green-400 transition"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* Footer Bottom Section */}
      <p className="mt-16 text-white/30 text-sm text-center md:text-center">
        Copyright &copy; Rishi Rawat &bull; All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
