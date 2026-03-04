import React from 'react';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Menu', href: '/menu' },
        { name: 'Events', href: '/events' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <footer className="bg-background-soft border-t border-[#C9A227]/20 pt-8 pb-32 md:pt-12 md:pb-12 relative overflow-hidden">
            <div className="bg-luxury-blobs absolute inset-0 mix-blend-multiply opacity-50"></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    <div className="col-span-1 lg:col-span-1">
                        <Link to="/" className="flex items-center gap-3 text-2xl font-display font-bold mb-6 block" id="footer-logo">
                            <img src="/logo.png" alt="VIP Catering Logo" className="h-10 w-auto object-contain" />
                            <span>VIP <span className="text-luxury-shimmer">CATERING</span></span>
                        </Link>
                        <p className="text-gray-300 leading-relaxed mb-8">
                            Innovating the catering industry in Chennai with premium services and modern culinary experiences since 2016.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { Icon: Instagram, href: "https://www.instagram.com/vipcateringchennai/reels/#", label: "Instagram", color: "hover:text-[#E4405F] hover:border-[#E4405F]" },
                                { Icon: Facebook, href: "https://www.facebook.com/jaffer.vip.catering/", label: "Facebook", color: "hover:text-[#1877F2] hover:border-[#1877F2]" },
                                { Icon: Youtube, href: "https://www.youtube.com/@vipcateringchennai", label: "Youtube", color: "hover:text-[#FF0000] hover:border-[#FF0000]" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-10 h-10 rounded-full border border-[#C9A227]/30 flex items-center justify-center text-gray-300 ${social.color} hover:shadow-text-glow transition-all duration-300 transform hover:-translate-y-1`}
                                    title={social.label}
                                >
                                    <social.Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-8">Quick Links</h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-gray-300 hover:text-primary transition-colors">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-8">Our Services</h4>
                        <ul className="space-y-4">
                            {['Wedding Catering', 'Corporate Events', 'Private Parties', 'Gala Dinners', 'Live Counters'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-300 hover:text-primary transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-8">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-primary mt-1 shrink-0" />
                                <span className="text-gray-300">First Floor, Second Block, PC 1C, <br />Mogappair West, Ambattur Industrial Estate, <br />Chennai - 600037</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-primary shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-gray-300">+91 81241 42113 (WhatsApp)</span>
                                    <span className="text-gray-300">+91 93452 10538</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-primary shrink-0" />
                                <span className="text-gray-300">vipcateringservice1@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#C9A227]/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} VIP Catering Chennai. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-gray-400 text-sm hover:text-gray-600">Privacy Policy</a>
                        <a href="#" className="text-gray-400 text-sm hover:text-gray-600">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
