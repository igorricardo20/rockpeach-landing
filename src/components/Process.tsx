import React, { useContext, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { LangContext } from "./Navbar";

const Process: React.FC = () => {
  const { lang } = useContext(LangContext);
  const sectionRef = useRef<HTMLElement>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.12,
  });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 35%"],
  });
  const progressScale = useSpring(
    useTransform(scrollYProgress, [0, 0.9], [0.08, 1]),
    {
      stiffness: 120,
      damping: 24,
      mass: 0.35,
    },
  );

  const translations = {
    en: {
      eyebrow: "From idea to launch",
      process: "A tighter path than a traditional agency handoff.",
      processDesc:
        "We keep the loop small: shape the concept, build the critical path, polish the experience, then ship with a clear next step.",
      sprintLabel: "Free concept sprint",
      sprintTitle: "What you get before saying yes",
      sprintBody:
        "A concrete direction, screens you can react to, and a build plan that explains scope without hiding behind jargon.",
      includedLabel: "Included in the sprint",
      included1: "First direction",
      included2: "Screen notes",
      included3: "Build plan",
      stepLabel: "Step",
      step1Title: "Frame the work",
      step1: "We pin down the audience, the core job, and the smallest version worth building.",
      step2Title: "Make it tangible",
      step2: "Screens, flows, and rough edges appear early, so the idea can be tested in the open.",
      step3Title: "Build the spine",
      step3: "Frontend, backend, data, and automation come together in one working product.",
      step4Title: "Ship and tune",
      step4: "We launch, check the details, and leave you with the next practical move.",
    },
    nl: {
      eyebrow: "Van idee naar lancering",
      process: "Een strakker pad dan een klassieke agency overdracht.",
      processDesc:
        "We houden de feedbacklus klein: concept scherp maken, de kern bouwen, de ervaring polijsten en daarna lanceren met een duidelijke volgende stap.",
      sprintLabel: "Gratis concept sprint",
      sprintTitle: "Wat je krijgt voordat je ja zegt",
      sprintBody:
        "Een concrete richting, schermen waarop je kunt reageren en een bouwplan dat scope uitlegt zonder jargon.",
      includedLabel: "Inbegrepen in de sprint",
      included1: "Eerste richting",
      included2: "Schermnotities",
      included3: "Bouwplan",
      stepLabel: "Stap",
      step1Title: "Werk scherp maken",
      step1: "We leggen doelgroep, kernvraag en de kleinste versie vast die echt waarde heeft.",
      step2Title: "Tastbaar maken",
      step2: "Schermen, flows en ruwe randen komen vroeg op tafel, zodat het idee getest kan worden.",
      step3Title: "Ruggengraat bouwen",
      step3: "Frontend, backend, data en automatisering groeien samen uit tot een werkend product.",
      step4Title: "Lanceren en bijstellen",
      step4: "We lanceren, lopen de details na en laten je achter met een praktische volgende stap.",
    },
  } as const;

  type Lang = keyof typeof translations;
  const safeLang: Lang = ["en", "nl"].includes(lang) ? (lang as Lang) : "en";
  const t = translations[safeLang];

  const steps = [
    {
      title: t.step1Title,
      body: t.step1,
      accent: "from-primary-400 to-secondary-400",
    },
    {
      title: t.step2Title,
      body: t.step2,
      accent: "from-secondary-400 to-accent-400",
    },
    {
      title: t.step3Title,
      body: t.step3,
      accent: "from-primary-300 to-primary-500",
    },
    {
      title: t.step4Title,
      body: t.step4,
      accent: "from-accent-400 to-primary-400",
    },
  ];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20 lg:py-28"
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
        aria-hidden="true"
      />
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-[1320px]"
        >
          <div className="mb-6 text-sm font-bold uppercase tracking-[0.18em] text-primary-600">
            {t.eyebrow}
          </div>
          <div className="grid gap-8 lg:grid-cols-[0.92fr_0.72fr] lg:items-start lg:justify-between">
            <h2 className="max-w-3xl text-3xl font-bold leading-tight text-gray-950 font-manrope md:text-5xl">
              {t.process}
            </h2>
            <div className="max-w-xl border-l border-gray-200 pl-6 lg:justify-self-end lg:pt-3">
              <p className="text-lg leading-relaxed text-gray-700">
                {t.processDesc}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-[1320px] gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch xl:gap-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative overflow-hidden rounded-lg bg-gray-950 p-7 text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)] lg:order-2"
          >
            <div
              className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary-500/30 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 left-8 h-48 w-48 rounded-full bg-accent-500/25 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div>
                <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-semibold text-white/80">
                  {t.sprintLabel}
                </div>
                <h3 className="mt-10 max-w-md text-3xl font-bold leading-tight font-manrope">
                  {t.sprintTitle}
                </h3>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-white/70">
                  {t.sprintBody}
                </p>
              </div>
              <div className="border-y border-white/10 py-5">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-white/35">
                  {t.includedLabel}
                </div>
                <div className="mt-4 grid gap-3 text-sm font-semibold text-white/75 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {[t.included1, t.included2, t.included3].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-primary-400 to-accent-400"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full w-full rounded-full bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400"
                    style={{ scaleX: progressScale, transformOrigin: "left" }}
                  />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs font-semibold text-white/70">
                  <span>Scope</span>
                  <span>Screen</span>
                  <span>Ship</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="relative overflow-hidden rounded-lg border border-white/10 bg-gray-950 p-2 shadow-[0_24px_80px_rgba(15,23,42,0.18)] lg:order-1"
          >
            <div
              className="absolute -right-24 top-1/4 h-56 w-56 rounded-full bg-primary-500/20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -left-20 bottom-8 h-52 w-52 rounded-full bg-accent-500/18 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid h-full overflow-hidden rounded-md border border-white/10 bg-white/[0.045]">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.65, delay: 0.16 + index * 0.06 }}
                  className={`group relative grid gap-5 p-6 transition hover:bg-white/[0.06] sm:grid-cols-[3.2rem_1fr] sm:items-center lg:px-7 ${
                    isLast ? "" : "border-b border-white/10"
                  }`}
                >
                  <div
                    className={`absolute inset-y-6 left-0 w-1 rounded-r-full bg-gradient-to-b ${step.accent} opacity-55 transition group-hover:opacity-100`}
                    aria-hidden="true"
                  />
                  <div className="flex w-11 flex-col items-center justify-center text-center sm:w-full">
                    <div className="text-2xl font-black leading-none text-white/45 font-manrope sm:text-3xl">
                      {index + 1}
                    </div>
                    <div className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/30">
                      {t.stepLabel}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-manrope">{step.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/65">
                      {step.body}
                    </p>
                  </div>
                </motion.article>
              );
            })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Process;
