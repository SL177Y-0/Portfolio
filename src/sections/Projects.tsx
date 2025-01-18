import { FC } from "react";
import Image from "next/image";
import image1 from "@/assets/images/project-1.jpg";
import image2 from "@/assets/images/project-2.jpg";
import image3 from "@/assets/images/project-3.jpg";
import image4 from "@/assets/images/project-4.jpg";
import image5 from "@/assets/images/project-5.jpg";

const projects = [
  {
    name: "KAPDA",
    image: image1,
  },
  {
    name: "WeGether",
    image: image2,
  },
  {
    name: "ChadAI",
    image: image3,
  },
  {
    name: "Coming Soon !",
    image: image4,
  },
  {
    name: "Coming Soon !",
    image: image5,
  },
];

const Projects: FC = () => {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="text-4xl md:text-7xl lg:text-8xl">ProjeKt</h2>
        <div className="mt-10 md:mt-16 lg:mt-20">
          {projects.map(({ name, image }) => (
            <a
              href="#"
              key={name}
              className="group relative border-t last:border-b border-stone-400 border-dotted py-6 md:py-8 lg:py-10 flex items-center justify-between overflow-hidden"
            >
              {/* Hover animation background */}
              <div className="absolute inset-0 w-full h-full bg-stone-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Project name */}
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold relative z-10">
                {name}
              </h3>

              {/* Hover image */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72">
                <Image
                  src={image}
                  alt={`${name} image`}
                  className="w-full h-full object-cover rounded-md shadow-lg"
                />
              </div>

              {/* Arrow icon */}
              <div className="ml-auto text-gray-500 relative z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1 group-hover:scale-110 duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
