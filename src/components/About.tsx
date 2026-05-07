import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check } from "lucide-react";
import { LangContext } from "./Navbar";

const About: React.FC = () => {
  const { lang } = useContext(LangContext);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.18 });

  const translations = {
    en: {
      about: "A small studio built for fast, careful work.",
      aboutText1:
        "Rockpeach sits between product strategy, software engineering and design. That means fewer handoffs, clearer decisions and a first version that feels coherent from day one.",
      aboutText2:
        "We like modern tools, but we care more about useful outcomes: the screen that makes sense, the automation that saves time, the launch that does not wobble.",
      stat1: "Prototypes shipped",
      stat1desc: "POCs, MVPs and product experiments",
      stat2: "Commitment",
      stat2desc: "Close attention to the small things",
      stat3: "Countries served",
      stat3desc: "Europe and South America",
      note1: "Lean team, direct communication",
      note2: "Design and engineering together",
      note3: "Built around your first real users",
    },
    nl: {
      about: "Een kleine studio voor snel en zorgvuldig werk.",
      aboutText1:
        "Rockpeach zit tussen productstrategie, software engineering en design. Daardoor zijn er minder overdrachten, helderdere keuzes en voelt de eerste versie vanaf dag een coherent.",
      aboutText2:
        "We houden van moderne tools, maar geven meer om nuttige uitkomsten: een scherm dat klopt, automatisering die tijd bespaart en een lancering die stevig staat.",
      stat1: "Geleverde prototypes",
      stat1desc: "POCs, MVPs en productexperimenten",
      stat2: "Toewijding",
      stat2desc: "Aandacht voor de kleine dingen",
      stat3: "Landen bediend",
      stat3desc: "Europa en Zuid-Amerika",
      note1: "Lean team, directe communicatie",
      note2: "Design en engineering samen",
      note3: "Gebouwd rond je eerste echte gebruikers",
    },
  } as const;

  type Lang = keyof typeof translations;
  const safeLang: Lang = ["en", "nl"].includes(lang) ? (lang as Lang) : "en";
  const t = translations[safeLang];

  const stats = [
    { value: "16+", title: t.stat1, desc: t.stat1desc },
    { value: "100%", title: t.stat2, desc: t.stat2desc },
    { value: "3+", title: t.stat3, desc: t.stat3desc },
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-[#f4f5f7] py-20 lg:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7 }}
          className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center"
        >
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold leading-tight text-gray-950 font-manrope md:text-5xl">{t.about}</h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-gray-700">
              <p>{t.aboutText1}</p>
              <p>{t.aboutText2}</p>
            </div>
            <div className="mt-8 grid gap-4 sm:max-w-lg">
              {[t.note1, t.note2, t.note3].map((note) => (
                <div key={note} className="flex items-center gap-3 border-b border-gray-200/80 pb-3 text-[0.98rem] font-medium tracking-[0.01em] text-gray-800 last:border-b-0 last:pb-0">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center text-gray-900/58">
                    <Check size={15} strokeWidth={2.3} />
                  </span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent-400/20 blur-3xl" aria-hidden="true" />
            <div className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white p-3 shadow-[0_24px_80px_rgba(15,23,42,0.1)]">
              <img src="/it-team.png" alt="Rockpeach IT team" className="h-64 w-full rounded-[1.2rem] object-cover md:h-80" />
              <div className="grid gap-px overflow-hidden rounded-[1.2rem] bg-gray-200 mt-3">
                {stats.map((stat) => (
                  <div key={stat.title} className="grid grid-cols-[5.5rem_1fr] items-center gap-4 bg-white p-5">
                    <div className="text-3xl font-bold text-gray-950 font-manrope">{stat.value}</div>
                    <div>
                      <h3 className="font-semibold text-gray-950">{stat.title}</h3>
                      <p className="text-sm text-gray-600">{stat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
