import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, MessageSquare, Phone, Mail } from "lucide-react";

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section 
      id="contact" 
      className="py-20 lg:py-32 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(0,147,237,0.05) 0%, rgba(213,95,127,0.05) 100%)"
      }}
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-manrope font-bold mb-6 text-gray-900">
            Let's talk?
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-inter">
            We are ready to turn your ideas into exceptional digital solutions.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2 space-y-8 mb-8 px-2 sm:mb-0"
            >
              <div>
                <h3 className="text-xl font-manrope font-bold text-gray-900 mb-4">
                  Get in touch
                </h3>
                <p className="text-gray-700 mb-6 font-inter">
                  We want to hear about your project and how we can help make it a reality.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-full shadow-sm mr-4">
                    <MessageSquare size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1 font-inter">Chat with the team</h4>
                    <p className="text-gray-700 text-sm font-inter">Chat with our specialists in real time.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-full shadow-sm mr-4">
                    <Phone size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1 font-inter">Phone</h4>
                    <p className="text-gray-700 text-sm font-inter">+55 (11) 3456-7890</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-full shadow-sm mr-4">
                    <Mail size={20} className="text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1 font-inter">Email</h4>
                    <p className="text-gray-700 text-sm font-inter">contact@rockpeach.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 font-inter"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 font-inter"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 font-inter"
                      placeholder="Message subject"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 font-inter"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-inter font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                    type="submit"
                  >
                    Send message
                    <Send size={18} className="ml-2" />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;