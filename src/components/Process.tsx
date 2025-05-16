import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as LucideIcons from "lucide-react";
import { processes } from "../data/process";

const Process: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="process" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-manrope font-bold mb-6 text-gray-900">
            How we work
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-inter">
            Our methodology combines cutting-edge technologies with agile processes to deliver exceptional solutions.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {processes.map((process) => {
            // Dynamically get the icon component
            const LucideIcon = LucideIcons[process.icon as keyof typeof LucideIcons] as React.ElementType;
            
            return (
              <motion.div
                key={process.id}
                variants={item}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br"
                  style={{
                    background: process.id % 2 === 0 
                      ? "linear-gradient(135deg, #8855ff 0%, #d3227f 100%)" 
                      : "linear-gradient(135deg, #0077ff 0%, #b31762 100%)"
                  }}
                >
                  {LucideIcon && <LucideIcon size={28} className="text-white" />}
                </div>
                <h3 className="text-xl font-manrope font-bold text-gray-900 mb-3">
                  {process.title}
                </h3>
                <p className="text-gray-700 font-inter">
                  {process.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Process;