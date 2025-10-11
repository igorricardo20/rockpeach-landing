import React, { useContext } from "react";
import { ChevronRight, Instagram, Linkedin, Github as GitHub } from "lucide-react";
import { LangContext } from "./Navbar";

// Localization dictionary
const translations = {
  en: {
    company: "Company",
    about: "About us",
    projects: "Projects",
    contact: "Contact",
    services: "Services",
    web: "Web Development",
    mobile: "Mobile Apps",
    ux: "UX/UI Design",
    tech: "Tech Consulting",
    address2: "Utrecht, The Netherlands",
    phone: "+31 6 87 34 43 45",
    email: "contact@rockpeach.io",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    rights: (year: number) => `© ${year} Rockpeach. All rights reserved.`,
  },
  nl: {
    company: "Bedrijf",
    about: "Over ons",
    projects: "Projecten",
    contact: "Contact",
    services: "Diensten",
    web: "Webontwikkeling",
    mobile: "Mobiele apps",
    ux: "UX/UI Design",
    tech: "Tech consulting",
    address2: "Utrecht, Nederland",
    phone: "+31 6 87 34 43 45",
    email: "contact@rockpeach.io",
    privacy: "Privacybeleid",
    terms: "Gebruiksvoorwaarden",
    rights: (year: number) => `© ${year} Rockpeach. Alle rechten voorbehouden.`,
  },
} as const;
type Lang = keyof typeof translations;

const Footer: React.FC = () => {
  const { lang } = useContext(LangContext);
  const safeLang: Lang = ["en", "nl"].includes(lang) ? (lang as Lang) : "en";
  const t = translations[safeLang];

  return (
    <footer className="bg-gray-50 text-gray-800 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="p-6 md:p-8 rounded-3xl bg-white shadow-sm">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img 
              src="/rockpeach-logo.png" 
              alt="Rockpeach" 
              className="h-10 w-auto mb-6" 
            />
            <p className="text-gray-600 mb-6 font-inter">
              We develop software with agility, beauty and purpose.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/eurockpeach" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="X"
                style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: 20, lineHeight: 1 }}
              >
                {/* Unicode 𝕏 for X.com brand */}
                <span style={{ fontFamily: 'serif, monospace', fontWeight: 900, fontSize: 20, lineHeight: 1 }}>𝕏</span>
              </a>
              <a 
                href="https://www.linkedin.com/company/rockpeach/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="GitHub"
              >
                <GitHub size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-manrope font-bold mb-6 text-gray-800">{t.company}</h3>
            <ul className="space-y-4">
              <li>
                <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center font-inter">
                  <ChevronRight size={16} className="mr-2" />
                  {t.about}
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center font-inter">
                  <ChevronRight size={16} className="mr-2" />
                  {t.projects}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center font-inter">
                  <ChevronRight size={16} className="mr-2" />
                  {t.contact}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-manrope font-bold mb-6 text-gray-800">{t.services}</h3>
            <ul className="space-y-4">
              <li>
                <a href="#services" onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-600 hover:text-gray-900 transition-colors flex items-center font-inter">
                  <ChevronRight size={16} className="mr-2" />
                  {t.web}
                </a>
              </li>
              <li>
                <a href="#services" onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-400 hover:text-white transition-colors flex items-center font-inter">
                  <ChevronRight size={16} className="mr-2" />
                  {t.mobile}
                </a>
              </li>
              <li>
                <a href="#services" onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-400 hover:text-white transition-colors flex items-center font-inter">
                  <ChevronRight size={16} className="mr-2" />
                  {t.ux}
                </a>
              </li>
              <li>
                <a href="#services" onClick={e => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-gray-400 hover:text-white transition-colors flex items-center font-inter">
                  <ChevronRight size={16} className="mr-2" />
                  {t.tech}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-manrope font-bold mb-6 text-gray-800">{t.contact}</h3>
            <address className="not-italic text-gray-600 space-y-4 font-inter">
              <p>{t.email}</p>
              <p>{t.phone}</p>
              <p>{t.address2}</p>
            </address>
          </div>
        </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0 font-inter">
              {t.rights(new Date().getFullYear())}
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-inter">
                {t.privacy}
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-inter">
                {t.terms}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;