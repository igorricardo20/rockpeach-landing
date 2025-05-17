import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-manrope font-bold text-gray-900 leading-tight mb-6">
              We develop software with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                agility, beauty and purpose
              </span>
            </h1>
            <p className="text-gray-700 text-lg md:text-xl mb-8 font-inter leading-relaxed max-w-xl mx-auto lg:mx-0">
              Transforming ideas into functional, beautiful digital products ready to scale.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-primary-600 to-accent-600 text-white font-inter font-semibold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Let's talk
            </motion.a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="mx-auto"
              >
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Digital Transformation" 
                  className="rounded-2xl shadow-2xl max-w-full" 
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-20 sm:bottom-8 left-0 right-0 mx-auto flex justify-center w-full"
      >
        <button 
          onClick={scrollToAbout}
          className="flex flex-col items-center space-y-2 opacity-80 hover:opacity-100 transition-opacity group"
        >
          <span className="text-sm font-inter">Learn more</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={24} className="text-gray-700 group-hover:text-primary-600 transition-colors" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;