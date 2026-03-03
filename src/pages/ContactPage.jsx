import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="pt-20 bg-background">
            {/* Hero Header */}
            <section className="py-24 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Get In Touch</span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-accent-dark mb-6">
                        Let's Create Something <span className="text-primary italic">Memorable</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
                        We're here to help you plan the perfect culinary experience for your special event.
                    </p>
                </motion.div>
            </section>

            {/* Contact Grid */}
            <section className="pb-24 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100"
                        >
                            <h2 className="text-3xl font-display font-bold text-accent-dark mb-8">Send Us a Message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-accent-dark mb-2">Name</label>
                                        <input
                                            type="text"
                                            placeholder="Your Full Name"
                                            className="w-full px-6 py-4 rounded-xl bg-background-soft border border-transparent focus:border-primary focus:bg-white outline-none transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-accent-dark mb-2">Phone</label>
                                        <input
                                            type="tel"
                                            placeholder="+91 00000 00000"
                                            className="w-full px-6 py-4 rounded-xl bg-background-soft border border-transparent focus:border-primary focus:bg-white outline-none transition-all duration-300"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-accent-dark mb-2">Email</label>
                                    <input
                                        type="email"
                                        placeholder="hello@example.com"
                                        className="w-full px-6 py-4 rounded-xl bg-background-soft border border-transparent focus:border-primary focus:bg-white outline-none transition-all duration-300"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-accent-dark mb-2">Event Type</label>
                                        <select className="w-full px-6 py-4 rounded-xl bg-background-soft border border-transparent focus:border-primary focus:bg-white outline-none transition-all duration-300 appearance-none">
                                            <option>Wedding Catering</option>
                                            <option>Corporate Event</option>
                                            <option>Birthday Party</option>
                                            <option>Private Function</option>
                                            <option>Other Ceremony</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-accent-dark mb-2">Event Date</label>
                                        <input
                                            type="date"
                                            className="w-full px-6 py-4 rounded-xl bg-background-soft border border-transparent focus:border-primary focus:bg-white outline-none transition-all duration-300"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-accent-dark mb-2">Message</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Tell us about your requirements..."
                                        className="w-full px-6 py-4 rounded-xl bg-background-soft border border-transparent focus:border-primary focus:bg-white outline-none transition-all duration-300 resize-none"
                                    ></textarea>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gold-gradient text-white py-5 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                                >
                                    <Send size={20} /> Submit Enquiry
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
                                <h2 className="text-4xl font-display font-bold text-accent-dark mb-8">Reach Out Direct</h2>
                                <div className="space-y-8">
                                    <div className="flex items-start gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-accent-dark">Phone</h4>
                                            <p className="text-gray-500 text-lg">+91 81241 42113 (WhatsApp)</p>
                                            <p className="text-gray-500 text-lg">+91 93452 10538</p>
                                            <p className="text-gray-400 text-sm">Mon - Sun, 9am - 9pm</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-accent-dark">Email</h4>
                                            <p className="text-gray-500 text-lg">hello@vipcatering.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-accent-dark">Location</h4>
                                            <p className="text-gray-500 text-lg">First Floor, Second Block, PC 1C, <br />Mogappair West, Ambattur Industrial Estate, <br />Chennai - 600037</p>
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
