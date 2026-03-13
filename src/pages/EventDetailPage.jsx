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
        <div className="event-page min-h-screen relative overflow-x-hidden selection:bg-[#d4a24a]/30">
            <style>{`
                .event-page {
                    background: linear-gradient(rgba(40,20,10,0.85), rgba(40,20,10,0.95)), url('/biryani-table.jpg');
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                    color: #f5e7c8;
                    font-family: 'Inter', sans-serif;
                }
                .event-page::before {
                    content: "";
                    position: fixed;
                    inset: 0;
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    pointer-events: none;
                    z-index: 0;
                }

                .event-page h1, .event-page h2, .event-page h3, .event-page .font-serif {
                    font-family: 'Playfair Display', serif;
                    letter-spacing: 0.02em;
                }
                .event-page p, .event-page span, .event-page div {
                    font-family: 'Inter', sans-serif;
                }
                .event-page .glass-card {
                    background: rgba(120, 70, 40, 0.45);
                    backdrop-filter: blur(14px);
                    -webkit-backdrop-filter: blur(14px);
                    border-radius: 20px;
                    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 80px rgba(212, 162, 74, 0.25);
                    border: 1px solid rgba(212, 162, 74, 0.2);
                    transition: transform 0.4s ease, box-shadow 0.4s ease;
                }
                .event-page .glass-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.8), 0 0 100px rgba(212, 162, 74, 0.4);
                }
                .event-page .divider {
                    background: linear-gradient(90deg, transparent, rgba(212,162,74,0.6), transparent);
                    height: 1px;
                    border: none;
                    margin: 0 auto;
                    width: 80%;
                }
                .event-page .text-gold { color: #d4a24a; }
                
                .event-page .biryani-hero {
                    background: linear-gradient(rgba(60,30,10,0.85), rgba(60,30,10,0.9)), url('/biriyani-texture.jpg');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    border-radius: 2rem;
                    box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 120px rgba(212,162,74,0.25);
                    position: relative;
                    border: 1px solid rgba(212, 162, 74, 0.2);
                }

                .event-page .biryani-hero::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.6) 100%);
                    pointer-events: none;
                    border-radius: 2rem;
                    z-index: 0;
                }

                .event-page .biryani-hero-btn {
                    background: linear-gradient(135deg, #e2b565, #c7963b);
                    color: #28140a;
                    font-weight: 700;
                    transition: all 0.3s ease;
                    border: none;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
                }
                .event-page .biryani-hero-btn:hover {
                    box-shadow: 0 0 20px rgba(212, 162, 74, 0.6);
                    transform: translateY(-4px);
                }
                
                .event-page .luxury-btn {
                    background: linear-gradient(135deg, #e2b565, #c7963b);
                    color: #28140a;
                    font-weight: 700;
                    transition: all 0.3s ease;
                    border: none;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
                }
                .event-page .luxury-btn:hover {
                    box-shadow: 0 0 20px rgba(212, 162, 74, 0.6);
                    transform: translateY(-4px);
                }

                .event-page .menu-card {
                    border-radius: 20px;
                    overflow: hidden;
                    position: relative;
                    transition: transform 0.4s ease;
                }
                .event-page .menu-card:hover {
                    transform: scale(1.06);
                }
                
                .event-page .hero-img-container {
                    position: relative;
                }
                .event-page .hero-img-container::before {
                    content: "";
                    position: absolute;
                    inset: -30px;
                    background: radial-gradient(circle, #d4a24a55, transparent 60%);
                    z-index: -1;
                    border-radius: 50%;
                }
                
                .event-page .content-wrapper {
                    position: relative;
                    z-index: 10;
                }
            `}</style>

            <div className="content-wrapper">
                {/* Hero Section */}
                <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6">
                    <div className="container mx-auto max-w-6xl biryani-hero relative overflow-hidden">
                        <div className="p-10 md:p-16">
                            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gold font-bold uppercase tracking-widest text-xs mb-12 hover:gap-4 transition-all opacity-80 hover:opacity-100">
                                <ArrowLeft size={16} /> Back to Events
                            </button>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8 text-center lg:text-left">
                                    <div className="inline-flex items-center justify-center lg:justify-start gap-4 mb-2 w-full">
                                        <div className="h-px w-12 bg-[#d4a24a]/40" />
                                        <span className="uppercase tracking-[0.4em] font-bold text-xs text-gold">Premium Catering</span>
                                        <div className="h-px w-12 bg-[#d4a24a]/40" />
                                    </div>
                                    <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-2xl" style={{ fontFamily: '"Playfair Display", serif' }}>
                                        Kalyana Biryani <br />
                                        <span className="italic font-normal" style={{ color: '#e2b565' }}>Virundhu</span>
                                    </h1>
                                    <p className="text-lg md:text-xl font-light italic leading-relaxed max-w-xl mx-auto lg:mx-0 opacity-90 drop-shadow-md">
                                        Chinna function ah? Family get-together ah? <br />
                                        <span className="font-semibold text-white">Week-end biryani party an!</span>
                                    </p>
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="inline-block bg-[rgba(120,70,40,0.8)] text-gold px-10 py-3 rounded-full font-bold shadow-2xl border border-[#d4a24a]/40 tracking-widest text-sm">
                                        Sunday Mega Cooking Event
                                    </motion.div>
                                    <div className="flex flex-wrap gap-5 pt-6 justify-center lg:justify-start">
                                        <button className="px-10 py-4 biryani-hero-btn rounded-xl tracking-wider">
                                            Book Your Slot
                                        </button>
                                        <button className="px-10 py-4 bg-[rgba(0,0,0,0.3)] border border-[#e2b565] text-[#e2b565] rounded-xl font-bold hover:bg-[rgba(212,162,74,0.15)] transition-all transform hover:-translate-y-1 tracking-wider backdrop-blur-md">
                                            View Menu
                                        </button>
                                    </div>
                                </motion.div>

                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="hero-img-container perspective-1000 z-10">
                                    <div className="relative rounded-[2.5rem] bg-white/5 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transform-style-3d transition-transform duration-700 hover:rotate-y-2 hover:rotate-x-2">
                                        <img src={event.image || "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1000"} alt="Grand Biriyani" className="w-full h-auto rounded-[2.5rem] transform transition-transform duration-700 hover:scale-105" style={{ filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.6))' }} />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="divider" />

                {/* Concept Section */}
                <section className="py-24 px-6 relative">
                    <div className="container mx-auto max-w-5xl glass-card p-10 md:p-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative group order-2 md:order-1">
                                <div className="absolute -inset-4 border border-[#d4a24a]/30 rounded-[2rem] -z-10 translate-x-3 translate-y-3 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
                                <div className="rounded-[2rem] overflow-hidden shadow-2xl">
                                    <img src="/Royal Hyderabadi Biryani – Authentic Dum Style Perfection.jpg" alt="Cooking Process" className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                                </div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-10 order-1 md:order-2">
                                <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight text-white drop-shadow-md">
                                    Enna indha Kalyana <br />
                                    <span className="text-gold italic font-normal">Biryani Concept?</span>
                                </h2>
                                <ul className="space-y-6">
                                    {[
                                        "Small biriyani orders ellam (5 pax • 10 pax • 20 pax)",
                                        "Saturday ku one mega biriyani cooking event ah combine pannuvom.",
                                        "Fresh ah tasty ana biriyani ungalukku direct ah delivery pannuvom."
                                    ].map((point, i) => (
                                        <li key={i} className="flex items-start gap-5 text-lg opacity-90 group">
                                            <div className="mt-2.5 w-2 h-2 rounded-full bg-[#d4a24a] shadow-[0_0_10px_rgba(212,162,74,0.8)] shrink-0 group-hover:scale-150 transition-transform" />
                                            <span className="font-light leading-relaxed drop-shadow-sm">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <div className="divider" />

                {/* Menu Section */}
                <section className="py-24 px-6 relative">
                    <div className="container mx-auto max-w-6xl text-center glass-card p-10 md:p-16">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex flex-col items-center mb-16">
                            <span className="text-gold font-bold tracking-[0.3em] uppercase text-xs mb-4">Taste the Legend</span>
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white drop-shadow-lg">VIP Kalyana Biryani Menu</h2>
                            <div className="mt-6 w-24 h-1 bg-[#d4a24a] rounded-full shadow-[0_0_10px_rgba(212,162,74,0.5)]"></div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[
                                { title: "Chicken Biryani", img: "/chickkenbiriyani.jpg" },
                                { title: "Mutton Biryani", img: "/muttonbiriyani.jpg" },
                                { title: "Veg Biryani", img: "/vegbiriyani.jpg" }
                            ].map((item, i) => (
                                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} viewport={{ once: true }} key={i}>
                                    <div className="menu-card aspect-[4/5] shadow-[0_15px_30px_rgba(0,0,0,0.6)] border border-[#d4a24a]/20 group">
                                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,10,0,0.95)] via-[rgba(20,10,0,0.4)] to-transparent"></div>
                                        <div className="absolute bottom-10 left-0 right-0 px-6 transition-all duration-300">
                                            <h3 className="text-3xl font-serif font-bold text-gold tracking-wide drop-shadow-md mb-2">{item.title}</h3>
                                            <div className="w-12 h-1 bg-[#d4a24a] mx-auto group-hover:w-24 transition-all duration-500 shadow-[0_0_8px_rgba(212,162,74,0.8)]"></div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="divider" />

                {/* How it Works */}
                <section className="py-24 px-6 relative">
                    <div
                        className="container mx-auto max-w-6xl text-center p-10 md:p-16 rounded-[2rem] shadow-2xl relative overflow-hidden border border-[#d4a24a]/20"
                        style={{
                            background: `linear-gradient(rgba(60,30,10,0.8), rgba(60,30,10,0.9)), url('/A%20Blank%20Parchment%20Texture%20With%20Soft%20Warm%20Tones%20And%20Subtle%20Gradients%20Background%20Wallpaper%20Image%20For%20Free%20Download%20-%20Pngtree.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex items-center justify-center gap-4 md:gap-8 mb-20 relative z-20">
                            <div className="h-px w-20 md:w-40 bg-gradient-to-r from-transparent to-[#e2b565]"></div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#e2b565]" style={{ textShadow: "0 0 15px rgba(226,181,101,0.5)" }}>
                                How It Works
                            </h2>
                            <div className="h-px w-20 md:w-40 bg-gradient-to-l from-transparent to-[#e2b565]"></div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10 mt-10">
                            {/* Connecting Dotted Line */}
                            <div className="hidden md:block absolute top-[5.5rem] left-[15%] right-[15%] h-px border-dotted border-t-[3px] border-[#d4a24a]/50 z-0"></div>

                            {[
                                { step: "1", title: "Register Order", sub: "Website la order pannunga", img: "https://cdn-icons-png.flaticon.com/512/2950/2950536.png" },
                                { step: "2", title: "Saturday Cooking", sub: "Ungal order mega cooking list la add pannuvom", img: "https://cdn-icons-png.flaticon.com/512/3565/3565401.png" },
                                { step: "3", title: "Home Delivery", sub: "Fresh ah Sunday morning unga veetuku vandhurum", img: "https://cdn-icons-png.flaticon.com/512/2830/2830305.png" }
                            ].map((item, i) => (
                                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} viewport={{ once: true }} key={i} className="relative z-10 group px-4">
                                    <div
                                        className="mx-auto w-full transition-all duration-500 group-hover:-translate-y-4 group-hover:scale-[1.02] relative"
                                        style={{
                                            background: 'rgba(120,70,40,0.35)',
                                            backdropFilter: 'blur(10px)',
                                            WebkitBackdropFilter: 'blur(10px)',
                                            borderRadius: '20px',
                                            boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                                            padding: '2.5rem 2rem'
                                        }}
                                    >
                                        {/* Step Number Badge */}
                                        <div
                                            className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center font-bold text-xl font-serif z-20"
                                            style={{
                                                background: '#c7963b',
                                                color: '#fff',
                                                borderRadius: '50%',
                                                boxShadow: '0 0 10px rgba(212,162,74,0.6)'
                                            }}
                                        >
                                            {item.step}
                                        </div>

                                        {/* Illustrated Icon with radial glow */}
                                        <div className="relative w-32 h-32 mx-auto mb-8 z-10 flex items-center justify-center">
                                            <div
                                                className="absolute inset-0"
                                                style={{ background: 'radial-gradient(circle, #d4a24a30 0%, transparent 70%)', filter: 'blur(8px)' }}
                                            ></div>
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                className="w-24 h-24 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
                                                style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.4))' }}
                                            />
                                        </div>

                                        {/* Text Content */}
                                        <div className="relative z-10 mt-6">
                                            <h3 className="text-2xl font-serif font-bold tracking-wide mb-3 text-white transition-colors duration-300 drop-shadow-md group-hover:text-[#e2b565]">
                                                {item.title}
                                            </h3>
                                            <p className="text-[#f5e7c8] opacity-90 font-light text-[15px] leading-relaxed font-sans">
                                                {item.sub}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} viewport={{ once: true }} className="mt-20 relative z-20">
                            <button
                                className="px-12 py-4 rounded-xl font-bold text-lg tracking-widest transition-all duration-300 transform hover:-translate-y-1 font-serif uppercase"
                                style={{
                                    background: 'linear-gradient(135deg, #e2b565, #c7963b)',
                                    color: '#28140a',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 25px rgba(212,162,74,0.8)'}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)'}
                            >
                                Book Now
                            </button>
                        </motion.div>
                    </div>
                </section>

                <div className="h-40"></div>
            </div>

            {/* Sticky Footer */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 100, delay: 1 }}
                className="fixed bottom-0 left-0 right-0 z-[100] border-t border-[#d4a24a]/30 py-4 px-6 bg-[rgba(40,20,10,0.85)] backdrop-blur-xl shadow-[0_-20px_50px_rgba(0,0,0,0.8)]"
            >
                <div className="container mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="hidden sm:block">
                            <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold mb-1">Coming Up</h4>
                            <p className="font-serif font-bold text-white text-sm">NEXT SUNDAY</p>
                        </div>
                        <div className="hidden sm:block h-8 w-px bg-[#d4a24a]/30"></div>
                        <div className="bg-[rgba(120,70,40,0.4)] backdrop-blur-sm text-white px-6 py-2 rounded-xl font-bold text-xs tracking-widest border border-[#d4a24a]/20 shadow-inner">
                            72 <span className="opacity-50 text-[10px]">PLATES</span> | <span className="text-gold">18 SLOTS LEFT</span>
                        </div>
                    </div>

                    <div className="flex gap-4 w-full sm:w-auto">
                        <a href="tel:+918124142113" className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-3 luxury-btn rounded-xl text-xs uppercase tracking-widest">
                            <Send size={14} /> Call Now
                        </a>
                        <a href="https://wa.me/918124142113" className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-3 bg-[#25D366] text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-[0_10px_20px_rgba(37,211,102,0.2)] hover:shadow-[0_0_20px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all">
                            <CheckCircle2 size={14} /> WhatsApp
                        </a>
                    </div>
                </div>
            </motion.div>
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
        <div className="pt-32 md:pt-48 pb-24 bg-[#F7F2E8] min-h-screen relative overflow-hidden font-sans">
            {/* Background Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] z-0"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-luxury-accent font-bold uppercase tracking-[0.2em] text-[10px] mb-12 hover:gap-4 transition-all group"
                >
                    <ArrowLeft size={14} className="group-hover:text-luxury-gold transition-colors" /> Back to Events
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Side - Image and Summary */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-luxury-gold/10 bg-white p-2"
                        >
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover rounded-[2.8rem]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/60 via-transparent to-transparent opacity-40"></div>

                            <div className="absolute bottom-10 left-10 right-10">
                                <motion.span
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-luxury-gold px-5 py-2 rounded-full text-white font-bold text-[9px] uppercase tracking-[0.3em] mb-4 inline-block shadow-lg"
                                >
                                    Exclusive Experience
                                </motion.span>
                                <motion.h1
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight drop-shadow-lg"
                                >
                                    {event.title}
                                </motion.h1>
                            </div>
                        </motion.div>

                        <div className="mt-16 space-y-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl font-serif font-bold text-luxury-dark mb-6">The Royal Presentation</h2>
                                <p className="text-luxury-dark/70 text-lg leading-relaxed font-light italic">
                                    {event.description}
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    { icon: Calendar, label: "Date", value: event.date },
                                    { icon: MapPin, label: "Location", value: event.location },
                                    { icon: Utensils, label: "Service", value: "White Glove" },
                                    { icon: Users, label: "Capacity", value: "Premium" }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * i, duration: 0.8, ease: "easeOut" }}
                                        whileHover={{ y: -6 }}
                                        className="bg-white/80 backdrop-blur-[10px] p-6 rounded-3xl border border-luxury-gold/10 shadow-xl shadow-luxury-gold/5 transition-all duration-300 ease-out"
                                    >
                                        <item.icon size={22} className="text-luxury-gold mb-4" />
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-accent font-bold mb-2">{item.label}</p>
                                        <p className="text-luxury-dark font-bold text-sm tracking-tight">{item.value}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Booking/Inquiry Card */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                            whileHover={{ y: -6 }}
                            className="bg-white/80 backdrop-blur-[10px] rounded-[3rem] p-10 md:p-12 border border-luxury-gold/20 shadow-2xl sticky top-40 transition-all duration-300 ease-out"
                        >
                            <h3 className="text-3xl font-serif font-bold text-luxury-dark mb-8">Event Inquiry</h3>

                            <div className="space-y-8 mb-10">
                                <div className="flex justify-between items-end py-6 border-b border-luxury-gold/10">
                                    <span className="text-luxury-dark/50 text-sm font-medium">Estimated Pricing</span>
                                    <span className="text-2xl font-serif font-bold text-luxury-gold leading-none">{event.price}</span>
                                </div>
                                <div className="flex justify-between items-center py-4 text-sm">
                                    <span className="text-luxury-dark/50">Availability</span>
                                    <span className="text-luxury-dark font-bold uppercase tracking-widest text-[10px]">Nationwide</span>
                                </div>
                                <div className="flex justify-between items-center py-4 text-sm">
                                    <span className="text-luxury-dark/50">Cuisine Style</span>
                                    <span className="text-luxury-dark font-bold uppercase tracking-widest text-[10px]">Global Fusion</span>
                                </div>
                            </div>

                            <div className="bg-luxury-bg/50 p-8 rounded-3xl mb-10 border border-luxury-gold/10">
                                <p className="text-[10px] font-bold text-luxury-accent uppercase tracking-[0.3em] mb-6">VIP Gold Standard</p>
                                <div className="space-y-4">
                                    {[
                                        "Signature Live Stations",
                                        "Royal Presentation Platters",
                                        "Executive Chef Service",
                                        "Artisanal Dessert Corner"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 text-luxury-dark/80 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold shrink-0"></div>
                                            <span className="font-light">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Link to="/contact">
                                <button className="w-full bg-luxury-dark text-luxury-gold py-5 rounded-2xl font-bold text-lg shadow-2xl flex items-center justify-center gap-4 hover:bg-black transition-all transform hover:-translate-y-1 overflow-hidden relative group">
                                    <span className="relative z-10 flex items-center gap-3">
                                        Request Quotation <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </span>
                                </button>
                            </Link>

                            <p className="text-center text-luxury-dark/40 text-[10px] uppercase tracking-widest mt-8 font-medium">
                                * Bespoke menus crafted upon request
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailPage;
