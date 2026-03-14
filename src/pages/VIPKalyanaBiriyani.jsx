import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const BUCKET_ITEMS = [
    { id: 'chicken', title: 'Chicken Bucket', serves: 5, price: 899, img: '/chickkenbiriyani.jpg' },
    { id: 'mutton', title: 'Mutton Bucket', serves: 5, price: 1099, img: '/muttonbiriyani.jpg' },
    { id: 'veg', title: 'Veg Bucket', serves: 5, price: 699, img: '/vegbiriyani.jpg' },
    { id: 'family', title: 'Family Pack', serves: 10, price: 1799, img: '/kalyana-biriyani.jpg' },
    { id: 'party', title: 'Party Pack', serves: 20, price: 3499, img: '/Royal Hyderabadi Biryani – Authentic Dum Style Perfection.jpg' },
];

const VIPKalyanaBiriyani = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        eventDate: '',
        location: '',
        quantity: ''
    });

    const addToCart = (id) => {
        setCart(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
    };

    const removeFromCart = (id) => {
        setCart(prev => {
            const newCart = { ...prev };
            if (newCart[id] > 1) {
                newCart[id] -= 1;
            } else {
                delete newCart[id];
            }
            return newCart;
        });
    };

    const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
        const item = BUCKET_ITEMS.find(item => item.id === id);
        return sum + (item.price * qty);
    }, 0);

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        // Basic validation
        if (!formData.fullName || !formData.phone || !formData.eventDate) {
            setError("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const itemsInCart = Object.entries(cart).filter(([_, qty]) => qty > 0);
            let orderSummaryText = "";

            if (itemsInCart.length > 0) {
                orderSummaryText = itemsInCart.map(([id, qty]) => {
                    const item = BUCKET_ITEMS.find(i => i.id === id);
                    return `${item.title}: ${qty} pack(s)`;
                }).join(', ');
            }

            const bulkOrderData = {
                customer: {
                    name: formData.fullName,
                    phone: formData.phone,
                    eventDate: formData.eventDate,
                    location: formData.location,
                    requestedQuantity: formData.quantity
                },
                cart: itemsInCart.map(([id, qty]) => {
                    const item = BUCKET_ITEMS.find(i => i.id === id);
                    return { id, title: item.title, quantity: qty };
                }),
                totalPrice,
                status: 'pending',
                type: 'bulk_order',
                createdAt: serverTimestamp()
            };

            // 1. Save to Firebase
            await addDoc(collection(db, 'bulk_orders'), bulkOrderData);

            // 2. Send Email via EmailJS
            const templateParams = {
                name: formData.fullName,
                phone: formData.phone,
                event_type: 'BULK BIRIYANI ORDER',
                event_date: formData.eventDate,
                location: formData.location,
                message: `Bulk Order Request:\nItems: ${orderSummaryText}\nApprox Quantity: ${formData.quantity}\nTotal Value: ₹${totalPrice}\nAddress: ${formData.location}`,
                to_email: 'vipcateringservice1@gmail.com'
            };

            await emailjs.send(
                'service_skz1j45',
                'template_is30vuj', // Using the contact template as it's generic
                templateParams,
                'Jr3WN8l0RSvHVY8tV'
            );

            setSuccess(true);

            // 3. Open WhatsApp after successful email/db save
            const phoneNumber = "918124142113";
            let whatsappMsg = `*New Bulk Biriyani Order*\n\n`;
            whatsappMsg += `*Name:* ${formData.fullName}\n`;
            whatsappMsg += `*Phone:* ${formData.phone}\n`;
            whatsappMsg += `*Date:* ${formData.eventDate}\n`;
            whatsappMsg += `*Location:* ${formData.location}\n`;
            whatsappMsg += `*Quantity:* ${formData.quantity}\n\n`;

            if (itemsInCart.length > 0) {
                whatsappMsg += `*Requested Items:*\n`;
                itemsInCart.forEach(([id, qty]) => {
                    const item = BUCKET_ITEMS.find(i => i.id === id);
                    whatsappMsg += `- ${item.title}: ${qty} pack(s)\n`;
                });
                whatsappMsg += `\n*Total Amount:* ₹${totalPrice.toLocaleString('en-IN')}`;
            }

            setTimeout(() => {
                window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
            }, 2000);

        } catch (err) {
            console.error("Submission error:", err);
            setError("Something went wrong. Please try again or call us directly.");
        } finally {
            setLoading(false);
        }
    };

    const handleWhatsAppRedirect = (e) => {
        if (e) e.preventDefault();
        // Fallback or generic redirection if needed, but mainly we use handleSubmit now
        handleSubmit(e);
    };

    const CornerOrnament = ({ className }) => (
        <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0V200C0 110.457 71.6344 38.8225 161.178 38.8225H200V0H0Z" fill="#D4A017" fillOpacity="0.1" />
            <path d="M20 0C20 80 80 140 160 140" stroke="#D4A017" strokeWidth="1" strokeOpacity="0.2" />
            <path d="M40 0C40 60 60 80 120 80" stroke="#D4A017" strokeWidth="0.5" strokeOpacity="0.2" />
            <path d="M0 20C80 20 140 80 140 160" stroke="#D4A017" strokeWidth="1" strokeOpacity="0.2" />
            <circle cx="20" cy="20" r="2" fill="#D4A017" fillOpacity="0.3" />
            <circle cx="40" cy="40" r="1.5" fill="#D4A017" fillOpacity="0.2" />
        </svg>
    );

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6 bg-white">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full p-12 rounded-[2rem] bg-[#F7F0E2] border border-[#D4A017]/30 text-center shadow-xl"
                >
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-green-600" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-[#4A2C2A] mb-4">Order Received!</h2>
                    <p className="text-[#6d4b47] mb-8 leading-relaxed">
                        Your bulk order request has been sent successfully. We are redirecting you to WhatsApp to finalize the details.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        className="w-full py-4 rounded-xl font-bold bg-[#D4A017] text-white hover:bg-[#b8860b] transition-colors shadow-lg"
                    >
                        Return Home
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="vip-kalyana-biriyani-page min-h-screen relative font-sans text-[#4A2C2A] overflow-x-hidden selection:bg-[#D4A017]/30 pt-24 md:pt-32">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Raleway:wght@300;400;500;600;700&display=swap');
                    
                    .vip-kalyana-biriyani-page {
                        min-height: 100vh;
                        position: relative;
                        z-index: 0;
                        background-color: #ffffff;
                    }
                    .vip-kalyana-biriyani-page h1, .vip-kalyana-biriyani-page h2, .vip-kalyana-biriyani-page h3, .vip-kalyana-biriyani-page .font-serif {
                        font-family: 'Cinzel', serif;
                    }
                    .vip-kalyana-biriyani-page p, .vip-kalyana-biriyani-page span, .vip-kalyana-biriyani-page div, .vip-kalyana-biriyani-page label, .vip-kalyana-biriyani-page input, .vip-kalyana-biriyani-page select, .vip-kalyana-biriyani-page button {
                        font-family: 'Raleway', sans-serif;
                    }
                    .bb-header-bar {
                        background: url('https://www.transparenttextures.com/patterns/arabesque.png'), linear-gradient(to right, #D4A017, #fde08b, #D4A017);
                        border-bottom: 2px solid #b8860b;
                    }
                    .bb-divider-ornament {
                        width: 100%;
                        max-width: 400px;
                        height: 20px;
                        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><path d="M0 10 Q25 0 50 10 T100 10" fill="transparent" stroke="%23D4A017" stroke-width="1.5"/></svg>');
                        background-repeat: repeat-x;
                        background-size: 100px 20px;
                        margin: 20px auto;
                        opacity: 0.7;
                    }
                    .bb-card {
                        background: #FAF3E0;
                        border: 1px solid #D4A017;
                        border-radius: 12px;
                        box-shadow: 0 8px 16px rgba(74, 44, 42, 0.1);
                        transition: all 0.3s ease;
                        position: relative;
                        padding: 0;
                        overflow: hidden;
                    }
                    .bb-card:hover {
                        transform: translateY(-6px);
                        box-shadow: 0 16px 30px rgba(0,0,0,0.12);
                    }
                    .bb-card-img-container {
                        position: relative;
                        width: 100%;
                        height: 200px;
                        overflow: hidden;
                        padding: 10px 10px 0 10px;
                    }
                    .bb-card-img-container img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        border-radius: 10px;
                        border: 4px solid #fff;
                        box-shadow: 0 6px 15px rgba(0,0,0,0.1);
                        transition: transform 0.5s ease;
                    }
                    .bb-card:hover .bb-card-img-container img {
                        transform: scale(1.08);
                    }
                    .bb-gold-btn {
                        background: linear-gradient(135deg, #fde08b, #D4A017);
                        color: #4A2C2A;
                        font-weight: 600;
                        border-radius: 6px;
                        transition: all 0.25s ease;
                        border: 1px solid rgba(212, 160, 23, 0.5);
                    }
                    .bb-gold-btn:hover:not(:disabled) {
                        box-shadow: 0 8px 20px rgba(212,160,23,0.35);
                        transform: translateY(-2px);
                    }
                    .bb-form-container {
                        background: #F7F0E2;
                        border: 1px solid #D4A017;
                        border-radius: 16px;
                        padding: 30px;
                        box-shadow: 0 12px 24px rgba(0,0,0,0.06);
                        position: relative;
                        overflow: hidden;
                    }
                    .bb-form-group {
                        margin-bottom: 18px;
                    }
                    .bb-corner-top {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 350px;
                        height: 350px;
                        pointer-events: none;
                        z-index: 1;
                    }
                    .bb-corner-bottom {
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        width: 350px;
                        height: 350px;
                        pointer-events: none;
                        z-index: 1;
                        transform: rotate(180deg);
                    }
                    .bb-order-summary {
                        position: sticky;
                        top: 120px;
                        padding: 20px;
                        border-radius: 14px;
                        transition: all 0.3s ease;
                    }
                    .bb-order-summary:hover {
                        box-shadow: 0 12px 26px rgba(0,0,0,0.1);
                    }
                    .bb-summary-divider {
                        height: 1px;
                        background: #E5C991;
                        margin: 10px 0;
                    }
                    .bb-total-price {
                        font-size: 22px;
                        font-weight: 700;
                        color: #D4A017;
                    }
                    button {
                        transition: all 0.25s ease;
                    }
                    button:hover:not(:disabled) {
                        box-shadow: 0 8px 20px rgba(212,160,23,0.35);
                        transform: translateY(-2px);
                    }
                    .bb-menu-label {
                        text-align: center;
                        font-size: 14px;
                        letter-spacing: 3px;
                        color: #B8860B;
                        margin-bottom: 20px;
                        font-family: 'Cinzel', serif;
                        font-weight: 600;
                    }
                    .bb-input {
                        background: #fff;
                        border: 1px solid #eeddae;
                        border-radius: 6px;
                        color: #4A2C2A;
                        transition: all 0.3s ease;
                    }
                    .bb-input:focus {
                        outline: none;
                        border-color: #D4A017;
                        box-shadow: 0 0 0 2px rgba(212, 160, 23, 0.2);
                    }
                    .bb-ribbon {
                        position: absolute;
                        top: 10px;
                        right: -6px;
                        background: #D4A017;
                        color: white;
                        padding: 4px 10px;
                        font-size: 10px;
                        border-radius: 4px;
                        z-index: 20;
                        font-weight: 700;
                        box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
                    }
                    .bb-featured {
                        transform: scale(1.05);
                        border: 2px solid #D4A017 !important;
                        z-index: 5;
                    }
                    .bb-featured:hover {
                        transform: scale(1.08) translateY(-6px);
                    }
                `}
            </style>



            <CornerOrnament className="bb-corner-top" />
            <CornerOrnament className="bb-corner-bottom" />

            <main className="max-w-[1200px] mx-auto px-6 py-12 relative z-10">

                {/* Titles */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#4A2C2A] mb-4">
                        VIP Kalyana Biriyani
                    </h1>
                    <p className="text-lg text-[#6d4b47] font-medium tracking-wide">
                        Order Biryani in Bulk for Parties, Events & Gatherings
                    </p>
                    <div className="bb-divider-ornament"></div>
                </div>

                {/* Menu Section Label */}
                <div className="bb-menu-label uppercase">
                    Popular Bucket Packs
                </div>

                {/* Bucket Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
                    {BUCKET_ITEMS.map((item, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={item.id}
                            className={`bb-card flex flex-col group block ${item.id === 'family' ? 'bb-featured' : ''}`}
                        >
                            {item.id === 'family' && <div className="bb-ribbon uppercase">Recommended</div>}
                            <div className="bb-card-img-container">
                                <img src={item.img} alt={item.title} />
                            </div>

                            <div className="flex-1 flex flex-col px-4 py-4 z-10">
                                <h3 className="font-serif font-bold text-[#4A2C2A] mb-1 text-base group-hover:text-[#b8860b] transition-colors">{item.title}</h3>
                                <p className="text-xs text-[#7a5a57] mb-3 font-medium italic">Serves {item.serves}</p>
                                <p className="text-xl font-bold font-serif text-[#4A2C2A] mb-4 mt-auto">₹{item.price}</p>

                                {cart[item.id] ? (
                                    <div className="grid grid-cols-3 items-center gap-2 mt-auto">
                                        <button onClick={() => removeFromCart(item.id)} className="py-2 bg-[#F6E7C1] hover:bg-[#D4A017] transition-colors rounded font-bold text-[#4A2C2A] shadow-sm">-</button>
                                        <div className="text-center font-bold">{cart[item.id]}</div>
                                        <button onClick={() => addToCart(item.id)} className="py-2 bb-gold-btn shadow-md">+</button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => addToCart(item.id)}
                                        className="w-full py-2 mt-auto bb-gold-btn text-sm uppercase tracking-wider"
                                    >
                                        + Add
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Form & Summary Section */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Bulk Order Form */}
                    <div className="flex-1 bb-form-container relative">
                        {/* Inner gold border */}
                        <div className="absolute inset-2 border border-[#D4A017]/20 rounded-xl pointer-events-none"></div>

                        <h2 className="text-2xl font-serif font-bold text-[#4A2C2A] mb-8 border-b border-[#D4A017]/50 pb-4 inline-block relative z-10">
                            Place Your Bulk Order
                        </h2>

                        <form className="relative z-10" onSubmit={handleSubmit}>
                            <div className="bb-form-group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 border-b border-[#D4A017]/10 pb-4">
                                <label className="sm:w-1/3 font-semibold text-[#4A2C2A] text-sm tracking-wide">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                    placeholder="Enter your name"
                                    className="flex-1 px-4 py-2.5 bb-input placeholder:text-[#a08f8d] text-sm"
                                />
                            </div>

                            <div className="bb-form-group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 border-b border-[#D4A017]/10 pb-4">
                                <label className="sm:w-1/3 font-semibold text-[#4A2C2A] text-sm tracking-wide">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="Enter your phone number"
                                    className="flex-1 px-4 py-2.5 bb-input placeholder:text-[#a08f8d] text-sm"
                                />
                            </div>

                            <div className="bb-form-group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 border-b border-[#D4A017]/10 pb-4">
                                <label className="sm:w-1/3 font-semibold text-[#4A2C2A] text-sm tracking-wide">Event Date</label>
                                <input
                                    required
                                    type="date"
                                    value={formData.eventDate}
                                    onChange={e => setFormData({ ...formData, eventDate: e.target.value })}
                                    className="flex-1 px-4 py-2.5 bb-input placeholder:text-[#a08f8d] text-sm"
                                />
                            </div>

                            <div className="bb-form-group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 border-b border-[#D4A017]/10 pb-4">
                                <label className="sm:w-1/3 font-semibold text-[#4A2C2A] text-sm tracking-wide">Event Location</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.location}
                                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="Enter event address"
                                    className="flex-1 px-4 py-2.5 bb-input placeholder:text-[#a08f8d] text-sm"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 pt-2">
                                <label className="sm:w-1/3 font-semibold text-[#4A2C2A] text-sm tracking-wide">Number of Buckets</label>
                                <select
                                    value={formData.quantity}
                                    onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                                    className="flex-1 px-4 py-2.5 bb-input text-sm"
                                >
                                    <option value="">Select Quantity</option>
                                    <option value="1-5">1 - 5 Buckets</option>
                                    <option value="6-10">6 - 10 Buckets</option>
                                    <option value="11-20">11 - 20 Buckets</option>
                                    <option value="20+">20+ Buckets</option>
                                </select>
                            </div>

                            {error && (
                                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded flex items-center gap-2 text-red-600 text-xs">
                                    <AlertCircle size={14} /> {error}
                                </div>
                            )}

                            <div className="pt-6 sm:pl-[calc(33.333%+1.5rem)]">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-10 py-3.5 bb-gold-btn text-sm uppercase tracking-widest shadow-lg w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-70"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" /> Processing...
                                        </>
                                    ) : (
                                        "Place Bulk Order"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary Panel */}
                    <div className="w-full lg:w-[380px]">
                        <div className="bb-order-summary bb-form-container relative">
                            {/* Inner gold border */}
                            <div className="absolute inset-2 border border-[#D4A017]/20 rounded-xl pointer-events-none"></div>

                            <h3 className="text-xl font-serif font-bold text-[#4A2C2A] mb-6 border-b border-[#D4A017]/50 pb-4 relative z-10">
                                Order Summary
                            </h3>

                            <div className="space-y-2 mb-8 relative z-10">
                                <div className="flex justify-between items-center text-[#4A2C2A] font-medium text-base">
                                    <span>Items in Cart:</span>
                                    <span className="font-bold">{totalItems}</span>
                                </div>
                                <div className="bb-summary-divider"></div>
                                <div className="flex justify-between items-center text-[#4A2C2A] text-lg pt-2 mt-2">
                                    <span className="font-semibold text-base">Total Amount:</span>
                                    <span className="bb-total-price">₹{totalPrice.toLocaleString('en-IN')}.00</span>
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={totalItems === 0 || loading}
                                className={`w-full py-3.5 bb-gold-btn text-sm uppercase tracking-widest relative z-10 ${totalItems > 0 && !loading ? 'shadow-lg cursor-pointer' : 'opacity-60 cursor-not-allowed grayscale-[0.5] shadow-none hover:transform-none'}`}
                            >
                                {loading ? "Processing..." : "Proceed to Checkout"}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VIPKalyanaBiriyani;
