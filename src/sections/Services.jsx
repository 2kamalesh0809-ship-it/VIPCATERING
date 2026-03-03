import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Users, PartyPopper } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon: Icon, title, description, image, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        viewport={{ once: true }}
        whileHover={{ y: -15 }}
        className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-200/50 group border border-gray-100"
    >
        <div className="h-64 overflow-hidden relative">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute top-6 left-6 w-12 h-12 bg-white/90 backdrop-blur rounded-2xl flex items-center justify-center text-primary shadow-lg">
                <Icon size={24} />
            </div>
        </div>
        <div className="p-10">
            <h3 className="text-2xl font-display font-bold text-accent-dark mb-4">{title}</h3>
            <p className="text-gray-500 leading-relaxed mb-8">
                {description}
            </p>
            <Link to="/services">
                <button className="text-primary font-bold inline-flex items-center gap-2 group/btn">
                    Explore Service
                    <span className="w-8 h-px bg-primary group-hover/btn:w-12 transition-all duration-300" />
                </button>
            </Link>
        </div>
    </motion.div>
);

const Services = () => {
    const services = [
        {
            title: "Wedding Catering",
            description: "Crafting royal culinary experiences for your special day with traditional richness and modern flair.",
            icon: Utensils,
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"
        },
        {
            title: "Corporate Events",
            description: "Seamless professional catering for workshops, galas, and board meetings that impresses your partners.",
            icon: Users,
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069"
        },
        {
            title: "Private Parties",
            description: "Intimate dining experiences and creative buffets tailored for birthdays and family celebrations.",
            icon: PartyPopper,
            image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=2069"
        }
    ];

    return (
        <section id="services" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mb-20 text-center mx-auto">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block"
                    >
                        What We Do
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-display font-bold text-accent-dark mb-6"
                    >
                        Catering for Every <span className="italic text-primary">Ambition</span>
                    </motion.h2>
                    <p className="text-gray-500 text-lg">
                        Our specialized teams handle every detail, ensuring each event has its own unique flavor and flawless execution.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
