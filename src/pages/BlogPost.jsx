import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const BlogPost = ({ title, date, author, readTime, image, seoAlt, content }) => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24 md:pt-32 pb-20 bg-background-soft min-h-screen relative overflow-hidden">
            <div className="bg-luxury-blobs absolute inset-0 mix-blend-multiply opacity-40 z-0"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/blog')}
                    className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs mb-10 hover:gap-4 transition-all"
                >
                    <ArrowLeft size={16} /> Back to Journal
                </motion.button>

                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <div className="flex flex-wrap items-center gap-6 text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">
                            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" /> {date}</span>
                            <span className="flex items-center gap-1.5"><User size={14} className="text-primary" /> {author}</span>
                            <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> {readTime}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter leading-tight">
                            {title}
                        </h1>
                    </motion.div>

                    {/* Featured Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 mb-16"
                    >
                        <img src={image} alt={seoAlt || title} className="w-full h-full object-cover" />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-12"
                    >
                        {content.map((section, i) => (
                            <div key={i} className="group">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 group-hover:text-primary transition-colors flex items-start gap-4">
                                    <span className="text-primary opacity-50 font-serif italic text-4xl leading-none">0{i + 1}</span>
                                    {section.heading}
                                </h2>
                                <p className="text-xl text-gray-400 font-light leading-relaxed pl-12">
                                    {section.text}
                                </p>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-24 p-12 rounded-[3rem] bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border border-primary/20 text-center"
                    >
                        <h3 className="text-3xl font-bold text-white mb-4">Planning a VIP Event?</h3>
                        <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg font-light">
                            Let our experts handle the culinary excellence while you focus on your guests.
                        </p>
                        <Link to="/contact">
                            <button className="bg-gold-gradient text-black px-12 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-all flex items-center gap-3 mx-auto">
                                <Send size={20} /> Get a Free Quote
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
