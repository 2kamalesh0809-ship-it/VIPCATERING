import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
    const blogs = [
        {
            title: "Top 10 Wedding Catering Ideas for Chennai Weddings",
            excerpt: "Discover the latest trends in wedding catering, from live traditional counters to modern fusion desserts that will wow your guests.",
            date: "March 15, 2024",
            author: "Kumar S.",
            image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000",
            path: "/blog/wedding-catering-ideas-chennai"
        },
        {
            title: "Ultimate Guide to Corporate Catering Menu Selection",
            excerpt: "Planning a corporate event? Learn how to choose a menu that balances professional taste with networking-friendly food options.",
            date: "February 28, 2024",
            author: "Ravi M.",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000",
            path: "/blog/corporate-catering-menu-guide"
        },
        {
            title: "How to Choose the Best Caterer in Chennai: A Checklist",
            excerpt: "Don't settle for less! Our comprehensive checklist helps you evaluate catering quality, hygiene, and service before booking.",
            date: "February 10, 2024",
            author: "Janani R.",
            image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000",
            path: "/blog/how-to-choose-best-caterer-chennai"
        }
    ];

    return (
        <div className="pt-24 md:pt-32 pb-20 bg-background-soft min-h-screen relative overflow-hidden">
            <div className="bg-luxury-blobs absolute inset-0 mix-blend-multiply opacity-40 z-0"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-4xl mx-auto mb-20"
                >
                    <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">VIP Insights</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">
                        Catering <span className="text-primary italic">Journal</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-light leading-relaxed">
                        Expert tips, trends, and stories from the world of premium hospitality and luxury catering in Chennai.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {blogs.map((blog, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group bg-[#141414] rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 shadow-2xl flex flex-col h-full"
                        >
                            <Link to={blog.path} className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                                <div className="absolute top-6 right-6">
                                    <div className="bg-primary/90 text-black p-3 rounded-full shadow-lg">
                                        <Sparkles size={16} />
                                    </div>
                                </div>
                            </Link>

                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">
                                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {blog.date}</span>
                                    <span className="flex items-center gap-1.5"><User size={14} /> {blog.author}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors line-clamp-2">
                                    {blog.title}
                                </h2>
                                <p className="text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                                    {blog.excerpt}
                                </p>
                                <Link
                                    to={blog.path}
                                    className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all"
                                >
                                    Read Article <ArrowRight size={16} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
