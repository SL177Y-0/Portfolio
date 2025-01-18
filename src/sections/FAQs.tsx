"use client";

import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge"; // Ensure you have this installed: npm install tailwind-merge

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer:
      "It depends on the complexity of the website and the scope of the project.",
  },
  {
    question: "What is your development process like?",
    answer:
      "I follow a hands-on approach starting with project planning, building out the core features, and regular check-ins to make sure everything matches your needs.",
  },
  {
    question: "What are your TechStack and How Broad is Your Vision?",
    answer:
      "My tech stack includes JavaScript (React, Node.js), Python, Java, and various cloud services like AWS. But I am open to exploring new technologies and looking into various domains like Cloud, AI, ML, and Data.",
  },
  {
    question:
      "Do you prefer working independently or in a team environment, and why?",
    answer:
      "I enjoy working in teams as it fosters collaboration, learning, and creating better solutions through diverse perspectives.",
  },
  {
    question: "How do you stay updated with the ever-changing landscape of web technologies?",
    answer:
      "I follow tech blogs, take online courses, attend conferences, and participate in developer communities.",
  },
  {
    question: "How Can We Work With You?",
    answer:
      "Oh, it’s simple! Just drop a mail at sl177y.log0@gmail.com or find me on LinkedIn.",
  },
];

const FAQs: FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="section">
      {/* Adding id for scrolling */}
      <div className="container">
        <h2 className="text-4xl md:text-6xl lg:text-7xl">FAQs</h2>
        <div className="mt-10 md:mt-16 lg:mt-20">
          {faqs.map(({ question, answer }, faqIndex) => (
            <div
              key={question}
              className="border-t border-stone-400 border-dotted py-6 md:py-8 lg:py-10 last:border-b relative isolate group"
              onClick={() =>
                setSelectedIndex(faqIndex === selectedIndex ? null : faqIndex)
              }
            >
              <div
                className={twMerge(
                  "absolute h-0 w-full bottom-0 left-0 bg-stone-300 -z-10 group-hover:h-full transition-all duration-700",
                  faqIndex === selectedIndex && "h-full"
                )}
              ></div>
              <div
                className={twMerge(
                  "flex items-center justify-between gap-4 transition-all duration-700 group-hover:lg:px-8"
                )}
              >
                <div className="text-2xl md:text-3xl lg:text-4xl">{question}</div>
                <div
                  className={twMerge(
                    "inline-flex items-center justify-center size-11 border border-stone-400 rounded-full shrink-0 transition duration-300",
                    faqIndex === selectedIndex && "rotate-45"
                  )}
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
              </div>
              <AnimatePresence>
                {faqIndex === selectedIndex && (
                  <motion.div
                    className="overflow-hidden lg:px-8"
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    <p className="text-xl mt-4">{answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
