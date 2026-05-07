import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const LangContext = createContext<{ lang: string; setLang: (lang: string) => void }>({
  lang: "en",
  setLang: () => {},
});

const translations = {
  en: {
    nav: ["Process", "Services", "About"],
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  nl: {
    nav: ["Hoe wij werken", "Diensten", "Over ons"],
    contact: "Contact opnemen",
    openMenu: "Menu openen",
    closeMenu: "Menu sluiten",
  },
} as const;

type Lang = keyof typeof translations;

const Navbar: React.FC = () => {
  const { lang, setLang } = useContext(LangContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement | null>(null);

  const safeLang: Lang = lang === "nl" ? "nl" : "en";
  const t = translations[safeLang];

  const navLinks = [
    { name: t.nav[0], href: "#process" },
    { name: t.nav[1], href: "#services" },
    { name: t.nav[2], href: "#about" },
    { name: t.contact, href: "#contact" },
  ];
  const primaryLinks = navLinks.slice(0, 3);
  const contactLink = navLinks[3];

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!shellRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const scrollToAnchor = (href: string, delay = 0) => {
    if (!href.startsWith("#")) {
      return;
    }

    const element = document.getElementById(href.slice(1));

    if (!element) {
      return;
    }

    window.setTimeout(() => {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }, delay);
  };

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) {
      return;
    }

    event.preventDefault();
    const delay = isMenuOpen ? 140 : 0;
    setIsMenuOpen(false);
    scrollToAnchor(href, delay);
  };

  const handleLanguageChange = (nextLang: Lang) => {
    if (nextLang !== safeLang) {
      setLang(nextLang);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="pointer-events-none fixed inset-x-4 top-4 z-50 sm:inset-x-6 sm:top-5">
      <div ref={shellRef} className="mx-auto max-w-5xl">
        <div className="pointer-events-auto relative overflow-hidden rounded-[1.55rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.62))] px-3 py-3 shadow-[0_20px_56px_rgba(15,23,42,0.12)] backdrop-blur-[18px] sm:px-4">
          <div
            className="absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0.42),transparent)]"
            aria-hidden="true"
          />

          <div className="relative flex items-center justify-between md:hidden">
            <a href="#" onClick={handleLogoClick} className="flex items-center px-2 py-1.5">
              <img src="/rockpeach-logo-grey.svg" alt="Rockpeach" className="h-5 w-auto" />
            </a>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gray-500">
                {(["en", "nl"] as const).map((option, index) => {
                  const isActive = option === safeLang;

                  return (
                    <React.Fragment key={option}>
                      {index > 0 && <span className="text-gray-300">/</span>}
                      <button
                        type="button"
                        onClick={() => handleLanguageChange(option)}
                        className={isActive ? "text-gray-950" : "transition hover:text-gray-950"}
                        aria-pressed={isActive}
                      >
                        {option}
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#050914_0%,#0d1f38_58%,#261121_100%)] text-white shadow-[0_12px_26px_rgba(15,23,42,0.16)] transition hover:-translate-y-0.5"
                aria-label={isMenuOpen ? t.closeMenu : t.openMenu}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          <div className="relative hidden md:grid md:grid-cols-[auto_1fr_auto] md:items-center md:gap-5">
            <a href="#" onClick={handleLogoClick} className="flex items-center px-2 py-2">
              <img src="/rockpeach-logo-grey.svg" alt="Rockpeach" className="h-5 w-auto" />
            </a>

            <div className="flex items-center justify-center gap-1 lg:gap-2">
              {primaryLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className="group relative px-4 py-2.5 text-[0.92rem] font-medium text-gray-600 transition duration-300 hover:text-gray-950"
                >
                  {link.name}
                  <span className="absolute inset-x-4 bottom-[0.45rem] h-px origin-left scale-x-0 bg-gradient-to-r from-gray-900/85 to-gray-500/55 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </div>

            <div className="flex items-center justify-self-end gap-4">
              <div className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gray-500">
                {(["en", "nl"] as const).map((option, index) => {
                  const isActive = option === safeLang;

                  return (
                    <React.Fragment key={option}>
                      {index > 0 && <span className="text-gray-300">/</span>}
                      <button
                        type="button"
                        onClick={() => handleLanguageChange(option)}
                        className={isActive ? "text-gray-950" : "transition hover:text-gray-950"}
                        aria-pressed={isActive}
                      >
                        {option}
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>

              <span className="h-4 w-px bg-gray-300/70" aria-hidden="true" />

              <a
                href={contactLink.href}
                onClick={(event) => handleNavClick(event, contactLink.href)}
                className="inline-flex items-center rounded-full bg-[linear-gradient(135deg,#050914_0%,#0d1f38_58%,#261121_100%)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(15,23,42,0.22)]"
              >
                {contactLink.name}
              </a>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="pointer-events-auto mt-3 md:hidden"
            >
              <div className="relative overflow-hidden rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0.82))] p-3 shadow-[0_22px_64px_rgba(15,23,42,0.12)] backdrop-blur-[18px]">
                <div
                  className="absolute inset-x-0 top-0 h-14 bg-[linear-gradient(180deg,rgba(255,255,255,0.45),transparent)]"
                  aria-hidden="true"
                />

                <div className="relative grid gap-1">
                  {navLinks.map((link, index) => {
                    const isContact = link.href === contactLink.href;

                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={(event) => handleNavClick(event, link.href)}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ delay: 0.02 + index * 0.04, duration: 0.18 }}
                        className={`flex items-center justify-between rounded-[1rem] px-4 py-3.5 text-base font-medium transition ${
                          isContact
                            ? "bg-[linear-gradient(135deg,#050914_0%,#0d1f38_58%,#261121_100%)] text-white shadow-[0_14px_36px_rgba(15,23,42,0.2)]"
                            : "text-gray-800 hover:bg-gray-950/[0.04]"
                        }`}
                      >
                        <span>{link.name}</span>
                        {!isContact && <span className="h-1.5 w-1.5 rounded-full bg-gray-300" aria-hidden="true" />}
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;