import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <section className="pt-12 pb-8 md:pt-16 md:pb-8 px-6">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative bg-accent-dark rounded-[3rem] p-12 md:p-24 overflow-hidden text-center border border-[#C9A227]/20 shadow-luxury-card"
                >
                    {/* Background decorative elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -mr-48 -mt-48" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -ml-48 -mb-48" />

                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-7xl  font-bold text-white mb-8 leading-tight">
                            Ready to elevate your <span className="text-luxury-shimmer italic inline-block">next event?</span>
                        </h2>
                        <p className="text-white/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                            Join 1000+ happy clients who chose VIP Catering for their most important moments. Let's design a menu that speaks your language.
                        </p>

                        <Link to="/contact">
                            <motion.button
                                className="btn-luxury-shimmer px-12 py-5 text-xl relative z-20"
                            >
                                Start Planning Now
                            </motion.button>
                        </Link>

                        <p className="mt-8 text-white/40 text-sm">
                            No pressure. Just a friendly conversation about your requirements.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
