import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { LangContext } from './Navbar';

const Hero: React.FC = () => {
    const { lang } = useContext(LangContext);
    const translations = {
        en: {
            headline1: 'Transform your vision into powerful software solutions.',
            headline2: 'Solid code, sweet results.',
            sub: 'Transforming ideas into functional, beautiful digital products ready to scale.',
            cta: "Let's talk",
            learn: 'Learn more',
        },
        nl: {
            headline1: 'Transformeer uw visie in krachtige softwareoplossingen.',
            headline2: 'Solide code, mooie resultaten.',
            sub: 'We vertalen ideeën naar functionele, prachtige digitale producten die klaar zijn om te groeien.',
            cta: 'Contact opnemen',
            learn: 'Meer weten',
        },
    } as const;
    type Lang = keyof typeof translations;
    const safeLang: Lang = ['en', 'nl'].includes(lang) ? (lang as Lang) : 'en';
    const t = translations[safeLang];

    const scrollToProcess = () => {
        const processSection = document.getElementById('process');
        if (processSection) {
            processSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            className="relative min-h-screen flex items-center overflow-hidden"
            style={{
                backgroundImage: 'url(/image-mesh-gradient.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Subtle geometric accents */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.05, scale: 1 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/20"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.03, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
                    className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full border border-white/20"
                />
            </div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 py-20">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center flex flex-col items-center"
                    >
                        {/* Decorative line */}
                        <motion.div initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 0.8, delay: 0.3 }} className="h-[1.5px] bg-white/40 mb-6" />

                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-manrope font-bold text-white leading-[1.15] mb-4 tracking-tight">{t.headline1}</h1>

                        <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-10 font-serif italic font-light">{t.headline2}</p>

                        <motion.a
                            href="#contact"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 1)' }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block bg-white/90 text-gray-900 font-inter font-semibold py-3 px-10 rounded-full text-base shadow-2xl hover:shadow-white/20 transition-all duration-300 backdrop-blur-sm"
                        >
                            {t.cta}
                        </motion.a>

                        {/* Subtle badge or accent */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="mt-12 flex items-center gap-3 text-white/60 text-xs font-inter"
                        >
                            <div className="w-10 h-[1px] bg-white/30" />
                            <span className="tracking-widest uppercase">Est. 2024</span>
                            <div className="w-10 h-[1px] bg-white/30" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll down indicator */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-12 left-0 right-0 mx-auto flex justify-center"
            >
                <button onClick={scrollToProcess} className="flex flex-col items-center space-y-2 opacity-70 hover:opacity-100 transition-opacity group">
                    <span className="text-sm font-inter text-white/80 tracking-wide">{t.learn}</span>
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
                        <ChevronDown size={28} className="text-white/70 group-hover:text-white transition-colors" />
                    </motion.div>
                </button>
            </motion.div>
        </section>
    );
};

export default Hero;
