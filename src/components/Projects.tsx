import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { projects } from "../data/projects";
import { LangContext } from "./Navbar";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Projects: React.FC = () => {
  const { lang } = useContext(LangContext);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Localization dictionary
  const translations = {
    en: {
      projects: "Our projects",
      projectsDesc:
        "We explore new possibilities through modern technologies to create impactful digital experiences.",
      seeDetails: "See details",
    },
    nl: {
      projects: "Onze projecten",
      projectsDesc:
        "We verkennen nieuwe mogelijkheden met moderne technologieën om impactvolle digitale ervaringen te creëren.",
      seeDetails: "Bekijk details",
    },
  } as const;
  type Lang = keyof typeof translations;
  const safeLang: Lang = ["en", "nl"].includes(lang) ? (lang as Lang) : "en";
  const t = translations[safeLang] || translations.en;

  const projectTranslations = {
    en: [
      {
        title: "Credit Card Exchange Rates",
        description:
          "Currency simulator with interactive charts and visual history for real-time currency tracking.",
        type: "Mobile & Web App",
      },
      {
        title: "TaskFlow",
        description:
          "Project management platform with intuitive kanban and advanced productivity reports.",
        type: "Web App",
      },
      {
        title: "HealthTrack",
        description:
          "Health monitoring app with IoT device integration and personalized data visualization.",
        type: "Mobile App",
      },
      {
        title: "EcoMarket",
        description:
          "Sustainable marketplace with product traceability and rewards system for conscious consumption.",
        type: "E-commerce",
      },
    ],
    nl: [
      {
        title: "Credit Card Wisselkoersen",
        description:
          "Valutasimulator met interactieve grafieken en visuele geschiedenis voor realtime valutatracking.",
        type: "Mobiel & Web App",
      },
      {
        title: "TaskFlow",
        description:
          "Projectmanagementplatform met intuïtieve kanban en geavanceerde productiviteitsrapporten.",
        type: "Web App",
      },
      {
        title: "HealthTrack",
        description:
          "Gezondheidsmonitoring-app met IoT-integratie en gepersonaliseerde datavisualisatie.",
        type: "Mobiele App",
      },
      {
        title: "EcoMarket",
        description:
          "Duurzaam platform met producttraceerbaarheid en beloningssysteem voor bewust consumeren.",
        type: "E-commerce",
      },
    ],
  } as const;

  return (
    <section
      id="projects"
      className="py-20 lg:py-32"
      style={{
        background: "linear-gradient(to bottom, #f9fafb, #f3f4f6)",
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
            {t.projects}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-inter">
            {t.projectsDesc}
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Swiper
              modules={[Navigation, Pagination]}
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
              pagination={{ clickable: true }}
              navigation={{
                prevEl: ".swiper-button-prev-custom",
                nextEl: ".swiper-button-next-custom",
              }}
              className="py-10"
            >
              {projects.map((project, idx) => (
                <SwiperSlide key={project.id} className="px-4 py-6">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 md:h-56 object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 bg-white bg-opacity-90 py-1 px-3 rounded-full text-xs font-medium text-gray-800 backdrop-blur-sm">
                        {projectTranslations[safeLang][idx].type}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-manrope font-bold text-gray-900 mb-2">
                        {projectTranslations[safeLang][idx].title}
                      </h3>
                      <p className="text-gray-700 mb-4 font-inter">
                        {projectTranslations[safeLang][idx].description}
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center text-primary-600 font-medium hover:underline font-inter"
                      >
                        {t.seeDetails}
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