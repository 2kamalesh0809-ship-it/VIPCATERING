import React from 'react';
import { motion } from 'framer-motion';
import { Home, UtensilsCrossed, Calendar, Sparkles, Briefcase } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const MobileBottomNav = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Home', icon: Home, path: '/' },
        { name: 'Events', icon: Calendar, path: '/events' },
        { name: 'Book', icon: Briefcase, path: '/contact', isSpecial: true },
        { name: 'Menu', icon: UtensilsCrossed, path: '/menu' },
        { name: 'Services', icon: Sparkles, path: '/services' },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#141414]/90 backdrop-blur-xl border-t border-[#C9A227]/20 pb-safe-area pt-2 px-2 z-[60] shadow-[0_-15px_40px_rgba(0,0,0,0.6)]">
            <div className="flex justify-around items-end max-w-md mx-auto relative">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    if (item.isSpecial) {
                        return (
                            <Link key="book-btn" to={item.path} className="relative -top-7 flex flex-col items-center">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-16 h-16 btn-luxury-shimmer shadow-luxury-glow flex items-center justify-center border-[3px] border-[#141414] text-[#111] relative z-20"
                                >
                                    <item.icon size={28} strokeWidth={2.5} />
                                </motion.div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-primary mt-2">
                                    Book Now
                                </span>
                            </Link>
                        );
                    }

                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="flex flex-col items-center gap-1 mb-2 min-w-[60px]"
                        >
                            <div className={`relative p-2 rounded-2xl transition-all duration-300 ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-400'}`}>
                                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute inset-0 bg-primary/10 rounded-2xl -z-10"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                                {item.name}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
};

export default MobileBottomNav;
