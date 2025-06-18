import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LangContext } from "./Navbar";

const About: React.FC = () => {
  const { lang } = useContext(LangContext);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Localization dictionary
  const translations = {
    en: {
      about: "About us",
      projects: "Our projects",
      process: "How we work",
      services: "What we deliver",
      contact: "Let's talk?",
      aboutText1:
        "At Rockpeach, we believe technology goes beyond code, it's about creating experiences that connect people and businesses. We develop software with agility and excellence, using modern tools to quickly deliver what our clients need.",
      aboutText2:
        "We combine speed, reliability, and a keen eye for design. We turn concepts into products that drive success.",
      stat1: "Prototypes Shipped",
      stat1desc: "Apps, MVPs & experiments",
      stat2: "Commitment",
      stat2desc: "Attention to every detail",
      stat3: "Countries Served",
      stat3desc: "Europe & South America",
    },
    nl: {
      about: "Over ons",
      projects: "Onze projecten",
      process: "Hoe wij werken",
      services: "Wat wij leveren",
      contact: "Contact opnemen?",
      aboutText1:
        "Bij Rockpeach geloven we dat technologie verder gaat dan code; het draait om het creëren van ervaringen die mensen en bedrijven verbinden. We ontwikkelen software met wendbaarheid en uitmuntendheid, met moderne tools om snel te leveren wat onze klanten nodig hebben.",
      aboutText2:
        "We combineren snelheid, betrouwbaarheid en een scherp oog voor design. We vertalen concepten naar producten die succes brengen.",
      stat1: "Geleverde prototypes",
      stat1desc: "Apps, MVP's & experimenten",
      stat2: "Toewijding",
      stat2desc: "Aandacht voor elk detail",
      stat3: "Landen bediend",
      stat3desc: "Europa & Zuid-Amerika",
    },
  } as const;
  type Lang = keyof typeof translations;
  const safeLang: Lang = ["en", "nl"].includes(lang) ? (lang as Lang) : "en";
  const t = translations[safeLang];

  return (
    <section id="about" className="py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-manrope font-bold mb-6 text-gray-900">
                {t.about}
              </h2>
              <div className="prose prose-lg max-w-none px-2 sm:px-0">
                <p className="text-lg leading-relaxed text-gray-700 mb-6 font-inter">
                  {t.aboutText1}
                </p>
                <p className="text-lg leading-relaxed text-gray-700 mb-6 font-inter">
                  {t.aboutText2}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-8 items-center justify-center lg:justify-start lg:gap-6">
                {[
                  {
                    color: "text-primary-600",
                    value: "16+",
                    title: t.stat1,
                    desc: t.stat1desc,
                  },
                  {
                    color: "text-secondary-600",
                    value: "100%",
                    title: t.stat2,
                    desc: t.stat2desc,
                  },
                  {
                    color: "text-accent-600",
                    value: "3+",
                    title: t.stat3,
                    desc: t.stat3desc,
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-card-gradient border border-gray-100 rounded-xl px-6 py-4 flex flex-col sm:flex-row items-center justify-center shadow-sm min-w-[260px] max-w-[360px] w-full lg:w-[260px] text-center h-[120px]"
                    style={{ flex: '0 0 auto' }}
                  >
                    <div
                      className={`mr-0 sm:mr-4 mb-2 sm:mb-0 font-manrope font-bold text-2xl ${stat.color}`}
                    >
                      {stat.value}
                    </div>
                    <div className="font-inter text-center">
                      <h3 className="font-medium">{stat.title}</h3>
                      <p className="text-sm text-gray-600">{stat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 order-1 lg:order-2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl w-full max-w-xs sm:w-full sm:h-auto md:max-w-full md:w-full md:h-auto h-52 xs:h-64 sm:h-40 lg:h-auto">
                  <img
                    src="/colleagues.png"
                    alt="Our team working"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0))",
                    }}
                  ></div>
                </div>
                {/* Removed floating circles for a more professional look */}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;