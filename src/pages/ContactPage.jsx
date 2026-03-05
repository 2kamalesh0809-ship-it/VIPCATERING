import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageCircle, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ContactPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        eventType: 'Wedding Catering',
        eventDate: '',
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Save to Firebase (keeping data record)
            await addDoc(collection(db, 'enquiries'), {
                ...formData,
                status: 'pending',
                createdAt: serverTimestamp()
            });

            // 2. Send Email via EmailJS (The free way)
            const templateParams = {
                name: formData.name,
                email: formData.email, // This fills {{email}} in your template
                phone: formData.phone,
                event_type: formData.eventType,
                event_date: formData.eventDate,
                message: formData.message,
                to_email: 'vipcateringservice1@gmail.com'
            };

            await emailjs.send(
                'service_skz1j45',
                'template_is30vuj',
                templateParams,
                'Jr3WN8l0RSvHVY8tV'
            );

            // Navigate to success page with data
            navigate('/submission-success', { state: { formData } });

            setFormData({
                name: '',
                phone: '',
                email: '',
                eventType: 'Wedding Catering',
                eventDate: '',
                message: ''
            });
        } catch (err) {
            setError('Failed to send message. Please try again or call us directly.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-20 md:pt-28 bg-background">
            {/* Hero Header */}
            <section className="pt-4 pb-6 md:pb-12 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-2 md:mb-3 block">Get In Touch</span>
                    <h1 className="text-2xl md:text-5xl font-bold text-white mb-3 md:mb-6 leading-tight">
                        Let's Create Something <span className="text-primary italic">Memorable</span>
                    </h1>
                    <p className="text-sm md:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed opacity-80">
                        We're here to help you plan the perfect culinary experience for your special event.
                    </p>
                </motion.div>
            </section>

            {/* Contact Grid */}
            <section className="pb-20 md:pb-28 px-4 md:px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="card-luxury p-8 md:p-12 border border-primary/20 shadow-2xl"
                        >
                            <h2 className="text-3xl  font-bold text-white mb-8">Send Us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-200 mb-2">Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Your Full Name"
                                            className="w-full px-6 py-4 rounded-xl bg-black/40 border border-primary/10 text-white placeholder:text-gray-500 focus:border-primary focus:bg-black/60 outline-none transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-200 mb-2">Phone</label>
                                        <input
                                            required
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+91 00000 00000"
                                            className="w-full px-6 py-4 rounded-xl bg-black/40 border border-primary/10 text-white placeholder:text-gray-500 focus:border-primary focus:bg-black/60 outline-none transition-all duration-300"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-200 mb-2">Email</label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="hello@example.com"
                                        className="w-full px-6 py-4 rounded-xl bg-black/40 border border-primary/10 text-white placeholder:text-gray-500 focus:border-primary focus:bg-black/60 outline-none transition-all duration-300"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-200 mb-2">Event Type</label>
                                        <select
                                            value={formData.eventType}
                                            onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                                            className="w-full px-6 py-4 rounded-xl bg-black/40 border border-primary/10 text-white focus:border-primary focus:bg-black/60 outline-none transition-all duration-300 appearance-none"
                                        >
                                            <option className="bg-[#1a1a1a]">Wedding Catering</option>
                                            <option className="bg-[#1a1a1a]">Corporate Event</option>
                                            <option className="bg-[#1a1a1a]">Birthday Party</option>
                                            <option className="bg-[#1a1a1a]">Private Function</option>
                                            <option className="bg-[#1a1a1a]">Other Ceremony</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-200 mb-2">Event Date</label>
                                        <input
                                            required
                                            type="date"
                                            value={formData.eventDate}
                                            onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                                            className="w-full px-6 py-4 rounded-xl bg-black/40 border border-primary/10 text-white focus:border-primary focus:bg-black/60 outline-none transition-all duration-300 [color-scheme:dark]"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-200 mb-2">Message</label>
                                    <textarea
                                        required
                                        rows="4"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Tell us about your requirements..."
                                        className="w-full px-6 py-4 rounded-xl bg-black/40 border border-primary/10 text-white placeholder:text-gray-500 focus:border-primary focus:bg-black/60 outline-none transition-all duration-300 resize-none"
                                    ></textarea>
                                </div>

                                {error && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-500 text-sm">
                                        <AlertCircle size={18} /> {error}
                                    </div>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gold-gradient text-black py-5 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <Send size={20} />
                                    )}
                                    {loading ? 'Sending...' : 'Submit Enquiry'}
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Contact Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-12 lg:pl-12"
                        >
                            <div>
                                <h2 className="text-4xl  font-bold text-white mb-8">Reach Out Direct</h2>
                                <div className="space-y-8">
                                    <div className="flex items-start gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-primary">Phone</h4>
                                            <p className="text-white text-lg">+91 81241 42113 (WhatsApp)</p>
                                            <p className="text-white text-lg">+91 93452 10538</p>
                                            <p className="text-gray-400 text-sm">Mon - Sun, 9am - 9pm</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-primary">Email</h4>
                                            <p className="text-white text-lg">vipcateringservice1@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <MapPin size={24} />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <h4 className="font-bold text-lg text-primary">Location</h4>
                                            <p className="text-white text-lg mb-5 leading-relaxed">First Floor, Second Block, PC 1C, <br />Mogappair West, Ambattur Industrial Estate, <br />Chennai - 600037</p>

                                            <a
                                                href="https://www.google.com/maps/place/VIP+Catering%E2%84%A2+Chennai/@13.0822486,80.1662888,17z/data=!3m1!4b1!4m6!3m5!1s0x3a5263a692346ad1:0xc2972725b746a5e!8m2!3d13.0822434!4d80.1688637!16s%2Fg%2F11wtpm4rjh?entry=ttu&g_ep=EgoyMDI2MDMwMS4xIKXMDSoASAFQAw%3D%3D"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block relative w-full h-32 md:h-40 rounded-2xl overflow-hidden shadow-lg group border border-[#C9A227]/20"
                                            >
                                                <iframe
                                                    src="https://maps.google.com/maps?q=VIP%20Catering%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                                    className="w-full h-full object-cover scale-[1.2] group-hover:scale-105 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                                                    style={{ border: 0 }}
                                                    allowFullScreen=""
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    title="Location Map"
                                                />
                                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
                                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                    <span className="bg-background-soft/90 backdrop-blur-md border border-[#C9A227]/50 text-[#C9A227] px-6 py-2.5 rounded-full font-bold shadow-xl flex items-center gap-2 transform group-hover:scale-105 transition-all duration-300">
                                                        <MapPin size={18} /> Open in Maps
                                                    </span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <motion.a
                                    href="tel:+918124142113"
                                    whileHover={{ y: -5 }}
                                    className="flex items-center justify-center gap-3 bg-accent-dark text-white py-4 rounded-2xl font-bold shadow-lg"
                                >
                                    <Phone size={20} /> Call Now
                                </motion.a>
                                <motion.a
                                    href="https://wa.me/918124142113"
                                    whileHover={{ y: -5 }}
                                    className="flex items-center justify-center gap-3 bg-green-600 text-white py-4 rounded-2xl font-bold shadow-lg"
                                >
                                    <MessageCircle size={20} /> WhatsApp Us
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ContactPage;
