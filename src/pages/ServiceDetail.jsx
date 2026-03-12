import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, Star, Sparkles, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceDetail = ({ title, description, image, highlights, whyChooseUs }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24 md:pt-32 pb-20 bg-background-soft min-h-screen relative overflow-hidden">
            <div className="bg-luxury-blobs absolute inset-0 mix-blend-multiply opacity-50 z-0"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Hero section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Our Excellence</span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-tight">
                            {title} <span className="text-primary italic">Services</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-light leading-relaxed mb-10">
                            {description}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/contact">
                                <button className="bg-gold-gradient text-black px-10 py-4 rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-3">
                                    <Send size={20} /> Request Quote
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl -z-10"></div>
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-auto rounded-[3rem] shadow-2xl border border-white/10"
                        />
                    </motion.div>
                </div>

                {/* Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#141414] p-12 rounded-[3rem] border border-white/5"
                    >
                        <h2 className="text-3xl font-bold text-white mb-8">Service Highlights</h2>
                        <div className="space-y-6">
                            {highlights.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 text-gray-300 text-lg">
                                    <CheckCircle2 size={24} className="text-primary shrink-0" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-[#141414] p-12 rounded-[3rem] border border-white/5"
                    >
                        <h2 className="text-3xl font-bold text-white mb-8">Why Choose VIP?</h2>
                        <div className="space-y-6">
                            {whyChooseUs.map((item, i) => (
                                <div key={i} className="flex items-start gap-4 group">
                                    <div className="mt-1 bg-primary/10 p-2 rounded-lg text-primary group-hover:bg-primary group-hover:text-black transition-all">
                                        <Sparkles size={18} />
                                    </div>
                                    <p className="text-gray-400 text-lg leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Menu CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-[4rem] overflow-hidden p-12 md:p-24 text-center border border-primary/20"
                >
                    <div className="absolute inset-0 bg-[#0A0A0A] -z-10"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,162,39,0.1),transparent_70%)] -z-10"></div>

                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">
                        Experience the <span className="text-primary italic">Gold Standard</span>
                    </h2>
                    <p className="text-gray-400 text-xl font-light mb-12 max-w-2xl mx-auto">
                        Join the elite circle of hosts who choose nothing but the best for their guests.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link to="/menu">
                            <button className="px-12 py-5 bg-white/5 border border-white/10 rounded-full text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-3">
                                Explore Menu <ArrowRight size={20} />
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ServiceDetail;
