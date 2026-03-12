import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, ArrowLeft, IndianRupee } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

const defaultEvents = [
    {
        id: 1,
        title: "Royal Rajputana Wedding",
        date: "15 MAR",
        location: "Leela Palace, Chennai",
        price: "2,500",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069"
    },
    {
        id: 2,
        title: "Corporate Excellence Gala",
        date: "22 MAR",
        location: "ITC Grand Chola, Chennai",
        price: "1,800",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070"
    },
    {
        id: 3,
        title: "Traditional South Indian Fest",
        date: "05 APR",
        location: "Mogappair West, Chennai",
        price: "1,200",
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070"
    },
    {
        id: 4,
        title: "Exclusive Private Lounge",
        date: "12 APR",
        location: "ECR Beach House, Chennai",
        price: "3,000",
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069"
    },
    {
        id: 5,
        title: "Modern Fusion Reception",
        date: "01 MAY",
        location: "Hyatt Regency, Chennai",
        price: "2,200",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"
    }
];

const UpcomingEvents = () => {
    const [events, setEvents] = useState(defaultEvents);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'events'), (snapshot) => {
            if (!snapshot.empty) {
                const liveData = snapshot.docs.map(doc => {
                    const data = doc.data();

                    // Format the date strings cleanly for UI display
                    let formattedDate = data.date || "TBD";
                    try {
                        // Attempt to parse standard 'YYYY-MM-DD' html date
                        if (data.date && data.date.includes('-')) {
                            const d = new Date(data.date);
                            const day = d.getDate().toString().padStart(2, '0');
                            const month = d.toLocaleString('default', { month: 'short' }).toUpperCase();
                            formattedDate = `${day} ${month}`;
                        }
                    } catch (e) { }

                    return {
                        id: doc.id,
                        title: data.title || "VIP Event",
                        date: formattedDate,
                        location: data.location || "Catering Event",
                        price: data.price ? data.price.toLocaleString() : "1,500",
                        image: (data.title && data.title.toLowerCase().includes('kalyana biriyani'))
                            ? "/kalyana-biriyani.jpg"
                            : (data.imageUrl || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069"),
                        createdAt: data.createdAt?.toMillis() || Date.now()
                    };
                });

                // Sort by newest created first
                liveData.sort((a, b) => b.createdAt - a.createdAt);

                setEvents(liveData);
            } else {
                setEvents(defaultEvents); // fallback map
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <section className="pt-12 pb-12 md:pt-16 md:pb-16 bg-background-soft relative overflow-hidden">
            <div className="bg-luxury-blobs absolute inset-0 mix-blend-multiply opacity-50 z-0"></div>
            <div className="noise-overlay opacity-[0.03] z-0"></div>
            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl  font-bold text-luxury-shimmer text-shadow-premium tracking-tight leading-tight">
                            Upcoming <br className="md:hidden" /><span className="inline-block">Events</span>
                        </h2>
                    </motion.div>

                    <Link to="/events" className="group flex items-center gap-3">
                        <span className="text-lg font-bold text-[#C9A227] group-hover:text-white transition-colors">
                            View All Events
                        </span>
                        <div className="relative">
                            <ArrowRight size={22} className="text-[#C9A227] group-hover:text-white group-hover:translate-x-2 transition-transform duration-300" />
                            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#C9A227] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                        </div>
                    </Link>
                </div>

                {/* Carousel */}
                <div className="relative group/swiper">
                    <Swiper
                        modules={[Navigation, Pagination, FreeMode]}
                        spaceBetween={24}
                        slidesPerView={1.2}
                        freeMode={true}
                        grabCursor={true}
                        navigation={{
                            nextEl: '.events-next',
                            prevEl: '.events-prev',
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 4 }
                        }}
                        className="!overflow-visible"
                    >
                        {events.map((event, index) => (
                            <SwiperSlide key={event.id}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group/card cursor-pointer"
                                >
                                    <Link to={`/events/${event.id}`}>
                                        {/* Image Container (3:4 Aspect Ratio) */}
                                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-luxury-card border border-[#C9A227]/20 transition-all duration-500 group-hover/card:-translate-y-2">
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />

                                            {/* Minimal Hover Overlay */}
                                            <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300">
                                                <div className="w-full btn-luxury-shimmer py-3 text-center block text-sm">
                                                    View Details
                                                </div>
                                            </div>
                                        </div>

                                        {/* Text Info (Minimalist) */}
                                        <div className="mt-6 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[11px] font-extrabold text-[#C9A227] uppercase tracking-[0.2em] opacity-90">
                                                    {event.date}
                                                </span>
                                                <div className="h-px flex-1 bg-[#C9A227]/20 mx-4" />
                                                <span className="text-luxury-shimmer font-bold text-sm bg-luxury-gold/10 px-2 py-0.5 rounded-lg flex items-center shadow-text-glow">
                                                    <IndianRupee size={12} strokeWidth={3} className="mr-0.5 text-[#C9A227]" />
                                                    {event.price}
                                                </span>
                                            </div>
                                            <h3 className="text-xl  font-bold text-accent-dark leading-snug group-hover/card:text-[#C9A227] transition-colors pt-2 text-white">
                                                {event.title}
                                            </h3>
                                            <div className="flex items-center gap-1.5 text-gray-300 text-sm font-medium mt-1">
                                                <MapPin size={14} className="text-[#C9A227]/60" />
                                                {event.location}
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Arrows (Desktop Only) */}
                    <button className="events-prev absolute top-[40%] -left-6 z-30 w-12 h-12 bg-[#141414]/90 backdrop-blur-xl rounded-full shadow-luxury-card flex items-center justify-center -translate-y-1/2 text-[#C9A227] hover:bg-luxury-gold hover:text-[#111] transition-all opacity-0 group-hover/swiper:opacity-100 group-hover/swiper:-left-8 order-1 border border-[#C9A227]/30 hover:scale-105">
                        <ArrowLeft size={24} />
                    </button>
                    <button className="events-next absolute top-[40%] -right-6 z-30 w-12 h-12 bg-[#141414]/90 backdrop-blur-xl rounded-full shadow-luxury-card flex items-center justify-center -translate-y-1/2 text-[#C9A227] hover:bg-luxury-gold hover:text-[#111] transition-all opacity-0 group-hover/swiper:opacity-100 group-hover/swiper:-right-8 order-2 border border-[#C9A227]/30 hover:scale-105">
                        <ArrowRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;
