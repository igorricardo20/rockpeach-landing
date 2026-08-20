import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export const LangContext = createContext<{ lang: string; setLang: (lang: string) => void }>({ lang: "nl", setLang: () => {} });

const Navbar: React.FC = () => {
  const { lang, setLang } = useContext(LangContext);
  const [open, setOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const isNl = lang === "nl";
  const links = isNl
    ? [{ label: "Wat we automatiseren", href: "#use-cases" }, { label: "De sprint", href: "#sprint" }, { label: "Over Rockpeach", href: "#about" }]
    : [{ label: "What we automate", href: "#use-cases" }, { label: "The sprint", href: "#sprint" }, { label: "Why Rockpeach", href: "#about" }];

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!shellRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const scroll = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setOpen(false);
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  };

  const languageButtons = (mobile = false) => (
    <div className={mobile ? "flex gap-2 px-4 pt-2 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#77716a]" : "hidden items-center gap-1 rounded-full bg-[#f5eee6] p-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#77716a] sm:flex"}>
      {(["nl", "en"] as const).map((option) => (
        <button key={option} type="button" onClick={() => { setLang(option); if (mobile) setOpen(false); }} aria-pressed={lang === option} className={mobile ? (lang === option ? "text-[#191b20]" : "") : `rounded-full px-2.5 py-1.5 transition ${lang === option ? "bg-white text-[#1b1d21] shadow-sm" : "hover:text-[#1b1d21]"}`}>
          {option}
        </button>
      ))}
    </div>
  );

  return <nav className="pointer-events-none fixed inset-x-4 top-4 z-50 sm:inset-x-6">
    <div ref={shellRef} className="pointer-events-auto mx-auto max-w-6xl rounded-full border border-white/75 bg-[#fffdf9]/85 p-2 shadow-[0_18px_50px_rgba(44,38,32,0.11)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 px-2 sm:px-3">
        <a href="#" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="shrink-0 rounded-full px-2 py-2" aria-label="Rockpeach home"><img src="/rockpeach-logo-grey.svg" alt="Rockpeach" className="h-5 w-auto" /></a>
        <div className="hidden items-center gap-1 md:flex">{links.map((link) => <a key={link.href} href={link.href} onClick={(event) => scroll(event, link.href)} className="rounded-full px-4 py-2.5 text-sm font-semibold text-[#68645e] transition hover:bg-[#f5eee6] hover:text-[#17191d]">{link.label}</a>)}</div>
        <div className="flex items-center gap-2">{languageButtons()}<a href="#contact" onClick={(event) => scroll(event, "#contact")} className="hidden rounded-full bg-[#191b20] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#34343a] sm:inline-flex">{isNl ? "Plan een gesprek" : "Book a free call"}</a><button type="button" onClick={() => setOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#191b20] text-white md:hidden" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={17} /> : <Menu size={17} />}</button></div>
      </div>
      <AnimatePresence>{open && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden md:hidden"><div className="grid gap-1 px-2 pb-2 pt-3">{links.map((link) => <a key={link.href} href={link.href} onClick={(event) => scroll(event, link.href)} className="rounded-2xl px-4 py-3 text-sm font-semibold text-[#484945] hover:bg-[#f5eee6]">{link.label}</a>)}<a href="#contact" onClick={(event) => scroll(event, "#contact")} className="mt-1 rounded-2xl bg-[#191b20] px-4 py-3 text-center text-sm font-semibold text-white">{isNl ? "Plan een gesprek" : "Book a free call"}</a>{languageButtons(true)}</div></motion.div>}</AnimatePresence>
    </div>
  </nav>;
};

export default Navbar;
