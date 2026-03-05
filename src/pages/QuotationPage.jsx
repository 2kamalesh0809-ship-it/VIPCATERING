import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Mail, MapPin, Calendar, Users, Utensils, Send, CheckCircle2, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const QuotationPage = () => {
    const navigate = useNavigate();
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        eventDate: '',
        eventType: 'Wedding',
        guestCount: ''
    });

    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem('selectedMenuItems') || '[]');
        if (savedItems.length === 0) {
            navigate('/menu');
        }
        setSelectedItems(savedItems);
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Save to Firestore
            const quotationData = {
                customer: formData,
                selectedItems,
                status: 'pending',
                createdAt: serverTimestamp()
            };

            await addDoc(collection(db, 'quotations'), quotationData);

            // 2. Group items by category and format for EmailJS
            const groupedItems = selectedItems.reduce((acc, item) => {
                if (!acc[item.category]) acc[item.category] = [];
                acc[item.category].push(item);
                return acc;
            }, {});

            const menuList = Object.entries(groupedItems).map(([category, items]) => {
                const itemLines = items.map((item, index) =>
                    `${index + 1}) ${item.name}`
                ).join('\n');
                return `${category.toUpperCase()}:\n${itemLines}`;
            }).join('\n\n');

            const templateParams = {
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                event_type: formData.eventType.toUpperCase(),
                event_date: new Date(formData.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
                guest_count: formData.guestCount,
                address: formData.address,
                message: menuList, // We use 'message' now for the items
                to_email: 'vipcateringservice1@gmail.com'
            };

            await emailjs.send(
                'service_skz1j45',
                'template_a88e5om',
                templateParams,
                'Jr3WN8l0RSvHVY8tV'
            );

            // 3. Clear selection
            localStorage.removeItem('selectedMenuItems');

            setSuccess(true);

            // 4. Redirect to WhatsApp with a pre-filled message
            const whatsappNumber = '918124142113';
            const encodedMessage = encodeURIComponent(
                `*New Quotation Request*\n\n` +
                `*Name:* ${formData.fullName}\n` +
                `*Event:* ${formData.eventType}\n` +
                `*Date:* ${formData.eventDate}\n` +
                `*Guests:* ${formData.guestCount}\n\n` +
                `*Menu Items Selection:*\n${menuList}`
            );

            // Small delay to let the success state render before opening WhatsApp
            setTimeout(() => {
                window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
                navigate('/');
            }, 3000);
        } catch (err) {
            setError('Failed to send quotation. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-[#f9fbff] to-[#eef3f9]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full p-12 rounded-[3rem] bg-white border border-gray-100 text-center shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                >
                    <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                        <CheckCircle2 size={48} className="text-green-500" />
                    </div>
                    <h2 className="text-3xl  font-bold text-[#1a1a1a] mb-4">Quotation Sent!</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Your gourmet selection has been received. Our catering specialist will contact you within <span className="text-primary font-bold">30 minutes</span> with a personalized quote.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        className="w-full py-4 rounded-xl font-bold bg-[#C9A227] text-black hover:bg-[#b08d22] transition-colors shadow-lg shadow-primary/20"
                    >
                        Return Home
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 px-6 min-h-screen bg-gradient-to-b from-[#f9fbff] to-[#eef3f9] relative overflow-hidden">
            {/* Blurred Decorative Shapes */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-400/5 rounded-full blur-[80px]" />
                <div className="absolute -bottom-24 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/menu')}
                    className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Menu Selection
                </motion.button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Quotation Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl  font-bold text-[#1a1a1a] mb-4">
                            Event <span className="text-primary italic">Details</span>
                        </h1>
                        <p className="text-gray-600 mb-10">Please provide your contact and event information to receive a detailed quotation.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                                        <User size={16} className="text-primary" /> Full Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.fullName}
                                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                        className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-300 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                                        <Phone size={16} className="text-primary" /> Phone Number
                                    </label>
                                    <input
                                        required
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-300 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                                    <Mail size={16} className="text-primary" /> Email Address
                                </label>
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-300 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                                    <MapPin size={16} className="text-primary" /> Event Location Address
                                </label>
                                <textarea
                                    required
                                    rows="3"
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-300 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none placeholder:text-gray-400"
                                    placeholder="Enter full address of the venue"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                                        <Calendar size={16} className="text-primary" /> Event Date
                                    </label>
                                    <input
                                        required
                                        type="date"
                                        value={formData.eventDate}
                                        onChange={e => setFormData({ ...formData, eventDate: e.target.value })}
                                        className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-300 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                                        <Users size={16} className="text-primary" /> Expected Guests
                                    </label>
                                    <input
                                        required
                                        type="number"
                                        value={formData.guestCount}
                                        onChange={e => setFormData({ ...formData, guestCount: e.target.value })}
                                        className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-300 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-gray-400"
                                        placeholder="E.g. 500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2">
                                    <Utensils size={16} className="text-primary" /> Event Type
                                </label>
                                <select
                                    value={formData.eventType}
                                    onChange={e => setFormData({ ...formData, eventType: e.target.value })}
                                    className="w-full px-5 py-4 rounded-2xl bg-white border border-gray-300 text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                                >
                                    <option>Wedding</option>
                                    <option>Engagement</option>
                                    <option>Corporate Event</option>
                                    <option>Birthday Party</option>
                                    <option>Private Celebration</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-500 text-sm"
                                    >
                                        <AlertCircle size={18} /> {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-5 rounded-2xl font-bold bg-[#C9A227] text-black hover:bg-[#b08d22] transition-colors flex items-center justify-center gap-3 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={24} /> Sending Quotation...
                                    </>
                                ) : (
                                    <>
                                        <Send size={24} /> Generate My Quotation
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Selected Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:pl-12 lg:border-l border-gray-200"
                    >
                        <div className="sticky top-32">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl  font-bold text-[#1a1a1a]">Selected <span className="text-primary italic">Menu</span></h2>
                                <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                                    {selectedItems.length} Items Selected
                                </span>
                            </div>

                            <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                                {['Beverages', 'Starters', 'Main Course', 'Desserts', 'Live Counters', 'Serving'].map((category) => {
                                    const itemsInCategory = selectedItems.filter(item => item.category === category);
                                    if (itemsInCategory.length === 0) return null;

                                    return (
                                        <div key={category} className="mb-8">
                                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A227] pb-3 mb-5 flex items-center gap-4">
                                                <span className="w-6 h-0.5 bg-[#C9A227] rounded-full"></span>
                                                {category}
                                                <span className="flex-1 h-px bg-gradient-to-r from-[#C9A227]/30 to-transparent"></span>
                                            </h3>
                                            <div className="grid gap-3.5">
                                                {itemsInCategory.map((item, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: idx * 0.05, duration: 0.4 }}
                                                        className="p-4 md:p-5 rounded-2xl bg-white border border-[#C9A227]/10 flex items-center justify-between group hover:border-[#C9A227]/50 transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(201,162,39,0.12)] hover:-translate-y-1"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className={`flex items-center justify-center w-7 h-7 rounded-lg border-2 ${item.veg ? 'border-green-500/30 bg-green-50' : 'border-red-500/30 bg-red-50'} group-hover:scale-110 transition-transform duration-300`}>
                                                                <div className={`w-2.5 h-2.5 rounded-full ${item.veg ? 'bg-green-500' : 'bg-red-500'} shadow-sm`} />
                                                            </div>
                                                            <span className="text-gray-800 font-bold text-sm md:text-base group-hover:text-[#C9A227] transition-colors duration-300">{item.name}</span>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-8 p-6 rounded-[2rem] bg-primary/5 border border-primary/10">
                                <p className="text-sm text-gray-500 italic text-center">
                                    "Our chefs will use this selection as a baseline for your customized culinary journey."
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default QuotationPage;
