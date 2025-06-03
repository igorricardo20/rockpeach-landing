import React, { useState, useEffect, createContext, useContext } from "react";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const LangContext = createContext<{ lang: string; setLang: (l: string) => void }>({ lang: 'en', setLang: () => {} });

const Navbar: React.FC = () => {
  const context = useContext(LangContext);
  const lang = context?.lang || 'en';
  const setLang = context?.setLang || (() => {});

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Localization dictionary
  const translations = {
    en: {
      about: "About",
      projects: "Projects",
      process: "How we work",
      services: "Services",
      contact: "Let's talk",
      nav: ["About", "Projects", "How we work", "Services"],
    },
    nl: {
      about: "Over ons",
      projects: "Projecten",
      process: "Hoe wij werken",
      services: "Diensten",
      contact: "Contact opnemen",
      nav: ["Over ons", "Projecten", "Hoe wij werken", "Diensten"],
    },
  } as const;
  type Lang = keyof typeof translations;
  const getInitialLang = () => {
    const stored = localStorage.getItem('rockpeach-lang');
    if (stored) return stored;
    const sysLang = navigator.language?.toLowerCase() || 'en';
    if (sysLang.startsWith('nl')) return 'nl';
    return 'en';
  };
  const [localLang, setLocalLang] = useState(getInitialLang);
  const safeLang: Lang = ["en", "nl"].includes(localLang) ? (localLang as Lang) : "en";

  React.useEffect(() => {
    localStorage.setItem('rockpeach-lang', localLang);
    setLang(localLang); // Update context language
  }, [localLang, setLang]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        // Timeout ensures menu closes before scroll (for mobile)
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
      setIsOpen(false); // close mobile menu if open
    }
  };

  const navLinks = [
    { name: translations[safeLang].nav[0], href: "#about" },
    { name: translations[safeLang].nav[1], href: "#projects" },
    { name: translations[safeLang].nav[2], href: "#process" },
    { name: translations[safeLang].nav[3], href: "#services" },
  ];

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white bg-opacity-90 backdrop-blur-sm shadow-md py-3" 
            : "bg-white py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            <a href="#" className="flex items-center h-8 ml-2 md:ml-0" onClick={e => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsOpen(false);
            }}>
              <img 
                src="/rockpeach-logo.svg" 
                alt="Rockpeach" 
                className="h-7 md:h-8 w-auto" 
              />
            </a>

            <div className="flex md:hidden items-center">
              {/* Mobile Language Switcher Dropdown - Minimalistic */}
              <div className="relative mr-2">
                <button
                  onClick={() => setDropdownOpen((open) => !open)}
                  className="flex items-center space-x-1 bg-white/70 rounded-md px-2 py-1 border border-gray-100 focus:outline-none hover:bg-gray-50 transition-colors shadow-none"
                  aria-label="Change language"
                  style={{ boxShadow: 'none' }}
                >
                  <Globe size={17} className="text-primary-600" />
                  <span className="font-inter text-xs font-medium text-primary-600 uppercase">{localLang}</span>
                  <svg className="w-2.5 h-2.5 ml-0.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 mt-1 min-w-24 bg-white border border-gray-100 rounded-md shadow z-50 flex flex-col py-0.5">
                    {['en', 'nl'].filter(l => l !== localLang).map(l => (
                      <button
                        key={l}
                        onClick={() => { setLocalLang(l); setDropdownOpen(false); }}
                        className="w-full text-left px-3 py-1 text-xs font-inter text-black hover:bg-primary-50 hover:text-primary-700 rounded-md transition-colors focus:outline-none border-none shadow-none bg-transparent"
                        style={{ border: 'none', boxShadow: 'none', background: 'transparent' }}
                      >
                        {l === 'en' ? 'EN' : 'NL'}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile nav button */}
              <button
                className="md:hidden text-gray-600 focus:outline-none"
                onClick={toggleMenu}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={e => handleNavClick(e, link.href)}
                  className="font-inter font-medium text-gray-800 transition-colors duration-300 hover:text-primary-600"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={e => handleNavClick(e, "#contact")}
                className="bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-inter font-medium py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {translations[safeLang].contact}
              </a>
              {/* Language Switcher */}
              <div className="ml-6 relative">
                <button
                  onClick={() => setDropdownOpen((open) => !open)}
                  className="flex items-center space-x-2 bg-white/80 rounded-lg px-3 py-1 shadow-sm border border-gray-200 focus:outline-none hover:bg-gray-100 transition-colors"
                  aria-label="Change language"
                >
                  <Globe size={18} className="text-primary-600" />
                  <span className="font-inter text-sm font-medium text-primary-600 uppercase">{localLang}</span>
                  <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 min-w-32 max-h-20 bg-white/90 border border-gray-100 rounded-xl shadow-xl z-50 backdrop-blur-md flex flex-col justify-center overflow-hidden py-1">
                    {['en', 'nl'].filter(l => l !== localLang).map(l => (
                      <button
                        key={l}
                        onClick={() => { setLocalLang(l); setDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm font-inter text-black hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-colors focus:outline-none focus:ring-0 bg-transparent border-none shadow-none"
                        style={{ border: 'none', boxShadow: 'none', background: 'transparent' }}
                      >
                        {l === 'en' ? 'English' : 'Nederlands'}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className="md:hidden bg-white shadow-lg"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col items-center space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={e => handleNavClick(e, link.href)}
                    className="font-inter font-medium text-gray-800 py-2 w-full text-center hover:text-primary-600 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={e => handleNavClick(e, "#contact")}
                  className="bg-gradient-to-r from-primary-600 to-accent-600 text-white font-inter font-medium py-3 px-6 rounded-lg text-center w-full"
                >
                  {translations[safeLang].contact}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </LangContext.Provider>
  );
};

export default Navbar;