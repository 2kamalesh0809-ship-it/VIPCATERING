import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Menu', href: '/menu' },
        { name: 'Events', href: '/events' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Contact', href: '/contact' },
    ];

    const getNavColor = () => {
        return 'text-accent-dark'; // ALWAYS dark now
    };

    const getBgColor = () => {
        if (isScrolled) return 'bg-[#141414]/90 backdrop-blur-md py-4 border-b border-[#C9A227]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]';
        if (!isHome) return 'bg-[#141414]/95 backdrop-blur-md py-6 border-b border-[#C9A227]/20';
        return 'bg-transparent py-6';
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${getBgColor()}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                >
                    <Link to="/" className={`flex items-center gap-2 md:gap-3 group`} id="navbar-logo">
                        <img src="/logo.png" alt="VIP Catering Logo" className="h-9 md:h-14 w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105" />
                        <div className="flex flex-col justify-center">
                            <span className={`text-xl md:text-2xl font-title font-bold tracking-tight leading-none ${getNavColor()} drop-shadow-md`}>
                                VIP <span className="text-luxury-shimmer">CATERING</span>
                            </span>
                            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A227] opacity-80 mt-1 leading-none">
                                8 years of excellence
                            </span>
                        </div>
                    </Link>
                </motion.div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, index) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                to={link.href}
                                className={`text-sm font-medium relative group ${getNavColor()}`}
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                            </Link>
                        </motion.div>
                    ))}
                    <Link to="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-luxury-shimmer px-7 py-2.5 text-sm"
                        >
                            Book Now
                        </motion.button>
                    </Link>
                </div>


            </div>
        </nav>
    );
};

export default Navbar;
