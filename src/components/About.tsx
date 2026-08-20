import React, { useContext } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { LangContext } from "./Navbar";

const About: React.FC = () => {
  const { lang } = useContext(LangContext);
  const isNl = lang === "nl";
  const t = isNl ? {
    eyebrow: "Waarom Rockpeach", title: "Praktische implementatie, geen AI-slide deck.",
    body: "Rockpeach combineert AI met betrouwbaar maatwerk. We bouwen rond je bestaande boekhoudsoftware, met duidelijke scope en menselijke verantwoordelijkheid.",
    points: ["Rond je bestaande workflow gebouwd", "AI met betrouwbaar maatwerk", "Duidelijke scope en meetbare uitkomsten", "Privacybewust en met menselijke controle"],
    founder: "Founder-led en direct in de uitvoering", founderBody: "Je praat met de mensen die je workflow begrijpen, bouwen en verbeteren.",
  } : {
    eyebrow: "Why Rockpeach", title: "Practical implementation, not an AI slide deck.",
    body: "Rockpeach combines AI with reliable custom software. We build around your existing accounting software, with clear scope and human responsibility.",
    points: ["Built around your existing workflow", "AI with reliable custom software", "Clear scope and measurable outcomes", "Privacy-minded and human-led"],
    founder: "Founder-led and close to the work", founderBody: "You talk to the people who understand, build and improve your workflow.",
  };
  return <section id="about" className="bg-[#f8f4ed] py-24 lg:py-32"><div className="container mx-auto px-4 md:px-6"><div className="grid items-center gap-12 lg:grid-cols-[1fr_0.92fr] lg:gap-20"><div><div className="eyebrow">{t.eyebrow}</div><h2 className="mt-5 max-w-xl font-manrope text-4xl font-bold leading-[1.04] tracking-[-0.035em] text-[#191b20] sm:text-5xl">{t.title}</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-[#66645f]">{t.body}</p><div className="mt-8 grid gap-3">{t.points.map((point) => <div key={point} className="flex items-center gap-3 text-sm font-semibold text-[#343538]"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#aa5636] shadow-sm"><Check size={15} /></span>{point}</div>)}</div></div><div className="relative"><div className="overflow-hidden rounded-[1.75rem] border-[10px] border-white bg-white shadow-[0_25px_70px_rgba(61,46,37,0.14)]"><img src="/it-team.png" alt="Rockpeach team collaborating" className="h-[24rem] w-full object-cover sm:h-[30rem]" /><div className="grid gap-4 bg-white p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:p-6"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3ded3] text-[#a95232]"><ShieldCheck size={23} /></div><div><h3 className="font-manrope text-lg font-bold text-[#202125]">{t.founder}</h3><p className="mt-1 text-sm leading-relaxed text-[#77726b]">{t.founderBody}</p></div></div></div></div></div></div></section>;
};
export default About;
