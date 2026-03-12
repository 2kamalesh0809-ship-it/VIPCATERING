import React from 'react';
import ServiceDetail from '../ServiceDetail';

const WeddingCatering = () => {
    const content = {
        title: "Wedding Catering Services in Chennai",
        subtitle: "Crafting Royal Feasts for Your Special Day",
        description: "Experience the epitome of luxury with VIP Catering's wedding services. We bring the 'Gold Standard of Taste' to your wedding, blending traditional flavors with modern presentation. Our team ensures that every dish is a masterpiece, making your celebration truly unforgettable.",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
        highlights: [
            "Traditional & Fusion Menus",
            "Royal Buffet Setup",
            "Professional Live Counters",
            "Exquisite Dessert Boulevards",
            "Dedicated Event Manager"
        ],
        whyChooseUs: [
            {
                title: "8 Years of Expertise",
                description: "Over nearly a decade of experience in hosting grand weddings across Chennai."
            },
            {
                title: "Premium Quality",
                description: "We use only the finest, freshest ingredients for every single preparation."
            },
            {
                title: "Customized Menus",
                description: "Menus tailored to your family traditions and personal preferences."
            }
        ],
        seoAlt: "Luxury wedding catering services setup in Chennai"
    };

    return <ServiceDetail {...content} />;
};

export default WeddingCatering;
