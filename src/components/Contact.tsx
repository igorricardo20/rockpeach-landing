import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, Phone, Mail } from "lucide-react";
import { LangContext } from "./Navbar";

const Contact: React.FC = () => {
  const { lang } = useContext(LangContext);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Localization dictionary
  const translations = {
    en: {
      contact: "Start your concept for free",
      contactDesc: "We are ready to turn your ideas into exceptional digital solutions.",
      getInTouch: "Get in touch",
      getInTouchDesc: "We want to hear about your project and how we can help make it a reality.",
      phone: "Phone",
      email: "Email",
      name: "Name",
      emailLabel: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send message",
      phoneValue: "+31 6 87 34 43 45",
      address1: "Zijdevlinder 196",
      address2: "Nijkerk, Netherlands",
      placeholderName: "Your name",
      placeholderEmail: "your@email.com",
      placeholderSubject: "Message subject",
      placeholderMessage: "Tell us about your project...",
    },
    nl: {
      contact: "Start je gratis concept",
      contactDesc: "Wij staan klaar om uw ideeën om te zetten in uitzonderlijke digitale oplossingen.",
      getInTouch: "Neem contact op",
      getInTouchDesc: "We horen graag over uw project en hoe we kunnen helpen het te realiseren.",
      phone: "Telefoon",
      email: "E-mail",
      name: "Naam",
      emailLabel: "E-mail",
      subject: "Onderwerp",
      message: "Bericht",
      send: "Verstuur bericht",
      phoneValue: "+31 6 87 34 43 45",
      address1: "Zijdevlinder 196",
      address2: "Nijkerk, Nederland",
      placeholderName: "Uw naam",
      placeholderEmail: "uw@email.com",
      placeholderSubject: "Onderwerp van het bericht",
      placeholderMessage: "Vertel ons over uw project...",
    },
  } as const;
  type Lang = keyof typeof translations;
  const safeLang: Lang = ["en", "nl"].includes(lang) ? (lang as Lang) : "en";
  const t = translations[safeLang] || translations.en;

  const [form, setForm] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    try {
      // Replace with your backend endpoint or use a service like Formspree/Resend/EmailJS
      const res = await fetch('https://formspree.io/f/xpwrlllo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message
        })
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setError('Failed to send. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setError('Failed to send. Please try again.');
    }
  };

  return (
    <section id="contact" className="relative py-20 lg:py-32 bg-white overflow-hidden min-h-[560px]">
      <div className="container mx-auto px-4 md:px-6 relative z-30">
            <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-manrope font-bold mb-6 text-gray-900">
            {t.contact}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-inter">
            {t.contactDesc}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2 flex flex-col justify-center h-full space-y-8 mb-8 px-2 sm:mb-0 lg:pr-8 xl:pr-16"
              >
              <div>
                <h3 className="text-xl font-manrope font-bold text-gray-900 mb-4">
                  {t.getInTouch}
                </h3>
                <p className="text-gray-700 mb-6 font-inter">
                  {t.getInTouchDesc}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-full shadow-sm mr-4">
                    <Phone size={20} className="text-black" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1 font-inter">{t.phone}</h4>
                    <p className="text-gray-700 text-sm font-inter">{t.phoneValue}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white p-3 rounded-full shadow-sm mr-4">
                    <Mail size={20} className="text-black" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1 font-inter">{t.email}</h4>
                    <p className="text-gray-700 text-sm font-inter">contact@rockpeach.io</p>
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
                <div className="relative rounded-3xl overflow-hidden">
                  <div className="hero-bg absolute inset-0" aria-hidden="true" />
                  <div className="relative overflow-hidden p-6 md:p-8 rounded-3xl bg-gray-50 shadow-sm">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                        {t.name}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 font-inter"
                        placeholder={t.placeholderName}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                        {t.emailLabel}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 font-inter"
                        placeholder={t.placeholderEmail}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                      {t.subject}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 font-inter"
                      placeholder={t.placeholderSubject}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                      {t.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 font-inter"
                      placeholder={t.placeholderMessage}
                      required
                    ></textarea>
                  </div>
                  {status === 'success' && (
                    <div className="text-green-600 font-inter text-sm">{lang === 'nl' ? 'Bericht verzonden! We nemen snel contact op.' : 'Message sent! We will get back to you soon.'}</div>
                  )}
                  {status === 'error' && (
                    <div className="text-red-600 font-inter text-sm">{error}</div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full inline-flex items-center justify-center rounded-lg px-4 py-3 disabled:opacity-60"
                    type="submit"
                    disabled={status === 'sending'}
                    style={{
                      background: 'linear-gradient(90deg, var(--strong-blue), var(--strong-red))',
                      color: '#fff'
                    }}
                  >
                    <span className="font-medium text-base md:text-lg">
                      {status === 'sending' ? (lang === 'nl' ? 'Versturen...' : 'Sending...') : t.send}
                    </span>
                    <Send size={18} className="ml-2 text-white" />
                  </motion.button>
                </form>
              </div>
                </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;