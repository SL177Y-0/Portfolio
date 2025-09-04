"use client";

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { twMerge } from "tailwind-merge"
import { BodyCanvas } from "@/components/three/body-model"

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer:
      "The timeline for building a website depends on its complexity. A simple static site can be done in 1–2 weeks, while a feature-rich platform might take 4–8 weeks. Factors like design, functionality, and testing will determine the final duration.",
  },
  {
    question: "What is your development process like?",
    answer:
      "I follow an agile development approach, starting with understanding requirements and creating wireframes. After development, I focus on continuous feedback, testing, and optimizing for performance. Post-launch, I provide ongoing support and updates.",
  },
  {
    question: "What are your TechStack and How Broad is Your Vision?",
    answer:
      "My TechStack is diverse and covers all aspects of web development. For frontend development, I use React.js, Next.js, Tailwind CSS, and Vite for building fast, responsive, and visually appealing user interfaces. For backend, I specialize in Node.js, NestJS, Express.js, and FastAPI, ensuring scalable and efficient server-side architecture. I work with Solidity, Ethers.js, Web3.js, and Hardhat to build decentralized applications (dApps) and for Mobile Developement something like React Native , ElectronJs For Cross Platform Compatibility and integrate blockchain technology. For databases, I am proficient in PostgreSQL, MongoDB, MySQL, and Supabase, allowing flexible and efficient data management. In AI, I leverage platforms like HuggingFace API, Phaser.js, and LLM integrations to add intelligent features. For cloud services and DevOps, I use AWS, Docker, CI/CD pipelines, and Vercel to ensure scalability, security, and easy deployment. My vision goes beyond traditional development; I focus on integrating AI and blockchain into applications, aiming to create high-performance, secure, and scalable solutions that push the boundaries of technology.",
  },
  {
    question:
      "Do you prefer working independently or in a team environment, and why?",
    answer:
      "I value both independent work for deep focus and teamwork for idea exchange. Working independently helps me deliver results quickly, while collaboration sparks creativity. I thrive in environments that balance both approaches for optimal productivity.",
  },
  {
    question: "How do you stay updated with the ever-changing landscape of web technologies?",
    answer:
      "I stay updated through continuous learning, reading industry blogs, and attending tech conferences. I also experiment with new tools and technologies to keep my skills sharp. Active engagement in open-source projects further enhances my knowledge",
  },
  {
    question: "How Can We Work With You?",
    answer:
      "You can reach me via email at sl177y.log0@gmail.com to discuss your project. I offer tailored solutions for AI-driven platforms, blockchain dApps, and web applications. Let’s collaborate to bring your ideas to life with modern, scalable technologies.",
  },
  {
    question: "Can you work with different time zones?",
    answer:
      "Absolutely. I have experience collaborating with teams across the globe and am flexible with my working hours to accommodate different time zones, ensuring smooth communication and project progress.",
  },
];

export default function FAQSection() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    return (
        <section id="faq" className="section-padding bg-black">
            <div className="container mx-auto">
                <div className="text-center mb-0">

                </div>
                <div>
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
                                    "flex items-center gap-2 md:gap-3 lg:gap-4 transition-all duration-700 group-hover:lg:px-8"
                                )}
                            >
                                <div className="font-content font-bold text-2xl md:text-3xl lg:text-4xl flex-1 text-white group-hover:text-black transition-colors duration-700">{question}</div>
                                <div
                                    className={twMerge(
                                        "inline-flex items-center justify-center size-11 shrink-0 transition duration-300 text-white group-hover:text-black",
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
                                        <p className="font-content text-xl mt-4 text-white group-hover:text-black transition-colors duration-700">{answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
