import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LangContext } from "./Navbar";
import { WavyBackground } from "./ui/wavy-background";

const About: React.FC = () => {
  const { lang } = useContext(LangContext);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  // Localization dictionary (kept the original texts)
  const translations = {
    en: {
      about: "About us",
      projects: "Our projects",
      process: "How we work",
      services: "What we deliver",
      contact: "Start your free concept",
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
      contact: "Start je gratis concept",
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
  <section id="about" className="relative py-20 lg:py-32 hero-bg overflow-hidden min-h-[520px] md:min-h-[760px] flex items-center">
    {/* Wavy animated background (uses component defaults matching Hero) */}
    <WavyBackground verticalOffset="18%" />
      <div className="container mx-auto px-4 md:px-6 relative z-30">
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={variants} transition={{ duration: 0.7 }}>
          <div className="mx-auto max-w-4xl w-full">
            <div className="text-center lg:text-left px-4 md:px-0 flex flex-col justify-center h-full">
              <h2 className="text-3xl md:text-4xl font-manrope font-bold mb-4 text-gray-900">{t.about}</h2>
              <div className="prose prose-lg mx-auto text-gray-700 max-w-none">
                <p className="mb-4 font-inter text-lg leading-relaxed">{t.aboutText1}</p>
                <p className="mb-6 font-inter text-lg leading-relaxed">{t.aboutText2}</p>
              </div>

              <div className="mt-6">
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  {[
                    { color: "text-black", value: "16+", title: t.stat1, desc: t.stat1desc },
                    { color: "text-blue-500", value: "100%", title: t.stat2, desc: t.stat2desc },
                    { color: "text-red-600", value: "3+", title: t.stat3, desc: t.stat3desc },
                  ].map((stat, idx) => (
                    <div key={idx} className="glass super-glassy rounded-full px-6 py-3 sm:px-8 sm:py-4 flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 w-full sm:w-[48%] md:w-[32%] text-center sm:text-left">
                      <div className={`font-manrope font-bold ${stat.color} text-lg sm:text-xl md:text-2xl`}>{stat.value}</div>
                      <div className="font-inter text-sm">
                        <h3 className="font-medium text-gray-900">{stat.title}</h3>
                        <p className="text-gray-600">{stat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;