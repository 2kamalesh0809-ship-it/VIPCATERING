import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const BlogPage = () => {
    const blogPosts = [
        {
            id: 1,
            title: "Top 10 Wedding Catering Ideas in Chennai for 2026",
            excerpt: "Discover the latest trends in wedding feasts, from fusion live counters to sustainable menus...",
            date: "Mar 11, 2026",
            readTime: "8 min",
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
            path: "/blog/wedding-catering-ideas-chennai"
        },
        {
            id: 2,
            title: "Building the Perfect Corporate Catering Menu",
            excerpt: "Professional advice on planning menus for board meetings, seminars, and corporate galas...",
            date: "Mar 11, 2026",
            readTime: "6 min",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2070",
            path: "/blog/corporate-catering-menu-guide"
        },
        {
            id: 3,
            title: "How to Choose the Best Caterer in Chennai",
            excerpt: "A comprehensive checklist to help you select a reliable catering partner for your big day...",
            date: "Mar 11, 2026",
            readTime: "7 min",
            image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070",
            path: "/blog/how-to-choose-best-caterer-chennai"
        }
    ];

    return (
        <div className="pt-32 bg-background-soft min-h-screen pb-20">
            <div className="container mx-auto px-6">
                <header className="max-w-3xl mb-20">
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">The VIP Journal</span>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                        Culinary <span className="text-primary italic">Insights</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-light">
                        Expert tips, trends, and guides for planning the perfect event in Chennai.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group flex flex-col h-full bg-[#141414] rounded-[2rem] overflow-hidden border border-white/5 hover:border-primary/20 transition-all shadow-xl"
                        >
                            <div className="h-64 overflow-hidden">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime} read</span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                                    {post.title}
                                </h2>
                                <p className="text-gray-400 font-light mb-8 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <Link to={post.path} className="mt-auto flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
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
