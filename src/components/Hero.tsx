import React, { useContext } from "react";
import { ArrowRight, Check, Clock3, FileText, Inbox, Sparkles } from "lucide-react";
import { LangContext } from "./Navbar";

const Hero: React.FC = () => {
  const { lang } = useContext(LangContext);
  const isNl = lang === "nl";
  const t = isNl ? {
    eyebrow: "AI-automatisering voor Nederlandse administratiekantoren",
    title: "Minder klantjagen. Meer tijd voor financieel werk.",
    body: "Rockpeach automatiseert documentverzameling, inboxbeheer, klantopvolging en repetitieve administratie. Je team houdt de controle.",
    primary: "Plan een gratis workflow call", secondary: "Bekijk wat we automatiseren",
    note: "In 30 minuten vinden we een workflow met echt potentieel. Vrijblijvend.",
    cardLabel: "Client Administration Automation Sprint", cardTitle: "Van ontbrekend document naar duidelijke opvolging", cardBody: "Een praktische workflow rond de tools die je al gebruikt.",
    check1: "Ontbrekende documenten herkennen", check2: "Een herinnering opstellen", check3: "De status zichtbaar houden", metric: "prototype", metricValue: "7 tot 14 dagen", customer: "Menselijke controle blijft leidend",
  } : {
    eyebrow: "AI automation for Dutch bookkeeping firms",
    title: "Less client chasing. More time for valuable financial work.",
    body: "Rockpeach helps bookkeeping teams automate document collection, inbox handling, client follow-ups and repetitive administration. Your team stays in control.",
    primary: "Book a free workflow call", secondary: "See what we can automate",
    note: "In 30 minutes, we identify one workflow with real potential. No obligation.",
    cardLabel: "Client Administration Automation Sprint", cardTitle: "From missing document to clear follow-up", cardBody: "A practical workflow built around the tools you already use.",
    check1: "Spot missing client documents", check2: "Draft a personal reminder", check3: "Keep the team status visible", metric: "prototype", metricValue: "7 to 14 days", customer: "Human oversight stays in charge",
  };

  return <section className="relative overflow-hidden bg-[#f8f4ed] pb-20 pt-32 lg:pb-28 lg:pt-40">
    <div className="hero-orb hero-orb-one" aria-hidden="true" /><div className="hero-orb hero-orb-two" aria-hidden="true" />
    <div className="container relative mx-auto px-4 md:px-6"><div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20">
      <div className="max-w-2xl"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e8ded2] bg-white/65 px-3.5 py-2 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-[#9c4c2d] shadow-sm"><span className="h-2 w-2 rounded-full bg-[#e46d42]" aria-hidden="true" />{t.eyebrow}</div><h1 className="max-w-3xl font-manrope text-5xl font-bold leading-[0.98] tracking-[-0.045em] text-[#17191d] sm:text-6xl lg:text-[5.25rem]">{t.title}</h1><p className="mt-7 max-w-xl text-lg leading-relaxed text-[#585a5e] sm:text-xl">{t.body}</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#contact" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#191b20] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(25,27,32,0.2)] transition hover:-translate-y-0.5 hover:bg-[#34343a]">{t.primary}<ArrowRight size={18} /></a><a href="#use-cases" className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#d9cec1] bg-white/55 px-6 py-4 text-base font-semibold text-[#2e3034] transition hover:border-[#b9a99b] hover:bg-white">{t.secondary}</a></div><p className="mt-5 max-w-md text-xs font-medium leading-relaxed text-[#77736d]">{t.note}</p></div>
      <div className="relative mx-auto w-full max-w-[34rem]"><div className="absolute -inset-5 rounded-[2.5rem] bg-[#e8b7a2]/25 blur-2xl" aria-hidden="true" /><div className="relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-[#1d2025] p-2 shadow-[0_30px_90px_rgba(54,42,34,0.22)]"><div className="rounded-[1.25rem] border border-white/10 bg-[#282c32] p-5 text-white sm:p-7"><div className="flex items-start justify-between gap-4"><div><div className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#e69776]">{t.cardLabel}</div><h2 className="mt-4 max-w-sm font-manrope text-2xl font-semibold leading-tight sm:text-3xl">{t.cardTitle}</h2><p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">{t.cardBody}</p></div><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e46d42] text-white shadow-lg shadow-[#e46d42]/20"><Sparkles size={18} /></div></div><div className="mt-8 space-y-2.5">{[{ icon: FileText, text: t.check1 }, { icon: Inbox, text: t.check2 }, { icon: Check, text: t.check3 }].map(({ icon: Icon, text }) => <div key={text} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.055] px-3.5 py-3 text-sm text-white/78"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-[#f3b08f]"><Icon size={16} /></span><span>{text}</span><Check size={15} className="ml-auto text-[#f3b08f]" /></div>)}</div><div className="mt-6 grid grid-cols-2 gap-2.5"><div className="rounded-xl border border-white/10 bg-white/[0.055] p-3.5"><div className="text-xl font-bold font-manrope">{t.metricValue}</div><div className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white/45">{t.metric}</div></div><div className="rounded-xl border border-white/10 bg-white/[0.055] p-3.5"><div className="flex items-center gap-2 text-sm font-semibold"><Clock3 size={15} className="text-[#f3b08f]" />{t.customer}</div></div></div></div></div><div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-[#eadfd4] bg-white px-4 py-3 shadow-[0_18px_40px_rgba(54,42,34,0.12)] sm:flex"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5e3d9] text-[#a55434]"><Check size={17} /></span><div><div className="text-xs font-bold text-[#2f3033]">{isNl ? "Workflow gevonden" : "Workflow opportunity found"}</div><div className="text-[0.68rem] text-[#88827b]">{isNl ? "klaar voor een eerste gesprek" : "ready for a first conversation"}</div></div></div></div>
    </div></div>
  </section>;
};
export default Hero;
