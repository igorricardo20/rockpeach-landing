import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { projects } from "../data/projects";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section 
      id="projects" 
      className="py-20 lg:py-32"
      style={{
        background: "linear-gradient(to bottom, #f9fafb, #f3f4f6)"
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-manrope font-bold mb-6 text-gray-900">
            Our projects
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-inter">
            We explore new possibilities through modern technologies to create impactful digital experiences.
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: '.swiper-button-prev-custom',
                nextEl: '.swiper-button-next-custom',
              }}
              className="py-10"
            >
              {projects.map((project) => (
                <SwiperSlide key={project.id} className="px-4 py-6">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 md:h-56 object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 bg-white bg-opacity-90 py-1 px-3 rounded-full text-xs font-medium text-gray-800 backdrop-blur-sm">
                        {project.type}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-manrope font-bold text-gray-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-700 mb-4 font-inter">
                        {project.description}
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center text-primary-600 font-medium hover:underline font-inter"
                      >
                        Ver detalhes
                        <ExternalLink size={16} className="ml-2" />
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                className="swiper-button-prev-custom bg-white rounded-full p-3 shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
              >
                <ChevronLeft size={20} className="text-gray-700" />
              </button>
              <button
                className="swiper-button-next-custom bg-white rounded-full p-3 shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
              >
                <ChevronRight size={20} className="text-gray-700" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;