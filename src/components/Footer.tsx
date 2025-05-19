import React from "react";
import { ChevronRight, Instagram, Twitter, Linkedin, Github as GitHub } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <img 
              src="/rockpeach-logo.svg" 
              alt="Rockpeach" 
              className="h-10 w-auto mb-6" 
            />
            <p className="text-gray-400 mb-6 font-inter">
              We develop software with agility, beauty and purpose.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/eurockpeach" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/rockpeach/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GitHub size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-manrope font-bold mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors flex items-center font-inter">
                  <ChevronRight size={16} className="mr-2" />
                  About us
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors flex items-center font-inter">
                  <ChevronRight size={16} className="mr-2" />
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors flex items-center font-inter">
                  <ChevronRight size={16} className="mr-2" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-manrope font-bold mb-6">Services</h3>
            <ul className="space-y-4">
              <li>
                <a href="#services" onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-400 hover:text-white transition-colors flex items-center font-inter">
                  <ChevronRight size={16} className="mr-2" />
                  Web Development
                </a>
              </li>
              <li>
                <a href="#services" onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-400 hover:text-white transition-colors flex items-center font-inter">
                  <ChevronRight size={16} className="mr-2" />
                  Mobile Apps
                </a>
              </li>
              <li>
                <a href="#services" onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-400 hover:text-white transition-colors flex items-center font-inter">
                  <ChevronRight size={16} className="mr-2" />
                  UX/UI Design
                </a>
              </li>
              <li>
                <a href="#services" onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-400 hover:text-white transition-colors flex items-center font-inter">
                  <ChevronRight size={16} className="mr-2" />
                  Tech Consulting
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-manrope font-bold mb-6">Contact</h3>
            <address className="not-italic text-gray-400 space-y-4 font-inter">
              <p>Zijdevlinder 196</p>
              <p>Nijkerk, Netherlands</p>
              <p>+31 6 87 34 43 45</p>
              <p>contact@rockpeach.io</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0 font-inter">
              &copy; {new Date().getFullYear()} Rockpeach. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm font-inter">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm font-inter">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;