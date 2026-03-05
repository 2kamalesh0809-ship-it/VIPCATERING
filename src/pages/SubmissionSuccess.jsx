import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Calendar, User, Phone, Mail, MessageSquare, ArrowLeft, Home, PartyPopper } from 'lucide-react';

const SubmissionSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state?.formData;

    // Redirect if no data is present (direct access to the URL)
    useEffect(() => {
        if (!formData) {
            navigate('/contact');
        }
    }, [formData, navigate]);

    if (!formData) return null;

    return (
        <div className="pt-32 pb-20 px-6 min-h-screen bg-background relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute -top-48 -left-48 w-full h-full bg-primary/10 rounded-full blur-[120px]"
                />
            </div>

            <div className="container mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, delay: 0.2 }}
                        className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-luxury-glow"
                    >
                        <CheckCircle2 size={48} className="text-primary" />
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl  font-bold text-white mb-6">
                        Enquiry <span className="text-primary italic">Received!</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Thank you for choosing <span className="text-primary font-bold">VIP Catering</span>. Your details have been sent to our team, and we will contact you within <span className="text-white font-bold underline decoration-primary underline-offset-4">30 minutes</span>.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Summary Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="card-luxury p-8 md:p-10 border border-primary/20 shadow-2xl relative"
                    >
                        <div className="absolute top-4 right-8 opacity-10 pointer-events-none">
                            <PartyPopper size={120} className="text-primary" />
                        </div>

                        <h2 className="text-2xl  font-bold text-white mb-8 border-b border-primary/10 pb-4">Submission Summary</h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <User size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Full Name</p>
                                    <p className="text-white text-lg font-medium">{formData.name}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Phone Number</p>
                                    <p className="text-white text-lg font-medium">{formData.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Email Address</p>
                                    <p className="text-white text-lg font-medium">{formData.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Event Details</p>
                                    <p className="text-white text-lg font-medium">
                                        {formData.eventType} — <span className="text-primary">{new Date(formData.eventDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Message Card */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="card-luxury p-8 md:p-10 border border-primary/20 shadow-2xl h-full"
                        >
                            <h2 className="text-2xl  font-bold text-white mb-6 flex items-center gap-3">
                                <MessageSquare className="text-primary" size={24} />
                                Your Message
                            </h2>
                            <div className="p-6 rounded-2xl bg-black/40 border border-primary/10 min-h-[150px]">
                                <p className="text-gray-300 leading-relaxed italic">
                                    "{formData.message}"
                                </p>
                            </div>
                        </motion.div>

                        {/* Navigation Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <Link
                                to="/"
                                className="flex items-center justify-center gap-2 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
                            >
                                <Home size={18} /> Home
                            </Link>
                            <button
                                onClick={() => navigate('/contact')}
                                className="flex items-center justify-center gap-2 py-4 rounded-xl bg-gold-gradient text-black font-bold hover:scale-105 transition-all shadow-lg"
                            >
                                <ArrowLeft size={18} /> Back
                            </button>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-20 pt-10 border-t border-primary/10 text-center"
                >
                    <p className="text-gray-500 text-sm">
                        A confirmation email has also been sent to <span className="text-primary">{formData.email}</span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default SubmissionSuccess;
