import React, { useContext } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LangContext } from "./Navbar";

const Hero: React.FC = () => {
  const { lang } = useContext(LangContext);
  const reduceMotion = useReducedMotion();
  const isNl = lang === "nl";

  const t = isNl
    ? {
        titleLine1: "AI voor administratie.",
        titleLine2: "Meer ruimte voor advies.",
        body: "Rockpeach automatiseert documentopvolging, inboxbeheer en terugkerend werk voor Nederlandse boekhoudkantoren.",
        primary: "Plan een gratis gesprek",
        secondary: "Ontdek de mogelijkheden",
        imageAlt: "AI automatiseert de documentverwerking en inbox van een boekhoudkantoor",
      }
    : {
        titleLine1: "AI for administration.",
        titleLine2: "More room for advice.",
        body: "Rockpeach automates document follow-up, inbox handling and recurring work for Dutch bookkeeping firms.",
        primary: "Book a free call",
        secondary: "Explore the possibilities",
        imageAlt: "AI automates document processing and inbox management for a bookkeeping firm",
      };

  const entrance = reduceMotion
    ? { initial: false as const }
    : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="relative overflow-hidden bg-[#f8f4ed] pt-28 sm:pt-32 lg:pt-36">
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />

      <div className="container relative mx-auto px-4 md:px-6">
        <motion.div
          {...entrance}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl text-center"
        >
          <h1 className="font-manrope text-[2.65rem] font-bold leading-[1.03] tracking-[-0.055em] text-[#17191d] sm:text-[3.8rem] lg:text-[4.35rem]">
            <span className="block">{t.titleLine1}</span>
            <span className="mt-1 block bg-gradient-to-r from-[#17191d] via-[#3b302b] to-[#a75435] bg-clip-text text-transparent">
              {t.titleLine2}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[46rem] text-base leading-relaxed text-[#626165] sm:text-xl">
            {t.body}
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full bg-[#191b20] px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_18px_40px_rgba(25,27,32,0.18)] transition hover:-translate-y-0.5 hover:bg-[#34343a]"
            >
              {t.primary}
              <ArrowRight size={18} />
            </a>
            <a
              href="#use-cases"
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full border border-[#ded6cb] bg-white/55 px-7 py-3.5 text-[0.95rem] font-semibold text-[#313137] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-[#c9bbae] hover:bg-white/80"
            >
              {t.secondary}
              <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>

        <div
          id="workflow-example"
          className="relative left-1/2 mt-5 w-screen -translate-x-1/2 scroll-mt-28 sm:mt-7"
        >
          <motion.img
            key={lang}
            src={isNl ? "/hero-bookkeeping-ai-v1.png" : "/hero-bookkeeping-ai-en-v1.png"}
            alt={t.imageAlt}
            className="h-[32rem] w-full object-cover object-center sm:h-auto sm:aspect-[16/7.2]"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 17%, black 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 17%, black 100%)",
            }}
            initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 1.012 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
