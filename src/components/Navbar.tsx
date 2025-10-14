import React, { useState, createContext, useContext } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const LangContext = createContext<{ lang: string; setLang: (l: string) => void }>({ lang: 'en', setLang: () => {} });

const Navbar: React.FC = () => {
  const context = useContext(LangContext);
  const lang = context?.lang || 'en';
  const setLang = context?.setLang || (() => {});

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Navbar is floating; no scroll-based style changes needed anymore

  const toggleMenu = () => setIsOpen(!isOpen);

  // Localization dictionary
  const translations = {
    en: {
      about: "About",
      projects: "Projects",
      process: "Process",
      services: "Services",
      contact: "Contact",
      nav: ["Process", "Services", "About", "Contact"],
    },
    nl: {
      about: "Over ons",
      projects: "Projecten",
      process: "Hoe wij werken",
      services: "Diensten",
      contact: "Contact opnemen",
      nav: ["Hoe wij werken", "Diensten", "Over ons", "Contact opnemen"],
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
    { name: translations[safeLang].nav[0], href: "#process" },
    { name: translations[safeLang].nav[1], href: "#services" },
    { name: translations[safeLang].nav[2], href: "#about" },
    { name: translations[safeLang].nav[3], href: "#contact" },
  ];

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <nav className="fixed inset-x-6 top-6 z-50 pointer-events-none">
        <div className="pointer-events-auto mx-auto max-w-4xl">
          {/* Mobile: single-panel layout (logo + language + menu) */}
          <div className="md:hidden">
            <div className="glass-liquid glass-navbar pointer-events-auto flex items-center px-4 py-2 rounded-full h-14 justify-between">
              <a href="#" className="flex items-center h-8 pointer-events-auto flex-shrink-0" onClick={e => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsOpen(false);
              }}>
                <img src="/rockpeach-logo.svg" alt="Rockpeach" className="h-5 w-auto" />
              </a>

              <div className="flex items-center gap-2">
                {/* language switcher visible on mobile inside the same panel */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen((open) => !open)}
                    className="flex items-center bg-white/0 rounded-full px-2 py-1 border border-transparent focus:outline-none focus:shadow-none hover:bg-white/6 transition-colors shadow-none"
                    aria-label="Change language"
                    aria-haspopup="menu"
                    aria-expanded={dropdownOpen}
                  >
                    <span className="font-inter text-sm font-semibold text-gray-500 uppercase tracking-wide hover:text-primary-600 transition-colors">{localLang}</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 min-w-32 border border-gray-100 rounded-xl shadow-none z-51 flex flex-col justify-center overflow-hidden py-1" style={{ background: '#FFFFFF' }}>
                      {['en', 'nl'].filter(l => l !== localLang).map(l => (
                        <button
                          key={l}
                          onClick={() => { setLocalLang(l); setDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm font-inter text-black hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-colors"
                        >
                          {l === 'en' ? 'English' : 'Nederlands'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  className="text-gray-600 focus:outline-none focus:shadow-none"
                  onClick={toggleMenu}
                  aria-label={isOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isOpen}
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Desktop / md+ original combined glass container (unchanged) */}
          <div className="hidden md:block">
            <div className="glass-liquid glass-navbar flex items-center justify-between px-4 md:px-6 h-14 md:h-16">
              <a href="#" className="flex items-center h-8 md:h-9 pointer-events-auto" onClick={e => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsOpen(false);
              }}>
                <img 
                  src="/rockpeach-logo.svg" 
                  alt="Rockpeach" 
                  className="h-5 md:h-6 w-auto" 
                />
              </a>

              {/* Centered middle nav: absolute center to better align between logo and controls */}
              <div className="hidden md:flex items-center pointer-events-auto absolute left-1/2 transform -translate-x-1/2 space-x-3 lg:space-x-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={e => handleNavClick(e, link.href)}
                        className="font-inter font-medium text-gray-800 text-sm whitespace-nowrap transition-colors duration-300 hover:text-primary-600 focus:outline-none focus:shadow-none"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="flex items-center space-x-2 pointer-events-auto">
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen((open) => !open)}
                    className="flex items-center bg-white/0 rounded-full px-2 py-1 border border-transparent focus:outline-none focus:shadow-none hover:bg-white/6 transition-colors shadow-none"
                    aria-label="Change language"
                    aria-haspopup="menu"
                    aria-expanded={dropdownOpen}
                  >
                    <span className="font-inter text-sm font-semibold text-gray-800 uppercase tracking-wide hover:text-primary-600 transition-colors">{localLang}</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 min-w-32 border border-gray-100 rounded-xl shadow-none z-50 flex flex-col justify-center overflow-hidden py-1" style={{ background: '#FFFFFF' }}>
                      {['en', 'nl'].filter(l => l !== localLang).map(l => (
                        <button
                          key={l}
                          onClick={() => { setLocalLang(l); setDropdownOpen(false); }}
                          className="w-full text-left px-4 py-2 text-sm font-inter text-black hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-colors"
                        >
                          {l === 'en' ? 'English' : 'Nederlands'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  className="md:hidden text-gray-600 focus:outline-none focus:shadow-none"
                  onClick={toggleMenu}
                  aria-label={isOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isOpen}
                >
                  {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>
          </div>

        {/* Mobile Menu (below floating right card) */}
        <div className="w-full">
          <AnimatePresence>
              {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="mt-2 md:hidden pointer-events-auto"
                style={{ display: 'flex', justifyContent: 'center', overflow: 'visible' }}
              >
                  <motion.div
                  className="w-full max-w-md px-4 py-6 flex flex-col items-center pointer-events-auto border border-gray-100 rounded-xl shadow-none"
                  style={{ background: '#FFFFFF' }}
                  initial={{ y: -6, opacity: 0, scale: 0.995 }}
                  animate={{ y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 320, damping: 28 } }}
                  exit={{ y: -6, opacity: 1, scale: 1, transition: { duration: 0.12 } }}
                >
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={e => handleNavClick(e, link.href)}
                      className="mobile-item font-inter font-medium text-gray-800 w-full hover:text-primary-600 transition-colors duration-200"
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1, transition: { delay: 0.04 + i * 0.04, duration: 0.22 } }}
                      exit={{ y: 8, opacity: 0 }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      </nav>
    </LangContext.Provider>
  );
};

export default Navbar;