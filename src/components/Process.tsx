import React, { useContext } from "react";
import { ArrowRight, Check } from "lucide-react";
import { LangContext } from "./Navbar";

const Process: React.FC = () => {
  const { lang } = useContext(LangContext);
  const isNl = lang === "nl";
  const t = isNl ? {
    eyebrow: "Client Administration Automation Sprint",
    title: "Een concrete start met een werkend prototype.",
    body: "We kiezen een workflow, maken tijd en kosten inzichtelijk en bouwen in 7 tot 14 dagen een eerste versie.",
    audit: "Workflow audit", price: "€500 tot €1.000, verrekend met implementatie", cta: "Bespreek je workflow",
    steps: [{ n: "01", title: "Ontdek de workflow", body: "We bekijken een repetitief proces en bepalen waar automatisering waarde toevoegt." }, { n: "02", title: "Bouw en test het prototype", body: "We maken een eerste versie rond de tools die je team al gebruikt." }, { n: "03", title: "Integreer en verbeter", body: "We meten wat werkt en maken de route naar implementatie duidelijk." }],
  } : {
    eyebrow: "Client Administration Automation Sprint",
    title: "A concrete start with a working prototype.",
    body: "We choose one workflow, make the time and cost visible, then build a first version in 7 to 14 days.",
    audit: "Workflow audit", price: "€500 to €1,000, credited toward implementation", cta: "Talk through your workflow",
    steps: [{ n: "01", title: "Discover the workflow", body: "We review one repetitive process and find where automation can add value." }, { n: "02", title: "Build and test the prototype", body: "We make a first version around the tools your team already uses." }, { n: "03", title: "Integrate and improve", body: "We measure what works and make the path to implementation clear." }],
  };
  return <section id="sprint" className="bg-[#191b20] py-24 text-white lg:py-32"><div className="container mx-auto px-4 md:px-6"><div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"><div><div className="text-sm font-bold uppercase tracking-[0.16em] text-[#e69776]">{t.eyebrow}</div><h2 className="mt-6 max-w-xl font-manrope text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl">{t.title}</h2><p className="mt-6 max-w-lg text-lg leading-relaxed text-white/60">{t.body}</p><a href="#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#e46d42] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#ef825d]">{t.cta}<ArrowRight size={17} /></a></div><div className="relative"><div className="absolute bottom-8 left-5 top-8 w-px bg-gradient-to-b from-[#e46d42] via-white/20 to-transparent" aria-hidden="true" /><div className="space-y-3">{t.steps.map((step) => <article key={step.n} className="relative grid grid-cols-[2.75rem_1fr] gap-5 rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition hover:bg-white/[0.08] sm:grid-cols-[3.5rem_1fr] sm:p-6"><div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#e46d42]/50 bg-[#24272d] text-xs font-bold text-[#f2a184]">{step.n}</div><div><h3 className="font-manrope text-xl font-bold">{step.title}</h3><p className="mt-2 max-w-lg text-sm leading-relaxed text-white/55">{step.body}</p></div></article>)}</div><div className="mt-7 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"><div className="flex items-center gap-2 text-sm font-bold"><Check size={16} className="text-[#f0a080]" />{t.audit}</div><div className="mt-2 text-xs text-white/45">{t.price}</div></div><div className="rounded-2xl border border-[#e46d42]/30 bg-[#e46d42]/10 p-4"><div className="text-2xl font-bold font-manrope">7 to 14</div><div className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-white/50">{isNl ? "dagen voor een prototype" : "days to a prototype"}</div></div></div></div></div></div></section>;
};
export default Process;
