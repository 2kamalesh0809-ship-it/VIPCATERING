import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Download, ArrowRight, Star } from 'lucide-react';

const menuData = {
    Starters: [
        {
            name: "Gobi 65",
            description: "Spicy and crisp cauliflower florets deep-fried with traditional spices.",
            image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=2070",
            veg: true
        },
        {
            name: "Medu Vadai",
            description: "Traditional South Indian donut-shaped fritters made from black lentil batter.",
            image: "https://images.unsplash.com/photo-1626132646529-5006375bc912?q=80&w=2070",
            veg: true
        },
        {
            name: "Pani Poori",
            description: "Crispy hollow puris filled with tangy spicy water and chickpea mash.",
            image: "https://images.unsplash.com/photo-1601050690597-df056fb0179a?q=80&w=2070",
            veg: true
        },
        {
            name: "Vegetable Roll",
            description: "Spiced vegetable filling wrapped in a thin pastry and deep-fried.",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069",
            veg: true
        },
        {
            name: "Alu Bajji",
            description: "Potato slices dipped in gram flour batter and fried until golden.",
            image: "https://images.unsplash.com/photo-1604152135912-30018d9cc11b?q=80&w=2070",
            veg: true
        },
        {
            name: "Mushroom Soup",
            description: "Creamy earthy soup made with fresh button mushrooms and herbs.",
            image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=2071",
            veg: true
        }
    ],
    "Main Course": [
        {
            name: "Vegetable Pulao",
            description: "Fragrant basmati rice cooked with assorted vegetables and whole spices.",
            image: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?q=80&w=2020",
            veg: true
        },
        {
            name: "Paneer Butter Masala",
            description: "Succulent paneer cubes in a rich and creamy tomato-based gravy.",
            image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2070",
            veg: true
        },
        {
            name: "Butter Naan",
            description: "Soft and fluffy leavened bread brushed with melted butter.",
            image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=2070",
            veg: true
        },
        {
            name: "Dal Makhani",
            description: "Slow-cooked black lentils and kidney beans in a buttery creamy sauce.",
            image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2070",
            veg: true
        },
        {
            name: "Mini Pizza & Burgers",
            description: "Startup-style individual servings of gourmet pizzas and mini sliders.",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070",
            veg: true
        },
        {
            name: "Tawa Parota",
            description: "Multi-layered flaky bread cooked on a flat griddle with ghee.",
            image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070",
            veg: true
        }
    ],
    Desserts: [
        {
            name: "Bread Halwa",
            description: "Rich and decadent dessert made with fried bread, milk, and nuts.",
            image: "https://images.unsplash.com/photo-1601050690597-df056fb0179a?q=80&w=2070",
            veg: true
        },
        {
            name: "Gulab Jamun",
            description: "Classic milk dumplings steeped in rose cardamom syrup.",
            image: "https://images.unsplash.com/photo-1605666807844-7ce5ac646914?q=80&w=1816",
            veg: true
        },
        {
            name: "Malai Kulfi",
            description: "Traditional Indian ice cream made with thickened milk and cardamom.",
            image: "https://images.unsplash.com/photo-1571115177098-24b89bd3d16b?q=80&w=1887",
            veg: true
        },
        {
            name: "Ice Gola",
            description: "Shaved ice with colorful syrups, a nostalgic festival favorite.",
            image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=1887",
            veg: true
        }
    ],
    Beverages: [
        {
            name: "Ginger & Cardamom Tea",
            description: "Hot aromatic tea infused with fresh ginger and crushed cardamom.",
            image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1964",
            veg: true
        },
        {
            name: "Filter Coffee",
            description: "Strong and frothy traditional South Indian decoction coffee.",
            image: "https://images.unsplash.com/photo-1606791405792-1004f1718d0c?q=80&w=2070",
            veg: true
        }
    ],
    "Live Counters": [
        {
            name: "Dosa Live Counter",
            description: "Freshly made crispy dosas with a variety of chutneys.",
            image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070",
            veg: true
        },
        {
            name: "Chocolate Fountain",
            description: "Grand cascade of melted chocolate with exotic fruit skewers.",
            image: "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=2070",
            veg: true
        }
    ]
};

const MenuPage = () => {
    const [activeTab, setActiveTab] = useState("Starters");
    const categories = Object.keys(menuData);

    return (
        <div className="pt-20">
            {/* Hero Header */}
            <section className="relative h-[50vh] flex items-center justify-center bg-background overflow-hidden">
                {/* Subtle background texture/pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
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
                    className="relative z-10 text-center px-6"
                >
                    <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Gourmet Selection</span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-accent-dark mb-6">
                        Our Signature <span className="text-primary italic">Menu</span>
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
                        Curated dishes crafted for unforgettable events. A fusion of heritage expertise and modern culinary innovation.
                    </p>
                </motion.div>
            </section>

            {/* Category Filter Tabs */}
            <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-y border-gray-100">
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
                                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Menu Grid */}
            <section className="py-20 min-h-[60vh]">
                <div className="container mx-auto px-6">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        <AnimatePresence mode='popLayout'>
                            {menuData[activeTab].map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
                                >
                                    <div className="h-64 overflow-hidden relative">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            {item.veg ? (
                                                <div className="w-6 h-6 bg-white/90 backdrop-blur rounded-full flex items-center justify-center p-1 shadow-md border border-green-500">
                                                    <div className="w-full h-full rounded-full bg-green-500" />
                                                </div>
                                            ) : (
                                                <div className="w-6 h-6 bg-white/90 backdrop-blur rounded-full flex items-center justify-center p-1 shadow-md border-red-500 border">
                                                    <div className="w-full h-full rounded-full bg-red-500" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-2xl font-display font-bold text-accent-dark mb-3 group-hover:text-primary transition-colors">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-500 leading-relaxed mb-6 font-light">
                                            {item.description}
                                        </p>
                                        <div className="grow" />
                                        <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                                            <span className="text-xs font-bold uppercase tracking-widest text-primary">Signature Dish</span>
                                            <Star size={16} className="text-primary fill-primary" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Special Menu Section */}
            <section className="py-24 bg-background-soft">
                <div className="container mx-auto px-6">
                    <div className="relative max-w-5xl mx-auto bg-white rounded-[3rem] p-12 md:p-20 shadow-xl shadow-gray-200/50 border border-primary/10 overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                            <div className="flex-1">
                                <span className="text-primary font-bold text-sm uppercase tracking-widest mb-4 block">Exclusive Packages</span>
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-accent-dark mb-6 leading-tight">
                                    Custom Event <br /> <span className="text-primary">Menu Packages</span>
                                </h2>
                                <p className="text-gray-500 text-lg mb-8">
                                    Looking for something beyond our signature selection? Our executive chefs work directly with you to create a bespoke culinary journey that perfectly aligns with your event theme and guest preferences.
                                </p>
                                <motion.button
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-3 text-primary font-bold text-lg group"
                                >
                                    Consult Our Chef <ArrowRight size={20} />
                                </motion.button>
                            </div>
                            <div className="w-72 h-72 border-2 border-primary/20 rounded-[2.5rem] p-4 flex items-center justify-center relative rotate-3 group hover:rotate-0 transition-transform duration-500">
                                <div className="w-full h-full bg-primary/10 rounded-[2rem] flex items-center justify-center p-8 text-center">
                                    <p className="text-primary font-display font-bold text-xl italic leading-tight">
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
