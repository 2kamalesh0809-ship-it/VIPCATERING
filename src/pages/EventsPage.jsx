import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { CheckCircle2, ArrowRight, MessageSquare, Calendar, Users, Star } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const EventsPage = () => {
    const [activeTab, setActiveTab] = useState('Weddings');

    const categories = ['Weddings', 'Corporate', 'Private Parties', 'Festivals'];

    const eventContent = {
        Weddings: {
            title: "Royal Wedding Catering",
            description: "Transforming your special day into a legendary celebration with gourmet menus that reflect your love story.",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069",
            highlights: [
                "Customized Multi-Cuisine Buffets",
                "Grand Stage & Mantap Decor Integration",
                "Traditional & Modern Service Styles",
                "Artisan Dessert Bars"
            ]
        },
        Corporate: {
            title: "Executive Events & Summits",
            description: "Precision-timed catering for high-stakes business meetings, product launches, and networking galas.",
            image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070",
            highlights: [
                "Bento-Box Working Lunches",
                "Formal Silver Service Dinners",
                "Coffee Break & High Tea Specialties",
                "Corporate Branding Menu Customization"
            ]
        },
        "Private Parties": {
            title: "Intimate Social Soirées",
            description: "From milestone birthdays to elegant anniversaries, we bring 5-star hospitality to your home or private venue.",
            image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=2069",
            highlights: [
                "Bespoke Small-Plate Concepts",
                "Live Interactive Cooking Stations",
                "Premium Mixology & Mocktail Services",
                "Themed Party Food Curation"
            ]
        },
        Festivals: {
            title: "Grand Festive Celebrations",
            description: "Catering for large-scale community festivals and cultural gatherings with authentic traditional flavors.",
            image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2062",
            highlights: [
                "Traditional Thali Service (Elai Sappadu)",
                "Mass Catering for 1000+ Guests",
                "Authentic Regional Specialty Menus",
                "Stall-based Festival Catering"
            ]
        }
    };

    const processSteps = [
        { title: 'Consultation', desc: 'Personalized meeting to understand your vision and event scale.', icon: MessageSquare },
        { title: 'Menu Planning', desc: 'Crafting a bespoke culinary menu tailored to your guests.', icon: Calendar },
        { title: 'Execution', desc: 'Professional service and kitchen management on the big day.', icon: Users },
    ];

    const galleryImages = [
        "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070",
        "https://images.unsplash.com/photo-1532636875304-4c89119d9c47?q=80&w=2070",
        "/162378381_2919710938247877_476606073473875676_n.jpg",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069",
        "/62025628_2387766901442286_2723483176650407936_n.jpg",
        "/58376001_2360541167498193_3091553730659614720_n.jpg",
    ];

    return (
        <div className="bg-background pt-20">
            {/* Hero Section */}
            <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "linear" }}
                    className="absolute inset-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069"
                        alt="Event Catering"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-black/60" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center px-6"
                >
                    <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4 block underline decoration-primary/40 underline-offset-8">Experience VIP</span>
                    <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-6">
                        Events We <span className="text-primary italic">Cater</span>
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
                        From intimate gatherings to grand celebrations, we bring culinary excellence and refined hospitality to every occasion.
                    </p>
                </motion.div>
            </section>

            {/* Event Category Filter */}
            <section className="py-20 px-6">
                <div className="container mx-auto">
                    <div className="flex flex-wrap justify-center gap-4 md:gap-12 border-b border-gray-200 pb-8 mb-20">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`relative py-2 px-4 text-lg font-medium transition-colors ${activeTab === cat ? 'text-accent-dark' : 'text-gray-400 hover:text-accent-dark'}`}
                            >
                                {cat}
                                {activeTab === cat && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                        >
                            <div className="order-2 lg:order-1">
                                <h2 className="text-4xl md:text-6xl font-display font-bold text-accent-dark mb-6">
                                    {eventContent[activeTab].title}
                                </h2>
                                <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-xl">
                                    {eventContent[activeTab].description}
                                </p>
                                <div className="space-y-4 mb-10">
                                    {eventContent[activeTab].highlights.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-accent-dark font-medium">
                                            <CheckCircle2 className="text-primary" size={20} />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gold-gradient text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-primary/20 flex items-center gap-3"
                                >
                                    Plan This Event <ArrowRight size={20} />
                                </motion.button>
                            </div>
                            <div className="order-1 lg:order-2">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.6 }}
                                    className="relative rounded-[3rem] overflow-hidden shadow-2xl h-[500px]"
                                >
                                    <img
                                        src={eventContent[activeTab].image}
                                        alt={activeTab}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* Alternating Highlights (Pre-defined) */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="rounded-[3rem] overflow-hidden h-[600px] shadow-2xl"
                        >
                            <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069" alt="Grand Buffet" className="w-full h-full object-cover" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-4 block">Crafted with Perfection</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-accent-dark mb-6">Mass Catering for Large Congregations</h2>
                            <p className="text-gray-500 text-lg mb-10">We specialize in managing mass catering events with the same precision and quality as an intimate dinner. Our backend logistics ensure that 2000+ guests are served piping hot, fresh meals seamlessly.</p>
                            <ul className="space-y-4 text-accent-dark font-medium">
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary" size={20} /> Efficient Large Batch Cooking</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary" size={20} /> Trained Staff for Mass Management</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary" size={20} /> Hygienic Service Standards</li>
                            </ul>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1">
                            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-4 block">The Art of Plating</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-accent-dark mb-6">Fine Dining for Corporate Galas</h2>
                            <p className="text-gray-500 text-lg mb-10">Make your product launch or award ceremony unforgettable. Our fine dining experiences combine exquisite flavors with visual presentation that aligns with your brand's luxury identity.</p>
                            <ul className="space-y-4 text-accent-dark font-medium">
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary" size={20} /> Plated Multi-Course Service</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary" size={20} /> Contemporary Plating Design</li>
                                <li className="flex items-center gap-3"><CheckCircle2 className="text-primary" size={20} /> Professional Wait-Staff</li>
                            </ul>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2 rounded-[3rem] overflow-hidden h-[600px] shadow-2xl"
                        >
                            <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070" alt="Corporate Gala" className="w-full h-full object-cover" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Event Gallery Preview */}
            <section className="py-24 px-6 bg-background">
                <div className="container mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-accent-dark mb-4">Event Canvas</h2>
                        <p className="text-gray-500 italic max-w-xl mx-auto">A visual journey through some of our most stunning setups.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {galleryImages.map((img, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="relative rounded-3xl overflow-hidden aspect-square shadow-xl group cursor-pointer"
                            >
                                <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white font-bold border-2 border-white px-6 py-2 rounded-full uppercase text-xs tracking-widest">View Detail</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Event Process Section */}
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="container mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-accent-dark mb-4">Our Planning Journey</h2>
                        <p className="text-gray-500">How we bring your dream event to life.</p>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gray-100 z-0" />

                        {processSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="flex-1 text-center relative z-10"
                            >
                                <div className="w-24 h-24 rounded-[2rem] bg-background-soft border border-gray-100 flex items-center justify-center mx-auto mb-8 shadow-lg group hover:bg-primary transition-colors duration-500">
                                    <step.icon size={36} className="text-primary group-hover:text-white transition-colors duration-500" />
                                </div>
                                <h4 className="text-2xl font-display font-bold text-accent-dark mb-4 group-hover:text-primary transition-colors">Step {i + 1}: {step.title}</h4>
                                <p className="text-gray-500 px-4">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial Highlight */}
            <section className="py-24 px-6">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-accent-dark rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

                        <div className="mb-8 flex justify-center gap-1">
                            {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="text-primary fill-primary" size={24} />)}
                        </div>
                        <p className="text-2xl md:text-3xl font-display italic text-white/90 leading-relaxed mb-12">
                            "The team at VIP Catering transformed our wedding reception into a culinary masterpiece. Every guest was raving about the live nitrogen counter and the quality of the main course. Truly modern and professional!"
                        </p>
                        <div>
                            <h4 className="text-primary font-bold text-xl uppercase tracking-widest mb-2">Mrs. Anitha Kumar</h4>
                            <p className="text-white/40 font-medium">Grand Wedding, MRC Nagar</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-6 bg-gradient-to-b from-background to-white relative overflow-hidden">
                <div className="container mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-5xl md:text-8xl font-display font-bold text-accent-dark mb-12 leading-tight">
                            Let's Make Your Event <br /> <span className="text-primary italic">Exceptional</span>
                        </h2>
                        <motion.button
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gold-gradient text-white px-16 py-6 rounded-full font-bold text-2xl shadow-2xl shadow-primary/30"
                        >
                            Start Planning Now
                        </motion.button>
                        <p className="mt-12 text-gray-500 font-medium tracking-widest uppercase text-xs flex items-center justify-center gap-4">
                            <span className="w-12 h-px bg-gray-200" />
                            Direct Inquiries: +91 81241 42113 / +91 93452 10538
                            <span className="w-12 h-px bg-gray-200" />
                        </p>
                    </motion.div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </section>
        </div>
    );
};

export default EventsPage;
