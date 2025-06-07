import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as LucideIcons from "lucide-react";
import { processes } from "../data/process";
import { LangContext } from "./Navbar";

const Process: React.FC = () => {
  const { lang } = useContext(LangContext);
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

  // Localization dictionary
  const translations = {
    en: {
      process: "How we work",
      processDesc: "Our methodology combines cutting-edge technologies with agile processes to deliver exceptional solutions.",
      frameworks: "Modern Frameworks",
      frameworksDesc: "We use the latest and most efficient technologies on the market, such as React, Next.js, Node, and Flutter to create fast and scalable applications.",
      ci: "CI/CD Pipelines",
      ciDesc: "We automate the entire continuous integration and delivery process to ensure fast, secure, and consistent deployments.",
      design: "Design System",
      designDesc: "We create and implement robust design systems that ensure visual consistency and exceptional user experience.",
      agile: "Agile Deployment",
      agileDesc: "Our work methodology allows for incremental and constant deliveries, reducing launch time and increasing quality.",
    },
    nl: {
      process: "Hoe wij werken",
      processDesc: "Onze methodologie combineert de nieuwste technologieën met agile processen voor uitzonderlijke oplossingen.",
      frameworks: "Moderne Frameworks",
      frameworksDesc: "We gebruiken de nieuwste en meest efficiënte technologieën zoals React, Next.js, Node en Flutter om snelle en schaalbare applicaties te bouwen.",
      ci: "CI/CD Pipelines",
      ciDesc: "We automatiseren het volledige integratie- en leveringsproces voor snelle, veilige en consistente opleveringen.",
      design: "Design System",
      designDesc: "We creëren en implementeren robuuste designsystemen voor visuele consistentie en een uitzonderlijke gebruikerservaring.",
      agile: "Agile Ontwikkeling",
      agileDesc: "Onze werkwijze zorgt voor incrementele en constante opleveringen, waardoor de doorlooptijd korter wordt en de kwaliteit stijgt.",
    },
  } as const;
  type Lang = keyof typeof translations;
  const safeLang: Lang = ["en", "nl"].includes(lang) ? (lang as Lang) : "en";
  const t = translations[safeLang] || translations.en;

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
            {t.process}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-inter">
            {t.processDesc}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {processes.map((process, idx) => {
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
                  {idx === 0 ? t.frameworks : idx === 1 ? t.ci : idx === 2 ? t.design : t.agile}
                </h3>
                <p className="text-gray-700 font-inter">
                  {idx === 0 ? t.frameworksDesc : idx === 1 ? t.ciDesc : idx === 2 ? t.designDesc : t.agileDesc}
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