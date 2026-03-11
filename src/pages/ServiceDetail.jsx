import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Instagram, Phone, Mail } from 'lucide-react';
import CTASection from '../sections/CTASection';

const ServiceDetail = ({ title, h1, content, highlights, image, seoAlt }) => {
    return (
        <div className="pt-24 bg-background-soft min-h-screen text-slate-100 pb-20">
            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <img
                    src={image}
                    alt={seoAlt}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 flex items-center justify-center text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Premium Services</span>
                        <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                            {h1}
                        </h1>
                        <div className="w-24 h-1.5 bg-primary mx-auto rounded-full shadow-glow-primary"></div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-6 -mt-32 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Side: Rich Text Content */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#141414] rounded-[2.5rem] p-8 md:p-16 border border-[#C9A227]/10 shadow-luxury-card"
                        >
                            <div className="prose prose-invert prose-gold max-w-none">
                                {content.map((block, idx) => (
                                    <div key={idx} className="mb-10 last:mb-0">
                                        <h2 className="text-2xl md:text-4xl font-bold text-primary mb-6">{block.heading}</h2>
                                        <div className="text-gray-300 leading-[1.8] text-lg space-y-4 whitespace-pre-line font-light">
                                            {block.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Sticky Info & Highlights */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-8">
                        {/* Highights Box */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#0A0A0A] rounded-[2rem] p-8 border border-[#C9A227]/20 shadow-xl"
                        >
                            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                                <CheckCircle2 className="text-primary" /> Key Features
                            </h3>
                            <ul className="space-y-4">
                                {highlights.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 group">
                                        <div className="w-2 h-2 rounded-full bg-primary mt-2 group-hover:scale-150 transition-transform shadow-glow-primary" />
                                        <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Contact Quick Action */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-gold-gradient rounded-[2rem] p-8 text-black shadow-luxury-glow"
                        >
                            <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Reserve Your Date</h3>
                            <p className="font-medium mb-8 leading-tight opacity-70">Experience the gold standard of taste. Book our premium catering services today.</p>
                            <Link to="/contact">
                                <button className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all uppercase tracking-widest text-sm">
                                    Get Free Quote <ArrowRight size={18} />
                                </button>
                            </Link>
                        </motion.div>

                        {/* Social Proof Box */}
                        <div className="flex justify-center gap-6 pt-4">
                            <a href="https://www.instagram.com/vipcateringchennai/reels/#" target="_blank" className="p-4 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                                <Instagram size={24} />
                            </a>
                            <a href="tel:+918124142113" className="p-4 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                                <Phone size={24} />
                            </a>
                            <a href="mailto:vipcateringservice1@gmail.com" className="p-4 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-all">
                                <Mail size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-32">
                <CTASection />
            </div>
        </div>
    );
};

export default ServiceDetail;
