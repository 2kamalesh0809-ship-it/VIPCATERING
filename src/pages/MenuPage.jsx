import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Leaf, Download, ArrowRight, Star, ShoppingCart, Check, Trash2 } from 'lucide-react';

const menuData = {
    "Beverages": [
        { name: "Watermelon Juice", veg: true },
        { name: "Lemon Mint Juice", veg: true },
        { name: "Musk Melon Juice", veg: true },
        { name: "Authentic Filter Coffee", veg: true },
        { name: "Masala Tea", veg: true }
    ],
    "Starters": [
        { name: "Medhu Vadai", veg: true },
        { name: "Spl Vadai", veg: true },
        { name: "Mini Masal Vadai", veg: true },
        { name: "Sambar Vadai", veg: true },
        { name: "Curd Vadai", veg: true },
        { name: "Rasa Vadai", veg: true },
        { name: "Veg Cutlet", veg: true },
        { name: "Gobi 65", veg: true },
        { name: "Veg Spring Roll", veg: true },
        { name: "Onion Pakoda", veg: true },
        { name: "Corn Fry", veg: true },
        { name: "Senai Chops", veg: true },
        { name: "Kathirikai Verkadalai Chops", veg: true },
        { name: "Mini Idli / Podi Idli", veg: true },
        { name: "Rasam Idli / Ilaneer Idli", veg: true },
        { name: "Assorted Chutneys (Inji, Mint, Malli)", veg: true },
        { name: "Variety Pickles & Vathal", veg: true },
        { name: "Potato & Senai Chips", veg: true }
    ],
    "Main Course": [
        { name: "Idli / Idiyappam Varieties", veg: true },
        { name: "Poori with Kilangu Masal", veg: true },
        { name: "Nei Milagu Pongal", veg: true },
        { name: "Mysore Masala Dosai / Ghee Roast", veg: true },
        { name: "Chappathi / Phulka / Rumali Roti", veg: true },
        { name: "Veg Kadai Paneer / Kurma Varieties", veg: true },
        { name: "Dal Makhani / Dal Fry", veg: true },
        { name: "Kadamba Sambar / Chinna Vengayam Sambar", veg: true },
        { name: "Vathal Kulambu / Moor Kulambu", veg: true },
        { name: "Authentic Rasam (Pineapple, Milagu, Tomato)", veg: true },
        { name: "White Rice / Malli Saadham", veg: true },
        { name: "Veg Biriyani / Mushroom Biriyani", veg: true },
        { name: "Bisibelebath / Mixed Rasam Rice", veg: true },
        { name: "Curd Rice / Thayir Saadham", veg: true },
        { name: "Poriyal & Paruppu Usili Varieties", veg: true },
        { name: "Potato Curry / Urulai Kari", veg: true },
        { name: "Raitha & Fruits Pachadi", veg: true },
        { name: "Traditional Malabar Aviyal", veg: true }
    ],
    "Desserts": [
        { name: "Nei Mysore Pak / Kaju Katli", veg: true },
        { name: "Badham Halwa / Wheat Halwa", veg: true },
        { name: "Kasi Halwa / Carrot Halwa", veg: true },
        { name: "Pineapple Pudding / Gulab Jamun", veg: true },
        { name: "Rasamalai / Malai Jam Jam", veg: true },
        { name: "Paal / Paruppu / Thinai Payasam", veg: true },
        { name: "Tender Coconut / Jackfruit Payasam", veg: true },
        { name: "Premium Ice Cream Varieties", veg: true },
        { name: "Fresh Cut Fruits", veg: true }
    ],
    "Live Counters": [
        { name: "Pani Puri / Chat Counter", veg: true },
        { name: "Pop Corn / Chocolate Fountain", veg: true },
        { name: "Mochai / Peanut / Moong Dal Counter", veg: true },
        { name: "Live Vadai (Sambar, Curd, Rasa)", veg: true },
        { name: "Mini Idli Sambar Counter", veg: true },
        { name: "Live Dosa (Mysore Masala, Ghee Roast)", veg: true }
    ],
    "Serving": [
        { name: "Traditional Banana Leaf", veg: true },
        { name: "Mineral Water Bottles", veg: true },
        { name: "Calcutta Beeda", veg: true }
    ]
};

const MenuPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Starters");
    const categories = Object.keys(menuData);

    const [selectedItems, setSelectedItems] = useState(() => {
        const saved = localStorage.getItem('selectedMenuItems');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('selectedMenuItems', JSON.stringify(selectedItems));
    }, [selectedItems]);

    const toggleItem = (item) => {
        const isSelected = selectedItems.find(i => i.name === item.name);
        if (isSelected) {
            setSelectedItems(selectedItems.filter(i => i.name !== item.name));
        } else {
            setSelectedItems([...selectedItems, { ...item, category: activeTab }]);
        }
    };

    return (
        <div className="pt-20 pb-32">
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
                    <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Select Your Gourmet Taste</span>
                    <h1 className="text-5xl md:text-7xl  font-bold text-accent-dark mb-6">
                        Custom <span className="text-primary italic">Selection</span>
                    </h1>
                    <p className="text-gray-400 font-medium">Click on items to build your customized event quotation.</p>
                </motion.div>
            </section>

            {/* Category Filter Tabs - Premium Light Theme */}
            <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-y border-gray-200/50 shadow-sm">
                <div className="container mx-auto px-6 overflow-x-auto scrollbar-hide">
                    <div className="flex justify-center min-w-max md:min-w-0 py-6 gap-8 md:gap-16">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`relative py-2 text-lg  font-bold transition-all duration-300 ${activeTab === cat ? 'text-black scale-110' : 'text-black/60 hover:text-black'
                                    }`}
                            >
                                {cat}
                                {activeTab === cat && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute -bottom-1 left-0 w-full h-[3px] bg-black"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Menu List Grid - PREMIUM LIGHT THEME */}
            <section className="py-20 min-h-[60vh] bg-gradient-to-b from-[#f9fbff] to-[#eef3f9] relative overflow-hidden">
                {/* Blurred Decorative Shapes */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
                    <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-400/5 rounded-full blur-[80px]" />
                    <div className="absolute -bottom-24 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <AnimatePresence mode='popLayout'>
                            {menuData[activeTab].map((item, index) => {
                                const isSelected = selectedItems.find(i => i.name === item.name);
                                return (
                                    <motion.div
                                        key={item.name}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        onClick={() => toggleItem(item)}
                                        className={`relative group p-6 rounded-2xl transition-all duration-300 flex items-center justify-between cursor-pointer
                                            bg-white/65 backdrop-blur-[12px] border border-white/80 shadow-[0_8px_25px_rgba(0,0,0,0.08)]
                                            ${isSelected ? 'ring-2 ring-primary scale-[1.02] shadow-[0_15px_40px_rgba(0,0,0,0.12)] !bg-white/90' : 'hover:bg-white/80 hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)]'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-3.5 h-3.5 rounded-sm border ${item.veg ? 'border-green-600' : 'border-red-600'} p-0.5 flex-shrink-0 bg-white/50`}>
                                                <div className={`w-full h-full rounded-full ${item.veg ? 'bg-green-600' : 'bg-red-600'}`} />
                                            </div>
                                            <h3 className={`text-lg  font-semibold transition-colors ${isSelected ? 'text-primary' : 'text-[#1a1a1a]'}`}>
                                                {item.name}
                                            </h3>
                                        </div>
                                        {isSelected ? (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="bg-primary rounded-full p-1.5 shadow-lg shadow-primary/20"
                                            >
                                                <Check size={14} className="text-white font-bold" />
                                            </motion.div>
                                        ) : (
                                            <Star size={14} className="text-gray-200 group-hover:text-primary/40 transition-colors" />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selectedItems.length > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-auto md:min-w-[400px]"
                    >
                        <div className="bg-[#1A1A1A]/90 backdrop-blur-xl border border-[#C9A227]/30 rounded-full p-2 px-4 flex items-center justify-center gap-6 md:gap-10 shadow-2xl overflow-hidden shadow-luxury-glow">
                            <div className="flex items-center gap-4 border-r border-white/10 pr-6">
                                <div className="relative">
                                    <ShoppingCart size={24} className="text-primary" />
                                    <span className="absolute -top-3 -right-3 h-[20px] min-w-[20px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                        {selectedItems.length}
                                    </span>
                                </div>
                                <div className="hidden sm:block text-left">
                                    <p className="text-white text-xs font-bold leading-none mb-1">Items Selected</p>
                                    <p className="text-gray-400 text-[10px] uppercase tracking-tighter">Ready for Quotation</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 md:gap-8">
                                <button
                                    onClick={() => setSelectedItems([])}
                                    className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider group"
                                >
                                    <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
                                    <span className="hidden md:inline">Clear</span>
                                </button>
                                <button
                                    onClick={() => navigate('/quotation')}
                                    className="bg-primary text-black px-8 md:px-12 py-3 rounded-full font-bold text-sm hover:bg-[#b08d22] transition-all hover:scale-105 active:scale-95 shadow-luxury-glow flex items-center gap-2"
                                >
                                    Proceed <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <section className="py-24 bg-background-soft">
                <div className="container mx-auto px-6">
                    <div className="relative max-w-5xl mx-auto card-luxury rounded-[3rem] p-12 md:p-20 overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                            <div className="flex-1">
                                <span className="text-primary font-bold text-sm uppercase tracking-widest mb-4 block">Exclusive Packages</span>
                                <h2 className="text-4xl md:text-5xl  font-bold text-accent-dark mb-6 leading-tight">
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
                                    <p className="text-luxury-shimmer font-title font-bold text-xl italic leading-tight text-shadow-glow">
                                        "Art on a plate, flavor in the soul."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MenuPage;
