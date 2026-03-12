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

const BiriyaniEventDetail = ({ event, navigate }) => {
    return (
        <div className="min-h-screen bg-[#FDF6E3] text-[#4A3000] font-serif overflow-x-hidden">
            {/* Parchment/Antique Style Background Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')] z-0"></div>

            {/* Hero Section */}
            <section className="relative pt-24 pb-16 px-6 border-b-2 border-[#D4AF37]/30">
                <div className="container mx-auto max-w-5xl">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-[#8B4513] font-bold uppercase tracking-widest text-xs mb-8 hover:gap-4 transition-all"
                    >
                        <ArrowLeft size={16} /> Back to Events
                    </motion.button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center lg:text-left space-y-6"
                        >
                            <div className="inline-flex items-center gap-4 mb-2">
                                <div className="h-px w-8 bg-[#D4AF37]" />
                                <span className="uppercase tracking-[0.3em] font-bold text-sm text-[#D4AF37]">VIP Catering</span>
                                <div className="h-px w-8 bg-[#D4AF37]" />
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-[#2D1B00]">
                                Kalyana Biryani <br />
                                <span className="text-[#8B4513] italic">Virundhu</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-[#5D4037] font-medium italic opacity-90 max-w-xl">
                                Chinna function ah? Family get-together ah? <br />
                                Week-end biryani party an!
                            </p>

                            <div className="inline-block bg-[#8B4513] text-[#FDF6E3] px-10 py-3 rounded-full font-bold shadow-xl border-2 border-[#D4AF37]/50">
                                Sunday Mega Cooking Event
                            </div>

                            <div className="flex flex-wrap gap-4 pt-6 justify-center lg:justify-start">
                                <button className="px-8 py-4 bg-[#D4AF37] text-[#2D1B00] rounded-xl font-bold shadow-lg hover:bg-[#E5C158] transition-all transform hover:-translate-y-1">
                                    Book Your Slot
                                </button>
                                <button className="px-8 py-4 bg-[#2D1B00] text-[#D4AF37] rounded-xl font-bold shadow-lg hover:bg-[#3D2B00] border border-[#D4AF37]/30 transition-all transform hover:-translate-y-1">
                                    View Menu
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-[#D4AF37] rounded-[3rem] blur-3xl opacity-20 -z-10 animate-pulse"></div>
                            <img
                                src={event.image}
                                alt="Grand Biriyani"
                                className="w-full h-auto rounded-[3rem] shadow-2xl border-4 border-[#D4AF37]/20"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Concept Section */}
            <section className="py-20 px-6 bg-[#F9F1DC]">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <img
                                src="https://images.unsplash.com/photo-1541014741259-de529411b96a?q=80&w=1000"
                                alt="Cooking Process"
                                className="rounded-[2.5rem] shadow-xl border border-[#D4AF37]/10"
                            />
                        </div>
                        <div className="space-y-8 order-1 md:order-2">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#2D1B00]">
                                Enna indha Kalyana <br />
                                <span className="text-[#8B4513]">Biryani Concept?</span>
                            </h2>
                            <ul className="space-y-5">
                                {[
                                    "Small biriyani orders ellam (5 pax • 10 pax • 20 pax)",
                                    "Saturday ku one mega biriyani cooking event ah combine pannuvom.",
                                    "Fresh ah tasty ana biriyani ungalukku direct ah delivery pannuvom."
                                ].map((point, i) => (
                                    <motion.li
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.2 }}
                                        key={i}
                                        className="flex items-start gap-4 text-lg text-[#5D4037]"
                                    >
                                        <div className="mt-2 w-2 h-2 rounded-full bg-[#D4AF37] shrink-0" />
                                        {point}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Menu Section */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl text-center">
                    <div className="inline-flex items-center gap-6 mb-12">
                        <div className="h-px w-12 bg-[#D4AF37]/50" />
                        <h2 className="text-3xl md:text-4xl font-bold text-[#2D1B00]">VIP Kalyana Biryani Menu</h2>
                        <div className="h-px w-12 bg-[#D4AF37]/50" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Chicken Biryani", img: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?q=80&w=1000" },
                            { title: "Mutton Biryani", img: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=1000" },
                            { title: "Veg Biryani", img: "https://images.unsplash.com/photo-1589302168068-964662d933f1?q=80&w=1000" }
                        ].map((item, i) => (
                            <motion.div
                                whileHover={{ y: -10 }}
                                key={i}
                                className="group relative rounded-3xl overflow-hidden shadow-xl border border-[#D4AF37]/10"
                            >
                                <div className="aspect-square relative">
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B00] via-transparent to-transparent opacity-60"></div>
                                    <div className="absolute bottom-6 left-0 right-0">
                                        <h3 className="text-2xl font-bold text-white tracking-widest uppercase">{item.title}</h3>
                                        <div className="mt-2 w-12 h-0.5 bg-[#D4AF37] mx-auto group-hover:w-20 transition-all"></div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <p className="mt-12 text-[#D4AF37] font-bold italic border-y border-[#D4AF37]/20 py-4 inline-block px-10">
                        Luxury Biryani Combo For Small Functions
                    </p>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-24 px-6 bg-[#2D1B00] text-[#FDF6E3] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1532339142463-fd0a89b2742e?q=80&w=2000')] bg-cover bg-center"></div>
                <div className="container mx-auto max-w-5xl relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-20">How It Works</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-[#D4AF37]/30"></div>

                        {[
                            { step: "1", title: "Register Order", sub: "Website la order pannunga", icon: "📱" },
                            { step: "2", title: "Saturday Cooking", sub: "Ungal order mega cooking list la add pannuvom", icon: "🔥" },
                            { step: "3", title: "Delivery", sub: "Fresh ah biryani cook pannitu Sunday ku deliver pannuvom", icon: "🚚" }
                        ].map((item, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                key={i}
                                className="space-y-6"
                            >
                                <div className="w-24 h-24 bg-[#D4AF37] text-[#2D1B00] rounded-full mx-auto flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(212,175,55,0.3)] relative z-20">
                                    {item.icon}
                                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#2D1B00] font-bold text-xl border-2 border-[#D4AF37]">
                                        {item.step}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-[#D4AF37]">{item.title}</h3>
                                <p className="text-gray-300 italic opacity-80">{item.sub}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20">
                        <button className="bg-gold-gradient px-12 py-4 rounded-full text-[#2D1B00] font-black uppercase tracking-widest text-lg shadow-2xl hover:scale-105 transition-all">
                            Book Now <ArrowLeft className="inline-block ml-2 rotate-180" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Sticky Promo Footer */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="fixed bottom-0 left-0 right-0 bg-[#FDF6E3] border-t-2 border-[#D4AF37] py-6 px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] z-[100]"
            >
                <div className="container mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#8B4513]">Next Event</h4>
                            <p className="font-bold text-[#2D1B00]">NEXT SUNDAY</p>
                        </div>
                        <div className="h-10 w-px bg-[#D4AF37]/30"></div>
                        <div className="bg-[#2D1B00] text-[#D4AF37] px-6 py-2 rounded-lg font-bold text-sm shadow-inner">
                            72 Plates Booked | <span className="text-white">18 Slots Left</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <a href="tel:+919840512345" className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#2D1B00] rounded-xl font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-[#D4AF37]/30 transition-all">
                            <Send size={18} /> Call Now
                        </a>
                        <a href="https://wa.me/919840512345" className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-xl font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-[#25D366]/30 transition-all">
                            <CheckCircle2 size={18} /> Whatsapp Order
                        </a>
                    </div>
                </div>
            </motion.div>

            {/* Add padding to compensate for sticky footer */}
            <div className="h-24"></div>
        </div>
    );
};

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
                    const normalizedTitle = (data.title || "").toLowerCase();
                    const isBiriyani = normalizedTitle.includes('bir') && normalizedTitle.includes('yan');

                    // Force the kalyana-biriyani.jpg for this specific title
                    const forcedImage = isBiriyani
                        ? `/kalyana-biriyani.jpg?v=${Date.now()}`
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

    // Special layout for Biriyani - Case insensitive check for 'bir' and 'yan'
    const eventTitleLower = (event.title || "").toLowerCase();
    if (eventTitleLower.includes('bir') && eventTitleLower.includes('yan')) {
        return <BiriyaniEventDetail event={event} navigate={navigate} />;
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
