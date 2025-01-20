import { FC, useEffect, useState, useRef } from "react";

const Intro: FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollTrigger, setScrollTrigger] = useState(0); // Track scroll trigger for resetting animation
  const sectionRef = useRef<HTMLDivElement>(null);

  // Update screen size state on component mount and window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Change the threshold if needed
    };

    handleResize(); // Check screen size on mount
    window.addEventListener("resize", handleResize); // Listen for resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up the event listener
    };
  }, []);

  // Detect scroll events to trigger animation reset
  useEffect(() => {
    const handleScroll = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect && rect.top >= 0 && rect.bottom <= window.innerHeight) {
        setScrollTrigger((prev) => prev + 1); // Increment scroll trigger to reset animation
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up event listener
    };
  }, []);

  // Split text into words and apply fade-in animation for each word
  const splitTextIntoWords = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span
        key={`${word}-${scrollTrigger}-${index}`} // Unique key for each word and scroll event
        className="fade-in-from-bottom"
        style={{
          animationDelay: `${index * 0.5}s`, // Delay each word's animation
        }}
      >
        {word}{" "}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="intro"
      className="section min-h-[50vh] mt-[50px] z-10 relative"
    >
      <div className="container">
        {/* Adjust spacing based on screen size */}
        <div className={isMobile ? "mt-[50px]" : "mt-[50px]"}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl lg:w-[90%] mt-4">
            {splitTextIntoWords(
              "Shaping The Future Of Web   Design | Develop | Deliver | Turning Digital Challenges Into Elegant Solutions"
            )}
          </h2>
          <h3>
            <div className="text-4xl md:text-6xl lg:text-7xl lg:w-[65%] mt-12">
              {splitTextIntoWords(
                "Tech Enthusiast | Web Dev | Data Analyst | AI/ML Fanboy | Tech Mechanic |"
              )}
            </div>
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Intro;
