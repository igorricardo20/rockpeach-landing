import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { LangContext } from "./Navbar";
// Button import removed: CTA now uses .liquid-button anchor

const Hero: React.FC = () => {
  const { lang } = useContext(LangContext);
  const translations = {
    en: {
      headline1: "We develop software with ",
      headline2: "agility, beauty and purpose.",
      sub: "Transforming ideas into functional, beautiful digital products ready to scale.",
      cta: "Start your free concept",
      learn: "Learn more",
    },
    nl: {
      headline1: "Wij ontwikkelen software met ",
      headline2: "snelheid, schoonheid en doelgerichtheid.",
      sub: "We vertalen ideeën naar functionele, prachtige digitale producten die klaar zijn om te groeien.",
      cta: "Start je gratis concept",
      learn: "Meer weten",
    },
  } as const;
  type Lang = keyof typeof translations;
  const safeLang: Lang = ["en", "nl"].includes(lang) ? (lang as Lang) : "en";
  const t = translations[safeLang];

  const scrollToProcess = () => {
    const processSection = document.getElementById("process");
    if (processSection) processSection.scrollIntoView({ behavior: "smooth" });
  };

  // Render headline2 by splitting on common separators so translations still work
  const renderHeadline2 = (text: string) => {
    // Render the whole headline2 as a single element (no splitting needed)
    return (
      <span className="inline hero-text-conic font-bold" data-siri>
        {text}
      </span>
    );
  };

  return (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg">
    {/* Decorative overlay for conic/radial highlights (low-opacity, non-intrusive) */}
    <div className="hero-overlay pointer-events-none" aria-hidden="true" />
      <div className="container mx-auto px-4 relative z-30 py-24">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-manrope font-semibold leading-tight mb-8">
            <span className="hero-text">{t.headline1}</span>
            <span className="hero-text">{/* keep overall headline color stable */}
              {renderHeadline2(t.headline2)}
            </span>
          </h1>

          <p className="hero-text text-lg md:text-xl mb-12 font-inter leading-relaxed max-w-3xl mx-auto">
            {t.sub}
          </p>

          <div className="flex items-center justify-center mt-6">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {/* Use the same glass-liquid pill visual as the navbar for harmony */}
              <a href="#contact" className="hero-cta inline-flex items-center justify-center text-base md:text-lg">
                <span className="font-semibold hero-text-highlight">{t.cta}</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-28 sm:bottom-20 left-0 right-0 flex justify-center"
      >
        <button
          onClick={scrollToProcess}
          className="flex flex-col items-center space-y-2 opacity-80 hover:opacity-100 transition-opacity group"
        >
          <span className="text-sm font-inter hero-text">{t.learn}</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown size={24} className="hero-text transition-colors" />
            </motion.div>
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;