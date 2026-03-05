import React from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Utensils,
    Clock,
    ShieldCheck,
    Sparkles,
    ArrowRight,
    Heart,
    Briefcase,
    PartyPopper,
    CalendarDays
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
    const duration = 0.6;
    const yOffset = 30;

    const fadeInUp = {
        hidden: { opacity: 0, y: yOffset },
        visible: { opacity: 1, y: 0, transition: { duration, ease: "easeOut" } }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: yOffset,
            boxShadow: "0px 0px 0px rgba(0,0,0,0)",
            borderColor: "rgba(201, 162, 39, 0)",
        },
        visible: {
            opacity: 1,
            y: 0,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",
            borderColor: "rgba(201, 162, 39, 0.2)",
            transition: { duration, ease: "easeOut" }
        }
    };

    const ServiceCard = ({ title, description, image }) => (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: yOffset },
                visible: { opacity: 1, y: 0, transition: { duration, ease: "easeOut" } }
            }}
            whileHover={{ y: -6, borderColor: "rgba(201, 162, 39, 0.6)" }}
            whileTap={{ scale: 0.98 }}
            className="group bg-[#FDFBF7] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#C9A227]/20 transition-all duration-300 flex flex-col cursor-pointer"
        >
            <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-100">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-[600ms] ease-out md:group-hover:scale-105"
                />
            </div>
            <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">{title}</h3>
                <p className="text-[#4A4A4A] line-clamp-2 md:line-clamp-none leading-relaxed font-light">
                    {description[0]}
                </p>
            </div>
        </motion.div>
    );

    const WhyChooseUs = () => {
        const reasons = [
            { icon: Sparkles, title: "Custom Menus", desc: "Tailored culinary journeys designed specifically for your event's theme." },
            { icon: Users, title: "Professional Staff", desc: "Expert servers and chefs trained to provide a seamless 5-star experience." },
            { icon: ShieldCheck, title: "Hygienic Preparation", desc: "Highest standards of food safety and cleanliness in our state-of-the-art kitchens." },
            { icon: Clock, title: "Timely Delivery", desc: "Precision planning ensures every dish arrives at its peak flavor and temperature." },
            { icon: Utensils, title: "Premium Presentation", desc: "Modern, artistic plating and setups that wow your guests at first sight." },
        ];

        return (
            <section className="py-24 relative z-10 border-t border-[#C9A227]/10">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                        }}
                        className="text-center mb-16"
                    >
                        <motion.span variants={fadeInUp} className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">The VIP Standard</motion.span>
                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl  font-bold text-accent-dark">Why Choose Us</motion.h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.2
                                }
                            }
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {reasons.map((reason, i) => (
                            <motion.div
                                key={i}
                                variants={cardVariants}
                                whileHover={{ y: -5, boxShadow: "0px 20px 40px rgba(0,0,0,0.7)", borderColor: "rgba(201, 162, 39, 0.4)" }}
                                className="p-10 rounded-[2.5rem] card-luxury border border-transparent transition-colors duration-300"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#141414] shadow-luxury-glow flex items-center justify-center text-primary mb-6 border border-[#C9A227]/30">
                                    <reason.icon size={28} />
                                </div>
                                <h3 className="text-2xl  font-bold text-accent-dark mb-4">{reason.title}</h3>
                                <p className="text-gray-300 leading-relaxed font-light">{reason.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        );
    };

    const serviceDetails = [
        {
            title: "Wedding Catering",
            description: [
                "Your wedding day is a once-in-a-lifetime celebration, and our goal is to make it culinarily unforgettable. We specialize in blending traditional flavors with a modern, startup-style presentation that reflects your unique love story.",
                "From grand ballroom receptions to intimate backyard gatherings, our team manages every detail—from the first appetizer to the final dessert course."
            ],
            highlights: ["Royal Buffet Service", "Live Artisan Counters", "Customized Menu Design", "Traditional Seating Service"],
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
            reverse: false
        },
        {
            title: "Corporate Catering",
            description: [
                "Impress your partners and energize your team with our sophisticated corporate catering solutions. We understand the need for punctuality, professionalism, and diverse dietary options in a modern business environment.",
                "Whether it's a high-stakes board meeting, a product launch, or a company-wide gala dinner, we deliver a polished experience every time."
            ],
            highlights: ["Executive Bento Boxes", "Networking Cocktails", "Grand Gala Dinners", "Daily Office Lunches"],
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069",
            reverse: true
        },
        {
            title: "Birthday & Private Parties",
            description: [
                "Celebrate life's milestones with a menu that's as unique as you are. Our private party catering is all about creativity, warmth, and fun, designed to let you focus on your guests while we handle the rest.",
                "From themed birthday bashes to elegant anniversary dinners, we bring the luxury of a 5-star restaurant directly to your venue."
            ],
            highlights: ["Themed Food Concepts", "Interactive Live Stations", "Bespoke Cake Design", "Kids-Friendly Menus"],
            image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=2069",
            reverse: false
        },
        {
            title: "Festive & Traditional Events",
            description: [
                "Honor your heritage with catering that respects tradition while embracing modern standards of quality and hygiene. We specialize in authentic regional cuisines prepared with the finest ingredients.",
                "Our festive catering captures the spirit of celebration, ensuring your religious ceremonies and traditional gatherings are blessed with auspicious flavors."
            ],
            highlights: ["Authentic Regional Cuisine", "Traditional Pandal Setup", "Sattvic Food Options", "Festive Sweet Hampers"],
            image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2062",
            reverse: true
        }
    ];

    return (
        <div className="pt-16">
            {/* Hero Header */}
            <section className="relative pt-16 pb-8 md:pt-32 md:pb-20 w-full flex items-center justify-center bg-transparent">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                    }}
                    className="relative z-10 text-center px-6 max-w-4xl mx-auto"
                >
                    <motion.h1 variants={fadeInUp} className="text-4xl md:text-7xl font-bold text-accent-dark mb-4 md:mb-6 leading-tight">
                        Our Catering <span className="text-primary italic">Services</span>
                    </motion.h1>
                    <motion.p variants={fadeInUp} className="hidden md:block text-xl text-gray-300 max-w-2xl mx-auto font-light">
                        Tailored experiences for every celebration. From royal weddings to modern corporate galas, we bring your vision to the table.
                    </motion.p>
                </motion.div>
            </section>

            {/* Service Cards Grid */}
            <section className="py-12 md:py-24 relative z-10">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14"
                    >
                        {serviceDetails.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us */}
            <WhyChooseUs />

            {/* Final CTA */}
            <section className="py-24 px-6 relative z-10 border-t border-[#C9A227]/10">
                <div className="container mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={{
                            hidden: { opacity: 0, y: yOffset },
                            visible: { opacity: 1, y: 0, transition: { duration, ease: "easeOut" } }
                        }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-7xl  font-bold text-accent-dark mb-10 leading-tight">
                            Let’s Plan Your <br /> <span className="text-primary">Next Event</span>
                        </h2>
                        <Link to="/contact">
                            <motion.button
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                whileHover={{ scale: 1.05 }}
                                className="btn-luxury-shimmer px-12 py-5 text-xl font-bold"
                            >
                                Start Planning Now
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
