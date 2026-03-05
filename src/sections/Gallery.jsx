import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Gallery = () => {
    const images = [
        {
            url: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070",
            title: "Corporate Excellence",
            category: "Gala Dinner"
        },
        {
            url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
            title: "Ethereal Weddings",
            category: "Outdoor Reception"
        },
        {
            url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070",
            title: "Chef's Specials",
            category: "Live Counters"
        },
        {
            url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070",
            title: "Artisan Platters",
            category: "Private Events"
        },
        // Duplicate for loop
        {
            url: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070",
            title: "Corporate Excellence",
            category: "Gala Dinner"
        },
        {
            url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
            title: "Ethereal Weddings",
            category: "Outdoor Reception"
        },
        {
            url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070",
            title: "Chef's Specials",
            category: "Live Counters"
        },
        {
            url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070",
            title: "Artisan Platters",
            category: "Private Events"
        }
    ];

    return (
        <section id="gallery" className="pt-4 pb-12 md:pt-8 md:pb-16 bg-accent-dark relative overflow-hidden">
            <div className="bg-luxury-blobs absolute inset-0 mix-blend-screen opacity-[0.05] z-0"></div>
            <div className="noise-overlay opacity-[0.04] z-0"></div>

            <div className="container mx-auto px-6 mb-16 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block"
                        >
                            Visual Journey
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl  font-bold text-luxury-shimmer text-shadow-premium tracking-tight"
                        >
                            Our Experience Reel
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-white/40 max-w-sm text-right hidden md:block"
                    >
                        A glimpse into the luxury events we've curated across Chennai and beyond.
                    </motion.p>
                </div>
            </div>

            <div className="px-4 md:px-0 relative z-10">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1.2}
                    centeredSlides={true}
                    loop={false}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 2.5 }
                    }}
                    className="gallery-swiper"
                >
                    {images.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden group border border-[#C9A227]/20 shadow-luxury-card">
                                <img
                                    src={item.url}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80"></div>
                                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                                    <span className="text-luxury-shimmer text-shadow-premium text-xs md:text-sm font-bold uppercase tracking-widest mb-1 md:mb-2">{item.category}</span>
                                    <h3 className="text-xl md:text-3xl  font-bold text-white">{item.title}</h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <style jsx="true">{`
        .gallery-swiper .swiper-pagination-bullet {
          background: #C9A227;
        }
      `}</style>
        </section>
    );
};

export default Gallery;
