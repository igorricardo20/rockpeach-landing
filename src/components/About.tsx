import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3 order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-manrope font-bold mb-6 text-gray-900">
                About us
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed text-gray-700 mb-6 font-inter">
                  At Rockpeach, we believe technology goes beyond code — it's about
                  creating experiences that connect people and businesses. We develop
                  software with agility and excellence, using modern tools to quickly
                  deliver what our clients need.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 mb-6 font-inter">
                  We combine speed, reliability, and a keen eye for design. We turn
                  concepts into products that drive success.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-8 items-center justify-center">
                <div className="bg-card-gradient border border-gray-100 rounded-xl px-6 py-4 flex flex-col sm:flex-row items-center justify-center shadow-sm flex-1 min-w-[300px] min-h-[110px] w-[300px] sm:min-w-[180px] sm:w-[200px] text-center">
                  <div className="mr-0 sm:mr-4 mb-2 sm:mb-0 text-primary-600 font-manrope font-bold text-2xl">
                    16+
                  </div>
                  <div className="font-inter text-center">
                    <h3 className="font-medium">Prototypes Shipped</h3>
                    <p className="text-sm text-gray-600">Apps, MVPs & experiments</p>
                  </div>
                </div>
                <div className="bg-card-gradient border border-gray-100 rounded-xl px-6 py-4 flex flex-col sm:flex-row items-center justify-center shadow-sm flex-1 min-w-[300px] min-h-[110px] w-[300px] sm:min-w-[180px] sm:w-[200px] text-center">
                  <div className="mr-0 sm:mr-4 mb-2 sm:mb-0 text-secondary-600 font-manrope font-bold text-2xl">
                    100%
                  </div>
                  <div className="font-inter text-center">
                    <h3 className="font-medium">Commitment</h3>
                    <p className="text-sm text-gray-600">Attention to every detail</p>
                  </div>
                </div>
                <div className="bg-card-gradient border border-gray-100 rounded-xl px-6 py-4 flex flex-col sm:flex-row items-center justify-center shadow-sm flex-1 min-w-[300px] min-h-[110px] w-[300px] sm:min-w-[180px] sm:w-[200px] text-center">
                  <div className="mr-0 sm:mr-4 mb-2 sm:mb-0 text-accent-600 font-manrope font-bold text-2xl">
                    3+
                  </div>
                  <div className="font-inter text-center">
                    <h3 className="font-medium">Countries Served</h3>
                    <p className="text-sm text-gray-600">Europe & South America</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=4147&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Our team working"
                    className="w-full h-auto object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0))",
                    }}
                  ></div>
                </div>
                {/* Removed floating circles for a more professional look */}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;