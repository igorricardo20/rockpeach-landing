import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { LangContext } from "./Navbar";

const Hero: React.FC = () => {
  const { lang } = useContext(LangContext);
  const primaryCtaRef = useRef<HTMLAnchorElement | null>(null);
  const translations = {
    en: {
      headline1: "Turn the messy idea into ",
      headline2: "a product people can use.",
      sub: "Bring the rough version. We shape the first concept, prototype the useful parts, and build the system behind it with a small team and clear decisions.",
      cta: "Start with a free concept",
      secondaryCta: "See the process",
      learn: "Learn more",
      proof1: "No sales theatre",
      cardTitle: "A working first version, not a slide deck.",
      cardSubtitle: "Concept sprint",
      cardItem1: "Direction",
      cardItem1Desc: "Define the right problem to solve",
      cardItem2: "Prototype",
      cardItem2Desc: "Build and test a working solution",
      cardItem3: "Build Plan",
      cardItem3Desc: "Create a clear path forward",
      cardMetric1: "48h",
      cardMetric1Label: "first direction",
      cardMetric2: "7d",
      cardMetric2Label: "focused sprint",
    },
    nl: {
      headline1: "Maak van een rommelig idee ",
      headline2: "een product dat werkt.",
      sub: "Breng de ruwe versie. Wij vormen het eerste concept, prototypen wat nuttig is en bouwen het systeem erachter met een klein team en duidelijke keuzes.",
      cta: "Start met een gratis concept",
      secondaryCta: "Bekijk het proces",
      learn: "Meer weten",
      proof1: "Geen verkooppraatje",
      cardTitle: "Een werkende eerste versie, geen slide deck.",
      cardSubtitle: "Concept sprint",
      cardItem1: "Richting",
      cardItem1Desc: "De juiste vraag bepalen om op te lossen",
      cardItem2: "Prototype",
      cardItem2Desc: "Een werkende oplossing bouwen en testen",
      cardItem3: "Bouwplan",
      cardItem3Desc: "Een helder pad maken om verder te gaan",
      cardMetric1: "48u",
      cardMetric1Label: "eerste richting",
      cardMetric2: "7d",
      cardMetric2Label: "gerichte sprint",
    },
  } as const;
  type Lang = keyof typeof translations;
  const safeLang: Lang = ["en", "nl"].includes(lang) ? (lang as Lang) : "en";
  const t = translations[safeLang];
  const [proofWidth, setProofWidth] = useState<number | null>(null);
  const sprintItems = [
    { label: t.cardItem1, description: t.cardItem1Desc },
    { label: t.cardItem2, description: t.cardItem2Desc },
    { label: t.cardItem3, description: t.cardItem3Desc },
  ];
  const sprintMetrics = [
    { value: t.cardMetric1, label: t.cardMetric1Label },
    { value: t.cardMetric2, label: t.cardMetric2Label },
  ];

  useEffect(() => {
    const button = primaryCtaRef.current;

    if (!button) {
      return;
    }

    const updateProofWidth = () => {
      setProofWidth(button.getBoundingClientRect().width);
    };

    updateProofWidth();

    const resizeObserver = new ResizeObserver(updateProofWidth);
    resizeObserver.observe(button);

    return () => {
      resizeObserver.disconnect();
    };
  }, [safeLang]);

  const scrollToProcess = () => {
    const processSection = document.getElementById("process");
    if (processSection) processSection.scrollIntoView({ behavior: "smooth" });
  };

  const renderHeadline2 = (text: string) => {
    return (
      <span className="inline text-gray-950">
        {text}
      </span>
    );
  };

  return (
    <section className="relative min-h-screen overflow-hidden hero-bg">
      <div className="hero-overlay pointer-events-none z-10" aria-hidden="true" />
      <div className="container relative z-30 mx-auto px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-28">
        <div className="grid gap-10 sm:gap-12 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[0.9fr_1.1fr] lg:items-start xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
          >
            <h1 className="text-[clamp(2.85rem,11vw,5.4rem)] font-manrope font-semibold leading-[0.94] tracking-[-0.03em] text-gray-950">
              <span>{t.headline1}</span>
              {renderHeadline2(t.headline2)}
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-700 sm:text-lg md:text-xl lg:mx-0">
              {t.sub}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <motion.a
                ref={primaryCtaRef}
                href="#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#050914_0%,#0d1f38_58%,#261121_100%)] px-6 py-3 text-base font-semibold text-white shadow-[0_18px_55px_rgba(15,23,42,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_65px_rgba(15,23,42,0.28)] sm:w-auto"
              >
                {t.cta}
                <ArrowRight size={18} />
              </motion.a>
              <a href="#process" className="inline-flex min-h-[3rem] w-full items-center justify-center rounded-full border border-gray-300 bg-white/70 px-6 py-3 text-base font-semibold text-gray-800 backdrop-blur transition hover:border-gray-400 hover:bg-white sm:w-auto">
                {t.secondaryCta}
              </a>
            </div>

            <div
              className="mx-auto mt-7 max-w-full text-center lg:mx-0"
              style={proofWidth ? { width: `${proofWidth}px`, maxWidth: "100%" } : undefined}
            >
              <span className="block h-px w-full bg-gradient-to-r from-transparent via-gray-400/90 to-transparent" aria-hidden="true" />
              <span className="mt-3 block text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-gray-500 sm:text-xs">
                {t.proof1}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.12 }}
            className="relative mx-auto w-full max-w-xl sm:max-w-2xl lg:max-w-none"
          >
            <div className="relative overflow-hidden rounded-[1.4rem] border border-white/80 bg-white/75 p-1.5 shadow-[0_28px_90px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:rounded-[1.7rem] sm:p-2">
              <div className="relative overflow-hidden rounded-[1.1rem] bg-gray-950 text-white sm:rounded-[1.35rem]">
                <div className="relative aspect-[0.95/1.12] overflow-hidden sm:aspect-[4/3] lg:aspect-[1.06/1] xl:min-h-[560px]">
                  <img src="/hero2.png" alt="Rockpeach working session" className="h-full w-full object-cover opacity-85" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/38 to-gray-950/5" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(14,165,233,0.20),transparent_28%),radial-gradient(circle_at_18%_88%,rgba(217,70,150,0.18),transparent_32%)]" />
                  <div className="absolute inset-x-4 top-4 sm:inset-x-5 sm:top-5">
                    <span className="inline-flex rounded-full border border-white/18 bg-white/10 px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-white/75 backdrop-blur sm:text-xs sm:tracking-[0.22em]">
                      {t.cardSubtitle}
                    </span>
                  </div>

                  <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
                    <div className="max-w-lg text-[1.72rem] font-semibold leading-[1.05] font-manrope text-white sm:text-3xl md:text-4xl">
                      {t.cardTitle}
                    </div>
                    <div className="mt-4 grid gap-3 rounded-[1rem] border border-white/12 bg-white/10 p-3 backdrop-blur sm:mt-6 sm:grid-cols-[1fr_auto] sm:p-4">
                      <div className="hidden gap-px overflow-hidden rounded-[0.85rem] bg-white/10 sm:grid sm:auto-rows-fr sm:grid-cols-3">
                        {sprintItems.map((item) => (
                          <div key={item.label} className="flex h-full flex-col justify-center bg-transparent px-4 py-3.5 text-white/85 lg:min-h-[6.25rem] lg:justify-center lg:gap-1.5 lg:px-4 lg:py-4">
                            <div className="hidden text-[0.64rem] font-medium uppercase tracking-[0.16em] text-white/52 lg:block xl:text-[0.66rem]">
                              {item.label}
                            </div>
                            <div className="text-[0.74rem] font-normal leading-relaxed text-white/72 sm:text-[0.78rem] lg:text-[0.76rem] lg:leading-[1.5] xl:text-[0.84rem]">
                              {item.description}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:w-[11rem] sm:grid-cols-1">
                        {sprintMetrics.map((metric) => (
                          <div key={metric.label} className="rounded-[0.85rem] border border-white/12 bg-gray-950/35 px-3 py-3 text-left">
                            <div className="text-lg font-bold font-manrope text-white">{metric.value}</div>
                            <div className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/55">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="relative z-30 mt-10 flex justify-center lg:absolute lg:bottom-20 lg:left-0 lg:right-0 lg:mt-0"
        >
          <button
            onClick={scrollToProcess}
            className="flex flex-col items-center space-y-2 opacity-80 transition-opacity hover:opacity-100"
          >
            <span className="text-sm font-inter text-gray-600">{t.learn}</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown size={24} className="text-gray-600 transition-colors" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
