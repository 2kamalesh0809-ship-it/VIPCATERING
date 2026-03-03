import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight, ArrowLeft, Utensils, IndianRupee } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

const UpcomingEvents = () => {
    const events = [
        {
            id: 1,
            title: "Royal Rajputana Wedding",
            date: "March 15, 2026",
            location: "Leela Palace, Chennai",
            price: "2,500",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069"
        },
        {
            id: 2,
            title: "Corporate Excellence Gala",
            date: "March 22, 2026",
            location: "ITC Grand Chola, Chennai",
            price: "1,800",
            image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070"
        },
        {
            id: 3,
            title: "Traditional South Indian Fest",
            date: "April 05, 2026",
            location: "Mogappair West, Chennai",
            price: "1,200",
            image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070"
        },
        {
            id: 4,
            title: "Exclusive Private Lounge",
            date: "April 12, 2026",
            location: "ECR Beach House, Chennai",
            price: "3,000",
            image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069"
        },
        {
            id: 5,
            title: "Modern Fusion Reception",
            date: "May 01, 2026",
            location: "Hyatt Regency, Chennai",
            price: "2,200",
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"
        }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="flex justify-between items-end mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="max-w-xl"
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-accent-dark tracking-tight">
                            Upcoming <span className="text-primary italic">Events</span>
                        </h2>
                        <div className="h-1.5 w-24 bg-primary mt-4 rounded-full" />
                    </motion.div>

                    <Link to="/events" className="group hidden md:block">
                        <span className="text-lg font-bold text-accent-dark flex items-center gap-2 group-hover:text-primary transition-colors">
                            View All Events <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </span>
                        <motion.div
                            className="h-0.5 bg-primary mt-1"
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        />
                    </Link>
                </div>

                {/* Carousel Navigation Placeholder for relative positioning */}
                <div className="relative group/swiper">
                    <Swiper
                        modules={[Navigation, Pagination, FreeMode]}
                        spaceBetween={24}
                        slidesPerView={1.2}
                        freeMode={true}
                        grabCursor={true}
                        navigation={{
                            nextEl: '.swiper-btn-next',
                            prevEl: '.swiper-btn-prev',
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
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group/card"
                                >
                                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg mb-6 bg-gray-100">
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                                        />

                                        {/* Mobile-focused 'Event Menu' Badge */}
                                        <div className="absolute top-4 right-4 z-20 md:hidden">
                                            <Link to="/menu" className="bg-primary/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-bold shadow-lg flex items-center gap-1.5">
                                                <Utensils size={12} /> MENU
                                            </Link>
                                        </div>

                                        {/* Desktop Hover Overlay */}
                                        <div className="absolute inset-0 bg-accent-dark/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 hidden md:flex items-center justify-center gap-4">
                                            <Link to="/menu" className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent-dark hover:bg-primary hover:text-white transition-all scale-75 group-hover/card:scale-100 duration-500 delay-75 shadow-xl">
                                                <Utensils size={20} />
                                            </Link>
                                            <Link to="/contact" className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white hover:bg-accent-dark transition-all scale-75 group-hover/card:scale-100 duration-500 delay-150 shadow-xl">
                                                <ArrowRight size={20} />
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 px-1 transtion-transform duration-300 group-hover/card:-translate-y-1">
                                        <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">
                                            {event.date}
                                        </p>
                                        <h3 className="text-xl font-bold text-accent-dark leading-tight group-hover/card:text-primary transition-colors line-clamp-1">
                                            {event.title}
                                        </h3>
                                        <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                                            <MapPin size={14} className="text-primary/70" />
                                            <span className="truncate">{event.location}</span>
                                        </div>
                                        <div className="pt-2 flex items-center justify-between">
                                            <p className="text-primary font-bold flex items-center gap-0.5">
                                                <span className="text-xs font-medium text-gray-400 mr-1">from</span>
                                                <IndianRupee size={14} strokeWidth={3} />
                                                {event.price}
                                                <span className="text-[10px] text-gray-400 ml-1">/ plate</span>
                                            </p>
                                            <Link to="/contact" className="md:hidden text-primary">
                                                <ArrowRight size={18} />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation buttons - position absolute to the swiper container */}
                    <div className="hidden md:block">
                        <button className="swiper-btn-prev absolute top-1/2 -left-6 z-30 w-12 h-12 bg-white rounded-full shadow-2xl border border-gray-100 flex items-center justify-center -translate-y-1/2 text-accent-dark hover:bg-primary hover:text-white transition-all opacity-0 group-hover/swiper:opacity-100 group-hover/swiper:-left-8">
                            <ArrowLeft size={24} />
                        </button>
                        <button className="swiper-btn-next absolute top-1/2 -right-6 z-30 w-12 h-12 bg-white rounded-full shadow-2xl border border-gray-100 flex items-center justify-center -translate-y-1/2 text-accent-dark hover:bg-primary hover:text-white transition-all opacity-0 group-hover/swiper:opacity-100 group-hover/swiper:-right-8">
                            <ArrowRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Mobile View All Link */}
                <div className="mt-12 text-center md:hidden">
                    <Link to="/events" className="inline-flex items-center gap-2 text-primary font-bold border-b-2 border-primary/20 pb-1">
                        View All Events <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default UpcomingEvents;
