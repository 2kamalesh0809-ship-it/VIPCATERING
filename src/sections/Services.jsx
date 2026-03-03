import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Services = () => {
    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 1], [0, -100]); // Subtle parallax if needed on container or images

    const smallServices = [
        {
            title: "Wedding Catering",
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000",
        },
        {
            title: "Corporate Catering",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000",
        },
        {
            title: "Birthday Parties",
            image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=1000",
        },
        {
            title: "Private Events",
            image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000",
        }
    ];

    const featuredService = {
        title: "Luxury Catering Experience",
        images: [
            "/162378381_2919710938247877_476606073473875676_n.jpg",
            "/163484989_2919710991581205_1427628326452038482_n.jpg",
            "/58376001_2360541167498193_3091553730659614720_n.jpg",
            "/58384746_2360541250831518_4916933218214608896_n.jpg",
            "/58779042_2360540984164878_8375608499794608128_n.jpg",
            "/61987640_2387766771442299_8807957560125554688_n.jpg",
            "/62025628_2387766901442286_2723483176650407936_n.jpg",
            "/62607826_2394208144131495_3553348433936908288_n.jpg",
            "/68620437_2432430000309309_7320786620913811456_n.jpg"
        ],
    };

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % featuredService.images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                duration: 0.7,
                ease: [0.21, 0.47, 0.32, 0.98] // Clean startup ease
            }
        })
    };

    return (
        <section id="services" className="pt-24 pb-8 md:pt-32 md:pb-12 bg-background-soft relative overflow-hidden flex flex-col justify-center">
            <div className="noise-overlay opacity-[0.03]"></div>
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="mb-10 md:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-luxury-shimmer text-shadow-premium tracking-tight mb-4 lg:mb-6 max-w-4xl"
                    >
                        Choose Our Catering Services
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="text-lg md:text-xl text-gray-600 max-w-2xl font-medium"
                    >
                        Premium catering experiences crafted for unforgettable occasions.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8">
                    {/* Left: 2x2 grid of service cards (Takes up 7 columns out of 12 on large screens) */}
                    <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-6 md:gap-8">
                        {smallServices.map((service, index) => (
                            <Link to="/contact" key={index} className="block group">
                                <motion.div
                                    custom={index}
                                    variants={cardVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="relative h-[160px] xs:h-[180px] sm:h-[240px] md:h-[300px] rounded-2xl md:rounded-3xl ease-out flex items-end bg-gray-100 card-luxury"
                                >
                                    <div className="absolute inset-0">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover transform transition-transform duration-[600ms] ease-out group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/20 to-transparent transition-opacity duration-[400ms] group-hover:bg-[#111111]/40" />
                                    </div>
                                    <h3 className="relative z-10 text-white font-display font-bold text-sm sm:text-lg md:text-2xl p-3 sm:p-6 lg:p-8 transition-transform duration-[400ms]">
                                        {service.title}
                                    </h3>
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    {/* Right: 1 large featured service card (Takes up 5 columns out of 12) */}
                    <Link to="/contact" className="lg:col-span-5 block group">
                        <motion.div
                            custom={4}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="relative h-[400px] lg:h-full rounded-3xl ease-out flex items-end bg-gray-100 card-luxury group"
                        >
                            <div className="absolute inset-0">
                                <AnimatePresence mode="popLayout">
                                    <motion.img
                                        key={currentImageIndex}
                                        src={featuredService.images[currentImageIndex]}
                                        alt={featuredService.title}
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.8 }}
                                        className="w-full h-full object-cover absolute inset-0"
                                    />
                                </AnimatePresence>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/30 to-transparent transition-opacity duration-[400ms] group-hover:bg-[#111111]/50" />
                            </div>
                            <div className="relative z-10 p-6 lg:p-12">
                                <span className="inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-luxury-gold animate-shimmer backdrop-blur-md text-white shadow-luxury-glow text-[10px] font-bold uppercase tracking-widest rounded-full mb-3 sm:mb-4 bg-[length:200%_auto]">
                                    Featured
                                </span>
                                <h3 className="text-white font-display font-bold text-2xl sm:text-3xl md:text-5xl leading-tight">
                                    {featuredService.title}
                                </h3>
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Services;
