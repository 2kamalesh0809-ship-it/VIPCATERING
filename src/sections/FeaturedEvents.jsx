import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeaturedEvents = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <section ref={containerRef} className="py-24 bg-background-soft overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Image Side */}
                    <div className="w-full lg:w-1/2 relative">
                        <motion.div
                            style={{ y: y1 }}
                            className="relative rounded-3xl overflow-hidden shadow-2xl z-10"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop"
                                alt="Signature Events"
                                className="w-full h-[600px] object-cover"
                            />
                        </motion.div>
                        {/* Decorative background element */}
                        <motion.div
                            style={{ y: y2 }}
                            className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-1"
                        />
                    </div>

                    {/* Text Side */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Signature Events</span>
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-accent-dark mb-8 leading-tight">
                                Crafting Moments that <br /> Stay Forever.
                            </h2>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                From intimate gatherings to grand celebrations, we bring a touch of sophistication to every event. Our menus are meticulously designed to surprise your palate and delight your guests.
                            </p>

                            <div className="space-y-6 mb-10">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <div className="w-3 h-3 rounded-full bg-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl mb-1">Bespoke Menu Design</h3>
                                        <p className="text-gray-500">Tailored culinary journeys crafted by our expert chefs.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <div className="w-3 h-3 rounded-full bg-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl mb-1">Artisan Presentation</h3>
                                        <p className="text-gray-500">Visually stunning setups that define a modern startup brand.</p>
                                    </div>
                                </div>
                            </div>

                            <Link to="/events" className="inline-block">
                                <motion.button
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-3 text-accent-dark font-bold text-lg group"
                                >
                                    Learn More
                                    <span className="w-12 h-0.5 bg-primary group-hover:w-16 transition-all duration-300" />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedEvents;
