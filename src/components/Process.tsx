import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
// icons and legacy process data removed. Replaced by a simple 4-step roadmap.
import { LangContext } from "./Navbar";

const Process: React.FC = () => {
  const { lang } = useContext(LangContext);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  

  // per-step sequence: animate node -> title -> body -> arrow
  const stepVariant = {
    hidden: {},
    show: { transition: { staggerChildren: 0.25 } },
  };

  const childVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9 } },
  };

  const arrowVariant = {
    hidden: { opacity: 0, scale: 0.85 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  // Localization dictionary
  const translations = {
    en: {
      process: "How we work",
    processDesc: "A simple, low-risk roadmap, we show you value before you commit.",
      step1Title: "Discovery",
    step1: "We talk, you tell us the goals. We make a short concept so you can see the idea. No upfront cost.",
  step2Title: "Build",
  step2: "We build quickly and clearly, using tools, automation and AI to keep things fast and consistent.",
      step3Title: "Polish",
      step3: "We refine design and performance with your feedback until it feels right.",
      step4Title: "Launch",
      step4: "We launch the product and stay available for fixes and improvements.",
    },
    nl: {
      process: "Hoe we werken",
    processDesc: "Een eenvoudige, laagdrempelige roadmap, we tonen waarde voordat je kiest.",
      step1Title: "Ontdekken",
    step1: "We praten en luisteren. Daarna maken we een kort concept zodat je het idee ziet. Nog geen kosten.",
  step2Title: "Bouwen",
  step2: "We bouwen snel en netjes, met tools, automatisering en AI om het soepel te houden.",
      step3Title: "Fijnslijpen",
      step3: "We verfijnen design en prestaties met jouw feedback totdat het klopt.",
      step4Title: "Lanceren",
      step4: "We lanceren en blijven beschikbaar voor fixes en verbeteringen.",
    },
  } as const;
  type Lang = keyof typeof translations;
  const safeLang: Lang = ["en", "nl"].includes(lang) ? (lang as Lang) : "en";
  const t = translations[safeLang] || translations.en;

  // per-step explicit colors for the numbers (only these should be colored)
  const stepColors = [
    'rgba(var(--light-blue), 1)',
    'rgba(var(--medium-blue), 1)',
    'rgba(var(--strong-purple), 1)',
    'rgba(var(--strong-pink), 1)',
  ];
  
  return (
    <section id="process" className="py-16 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-8 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-manrope font-bold mb-6 text-gray-900">
            {t.process}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-inter">
            {t.processDesc}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="w-full"
        >
          {(() => {
            const steps = [
              { title: t.step1Title, body: t.step1 },
              { title: t.step2Title, body: t.step2 },
              { title: t.step3Title, body: t.step3 },
              { title: t.step4Title, body: t.step4 },
            ];

            return (
              <>
                {/* Mobile: stacked with circular white liquid nodes and vertical arrows */}
                <div className="md:hidden flex flex-col space-y-8">
                  {steps.map((s, idx) => (
                    <motion.div key={idx} className="flex items-start" variants={stepVariant}>
                      <motion.div variants={childVariant} className="flex-shrink-0 mr-4 flex items-center">
                        <span style={{ color: stepColors[idx] }} className="relative z-10 text-2xl md:text-3xl font-extrabold" aria-label={`Step ${idx + 1}`}>{idx + 1}</span>
                      </motion.div>

                      <div className="flex-1">
                        <motion.h4 variants={childVariant} className="text-lg font-manrope font-bold text-gray-900 mb-1">{s.title}</motion.h4>
                        <motion.p variants={childVariant} className="text-gray-700 font-inter">{s.body}</motion.p>
                      </div>

                      {/* mobile: no arrow connectors (arrows shown only on md+). */}
                    </motion.div>
                  ))}
                </div>

                {/* Desktop: horizontal simple nodes with animated arrow connectors */}
                <div className="hidden md:flex items-center w-full">
                  {steps.map((s, idx) => (
                    <React.Fragment key={idx}>
                      <motion.div className="flex-1 flex flex-col items-center text-center px-4" variants={stepVariant}>
                        <motion.span variants={childVariant} style={{ color: stepColors[idx] }} className="mb-3 text-3xl md:text-4xl font-extrabold" aria-label={`Step ${idx + 1}`}>{idx + 1}</motion.span>
                        <motion.h4 variants={childVariant} className="text-lg font-manrope font-bold text-gray-900 mb-1">{s.title}</motion.h4>
                        <motion.p variants={childVariant} className="text-gray-700 font-inter max-w-md">{s.body}</motion.p>
                      </motion.div>

                      {idx < steps.length - 1 && (
                        <div className="w-24 mx-2 relative hidden md:flex items-center">
                          <motion.img src="/arrow.png" alt="arrow" className="mx-auto w-12 h-12" variants={arrowVariant}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </>
            );
          })()}
        </motion.div>
      </div>
    </section>
  );
};

export default Process;