import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { ArrowLeft } from 'lucide-react';
import CTASection from '../sections/CTASection';

const defaultEvents = [
    {
        id: 1,
        title: "Luxury Wedding Catering",
        date: "15 July 2026",
        location: "Chennai",
        price: "Starting from ₹1,200/plate",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000",
        description: "A comprehensive wedding feast featuring multiple live counters, royal service, and a curated grand buffet."
    },
    {
        id: 2,
        title: "Corporate Tech Summit",
        date: "22 Aug 2026",
        location: "Bengaluru",
        price: "Starting from ₹900/pax",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000",
        description: "Premium breakfast, networking lunch, and gala dinner crafted specifically to keep professionals energized."
    },
    {
        id: 3,
        title: "Exclusive Private Gala",
        date: "05 Sep 2026",
        location: "Mumbai",
        price: "Starting from ₹3,500/pax",
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000",
        description: "An intimate, course-by-course plated dining experience with personal chefs and white-glove service."
    },
    {
        id: 4,
        title: "Grand Anniversary",
        date: "12 Oct 2026",
        location: "Hyderabad",
        price: "Starting from ₹1,000/plate",
        image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=1000",
        description: "A joyful celebration menu with an emphasis on interactive dessert stations and rich traditional cuisines."
    },
    {
        id: 5,
        title: "Startup Launch Party",
        date: "03 Nov 2026",
        location: "Chennai",
        price: "Starting from ₹1,500/pax",
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1000",
        description: "Modern finger foods, trendy fusion dishes, and artisanal beverage counters perfect for networking."
    },
    {
        id: 6,
        title: "Traditional Housewarming",
        date: "20 Dec 2026",
        location: "Chennai",
        price: "Starting from ₹600/plate",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000",
        description: "Authentic banana leaf feast featuring traditional recipes passed down through generations."
    }
];

const EventCard = ({ event, isSmall = false }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className={`group bg-white/80 backdrop-blur-[10px] rounded-2xl overflow-hidden shadow-xl border border-luxury-gold/10 transition-all duration-300 ease-out h-full flex flex-col`}
        >
            {/* Image Container */}
            <Link to={`/events/${event.id}`} className="block relative overflow-hidden">
                <div className={`relative w-full overflow-hidden bg-gray-100 ${isSmall ? 'aspect-[4/3]' : 'aspect-[4/5]'}`}>
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transform transition-transform duration-[2s] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/40 to-transparent"></div>
                    <div className="absolute top-5 left-5 inline-block px-4 py-1.5 bg-luxury-dark/90 backdrop-blur-md text-luxury-gold border border-luxury-gold/30 text-[9px] font-bold uppercase tracking-[0.2em] rounded-lg shadow-2xl">
                        {event.date}
                    </div>
                </div>
            </Link>

            {/* Content Container */}
            <div className="p-8 flex flex-col flex-grow bg-white">
                <div className="mb-4">
                    <Link to={`/events/${event.id}`}>
                        <h3 className="text-2xl font-serif font-bold text-luxury-dark leading-tight group-hover:text-luxury-gold transition-colors duration-300">
                            {event.title}
                        </h3>
                    </Link>
                </div>

                <div className="flex items-center gap-2 text-xs text-luxury-accent font-bold uppercase tracking-wider mb-4 opacity-80">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {event.location}
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow font-light">
                    {event.description}
                </p>

                <div className="pt-6 border-t border-luxury-gold/10 mt-auto flex justify-between items-center">
                    <span className="text-luxury-dark font-serif font-bold text-lg">
                        {event.price}
                    </span>
                    <Link to={`/events/${event.id}`}>
                        <button className="flex items-center gap-2 text-luxury-gold font-bold uppercase tracking-widest text-[10px] hover:gap-4 transition-all group/btn">
                            Explore <ArrowLeft className="rotate-180" size={14} />
                        </button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

const EventsPage = () => {
    const [events, setEvents] = useState(defaultEvents);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'events'), (snapshot) => {
            if (!snapshot.empty) {
                const liveData = snapshot.docs.map(doc => {
                    const data = doc.data();

                    let formattedDate = data.date || "TBD";
                    try {
                        if (data.date && data.date.includes('-')) {
                            const d = new Date(data.date);
                            const day = d.getDate().toString().padStart(2, '0');
                            const month = d.toLocaleString('default', { month: 'short' });
                            const year = d.getFullYear();
                            formattedDate = `${day} ${month} ${year}`;
                        }
                    } catch (e) { }

                    return {
                        id: doc.id,
                        title: data.title || "VIP Event",
                        date: formattedDate,
                        location: data.location || "Catering Event",
                        price: data.price ? `Starts ₹${data.price}` : "Premium",
                        image: (data.title && data.title.toLowerCase().includes('bir') && data.title.toLowerCase().includes('yan'))
                            ? `/kalyana-biriyani.jpg?v=${Date.now()}`
                            : (data.imageUrl || "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000"),
                        description: data.desc || "A beautifully catered experience.",
                        createdAt: data.createdAt?.toMillis() || Date.now()
                    };
                });
                liveData.sort((a, b) => b.createdAt - a.createdAt);
                setEvents(liveData);
            } else {
                setEvents(defaultEvents);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="bg-[#F7F2E8] min-h-screen pt-12 md:pt-40 relative overflow-hidden">
            {/* Background Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] z-0"></div>

            {/* 1) PAGE HEADER */}
            <div className="container mx-auto px-6 mb-12 md:mb-24 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl"
                >
                    <span className="text-luxury-accent font-bold tracking-[0.4em] uppercase text-xs mb-4 block">
                        Catered Experiences
                    </span>
                    <h1 className="text-5xl md:text-8xl font-serif font-bold text-luxury-dark tracking-tight mb-8">
                        Our <span className="text-luxury-accent italic font-normal">Events</span>
                    </h1>
                    <p className="text-lg md:text-xl text-luxury-dark/60 font-light italic leading-relaxed max-w-2xl">
                        Discover the premium catering experiences we've crafted for unforgettable occasions, where every detail is served with the gold standard of taste.
                    </p>
                </motion.div>
            </div>

            {/* 2) FEATURED EVENTS CAROUSEL */}
            <section className="mb-24 md:mb-40 overflow-visible relative z-10">
                <div className="container mx-auto px-6 mb-12 flex items-end justify-between">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-luxury-dark">
                        Upcoming & Featured
                    </h2>
                </div>
                <div className="pl-6 md:pl-[calc((100vw-1280px)/2+24px)] xl:pl-[calc((100vw-1536px)/2+24px)]">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Swiper
                            slidesPerView={1.2}
                            spaceBetween={24}
                            grabCursor={true}
                            freeMode={true}
                            breakpoints={{
                                640: { slidesPerView: 2.2, spaceBetween: 30 },
                                1024: { slidesPerView: 3.2, spaceBetween: 40 },
                                1280: { slidesPerView: 3.5, spaceBetween: 50 },
                            }}
                            modules={[FreeMode]}
                            className="!pb-24 !pr-6"
                        >
                            {events.map((event) => (
                                <SwiperSlide key={`featured-${event.id}`} className="h-auto">
                                    <EventCard event={event} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                </div>
            </section>

            <CTASection />
            <div className="h-20" />
        </div>
    );
};

export default EventsPage;
