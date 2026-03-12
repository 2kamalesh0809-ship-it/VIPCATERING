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
            whileHover={{ y: -8 }}
            className={`group card-luxury flex flex-col h-full w-full ${isSmall ? '' : ''}`}
        >
            {/* Image Container with 4:5 ratio */}
            <Link to={`/events/${event.id}`} className="block">
                <div className={`relative w-full overflow-hidden bg-gray-100 ${isSmall ? 'aspect-[4/3]' : 'aspect-[4/5]'}`}>
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 inline-block px-3 py-1 bg-[#141414]/90 backdrop-blur-md text-[#C9A227] border border-[#C9A227]/30 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-luxury-card">
                        {event.date}
                    </div>
                </div>
            </Link>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-4 mb-3">
                    <Link to={`/events/${event.id}`}>
                        <h3 className="text-xl  font-bold text-accent-dark leading-tight group-hover:text-primary transition-colors duration-300 relative inline-block text-white">
                            {event.title}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                        </h3>
                    </Link>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400 font-medium mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {event.location}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                    {event.description}
                </p>

                <div className="pt-4 border-t border-[#C9A227]/20 mt-auto flex justify-between items-center">
                    <span className="text-luxury-shimmer text-shadow-premium font-bold text-sm">
                        {event.price}
                    </span>
                    <Link to={`/events/${event.id}`}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-5 py-2 bg-gold-gradient text-black rounded-full font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 flex items-center gap-2"
                        >
                            View Details <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </motion.button>
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
                        image: (data.title && data.title.toLowerCase().includes('kalyana biriyani'))
                            ? "/kalyana-biriyani.jpg"
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
        <div className="bg-background-soft min-h-screen pt-12 md:pt-32 relative">
            <div className="bg-luxury-blobs absolute inset-0 mix-blend-multiply opacity-50 z-0"></div>
            <div className="noise-overlay opacity-[0.03] z-0"></div>

            {/* 1) PAGE HEADER */}
            <div className="container mx-auto px-6 mb-4 md:mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                        Catered Experiences
                    </span>
                    <h1 className="text-5xl md:text-7xl  font-bold text-luxury-shimmer text-shadow-premium tracking-tight mb-4 md:mb-6">
                        Our Events
                    </h1>
                    <p className="hidden md:block text-lg md:text-xl text-gray-300 font-medium">
                        Discover the premium catering experiences we've crafted for unforgettable occasions across the country.
                    </p>
                </motion.div>
            </div>

            {/* 2) FEATURED EVENTS CAROUSEL */}
            <section className="mb-16 md:mb-32 mt-0 overflow-visible">
                <div className="container mx-auto px-6 mb-8 flex items-end justify-between relative z-10">
                    <h2 className="text-2xl md:text-3xl  font-bold text-accent-dark">
                        Upcoming & Featured
                    </h2>
                </div>
                <div className="pl-6 md:pl-[calc((100vw-1280px)/2+24px)] xl:pl-[calc((100vw-1536px)/2+24px)] 2xl:pl-[calc((100vw-1536px)/2+24px)]">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Swiper
                            slidesPerView={1.2}
                            spaceBetween={16}
                            grabCursor={true}
                            freeMode={true}
                            breakpoints={{
                                640: { slidesPerView: 2.2, spaceBetween: 20 },
                                1024: { slidesPerView: 3.2, spaceBetween: 24 },
                                1280: { slidesPerView: 4.2, spaceBetween: 24 },
                            }}
                            modules={[FreeMode]}
                            className="!pb-16 !pr-6"
                        >
                            {events.slice(0, 5).map((event) => (
                                <SwiperSlide key={`featured-${event.id}`} className="h-auto">
                                    <EventCard event={event} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                </div>
            </section>



            <CTASection />
            <div className="h-20 md:hidden" />
        </div>
    );
};

export default EventsPage;
