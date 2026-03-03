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

const ServiceDetail = ({ title, description, highlights, image, reverse, index }) => (
    <section className={`py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-background-soft'}`}>
        <div className="container mx-auto px-6">
            <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}>
                {/* Image Side */}
                <motion.div
                    initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2"
                >
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                        <img src={image} alt={title} className="w-full h-[500px] object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                </motion.div>

                {/* Text Side */}
                <motion.div
                    initial={{ opacity: 0, x: reverse ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-accent-dark mb-8 leading-tight">
                        {title}
                    </h2>
                    <div className="space-y-6 text-gray-600 text-lg leading-relaxed mb-10">
                        {description.map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        {highlights.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                </div>
                                <span className="font-semibold text-accent-dark">{item}</span>
                            </div>
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gold-gradient text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-primary/20 flex items-center gap-2"
                    >
                        Enquire Now <ArrowRight size={18} />
                    </motion.button>
                </motion.div>
            </div>
        </div>
    </section>
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
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">The VIP Standard</span>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-accent-dark">Why Choose Us</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reasons.map((reason, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="p-10 rounded-[2rem] bg-background-soft border border-gray-100 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-primary mb-6">
                                <reason.icon size={28} />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-accent-dark mb-4">{reason.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{reason.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ServicesPage = () => {
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
        <div className="pt-20">
            {/* Hero Header */}
            <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069"
                        alt="Catering Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center px-6"
                >
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
                        Our Catering <span className="text-primary italic">Services</span>
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto font-light">
                        Tailored experiences for every celebration. From royal weddings to modern corporate galas, we bring your vision to the table.
                    </p>
                </motion.div>
            </section>

            {/* Service Details */}
            {serviceDetails.map((service, index) => (
                <ServiceDetail key={index} {...service} index={index} />
            ))}

            {/* Why Choose Us */}
            <WhyChooseUs />

            {/* Final CTA */}
            <section className="py-24 px-6 bg-beige-gradient">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-7xl font-display font-bold text-accent-dark mb-10 leading-tight">
                            Let’s Plan Your <br /> <span className="text-primary">Next Event</span>
                        </h2>
                        <motion.button
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-gold-gradient text-white px-12 py-5 rounded-full font-bold text-xl shadow-2xl shadow-primary/30"
                        >
                            Start Planning Now
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
