import React from "react";

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

const Services: React.FC = () => (
	<section
		id="services"
		className="py-20 lg:py-32 bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-blue-50 via-pink-100 via-purple-50 via-cyan-100 to-blue-50 border-t border-gray-100"
	>
		<div className="container mx-auto px-4 md:px-6">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-manrope font-bold mb-4 text-gray-900">
					What we deliver
				</h2>
				<p className="text-lg text-gray-700 max-w-2xl mx-auto font-inter">
					Our expertise covers the full digital product journey, from concept to
					launch. We go beyond conventional development, offering advanced
					geospatial intelligence and GIS solutions.
				</p>
			</div>
			<div className="flex flex-col gap-14 items-center">
				{services.map((service, idx) => (
					<div
						key={service.title}
						className={`relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border border-gray-100 group p-0 flex ${
							idx % 2 === 0 ? "justify-start" : "justify-end"
						}`}
						style={{ minHeight: "300px" }}
					>
						<div className="absolute inset-0 bg-white/60 backdrop-blur-lg" />
						<div
							className={`relative z-10 flex flex-col justify-center h-full p-14 md:w-2/3 ${
								idx % 2 === 0 ? "ml-0 md:ml-8" : "mr-0 md:mr-8"
							} ${
								idx % 2 === 0
									? "items-start text-left"
									: "items-end text-right"
							}`}
						>
							<h3 className="text-3xl font-manrope font-bold text-gray-900 mb-4 drop-shadow">
								{service.title}
							</h3>
							<p className="text-gray-800 font-inter text-lg mb-2 drop-shadow">
								{service.description}
							</p>
							<p className="text-gray-700 font-inter text-base opacity-80">
								{service.title === "Web Development" &&
									"We use the latest frameworks and best practices to ensure your site is fast, secure, and easy to manage. From landing pages to complex web apps, we deliver robust solutions."}
								{service.title === "Mobile Apps" &&
									"Our team crafts seamless mobile experiences, leveraging native and cross-platform technologies to reach your users wherever they are."}
								{service.title === "UX/UI Design" &&
									"We focus on usability, accessibility, and visual delight, ensuring your product is both beautiful and easy to use."}
								{service.title === "Tech Consulting & GIS" &&
									"We help you make informed technology decisions and unlock the power of location data for smarter business outcomes."}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	</section>
);

export default Services;
