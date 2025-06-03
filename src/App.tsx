import { useEffect, useState } from 'react';
import Navbar, { LangContext } from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Services from './components/Services';

// Import fonts
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('rockpeach-lang') || 'en');

  // Broadcast language change to all components (including Navbar)
  useEffect(() => {
    localStorage.setItem('rockpeach-lang', lang);
    window.dispatchEvent(new Event('rockpeach-lang-change'));
  }, [lang]);

  // Listen for language changes from other components/tabs
  useEffect(() => {
    const handler = () => {
      const newLang = localStorage.getItem('rockpeach-lang') || 'en';
      if (newLang !== lang) setLang(newLang);
    };
    window.addEventListener('rockpeach-lang-change', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('rockpeach-lang-change', handler);
      window.removeEventListener('storage', handler);
    };
  }, [lang]);

  // Smooth scroll behavior for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (href) {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            targetEl.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }, []);

  // Ensure all components update when lang changes
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div className="font-inter text-gray-900 overflow-x-hidden">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Process />
        <Services />
        <Contact />
        <Footer />
      </div>
    </LangContext.Provider>
  );
}

export default App;