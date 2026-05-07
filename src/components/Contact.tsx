import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Mail, Phone, Send } from "lucide-react";
import { LangContext } from "./Navbar";

const Contact: React.FC = () => {
  const { lang } = useContext(LangContext);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const translations = {
    en: {
      contact: "Bring the messy idea. We will make the first version visible.",
      contactDesc: "Start with a free concept: a short discovery, a concrete product direction and a practical build plan.",
      getInTouch: "Direct line",
      getInTouchDesc: "Tell us what you want to build, automate or improve. We will reply with a useful next step.",
      phone: "Phone",
      email: "Email",
      name: "Name",
      emailLabel: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send message",
      phoneValue: "+31 6 87 34 43 45",
      placeholderName: "Your name",
      placeholderEmail: "your@email.com",
      placeholderSubject: "What are we shaping?",
      placeholderMessage: "A few sentences about the goal, audience, deadline or current bottleneck...",
      promise1: "No sales script",
      promise2: "Useful reply",
      promise3: "Clear next step",
    },
    nl: {
      contact: "Breng het rommelige idee. Wij maken de eerste versie zichtbaar.",
      contactDesc: "Start met een gratis concept: korte discovery, concrete productrichting en een praktisch bouwplan.",
      getInTouch: "Direct contact",
      getInTouchDesc: "Vertel wat je wilt bouwen, automatiseren of verbeteren. We reageren met een bruikbare volgende stap.",
      phone: "Telefoon",
      email: "E-mail",
      name: "Naam",
      emailLabel: "E-mail",
      subject: "Onderwerp",
      message: "Bericht",
      send: "Verstuur bericht",
      phoneValue: "+31 6 87 34 43 45",
      placeholderName: "Uw naam",
      placeholderEmail: "uw@email.com",
      placeholderSubject: "Wat gaan we vormgeven?",
      placeholderMessage: "Een paar zinnen over het doel, de doelgroep, deadline of huidige bottleneck...",
      promise1: "Geen sales script",
      promise2: "Bruikbare reactie",
      promise3: "Heldere volgende stap",
    },
  } as const;

  type Lang = keyof typeof translations;
  const safeLang: Lang = ["en", "nl"].includes(lang) ? (lang as Lang) : "en";
  const t = translations[safeLang];

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = React.useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("https://formspree.io/f/xpwrlllo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setError("Failed to send. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Failed to send. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-[2rem] bg-gray-950 text-white shadow-[0_28px_100px_rgba(15,23,42,0.22)]"
        >
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            <div className="relative p-7 md:p-10 lg:p-12">
              <div className="absolute -left-16 top-0 h-52 w-52 rounded-full bg-primary-500/30 blur-3xl" aria-hidden="true" />
              <div className="absolute bottom-10 right-0 h-44 w-44 rounded-full bg-accent-500/25 blur-3xl" aria-hidden="true" />
              <div className="relative">
                <h2 className="text-3xl font-bold leading-tight font-manrope md:text-5xl">{t.contact}</h2>
                <p className="mt-5 text-lg leading-relaxed text-white/70">{t.contactDesc}</p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {[t.promise1, t.promise2, t.promise3].map((promise) => (
                    <div key={promise} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white/80">
                      {promise}
                    </div>
                  ))}
                </div>

                <div className="mt-10 space-y-5">
                  <h3 className="text-xl font-bold font-manrope">{t.getInTouch}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{t.getInTouchDesc}</p>
                  <div className="space-y-4">
                    <a href={`tel:${t.phoneValue.replace(/\s/g, "")}`} className="flex items-center gap-4 text-white/80 transition hover:text-white">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-950"><Phone size={18} /></span>
                      <span>
                        <span className="block text-sm font-semibold">{t.phone}</span>
                        <span className="block text-sm text-white/60">{t.phoneValue}</span>
                      </span>
                    </a>
                    <a href="mailto:contact@rockpeach.io" className="flex items-center gap-4 text-white/80 transition hover:text-white">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-950"><Mail size={18} /></span>
                      <span>
                        <span className="block text-sm font-semibold">{t.email}</span>
                        <span className="block text-sm text-white/60">contact@rockpeach.io</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 text-gray-950 md:p-6">
              <form className="h-full rounded-[1.5rem] bg-gray-50 p-5 md:p-7" onSubmit={handleSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    {t.name}
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 font-normal text-gray-950 shadow-sm outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10"
                      placeholder={t.placeholderName}
                      required
                    />
                  </label>
                  <label className="block text-sm font-semibold text-gray-700">
                    {t.emailLabel}
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 font-normal text-gray-950 shadow-sm outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10"
                      placeholder={t.placeholderEmail}
                      required
                    />
                  </label>
                </div>
                <label className="mt-5 block text-sm font-semibold text-gray-700">
                  {t.subject}
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 font-normal text-gray-950 shadow-sm outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10"
                    placeholder={t.placeholderSubject}
                    required
                  />
                </label>
                <label className="mt-5 block text-sm font-semibold text-gray-700">
                  {t.message}
                  <textarea
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    className="mt-2 w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 font-normal text-gray-950 shadow-sm outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-500/10"
                    placeholder={t.placeholderMessage}
                    required
                  />
                </label>
                {status === "success" && (
                  <div className="mt-4 text-sm font-medium text-green-600">{lang === "nl" ? "Bericht verzonden! We nemen snel contact op." : "Message sent! We will get back to you soon."}</div>
                )}
                {status === "error" && <div className="mt-4 text-sm font-medium text-red-600">{error}</div>}
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#050914_0%,#0d1f38_58%,#261121_100%)] px-5 py-4 text-base font-bold text-white shadow-[0_18px_55px_rgba(15,23,42,0.24)] transition duration-300 hover:shadow-[0_22px_65px_rgba(15,23,42,0.28)] disabled:opacity-60"
                  type="submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (lang === "nl" ? "Versturen..." : "Sending...") : t.send}
                  {status === "sending" ? <Send size={18} /> : <ArrowRight size={18} />}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
