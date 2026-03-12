import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Calendar, MapPin, IndianRupee, ArrowLeft, Send, CheckCircle2, Clock, Users, Utensils } from 'lucide-react';

const defaultEvents = [
    {
        id: "1",
        title: "Luxury Wedding Catering",
        date: "15 July 2026",
        location: "Chennai",
        price: "Starting from ₹1,200/plate",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000",
        description: "A comprehensive wedding feast featuring multiple live counters, royal service, and a curated grand buffet. We specialize in creating a royal atmosphere with our signature dishes and impeccable hospitality."
    },
    {
        id: "2",
        title: "Corporate Tech Summit",
        date: "22 Aug 2026",
        location: "Bengaluru",
        price: "Starting from ₹900/pax",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000",
        description: "Premium breakfast, networking lunch, and gala dinner crafted specifically to keep professionals energized. Our menus are designed for productivity and seamless service during high-profile corporate events."
    },
    {
        id: "3",
        title: "Exclusive Private Gala",
        date: "05 Sep 2026",
        location: "Mumbai",
        price: "Starting from ₹3,500/pax",
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000",
        description: "An intimate, course-by-course plated dining experience with personal chefs and white-glove service. Perfect for high-end private celebrations where every detail matters."
    }
];

const EventDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            setLoading(true);
            try {
                // Try to find in default static events first (using string ID)
                const staticEvent = defaultEvents.find(e => e.id === id);
                if (staticEvent) {
                    setEvent(staticEvent);
                    setLoading(false);
                    return;
                }

                // If not in static, try Firebase
                const docRef = doc(db, 'events', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();

                    // Force the kalyana-biriyani.jpg for this specific title
                    const forcedImage = (data.title && data.title.toLowerCase().replace(/\s/g, '').includes('biriyani'))
                        ? "/kalyana-biriyani.jpg"
                        : (data.imageUrl || "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000");

                    setEvent({
                        id: docSnap.id,
                        title: data.title || "VIP Event",
                        date: data.date || "TBD",
                        location: data.location || "Catering Event",
                        price: data.price ? `₹${data.price}` : "Premium",
                        image: forcedImage,
                        description: data.desc || "A beautifully catered experience crafted by VIP Catering Chennai.",
                    });
                } else {
                    console.log("No such document!");
                }
            } catch (err) {
                console.error("Error fetching event:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Event Not Found</h2>
                <p className="text-gray-400 mb-8">The event you are looking for might have been moved or deleted.</p>
                <Link to="/events" className="btn-luxury-shimmer px-8 py-3">Back to Events</Link>
            </div>
        );
    }

    return (
        <div className="pt-24 md:pt-32 pb-20 bg-background-soft min-h-screen relative overflow-hidden">
            <div className="bg-luxury-blobs absolute inset-0 mix-blend-multiply opacity-50 z-0"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs mb-8 hover:gap-4 transition-all"
                >
                    <ArrowLeft size={16} /> Back to Events
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Side - Image and Summary */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
                        >
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                            <div className="absolute bottom-8 left-8 right-8">
                                <motion.span
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-primary px-4 py-1.5 rounded-full text-black font-bold text-[10px] uppercase tracking-widest mb-4 inline-block"
                                >
                                    Featured Event
                                </motion.span>
                                <motion.h1
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-4xl md:text-5xl font-bold text-white tracking-tighter"
                                >
                                    {event.title}
                                </motion.h1>
                            </div>
                        </motion.div>

                        <div className="mt-12 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <h2 className="text-2xl font-bold text-white mb-4">Event Overview</h2>
                                <p className="text-gray-300 text-lg leading-relaxed font-light">
                                    {event.description}
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    { icon: Calendar, label: "Date", value: event.date },
                                    { icon: MapPin, label: "Location", value: event.location },
                                    { icon: Utensils, label: "Service", value: "Full Catering" },
                                    { icon: Users, label: "Capacity", value: "Unlimited" }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 + (i * 0.1) }}
                                        className="bg-white/5 p-4 rounded-2xl border border-white/10"
                                    >
                                        <item.icon size={20} className="text-primary mb-2" />
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">{item.label}</p>
                                        <p className="text-white font-bold text-sm">{item.value}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Booking/Inquiry Card */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="bg-[#141414] rounded-[2.5rem] p-8 md:p-10 border border-primary/20 shadow-2xl sticky top-32"
                        >
                            <h3 className="text-2xl font-bold text-white mb-6">Event Details</h3>

                            <div className="space-y-6 mb-8">
                                <div className="flex justify-between items-center py-4 border-b border-primary/10">
                                    <span className="text-gray-400">Pricing</span>
                                    <span className="text-xl font-bold text-primary">{event.price}</span>
                                </div>
                                <div className="flex justify-between items-center py-4 border-b border-primary/10">
                                    <span className="text-gray-400">Available In</span>
                                    <span className="text-white font-bold">Pan India</span>
                                </div>
                                <div className="flex justify-between items-center py-4 border-b border-primary/10">
                                    <span className="text-gray-400">Customization</span>
                                    <span className="text-white font-bold text-right">Fully Customizable Menu</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-10">
                                <p className="text-xs font-bold text-primary uppercase tracking-[0.2em]">What's Included</p>
                                {[
                                    "Signature Starter Platters",
                                    "Premium Main Course Buffet",
                                    "Live Fusion Counters",
                                    "Gourmet Dessert Corner",
                                    "Royal Plated Service"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                                        <CheckCircle2 size={16} className="text-primary shrink-0" />
                                        {item}
                                    </div>
                                ))}
                            </div>

                            <Link to="/contact">
                                <button className="w-full bg-gold-gradient text-black py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform">
                                    <Send size={20} /> Inquire for this Event
                                </button>
                            </Link>

                            <p className="text-center text-gray-500 text-xs mt-6">
                                * Prices may vary based on guest count and menu selection.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailPage;
