import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { Play, Pause, ArrowRight, Instagram, PlayCircle, X } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

const ReelCard = ({ videoUrl, thumbnailUrl, title, category }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const containerRef = useRef(null);
    const [isSideways, setIsSideways] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const checkOrientation = () => {
            if (video.videoWidth > video.videoHeight) {
                setIsSideways(true);
            }
        };

        if (video.readyState >= 1) {
            checkOrientation();
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => { });
                    setIsPlaying(true);
                } else {
                    video.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.6 }
        );

        if (containerRef.current) observer.observe(containerRef.current);
        video.addEventListener('loadedmetadata', checkOrientation);

        return () => {
            observer.disconnect();
            video.removeEventListener('loadedmetadata', checkOrientation);
        };
    }, []);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[9/16] rounded-[2rem] overflow-hidden shadow-2xl group bg-accent-dark flex items-center justify-center"
        >
            <video
                ref={videoRef}
                src={videoUrl}
                poster={thumbnailUrl}
                loop
                muted
                playsInline
                className={
                    isSideways
                        ? "absolute w-auto h-auto min-w-[200%] min-h-[200%] rotate-0 object-cover transition-transform duration-700 md:group-hover:scale-105"
                        : "absolute inset-0 w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
                }
            />

            {/* Overlay Details */}
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-10">
                <span className="text-primary font-bold text-xs uppercase tracking-widest mb-2 block">{category}</span>
                <h3 className="text-xl  font-bold text-white mb-4 leading-tight">{title}</h3>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                    <PlayCircle size={16} className="text-primary" />
                    <span>Experience Reel</span>
                </div>
            </div>

            {/* Status Overlay */}
            <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 md:group-hover:opacity-100 transition-opacity z-10">
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </div>
        </motion.div>
    );
};

const MasonryItem = ({ imageUrl, size, title }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={`relative rounded-3xl overflow-hidden group mb-6 ${size === 'large' ? 'h-[600px]' : 'h-[300px]'
            }`}
    >
        <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-[2px]"
        />
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center border-0 group-hover:border-4 border-primary/40 rounded-3xl">
            <div className="text-center px-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h4 className="text-white  font-bold text-xl drop-shadow-lg">{title}</h4>
            </div>
        </div>
    </motion.div>
);

const QuickClipVideo = ({ src }) => {
    const videoRef = useRef(null);
    const [isPortrait, setIsPortrait] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const checkOrientation = () => {
            if (video.videoHeight > video.videoWidth) {
                setIsPortrait(true);
            }
        };

        if (video.readyState >= 1) {
            checkOrientation();
        }

        video.addEventListener('loadedmetadata', checkOrientation);
        return () => {
            video.removeEventListener('loadedmetadata', checkOrientation);
        };
    }, [src]);

    return (
        <video
            ref={videoRef}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            className={
                isPortrait
                    ? "absolute top-1/2 left-1/2 w-48 h-80 max-w-none -translate-x-1/2 -translate-y-1/2 rotate-0 object-cover transition-all"
                    : "w-full h-full object-cover transition-all"
            }
        />
    );
};

const HeroVideo = ({ src }) => {
    const videoRef = useRef(null);
    const [isPortrait, setIsPortrait] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const checkOrientation = () => {
            if (video.videoHeight > video.videoWidth) {
                setIsPortrait(true);
            }
        };

        if (video.readyState >= 1) checkOrientation();
        video.addEventListener('loadedmetadata', checkOrientation);

        return () => {
            video.removeEventListener('loadedmetadata', checkOrientation);
        };
    }, [src]);

    return (
        <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className={
                isPortrait
                    ? "absolute top-1/2 left-1/2 w-auto h-auto min-w-[150%] min-h-[150%] -translate-x-1/2 -translate-y-1/2 rotate-0 object-cover opacity-80"
                    : "absolute inset-0 w-full h-full object-cover scale-105 opacity-80"
            }
            src={src}
        />
    );
};

const GalleryPage = () => {
    const [activeVideo, setActiveVideo] = useState(null);

    const reels = [
        {
            title: "Nitro-Smoke Live Stall Experience",
            category: "Live Counters",
            videoUrl: "/get.mp4",
            thumbnailUrl: "/58376001_2360541167498193_3091553730659614720_n.jpg"
        },
        {
            title: "Grand Flower Stage Decoration",
            category: "Wedding Decor",
            videoUrl: "/Reception Flower stage decoration 🌺To love, laughter, and happily ever after 💐❤️Life is an eve.mp4",
            thumbnailUrl: "/162378381_2919710938247877_476606073473875676_n.jpg"
        },
        {
            title: "Vibrant Celebration & Neon Vibes",
            category: "Event Styling",
            videoUrl: "/get (1).mp4",
            thumbnailUrl: "/58384746_2360541250831518_4916933218214608896_n.jpg"
        }
    ];

    const masonryImages = [
        { url: "/162378381_2919710938247877_476606073473875676_n.jpg", size: 'large', title: 'Grand Buffet Reception' },
        { url: "/163484989_2919710991581205_1427628326452038482_n.jpg", size: 'small', title: 'Traditional Welcome' },
        { url: "/58376001_2360541167498193_3091553730659614720_n.jpg", size: 'small', title: 'Premium Starters' },
        { url: "/58384746_2360541250831518_4916933218214608896_n.jpg", size: 'large', title: 'Luxury Layout' },
        { url: "/58779042_2360540984164878_8375608499794608128_n.jpg", size: 'small', title: 'Chef Specials' },
        { url: "/61987640_2387766771442299_8807957560125554688_n.jpg", size: 'small', title: 'Elegant Catering' },
        { url: "/62025628_2387766901442286_2723483176650407936_n.jpg", size: 'large', title: 'Corporate Excellence' },
        { url: "/62607826_2394208144131495_3553348433936908288_n.jpg", size: 'small', title: 'South Indian Authentic' },
        { url: "/68620437_2432430000309309_7320786620913811456_n.jpg", size: 'small', title: 'Signature Dish' },
    ];



    return (
        <div className="pt-20 bg-transparent overflow-hidden">
            {/* Hero Header */}
            <section className="relative h-[65vh] w-full flex items-center justify-center overflow-hidden">
                <HeroVideo src="/banner.mp4" />
                <div className="absolute inset-0 bg-black/60 z-0" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center px-6"
                >
                    <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Our Visual Journey</span>
                    <h1 className="text-5xl md:text-8xl  font-bold text-white mb-6">
                        Moments We've <span className="text-primary italic">Crafted</span>
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">
                        A glimpse into unforgettable celebrations. Where every dish tells a story and every moment is a masterpiece.
                    </p>
                </motion.div>
            </section>

            {/* Featured Reels Section */}
            <section className="py-12 md:py-16 px-6 md:px-12 relative z-10">
                <div className="container mx-auto">
                    <div className="flex items-end justify-between mb-16">
                        <div>
                            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-4 block">Trending Now</span>
                            <h2 className="text-4xl md:text-6xl  font-bold text-accent-dark">Experience Reels</h2>
                        </div>
                        <div className="hidden md:flex gap-4">
                            <Instagram className="text-primary" size={24} />
                            <span className="font-bold text-accent-dark">@vipcateringchennai</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {reels.map((reel, i) => (
                            <ReelCard key={i} {...reel} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Masonry Image Gallery */}
            <section className="py-12 md:py-16 px-6 relative z-10">
                <div className="container mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl  font-bold text-luxury-shimmer text-shadow-premium">The Art of Catering</h2>
                        <p className="text-gray-400 mt-4 max-w-xl mx-auto">Selected snapshots from our most iconic events across Chennai.</p>
                    </div>
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {masonryImages.map((img, i) => (
                            <MasonryItem key={i} imageUrl={img.url} size={img.size} title={img.title} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Showcase Strip */}
            <section className="py-12 md:py-16 overflow-hidden relative z-10 w-full">
                {/* Subtle gradient edges to mask scrolling ends */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-20" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-20" />
                <div className="mb-12 px-6">
                    <h2 className="text-luxury-shimmer text-shadow-premium  font-bold text-3xl">Quick Clips</h2>
                </div>

                <div className="flex gap-4 animate-scroll whitespace-nowrap w-max">
                    {/* Original Set */}
                    {[
                        "/video1.mp4",
                        "/banner.mp4",
                        "/get.mp4",
                        "/get (1).mp4",
                        "/AQMCWHdcJ_tcQ-rae-xbaW2virN-KiknuFRtz7Hu051T7vJrA4F1bIqDbHfikmV1CB99uTR-O6x0se4X9jK29mS0y91jZaBZ.mp4",
                        "/🎉✨ Your Dream Event, Our VIP Touch! ✨🎉From grand weddings to stylish birthday parties, mouth-w.mp4"
                    ].map((src, i) => (
                        <div key={i} onClick={() => setActiveVideo(src)} className="inline-block w-80 h-48 rounded-2xl overflow-hidden shadow-2xl relative group shrink-0 bg-[#0A0A0A] hover:z-30 hover:shadow-luxury-glow hover:scale-105 transition-all duration-500 cursor-pointer">
                            <div className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                                <QuickClipVideo src={src} />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity pointer-events-none">
                                <Play size={40} className="text-primary fill-primary" />
                            </div>
                        </div>
                    ))}
                    {/* Duplicate Set for infinite scroll effect */}
                    {[
                        "/video1.mp4",
                        "/banner.mp4",
                        "/get.mp4",
                        "/get (1).mp4",
                        "/AQMCWHdcJ_tcQ-rae-xbaW2virN-KiknuFRtz7Hu051T7vJrA4F1bIqDbHfikmV1CB99uTR-O6x0se4X9jK29mS0y91jZaBZ.mp4",
                        "/🎉✨ Your Dream Event, Our VIP Touch! ✨🎉From grand weddings to stylish birthday parties, mouth-w.mp4"
                    ].map((src, i) => (
                        <div key={`dup-${i}`} onClick={() => setActiveVideo(src)} className="inline-block w-80 h-48 rounded-2xl overflow-hidden shadow-2xl relative group shrink-0 bg-[#0A0A0A] hover:z-30 hover:shadow-luxury-glow hover:scale-105 transition-all duration-500 cursor-pointer">
                            <div className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                                <QuickClipVideo src={src} />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity pointer-events-none">
                                <Play size={40} className="text-primary fill-primary" />
                            </div>
                        </div>
                    ))}
                </div>

                <style jsx="true">{`
           @keyframes scroll {
             0% { transform: translateX(0); }
             100% { transform: translateX(-50%); }
           }
           .animate-scroll {
             animation: scroll 30s linear infinite;
           }
         `}</style>
            </section>

            {/* Final CTA */}
            <section className="py-16 md:py-24 px-6 relative z-10 border-t border-[#C9A227]/20">
                <div className="container mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-5xl md:text-8xl  font-bold text-white mb-10 leading-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            Ready to Create <br /> <span className="text-luxury-shimmer italic">Your Event?</span>
                        </h2>
                        <motion.button
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            whileHover={{ scale: 1.05 }}
                            className="btn-luxury-shimmer px-12 py-5 text-xl font-bold"
                        >
                            Start Planning Now
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Video Modal Overlay */}
            <AnimatePresence>
                {activeVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-12"
                        onClick={() => setActiveVideo(null)}
                    >
                        <button
                            onClick={() => setActiveVideo(null)}
                            className="absolute top-6 right-6 z-[110] p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black shadow-[0_0_50px_rgba(201,162,39,0.15)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                src={activeVideo}
                                autoPlay
                                controls
                                className="w-full h-full object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GalleryPage;
