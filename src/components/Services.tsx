import React, { useRef, useEffect, useContext } from "react";
import { LangContext } from "./Navbar";

const services = [
	{
		title: "Web Development",
		description:
			"Modern, scalable websites and web apps tailored to your business needs.",
		image:
			"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
		gradient: "from-primary-600/60 via-accent-400/40 to-accent-600/60",
	},
	{
		title: "Mobile Apps",
		description:
			"Cross-platform mobile solutions for iOS and Android, built for performance and usability.",
		image:
			"https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		gradient: "from-secondary-600/60 via-primary-400/40 to-primary-600/60",
	},
	{
		title: "UX/UI Design",
		description:
			"User-centered design for delightful, intuitive digital experiences.",
		image:
			"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
		gradient: "from-accent-600/60 via-primary-400/40 to-primary-600/60",
	},
	{
		title: "Tech Consulting & GIS",
		description:
			"Expert advice on technology strategy, plus geospatial intelligence and Geographic Information Systems (GIS) development.",
		image:
			"https://plus.unsplash.com/premium_photo-1686156705848-8692700509d2?q=80&w=4142&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		gradient: "from-primary-600/60 via-secondary-400/40 to-secondary-600/60",
	},
];

// Localization dictionary
const translations = {
	en: {
		services: "What we deliver",
		servicesDesc:
			"Our expertise covers the full digital product journey, from concept to launch. We go beyond conventional development, offering advanced geospatial intelligence and GIS solutions.",
		web: "Web Development",
		webDesc: "Modern, scalable websites and web apps tailored to your business needs.",
		webExtra:
			"We use the latest frameworks and best practices to ensure your site is fast, secure, and easy to manage. From landing pages to complex web apps, we deliver robust solutions.",
		mobile: "Mobile Apps",
		mobileDesc:
			"Cross-platform mobile solutions for iOS and Android, built for performance and usability.",
		mobileExtra:
			"Our team crafts seamless mobile experiences, leveraging native and cross-platform technologies to reach your users wherever they are.",
		ux: "UX/UI Design",
		uxDesc: "User-centered design for delightful, intuitive digital experiences.",
		uxExtra:
			"We focus on usability, accessibility, and visual delight, ensuring your product is both beautiful and easy to use.",
		gis: "Tech Consulting & GIS",
		gisDesc:
			"Expert advice on technology strategy, plus geospatial intelligence and Geographic Information Systems (GIS) development.",
		gisExtra:
			"We help you make informed technology decisions and unlock the power of location data for smarter business outcomes.",
	},
	nl: {
		services: "Wat wij leveren",
		servicesDesc:
			"Onze expertise bestrijkt het volledige digitale traject, van concept tot lancering. We gaan verder dan conventionele ontwikkeling en bieden geavanceerde geo-intelligentie en GIS-oplossingen.",
		web: "Webontwikkeling",
		webDesc: "Moderne, schaalbare websites en webapps op maat van uw bedrijf.",
		webExtra:
			"We gebruiken de nieuwste frameworks en best practices zodat uw site snel, veilig en eenvoudig te beheren is. Van landingspagina's tot complexe webapps leveren wij robuuste oplossingen.",
		mobile: "Mobiele apps",
		mobileDesc:
			"Cross-platform mobiele oplossingen voor iOS en Android, gebouwd voor prestaties en gebruiksgemak.",
		mobileExtra:
			"Ons team ontwikkelt naadloze mobiele ervaringen met native en cross-platform technologieën, zodat u uw gebruikers overal bereikt.",
		ux: "UX/UI Design",
		uxDesc: "Gebruikersgerichte ontwerpen voor prettige, intuïtieve digitale ervaringen.",
		uxExtra:
			"We focussen op gebruiksvriendelijkheid, toegankelijkheid en visueel plezier, zodat uw product mooi én makkelijk te gebruiken is.",
		gis: "Tech consulting & GIS",
		gisDesc:
			"Advies over technologie-strategie, plus geo-intelligentie en ontwikkeling van Geographic Information Systems (GIS).",
                gisExtra:
                        "We helpen u slimme technologische keuzes te maken en de kracht van locatiedata te benutten voor betere bedrijfsresultaten.",
	},
} as const;
const Services: React.FC = () => {
	const { lang } = useContext(LangContext);
	type Lang = keyof typeof translations;
	const safeLang: Lang = ["en", "nl"].includes(lang) ? (lang as Lang) : "en";
	const t = translations[safeLang];

	const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

	// Reveal animation on scroll
	useEffect(() => {
		const handleScroll = () => {
			cardRefs.current.forEach((el, idx) => {
				if (!el) return;
				const rect = el.getBoundingClientRect();
				const windowHeight =
					window.innerHeight || document.documentElement.clientHeight;
				if (rect.top < windowHeight - 80) {
					el.classList.add("animate-service-reveal");
				} else {
					el.classList.remove("animate-service-reveal");
				}
			});
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Set transform for animation (from ±600px to ±140px on desktop, 0 on mobile)
	useEffect(() => {
		const observer = new MutationObserver(() => {
			(cardRefs.current as (HTMLDivElement | null)[]).forEach((el, idx) => {
				if (!el) return;
				const isMobile = window.innerWidth < 768;
				if (el.classList.contains("animate-service-reveal")) {
					const finalX = isMobile ? 0 : (idx % 2 === 0 ? -140 : 140);
					el.style.transform = `translateX(${finalX}px)`;
					el.style.opacity = "1";
				} else {
					const initialX = isMobile ? 0 : (idx % 2 === 0 ? -600 : 600);
					el.style.transform = `translateX(${initialX}px)`;
					el.style.opacity = "0";
				}
			});
		});
		observer.observe(document.body, { attributes: true, subtree: true });
		return () => observer.disconnect();
	}, []);

	return (
		<section
			id="services"
			className="py-20 lg:py-32 bg-white border-t border-gray-100"
		>
			<div className="container mx-auto px-4 md:px-6">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-manrope font-bold mb-4 text-gray-900">
						{t.services}
					</h2>
					<p className="text-lg text-gray-700 max-w-2xl mx-auto font-inter">
						{t.servicesDesc}
					</p>
				</div>
				<div className="flex flex-col gap-14 items-center">
					{services.map((service, idx) => (
						<div
							key={service.title}
							ref={(el) => (cardRefs.current[idx] = el)}
							className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-visible border border-gray-200 group p-0 flex transition-transform duration-500 hover:scale-105 focus-within:ring-4 focus-within:ring-blue-200"
							style={{
								minHeight: "240px",
								transform:
									idx % 2 === 0 ? "translateX(-600px)" : "translateX(600px)",
								opacity: 0,
								transition:
									"opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)",
							}}
							role="region"
							aria-labelledby={`service-title-${idx}`}
							tabIndex={0}
						>
							<div className="absolute inset-0 bg-white/95 backdrop-blur-md" />
							<div className="relative z-10 flex flex-row md:flex-row flex-col justify-between items-center h-full pl-5 pr-5 md:pl-10 md:pr-10 py-5 md:py-8 w-full">
								<div className="flex flex-col justify-center items-start text-left w-full md:w-[80%] mb-4 md:mb-0">
									<h3
										id={`service-title-${idx}`}
										className={
											`text-2xl md:text-3xl font-manrope font-extrabold mb-2 md:mb-3 drop-shadow tracking-tight bg-clip-text text-transparent ` +
											(
												idx === 0
													? "bg-gradient-to-r from-primary-700 via-primary-500 to-secondary-400"
													: idx === 1
													? "bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-400"
													: idx === 2
													? "bg-gradient-to-r from-secondary-500 via-accent-500 to-accent-400"
													: "bg-gradient-to-r from-accent-500 via-primary-400 to-primary-600"
											)
										}
									>
										{idx === 0 ? t.web : idx === 1 ? t.mobile : idx === 2 ? t.ux : t.gis}
									</h3>
									<p className="text-black font-inter text-base md:text-lg mb-1 drop-shadow-none leading-relaxed">
										{idx === 0 ? t.webDesc : idx === 1 ? t.mobileDesc : idx === 2 ? t.uxDesc : t.gisDesc}
									</p>
									<p className="text-black font-inter text-sm md:text-base opacity-90 leading-relaxed">
										{idx === 0 ? t.webExtra : idx === 1 ? t.mobileExtra : idx === 2 ? t.uxExtra : t.gisExtra}
									</p>
								</div>
								{/* Decorative glass accent for the right 20% - custom for each card */}
								<div className="hidden md:flex items-center justify-center h-full w-[20%]">
									<div className="relative w-full h-32 flex items-center justify-center">
										{idx === 0 && (
											<>
												<div className="absolute right-4 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-blue-200/80 via-blue-100/60 to-white/70 blur-md opacity-90 shadow-xl" />
												<div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-300/60 blur-[2px] opacity-80" />
											</>
										)}
										{idx === 1 && (
											<>
												<div className="absolute right-4 top-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-200/80 via-cyan-100/60 to-white/70 blur-md opacity-90 shadow-xl rotate-12" />
												<div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cyan-100/80 blur-sm opacity-80" />
											</>
										)}
										{idx === 2 && (
											<>
												<div className="absolute right-4 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-pink-200/80 via-pink-100/60 to-white/70 blur-md opacity-90 shadow-xl" />
												<div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-pink-300/60 blur-[2px] opacity-80" />
											</>
										)}
										{idx === 3 && (
											<>
												<div className="absolute right-4 top-1/2 -translate-y-1/2 w-20 h-20 rounded-3xl bg-gradient-to-br from-green-200/80 via-green-100/60 to-white/70 blur-md opacity-90 shadow-xl -rotate-12" />
												<div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-green-100/80 blur-sm opacity-80" />
											</>
										)}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Services;
