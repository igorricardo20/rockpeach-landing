import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "How we work", href: "#process" },
    { name: "Services", href: "#services" },
  ];

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

  return (
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
              Let's talk
            </a>
          </div>

          {/* Mobile nav button */}
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
                Let's talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;