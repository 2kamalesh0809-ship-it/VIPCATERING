import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { Play, Pause, ArrowRight, Instagram, PlayCircle } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

const ReelCard = ({ videoUrl, thumbnailUrl, title, category }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    videoRef.current?.play().catch(() => { });
                    setIsPlaying(true);
                } else {
                    videoRef.current?.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.6 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[9/16] rounded-[2rem] overflow-hidden shadow-2xl group bg-accent-dark"
        >
            <video
                ref={videoRef}
                src={videoUrl}
                poster={thumbnailUrl}
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay Details */}
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none">
                <span className="text-primary font-bold text-xs uppercase tracking-widest mb-2 block">{category}</span>
                <h3 className="text-xl font-display font-bold text-white mb-4 leading-tight">{title}</h3>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                    <PlayCircle size={16} className="text-primary" />
                    <span>Experience Reel</span>
                </div>
            </div>

            {/* Status Overlay */}
            <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
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
                <h4 className="text-white font-display font-bold text-xl drop-shadow-lg">{title}</h4>
            </div>
        </div>
    </motion.div>
);

const GalleryPage = () => {
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

    const stories = [
        { title: "The Heritage Wedding", desc: "A 1000-guest traditional celebration in Mogappair West.", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070" },
        { title: "Tech Summit Gala", desc: "Premium corporate catering for over 500 delegates.", img: "https://images.unsplash.com/photo-1505373633513-392cf99a80e1?q=80&w=1974" },
        { title: "Private Villa Soirée", desc: "Intimate 5-course fine dining for a private anniversary.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069" },
    ];

    return (
        <div className="pt-20 bg-transparent overflow-hidden">
            {/* Hero Header */}
            <section className="relative h-[65vh] w-full flex items-center justify-center overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                    src="/get.mp4"
                />
                <div className="absolute inset-0 bg-black/60" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center px-6"
                >
                    <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Our Visual Journey</span>
                    <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-6">
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
                            <h2 className="text-4xl md:text-6xl font-display font-bold text-accent-dark">Experience Reels</h2>
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
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-luxury-shimmer text-shadow-premium">The Art of Catering</h2>
                        <p className="text-gray-400 mt-4 max-w-xl mx-auto">Selected snapshots from our most iconic events across Chennai.</p>
                    </div>
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {masonryImages.map((img, i) => (
                            <MasonryItem key={i} imageUrl={img.url} size={img.size} title={img.title} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Event Highlight Stories */}
            <section className="py-12 md:py-16 bg-background-soft overflow-hidden relative z-10 border-y border-[#C9A227]/10">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-4 mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-luxury-shimmer text-shadow-premium">Event Stories</h2>
                        <div className="grow h-px bg-[#C9A227]/20" />
                    </div>

                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1.2}
                        autoplay={{ delay: 4000 }}
                        breakpoints={{
                            1024: { slidesPerView: 2.5 }
                        }}
                        className="pb-16"
                    >
                        {stories.map((story, i) => (
                            <SwiperSlide key={i}>
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="relative h-[500px] rounded-[2.5rem] overflow-hidden group shadow-xl"
                                >
                                    <img src={story.img} alt={story.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-12 flex flex-col justify-end">
                                        <h3 className="text-3xl font-display font-bold text-white mb-4">{story.title}</h3>
                                        <p className="text-white/70 mb-8 max-w-sm">{story.desc}</p>
                                        <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 w-max px-8 py-3 rounded-full font-bold flex items-center gap-3 transition-colors hover:bg-white hover:text-accent-dark">
                                            View Story <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* Video Showcase Strip */}
            <section className="py-12 md:py-16 overflow-hidden bg-[#0a0a0a]/50 backdrop-blur-sm relative z-10">
                <div className="mb-12 px-6">
                    <h2 className="text-luxury-shimmer text-shadow-premium font-display font-bold text-3xl">Quick Clips</h2>
                </div>

                <div className="flex gap-4 animate-scroll whitespace-nowrap">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="inline-block w-80 h-48 rounded-2xl overflow-hidden shadow-2xl relative group shrink-0">
                            <img src={`https://images.unsplash.com/photo-${1550000000000 + i * 1000}?q=80&w=800`} alt="Clip" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all font-semibold" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
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
                        <h2 className="text-5xl md:text-8xl font-display font-bold text-white mb-10 leading-tight drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
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
        </div>
    );
};

export default GalleryPage;
