import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';
import CTASection from '../sections/CTASection';

const BlogPost = ({ title, date, author, readTime, content, image, seoAlt }) => {
    return (
        <div className="pt-24 bg-background-soft min-h-screen text-slate-100 pb-20">
            <div className="container mx-auto px-6">
                <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors mb-8 group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Blog
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tighter">
                        {title}
                    </h1>

                    <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-12 border-b border-white/10 pb-8">
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-primary" /> {date}
                        </div>
                        <div className="flex items-center gap-2">
                            <User size={16} className="text-primary" /> {author}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-primary" /> {readTime}
                        </div>
                    </div>

                    <div className="rounded-[2.5rem] overflow-hidden mb-16 aspect-video shadow-2xl">
                        <img src={image} alt={seoAlt} className="w-full h-full object-cover" />
                    </div>

                    <div className="prose prose-invert prose-gold max-w-none">
                        {content.map((block, idx) => (
                            <div key={idx} className="mb-12 last:mb-0">
                                {block.heading && <h2 className="text-3xl font-bold text-primary mb-6">{block.heading}</h2>}
                                <div className="text-gray-300 leading-[1.8] text-lg space-y-6 whitespace-pre-line font-light">
                                    {block.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 p-8 md:p-12 bg-[#141414] rounded-[2rem] border border-[#C9A227]/20 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Did you find this helpful?</h3>
                            <p className="text-gray-400">Share this article with someone planning an event!</p>
                        </div>
                        <button className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all flex items-center gap-2 font-bold tracking-widest uppercase text-sm">
                            <Share2 size={18} /> Share Article
                        </button>
                    </div>
                </motion.div>
            </div>

            <div className="mt-32">
                <CTASection />
            </div>
        </div>
    );
};

export default BlogPost;
