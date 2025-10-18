import React, { useState, useEffect, createContext, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LangContext = createContext<{ lang: string; setLang: (l: string) => void }>({ lang: 'en', setLang: () => {} });

const Navbar: React.FC = () => {
    const context = useContext(LangContext);
    const lang = context?.lang || 'en';
    const stableNoop = React.useCallback(() => {}, []);
    const setLang = context?.setLang ?? stableNoop;

    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Fade in navbar after mount
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Close dropdown on outside click or Escape
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;
            // Close if click is not inside any element marked as a language switcher root
            if (!target.closest('[data-lang-root="true"]')) {
                setDropdownOpen(false);
            }
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setDropdownOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Localization dictionary
    const translations = {
        en: {
            about: 'About',
            projects: 'Projects',
            process: 'Process',
            services: 'Services',
            contact: "Let's talk",
            nav: ['About', 'Projects', 'Process', 'Services'],
        },
        nl: {
            about: 'Over ons',
            projects: 'Projecten',
            process: 'Hoe wij werken',
            services: 'Diensten',
            contact: 'Contact opnemen',
            nav: ['Over ons', 'Projecten', 'Hoe wij werken', 'Diensten'],
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
    const safeLang: Lang = ['en', 'nl'].includes(localLang) ? (localLang as Lang) : 'en';

    React.useEffect(() => {
        localStorage.setItem('rockpeach-lang', localLang);
        setLang(localLang); // Update context language
    }, [localLang, setLang]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const id = href.replace('#', '');
            const el = document.getElementById(id);
            if (el) {
                // Timeout ensures menu closes before scroll (for mobile)
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
            setIsOpen(false); // close mobile menu if open
        }
    };

    const navLinks = [
        { name: translations[safeLang].nav[2], href: '#process' },
        { name: translations[safeLang].nav[3], href: '#services' },
        { name: translations[safeLang].nav[0], href: '#about' },
        // { name: translations[safeLang].nav[1], href: "#projects" },
    ];

    return (
        <LangContext.Provider value={{ lang, setLang }}>
            {/* Floating Semi-Circular Navbar */}
            <motion.nav
                className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -30 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <div
                    className={`
                        w-full max-w-6xl
                        rounded-full px-5 md:px-8 py-3.5
                        bg-white/70 backdrop-blur-2xl 
                        shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]
                        border border-white/60
                        transition-all duration-500
                        hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                        ${scrolled ? 'bg-white/85 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]' : ''}
                    `}
                >
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <a
                            href="#"
                            className="flex items-center h-7"
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                setIsOpen(false);
                            }}
                        >
                            <img src="/rockpeach-logo-new-black.png" alt="Rockpeach" className="w-auto h-5 md:h-6" />
                        </a>

                        <div className="flex items-center md:hidden">
                            {/* Mobile Language Switcher */}
                            <div className="relative mr-2" data-lang-root="true">
                                <button
                                    onClick={() => setDropdownOpen((open) => !open)}
                                    className={`group inline-flex items-center rounded-full border border-gray-900/10 bg-white/40 backdrop-blur px-2.5 py-1.5 text-[11px] font-inter font-semibold text-gray-800 transition-all hover:bg-white/70 ${
                                        dropdownOpen ? 'bg-white/70' : ''
                                    }`}
                                    aria-label="Change language"
                                    aria-haspopup="menu"
                                    aria-controls="lang-menu-mobile"
                                >
                                    <span className="tracking-wider uppercase">{localLang}</span>
                                    <svg
                                        className={`w-2.5 h-2.5 ml-1 text-gray-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden absolute left-0 z-50 mt-2 rounded-2xl border border-gray-900/10 shadow-[0_8px_24px_0_rgba(0,0,0,0.12)] backdrop-blur-2xl min-w-28 bg-white/95"
                                            id="lang-menu-mobile"
                                            role="menu"
                                        >
                                            <div className="py-1">
                                                {['en', 'nl']
                                                    .filter((l) => l !== localLang)
                                                    .map((l) => (
                                                        <button
                                                            key={l}
                                                            onClick={() => {
                                                                setLocalLang(l);
                                                                setDropdownOpen(false);
                                                            }}
                                                            className="w-full text-left px-3 py-2 text-xs font-inter font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-900 transition-all"
                                                        >
                                                            {l === 'en' ? 'EN' : 'NL'}
                                                        </button>
                                                    ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Mobile nav button */}
                            <button className="text-gray-600 md:hidden focus:outline-none" onClick={toggleMenu}>
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden items-center gap-1 lg:gap-2 md:flex">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium text-gray-800 transition-all duration-300 font-inter hover:text-gray-900 relative group whitespace-nowrap rounded-full hover:bg-white/50"
                                >
                                    {link.name}
                                </a>
                            ))}

                            {/* Divider */}
                            <div className="w-px h-4 bg-gray-400/30 mx-1"></div>

                            {/* CTA Button */}
                            <a
                                href="#contact"
                                onClick={(e) => handleNavClick(e, '#contact')}
                                className="px-5 lg:px-6 py-2 text-xs lg:text-sm font-semibold text-gray-900 bg-gradient-to-br from-white via-white to-gray-50 rounded-full transition-all duration-300 transform font-inter hover:shadow-lg border border-gray-900/10 hover:scale-[1.02] whitespace-nowrap shadow-sm"
                            >
                                {translations[safeLang].contact}
                            </a>

                            {/* Language Switcher */}
                            <div className="relative ml-1" data-lang-root="true">
                                <button
                                    onClick={() => setDropdownOpen((open) => !open)}
                                    className={`group inline-flex items-center rounded-full border border-gray-900/10 bg-white/40 backdrop-blur px-3 py-2 text-xs font-inter font-semibold text-gray-800 transition-all hover:bg-white/70 hover:border-gray-900/20 ${
                                        dropdownOpen ? 'bg-white/70 border-gray-900/20' : ''
                                    }`}
                                    aria-label="Change language"
                                    aria-haspopup="menu"
                                    aria-controls="lang-menu-desktop"
                                >
                                    <span className="tracking-wider uppercase">{localLang}</span>
                                    <svg
                                        className={`w-3 h-3 ml-1.5 text-gray-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden absolute right-0 z-50 mt-3 rounded-2xl border border-gray-900/10 shadow-[0_8px_24px_0_rgba(0,0,0,0.12)] backdrop-blur-2xl min-w-40 bg-white/95"
                                            id="lang-menu-desktop"
                                            role="menu"
                                        >
                                            <div className="py-1.5">
                                                {['en', 'nl']
                                                    .filter((l) => l !== localLang)
                                                    .map((l) => (
                                                        <button
                                                            key={l}
                                                            onClick={() => {
                                                                setLocalLang(l);
                                                                setDropdownOpen(false);
                                                            }}
                                                            className="px-4 py-2.5 w-full text-sm text-left text-gray-800 transition-all font-inter hover:bg-gray-50 hover:text-gray-900 font-medium"
                                                        >
                                                            {l === 'en' ? 'English' : 'Nederlands'}
                                                        </button>
                                                    ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu - Floating Dropdown */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: -10 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute top-full left-2 right-2 mt-4 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] border border-white/60 md:hidden overflow-hidden"
                        >
                            <div className="flex flex-col items-center px-6 py-6 space-y-2">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className="py-2.5 px-4 w-full font-medium text-center text-gray-800 transition-all duration-200 font-inter hover:text-gray-900 rounded-full hover:bg-white/50"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                                <div className="w-full h-px bg-gray-400/20 my-2"></div>
                                <a
                                    href="#contact"
                                    onClick={(e) => handleNavClick(e, '#contact')}
                                    className="px-6 py-2.5 w-full font-semibold text-center text-gray-900 bg-gradient-to-br from-white via-white to-gray-50 rounded-full font-inter shadow-sm border border-gray-900/10"
                                >
                                    {translations[safeLang].contact}
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </LangContext.Provider>
    );
};

export default Navbar;
