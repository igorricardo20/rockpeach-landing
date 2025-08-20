import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { LangContext } from "./Navbar";

const Hero: React.FC = () => {
  const { lang } = useContext(LangContext);
  const translations = {
    en: {
      headline1: "We develop software with ",
      headline2: "agility, beauty and purpose",
      sub: "Transforming ideas into functional, beautiful digital products ready to scale.",
      cta: "Let's talk",
      learn: "Learn more",
    },
    nl: {
      headline1: "Wij ontwikkelen software met ",
      headline2: "snelheid, schoonheid en doelgerichtheid",
      sub: "We vertalen ideeën naar functionele, prachtige digitale producten die klaar zijn om te groeien.",
      cta: "Contact opnemen",
      learn: "Meer weten",
    },
  } as const;
  type Lang = keyof typeof translations;
  const safeLang: Lang = ["en", "nl"].includes(lang) ? (lang as Lang) : "en";
  const t = translations[safeLang];

  const scrollToProcess = () => {
    const processSection = document.getElementById("process");
    if (processSection) {
      processSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
    >
      {/* Animated Diagonal White Container */}
      <motion.div
        className="hidden lg:block absolute top-0 right-0 h-full w-1/2 z-10"
        aria-hidden="true"
        initial={{
          clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
        }}
        animate={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 10% 100%)',
        }}
        transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
        style={{
          backgroundImage: `url('/hero2.png')`,
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />
      {/* Animated Diagonal Blue Line (appears after white, animates left to right) */}
      <motion.div
        className="hidden lg:block pointer-events-none absolute top-0 right-0 h-full w-1/2 z-20"
        aria-hidden="true"
        initial={{
          clipPath: 'polygon(0 0, 0 0, 10% 100%, 10% 100%)',
        }}
        animate={{
          clipPath: 'polygon(0 0, 3% 0, 13% 100%, 10% 100%)',
        }}
        transition={{ duration: 1, ease: [0.77, 0, 0.175, 1], delay: 1.2 }}
      >
          <div
            className="absolute right-0 top-0 h-full w-full"
            style={{
              opacity: 0.35,
              background: 'linear-gradient(90deg, #0077ff 0%, #ff0055 100%)',
              boxShadow: '0 0 12px 2px rgba(0,119,255,0.08)',
            }}
          ></div>
      </motion.div>

  <div className="container mx-auto px-1 md:px-2 lg:pl-0 xl:pl-0 relative z-30 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-manrope font-bold text-gray-900 leading-tight mb-6">
              {t.headline1}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                {t.headline2}
              </span>
            </h1>
            <p className="text-gray-700 text-lg md:text-xl mb-8 font-inter leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t.sub}
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-primary-600 to-accent-600 text-white font-inter font-semibold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t.cta}
            </motion.a>
          </motion.div>
          {/* The right column is intentionally left empty to allow the background image to show through */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-20 sm:bottom-8 left-0 right-0 mx-auto flex justify-center w-full
          lg:left-[25%] lg:right-auto lg:w-auto lg:translate-x-[-50%] lg:justify-center"
        style={{ maxWidth: 'none' }}
      >
        <button
          onClick={scrollToProcess}
          className="flex flex-col items-center space-y-2 opacity-80 hover:opacity-100 transition-opacity group"
        >
          <span className="text-sm font-inter">{t.learn}</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={24} className="text-gray-700 group-hover:text-primary-600 transition-colors" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;