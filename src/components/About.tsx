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
      stat1desc: "POCs, MVPs",
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
    <section
      id="about"
      className="py-20 lg:py-32 overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, rgba(0,147,237,0.05) 0%, rgba(213,95,127,0.05) 100%)"
      }}
    >
      {/* Diagonal image background on the left, like Hero but inverted */}
        {/* Diagonal image for desktop, full image for mobile */}
    {/* Hide image on mobile */}
        <motion.div
          className="hidden lg:block absolute top-0 left-0 h-full w-[47%] z-10"
          aria-hidden="true"
          initial={{
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
          }}
          animate={inView ? {
            clipPath: 'polygon(0 0, 96% 0, 100% 100%, 0 100%)',
          } : {
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
          }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          style={{
            backgroundImage: `url('/colleagues.png')`,
            backgroundPosition: 'left center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            clipPath: 'polygon(0 0, 96% 0, 100% 100%, 0 100%)',
          }}
        />
  {/* Blue accent line removed */}
  <div className="container mx-auto px-0 md:px-0 relative z-30 max-w-none">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.8 }}
        >
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* The left column is intentionally left empty to allow the background image to show through */}
            <div className="hidden lg:block lg:col-span-2 order-1 lg:order-1" />
            <div className="lg:col-span-3 order-2 lg:order-2 flex flex-col justify-between h-full items-center lg:items-start text-center lg:text-left w-full mx-auto max-w-5xl px-2 sm:px-4 md:px-8 lg:pl-16 xl:pl-24">
              <h2 className="text-3xl md:text-4xl font-manrope font-bold mb-6 text-gray-900">
                {t.about}
              </h2>
              <div className="prose prose-lg w-full px-2 sm:px-0 mx-auto flex-1 flex flex-col justify-center max-w-5xl">
                <p className="text-lg leading-relaxed text-gray-700 mb-6 font-inter">
                  {t.aboutText1}
                </p>
                <p className="text-lg leading-relaxed text-gray-700 mb-6 font-inter">
                  {t.aboutText2}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-8 items-center justify-center lg:justify-start lg:gap-2 w-full max-w-5xl">
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
                    className="bg-card-gradient border border-gray-100 rounded-xl px-6 py-4 flex flex-col sm:flex-row items-center justify-center shadow-sm max-w-[360px] w-full sm:w-[32%] text-center h-[120px]"
                    style={{ flex: '1 1 0%' }}
                  >
                    <div
                      className={`mr-0 sm:mr-4 mb-2 sm:mb-0 font-manrope font-bold ${stat.color}`}
                      style={{ fontSize: 'clamp(0.95rem, 3vw, 1.4rem)' }}
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
            {/* The right column is intentionally left empty to allow the background image to show through */}
            <div className="hidden lg:block lg:col-span-2 order-1 lg:order-2" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;