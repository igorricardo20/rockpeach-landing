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
    const target = document.getElementById(href.slice(1));
    const scrollToTarget = () => target?.scrollIntoView({ behavior: "smooth", block: "start" });

    if (open) {
      setOpen(false);
      window.setTimeout(scrollToTarget, 240);
      return;
    }

    setOpen(false);
    scrollToTarget();
  };

  const languageButtons = (mobile = false) => (
    <div className={mobile ? "mt-3 flex items-center justify-self-center gap-1 rounded-full bg-[#f5eee6] p-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#77716a] sm:hidden" : "hidden items-center gap-1 rounded-full bg-[#f5eee6] p-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#77716a] sm:flex"}>
      {(["nl", "en"] as const).map((option) => (
        <button key={option} type="button" onClick={() => { setLang(option); if (mobile) setOpen(false); }} aria-pressed={lang === option} className={`rounded-full px-3 py-2 transition ${lang === option ? "bg-white text-[#1b1d21] shadow-sm" : "hover:text-[#1b1d21]"}`}>
          {option}
        </button>
      ))}
    </div>
  );

  return <nav className="pointer-events-none fixed inset-x-4 top-4 z-50 sm:inset-x-6">
    <div ref={shellRef} className="pointer-events-auto mx-auto max-w-6xl rounded-[1.5rem] border border-white/75 bg-[#fffdf9]/90 p-2 shadow-[0_18px_50px_rgba(44,38,32,0.11)] backdrop-blur-xl md:rounded-full">
      <div className="flex items-center justify-between gap-3 px-2 sm:px-3">
        <a href="#" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="shrink-0 rounded-full px-2 py-2" aria-label="Rockpeach home"><img src="/rockpeach-logo-grey.svg" alt="Rockpeach" className="h-5 w-auto" /></a>
        <div className="hidden items-center gap-1 md:flex">{links.map((link) => <a key={link.href} href={link.href} onClick={(event) => scroll(event, link.href)} className="rounded-full px-4 py-2.5 text-sm font-semibold text-[#68645e] transition hover:bg-[#f5eee6] hover:text-[#17191d]">{link.label}</a>)}</div>
        <div className="flex items-center gap-2">{languageButtons()}<a href="#contact" onClick={(event) => scroll(event, "#contact")} className="hidden rounded-full bg-[#191b20] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#34343a] sm:inline-flex">{isNl ? "Plan een gesprek" : "Book a free call"}</a><button type="button" onClick={() => setOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#191b20] text-white md:hidden" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={17} /> : <Menu size={17} />}</button></div>
      </div>
      <AnimatePresence initial={false}>{open && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ height: { duration: 0.28, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.16 } }} className="overflow-hidden md:hidden"><motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2, delay: 0.04 }} className="mx-2 mt-2 grid gap-1 border-t border-[#ece5dc] pb-2 pt-2">{links.map((link) => <a key={link.href} href={link.href} onClick={(event) => scroll(event, link.href)} className="rounded-xl px-3 py-3 text-base font-semibold text-[#484945] transition hover:bg-[#f5eee6]">{link.label}</a>)}<a href="#contact" onClick={(event) => scroll(event, "#contact")} className="mt-2 rounded-xl bg-[#191b20] px-4 py-3.5 text-center text-sm font-semibold text-white sm:hidden">{isNl ? "Plan een gesprek" : "Book a free call"}</a>{languageButtons(true)}</motion.div></motion.div>}</AnimatePresence>
    </div>
  </nav>;
};

export default Navbar;
