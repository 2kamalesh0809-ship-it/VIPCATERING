import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Download, ArrowRight, Star } from 'lucide-react';

const menuData = {
    "Starters": [
        { name: "Paneer Tikka", veg: true },
        { name: "Veg Spring Rolls", veg: true },
        { name: "Hara Bhara Kabab", veg: true },
        { name: "Corn & Cheese Balls", veg: true },
        { name: "Veg Seekh Kebab", veg: true },
        { name: "Stuffed Mushroom Caps", veg: true },
        { name: "Veg Manchurian", veg: true },
        { name: "Cheese Chilli Toast", veg: true },
        { name: "Papdi Chaat / Dahi Puri", veg: true },
        { name: "Chicken Tikka", veg: false },
        { name: "Fish Fingers / Fish Pakora", veg: false },
        { name: "Chicken Seekh Kebab", veg: false },
        { name: "Prawn Tempura", veg: false },
        { name: "Mutton Sheekh / Mutton Chops", veg: false },
        { name: "Chicken Wings (Buffalo, BBQ, or Honey Glaze)", veg: false },
        { name: "Tandoori Chicken Drumsticks", veg: false }
    ],
    "Main Course": [
        { name: "Paneer Butter Masala / Shahi Paneer", veg: true },
        { name: "Dal Makhani", veg: true },
        { name: "Mix Veg Curry", veg: true },
        { name: "Navratan Korma", veg: true },
        { name: "Malai Kofta", veg: true },
        { name: "Vegetable Biryani / Pulao", veg: true },
        { name: "Chole / Rajma", veg: true },
        { name: "Veg Fried Rice / Noodles", veg: true },
        { name: "Stuffed Capsicum / Baingan Bharta", veg: true },
        { name: "Butter Chicken / Murgh Makhani", veg: false },
        { name: "Chicken Curry / Kadai Chicken", veg: false },
        { name: "Mutton Rogan Josh / Mutton Curry", veg: false },
        { name: "Fish Curry / Prawns Curry", veg: false },
        { name: "Chicken Biryani / Egg Biryani", veg: false },
        { name: "Tandoori Chicken / Chicken Tandoori", veg: false },
        { name: "Grilled Fish / Prawns", veg: false },
        { name: "Keema Masala / Egg Curry", veg: false },
        { name: "Naan, Tandoori Roti, Lachha Paratha", veg: true },
        { name: "Steamed Rice / Jeera Rice / Pulao", veg: true },
        { name: "Raita / Salad / Papad", veg: true }
    ],
    "Desserts": [
        { name: "Gulab Jamun / Rasgulla", veg: true },
        { name: "Jalebi / Imarti", veg: true },
        { name: "Rasmalai", veg: true },
        { name: "Chocolate Brownie / Chocolate Mousse", veg: true },
        { name: "Ice Cream / Kulfi", veg: true },
        { name: "Fruit Custard", veg: true },
        { name: "Carrot Halwa / Suji Halwa", veg: true },
        { name: "Cheesecake / Tiramisu", veg: true },
        { name: "Gajar Halwa", veg: true }
    ],
    "Beverages": [
        { name: "Soft Drinks (Coke, Pepsi, Sprite)", veg: true },
        { name: "Fruit Juices (Mango, Orange, Watermelon)", veg: true },
        { name: "Mocktails / Mojitos", veg: true },
        { name: "Iced Tea / Cold Coffee", veg: true },
        { name: "Tea / Masala Chai", veg: true },
        { name: "Coffee / Cappuccino", veg: true },
        { name: "Green Tea / Herbal Tea", veg: true }
    ],
    "Live Counters": [
        { name: "Pasta Counter: Custom Selection", veg: true },
        { name: "Pav Bhaji / Chaat Counter", veg: true },
        { name: "Dosa / Uttapam Counter", veg: true },
        { name: "Live Barbecue / Tandoor Counter", veg: false },
        { name: "Pasta / Noodle Counter", veg: true },
        { name: "Ice Cream Counter / Sundae Counter", veg: true },
        { name: "Crepe / Waffle Counter", veg: true }
    ]
};

const MenuPage = () => {
    const [activeTab, setActiveTab] = useState("Starters");
    const categories = Object.keys(menuData);

    return (
        <div className="pt-20">
            {/* Hero Header */}
            <section className="relative h-[40vh] flex items-center justify-center bg-background overflow-hidden px-6">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center"
                >
                    <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Gourmet Selection</span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-accent-dark mb-6">
                        Our Signature <span className="text-primary italic">Menu</span>
                    </h1>
                </motion.div>
            </section>

            {/* Category Filter Tabs */}
            <section className="sticky top-20 z-40 bg-[#141414]/90 backdrop-blur-md border-y border-[#C9A227]/20">
                <div className="container mx-auto px-6 overflow-x-auto scrollbar-hide">
                    <div className="flex justify-center min-w-max md:min-w-0 py-6 gap-8 md:gap-16">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`relative py-2 text-lg font-display font-semibold transition-colors duration-300 ${activeTab === cat ? 'text-primary' : 'text-gray-400 hover:text-accent-dark'
                                    }`}
                            >
                                {cat}
                                {activeTab === cat && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary shadow-[0_0_10px_#C9A227]"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Menu List Grid */}
            <section className="py-20 min-h-[60vh] bg-[#0F0F0F]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <AnimatePresence mode='popLayout'>
                            {menuData[activeTab].map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="relative group p-6 rounded-2xl bg-[#1A1A1A]/50 border border-[#C9A227]/10 hover:border-[#C9A227]/40 transition-all duration-300 flex items-center justify-between shadow-lg"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-3 h-3 rounded-full border ${item.veg ? 'border-green-500' : 'border-red-500'} p-[2px] flex-shrink-0 animate-pulse`}>
                                            <div className={`w-full h-full rounded-full ${item.veg ? 'bg-green-500 shadow-[0_0_5px_green]' : 'bg-red-500 shadow-[0_0_5px_red]'}`} />
                                        </div>
                                        <h3 className="text-lg font-display font-medium text-white group-hover:text-primary transition-colors">
                                            {item.name}
                                        </h3>
                                    </div>
                                    <Star size={14} className="text-[#C9A227]/20 group-hover:text-primary transition-colors" />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Special Menu Section */}
            <section className="py-24 bg-background-soft">
                <div className="container mx-auto px-6">
                    <div className="relative max-w-5xl mx-auto card-luxury rounded-[3rem] p-12 md:p-20 overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                            <div className="flex-1">
                                <span className="text-primary font-bold text-sm uppercase tracking-widest mb-4 block">Exclusive Packages</span>
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-accent-dark mb-6 leading-tight">
                                    Custom Event <br /> <span className="text-luxury-shimmer italic">Menu Packages</span>
                                </h2>
                                <p className="text-gray-400 text-lg mb-8">
                                    Looking for something beyond our signature selection? Our executive chefs work directly with you to create a bespoke culinary journey that perfectly aligns with your event theme and guest preferences.
                                </p>
                                <motion.a
                                    href="tel:+919345210538"
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-3 text-luxury-shimmer font-bold text-lg group text-shadow-glow cursor-pointer"
                                >
                                    Consult Our Chef <ArrowRight size={20} />
                                </motion.a>
                            </div>
                            <div className="w-72 h-72 border border-primary/30 rounded-[2.5rem] p-3 flex items-center justify-center relative rotate-3 group hover:rotate-0 transition-transform duration-500 shadow-luxury-glow">
                                <div className="w-full h-full bg-[#111111]/80 backdrop-blur rounded-[2rem] flex items-center justify-center p-8 text-center border border-primary/20">
                                    <p className="text-luxury-shimmer font-display font-bold text-xl italic leading-tight text-shadow-glow">
                                        "Art on a plate, flavor in the soul."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Download Menu CTA */}
            <section className="py-24">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-accent-dark mb-8">
                            Want the full list of our culinary delights?
                        </h2>
                        <motion.a
                            href="/vip catering chennai 2 .pdf"
                            download
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(201, 162, 39, 0.2)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gold-gradient text-white px-12 py-5 rounded-full font-bold text-xl flex items-center gap-3 mx-auto shadow-xl w-max cursor-pointer"
                        >
                            <Download size={24} /> Download Full Menu PDF
                        </motion.a>
                        <p className="mt-8 text-gray-400 text-sm italic">
                            Available in curated sets for Weddings, Corporates, and Private Events.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default MenuPage;
