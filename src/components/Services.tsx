import React, { useContext } from "react";
import { Bot, Layers3, Map, Sparkles } from "lucide-react";
import { LangContext } from "./Navbar";

const translations = {
  en: {
    services: "What Rockpeach can make real",
    servicesDesc: "Not four vague pillars. Four connected ways to get a useful product into someone's hands.",
    aiTitle: "AI systems",
    aiSubtitle: "Agents, assistants and workflow automation",
    aiBody: "We turn repeated decisions and manual steps into reliable AI-assisted flows with human control where it matters.",
    softwareTitle: "Software products",
    softwareSubtitle: "Web apps, backends and mobile experiences",
    softwareBody: "We design and build the interfaces, APIs, databases and integrations that make the product usable every day.",
    designTitle: "Design and motion",
    designSubtitle: "Product UI, brand moments and video-ready visuals",
    designBody: "We give the work a visual spine: clean screens, interaction details, launch assets and motion where it adds clarity.",
    consultingTitle: "Technical strategy",
    consultingSubtitle: "Architecture, GIS and delivery decisions",
    consultingBody: "We help teams choose the right stack, map the technical risk and build around the real constraints.",
    labTitle: "AI agents for the work behind the product",
    labSubtitle: "Human-led AI systems",
    labStatus: "Useful AI",
    lab1: "Agents",
    lab1Body: "Handle repeatable tasks, check context and ask when judgment is needed.",
    lab2: "Assistants",
    lab2Body: "Help teams or users find answers, draft next steps and move faster.",
    lab3: "Automation",
    lab3Body: "Connect tools, data and approvals so busywork does not pile up.",
    lab4: "Quality loop",
    lab4Body: "Measure what helps, remove what does not and keep people in control.",
    labEffect: "AI that removes busywork without removing human judgment.",
  },
  nl: {
    services: "Wat Rockpeach concreet maakt",
    servicesDesc: "Geen vier vage pijlers. Vier verbonden manieren om een bruikbaar product in handen van gebruikers te krijgen.",
    aiTitle: "AI systemen",
    aiSubtitle: "Agents, assistenten en workflow automatisering",
    aiBody: "We maken herhaalde beslissingen en handwerk tot betrouwbare AI ondersteunde flows met menselijke controle waar dat nodig is.",
    softwareTitle: "Softwareproducten",
    softwareSubtitle: "Webapps, backends en mobiele ervaringen",
    softwareBody: "We ontwerpen en bouwen interfaces, APIs, databases en integraties die het product dagelijks bruikbaar maken.",
    designTitle: "Design en motion",
    designSubtitle: "Product UI, brand momenten en video-ready visuals",
    designBody: "We geven het werk een visuele ruggengraat: heldere schermen, interactiedetails, launch assets en motion waar het duidelijkheid toevoegt.",
    consultingTitle: "Technische strategie",
    consultingSubtitle: "Architectuur, GIS en delivery keuzes",
    consultingBody: "We helpen teams de juiste stack kiezen, technisch risico in kaart brengen en bouwen rond de echte beperkingen.",
    labTitle: "AI agents voor het werk achter het product",
    labSubtitle: "AI systemen met menselijke regie",
    labStatus: "Nuttige AI",
    lab1: "Agents",
    lab1Body: "Nemen herhaalbaar werk over, lezen context en vragen om oordeel wanneer dat nodig is.",
    lab2: "Assistenten",
    lab2Body: "Helpen teams of gebruikers antwoorden vinden, vervolgstappen maken en sneller werken.",
    lab3: "Automatisering",
    lab3Body: "Verbinden tools, data en approvals zodat druk werk niet blijft liggen.",
    lab4: "Kwaliteitslus",
    lab4Body: "Meet wat helpt, haalt weg wat niet werkt en houdt mensen in controle.",
    labEffect: "AI die druk werk weghaalt zonder menselijk oordeel weg te halen.",
  },
} as const;

type Lang = keyof typeof translations;

const Services: React.FC = () => {
  const { lang } = useContext(LangContext);
  const safeLang: Lang = ["en", "nl"].includes(lang) ? (lang as Lang) : "en";
  const t = translations[safeLang];

  const services = [
    { title: t.aiTitle, subtitle: t.aiSubtitle, body: t.aiBody, icon: Bot },
    { title: t.softwareTitle, subtitle: t.softwareSubtitle, body: t.softwareBody, icon: Layers3 },
    { title: t.designTitle, subtitle: t.designSubtitle, body: t.designBody, icon: Sparkles },
    { title: t.consultingTitle, subtitle: t.consultingSubtitle, body: t.consultingBody, icon: Map },
  ];

  const deliveryMap = [
    { title: t.lab1, body: t.lab1Body },
    { title: t.lab2, body: t.lab2Body },
    { title: t.lab3, body: t.lab3Body },
    { title: t.lab4, body: t.lab4Body },
  ];

  return (
    <section id="services" className="relative overflow-hidden bg-gray-950 py-20 text-white lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(0,119,255,0.22),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(255,0,85,0.18),transparent_30%)]" aria-hidden="true" />
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-10 grid gap-5 lg:grid-cols-[0.85fr_1fr] lg:items-end">
            <h2 className="max-w-3xl text-3xl font-bold leading-tight font-manrope md:text-5xl">{t.services}</h2>
            <p className="max-w-2xl text-lg leading-relaxed text-white/70 lg:justify-self-end">{t.servicesDesc}</p>
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-[1320px] gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="group bg-gray-950/90 p-7 transition hover:bg-white/[0.055] md:p-9">
                <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-gray-950">
                  <Icon size={22} />
                </div>
                <div className="text-sm font-semibold text-primary-200">{service.subtitle}</div>
                <h3 className="mt-3 text-2xl font-bold font-manrope">{service.title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65">{service.body}</p>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-10 max-w-[1320px]">
          <div className="rounded-lg border border-white/10 bg-white/[0.06] p-3 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur">
            <div className="relative overflow-hidden rounded-md border border-white/10 bg-gray-950/90 p-6 lg:p-8">
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary-500/20 blur-3xl" aria-hidden="true" />
              <div className="absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-accent-500/16 blur-3xl" aria-hidden="true" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-white/55">{t.labSubtitle}</div>
                  <div className="mt-1 max-w-md text-2xl font-bold leading-tight font-manrope">{t.labTitle}</div>
                </div>
                <div className="shrink-0 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white/60">
                  {t.labStatus}
                </div>
              </div>

              <div className="relative mt-10 rounded-md border border-white/10 bg-white/[0.045] p-4 lg:p-5">
                <div className="relative grid gap-3 sm:grid-cols-4">
                  {deliveryMap.map((item) => {
                    return (
                      <div key={item.title} className="rounded-md border border-white/10 bg-gray-950/60 p-4 lg:min-h-[180px] lg:p-6">
                        <div className="h-1 w-8 rounded-full bg-gradient-to-r from-primary-400 to-accent-400" aria-hidden="true" />
                        <div className="mt-4 text-sm font-bold text-white">{item.title}</div>
                        <p className="mt-2 text-xs leading-relaxed text-white/55">{item.body}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="relative mt-8 flex flex-col items-center gap-4 px-2 text-center">
                <div className="flex w-full max-w-xl items-center gap-4" aria-hidden="true">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/12 to-primary-300/50" />
                  <span className="h-2 w-2 rounded-full bg-accent-300/80 shadow-[0_0_18px_rgba(251,113,133,0.45)]" />
                  <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/12 to-accent-300/45" />
                </div>
                <p className="max-w-2xl text-sm font-medium leading-relaxed tracking-[0.01em] text-white/78 sm:text-[0.95rem]">
                  <span className="bg-[linear-gradient(90deg,#f8fafc_0%,#dbeafe_48%,#fda4af_100%)] bg-clip-text text-transparent">
                    {t.labEffect}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
