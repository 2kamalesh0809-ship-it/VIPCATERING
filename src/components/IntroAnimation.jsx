import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroAnimation = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Prevent body scroll during intro
        document.body.style.overflow = 'hidden';

        const timer = setTimeout(() => {
            setIsVisible(false);
            document.body.style.overflow = 'unset';
        }, 4000);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Create a fixed array of particles to avoid hydration mismatches, even though it's client side
    // It's cleaner to precompute random positions
    const [particles] = useState(() =>
        Array.from({ length: 15 }).map(() => ({
            initialX: Math.random() * 100,
            initialY: Math.random() * 100,
            duration: 4 + Math.random() * 4,
            delay: Math.random() * 2,
            size: Math.random() * 2 + 1
        }))
    );

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
                >
                    {/* Background glow & noise */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2.5 }}
                            className="w-[90vw] h-[90vw] md:w-[60vw] md:h-[60vw] bg-[#C9A227]/10 rounded-full blur-[80px]"
                        />
                    </div>
                    <div className="noise-overlay opacity-[0.05] z-0 pointer-events-none"></div>

                    {/* Floating Gold Particles */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        {particles.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    x: `${p.initialX}vw`,
                                    y: `${p.initialY}vh`,
                                    opacity: 0,
                                }}
                                animate={{
                                    y: `calc(${p.initialY}vh - 15vh)`, // Move upwards slowly
                                    opacity: [0, 0.4, 0],
                                }}
                                transition={{
                                    duration: p.duration,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: p.delay
                                }}
                                className="absolute bg-[#C9A227] rounded-full blur-[1px]"
                                style={{ width: `${p.size}px`, height: `${p.size}px` }}
                            />
                        ))}
                    </div>

                    <div className="relative z-10 flex flex-col items-center px-4 w-full">
                        {/* Logo Text Reveal */}
                        <div className="overflow-visible pb-2 text-center w-full">
                            <motion.h1
                                initial={{ opacity: 0, filter: "blur(12px)", scale: 1.2 }}
                                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                                transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl  font-bold tracking-tight drop-shadow-[0_0_20px_rgba(239,200,58,0.3)]"
                            >
                                {/* Gold Sweep passing across the logo component */}
                                <motion.span
                                    initial={{ backgroundPosition: "-200% center" }}
                                    animate={{ backgroundPosition: "200% center" }}
                                    transition={{ duration: 2.5, delay: 1.5, ease: "easeInOut" }}
                                    className="text-transparent bg-clip-text inline-block pb-2"
                                    style={{
                                        backgroundImage: "linear-gradient(120deg, #EFC83A 0%, #EFC83A 35%, #FFF5CC 50%, #EFC83A 65%, #EFC83A 100%)",
                                        backgroundSize: "200% auto"
                                    }}
                                >
                                    VIP Catering
                                </motion.span>
                                <br className="hidden md:block" />
                                <span className="md:hidden"> </span>
                                <motion.span
                                    initial={{ backgroundPosition: "-200% center" }}
                                    animate={{ backgroundPosition: "200% center" }}
                                    transition={{ duration: 2.5, delay: 1.7, ease: "easeInOut" }}
                                    className="text-transparent bg-clip-text inline-block"
                                    style={{
                                        backgroundImage: "linear-gradient(120deg, #EFC83A 0%, #EFC83A 35%, #FFF5CC 50%, #EFC83A 65%, #EFC83A 100%)",
                                        backgroundSize: "200% auto"
                                    }}
                                >
                                    Chennai
                                </motion.span>
                            </motion.h1>
                        </div>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 2.5, ease: "easeOut" }}
                            className="text-[#C9A227] mt-8 tracking-[0.4em] md:tracking-[0.5em] uppercase text-[10px] md:text-sm font-semibold text-center drop-shadow-sm"
                        >
                            Modern Catering Experiences
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroAnimation;
