import React, { useContext } from 'react';
// framer-motion not needed for the simplified card
import { LangContext } from './Navbar';

// New services layout: a centered panel split into 4 quadrants describing the 4 pillars.
// The copy is simple, honest and professional. Localized (EN / NL).

const translations = {
  en: {
    services: 'Our pillars',
    servicesDesc: 'Four focused areas where we help teams and products grow.',
    aiTitle: 'AI',
    aiSubtitle: 'Agents & Automation',
    aiBody:
      'We build intelligent agents, automation and workflow integrations that reduce manual work and speed decision-making.',
    softwareTitle: 'Software',
    softwareSubtitle: 'Web & Apps',
    softwareBody:
      'End-to-end software: modern websites, backend services and mobile apps tailored to your business.',
    designTitle: 'Graphic Design',
    designSubtitle: 'UI & Motion',
    designBody:
      'Design for interfaces, brand assets and motion — clear, usable visuals for screens and video.',
    consultingTitle: 'Tech Consulting',
    consultingSubtitle: 'Consulting & GIS',
    consultingBody:
      'Strategic technical guidance and geospatial systems to help you make smarter, data-driven choices.',
  },
  nl: {
    services: 'Onze pijlers',
    servicesDesc: 'Vier aandachtsgebieden waarin we teams en producten laten groeien.',
    aiTitle: 'AI',
    aiSubtitle: 'Agents & Automatisering',
    aiBody:
      'We bouwen intelligente agents, automatisering en workflow-integraties die handwerk verminderen en besluiten versnellen.',
    softwareTitle: 'Software',
    softwareSubtitle: 'Web & Apps',
    softwareBody:
      'End-to-end software: moderne websites, backend services en mobiele apps op maat voor uw organisatie.',
    designTitle: 'Grafisch Ontwerp',
    designSubtitle: 'UI & Motion',
    designBody:
      'Design voor interfaces, merkassets en motion — duidelijke, bruikbare visuals voor schermen en video.',
    consultingTitle: 'Tech Consulting',
    consultingSubtitle: 'Consulting & GIS',
    consultingBody:
      'Strategisch technisch advies en geospatiale systemen zodat u betere, datagedreven keuzes kunt maken.',
  },
} as const;

type Lang = keyof typeof translations;

const Services: React.FC = () => {
  const { lang } = useContext(LangContext);
  const safeLang: Lang = ['en', 'nl'].includes(lang) ? (lang as Lang) : 'en';
  const t = translations[safeLang];

  return (
    <section id="services" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-manrope font-bold mb-3 text-gray-900">{t.services}</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-inter">{t.servicesDesc}</p>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* card containing 4 quadrants; mobile: 1 column x 4 rows, md+: 2x2 */}
          <div className="bg-white border border-transparent rounded-xl md:rounded-3xl overflow-hidden w-full md:min-h-[600px] flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-4 md:grid-rows-2 auto-rows-fr gap-1 bg-[rgba(var(--duo-right),0.16)] flex-1">
              <div className="bg-white p-8 flex flex-col justify-center text-left h-full">
                <h3 className="text-2xl md:text-3xl font-manrope font-bold mb-1 text-gray-900">{t.aiTitle}</h3>
                <div className="text-sm md:text-base text-zinc-500 mb-3">{t.aiSubtitle}</div>
                <p className="text-sm text-gray-700">{t.aiBody}</p>
              </div>

              <div className="bg-white p-8 flex flex-col justify-center text-left h-full">
                <h3 className="text-2xl md:text-3xl font-manrope font-bold mb-1 text-gray-900">{t.softwareTitle}</h3>
                <div className="text-sm md:text-base text-zinc-500 mb-3">{t.softwareSubtitle}</div>
                <p className="text-sm text-gray-700">{t.softwareBody}</p>
              </div>

              <div className="bg-white p-8 flex flex-col justify-center text-left h-full">
                <h3 className="text-2xl md:text-3xl font-manrope font-bold mb-1 text-gray-900">{t.designTitle}</h3>
                <div className="text-sm md:text-base text-zinc-500 mb-3">{t.designSubtitle}</div>
                <p className="text-sm text-gray-700">{t.designBody}</p>
              </div>

              <div className="bg-white p-8 flex flex-col justify-center text-left h-full">
                <h3 className="text-2xl md:text-3xl font-manrope font-bold mb-1 text-gray-900">{t.consultingTitle}</h3>
                <div className="text-sm md:text-base text-zinc-500 mb-3">{t.consultingSubtitle}</div>
                <p className="text-sm text-gray-700">{t.consultingBody}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
