import React from 'react';
import ServiceDetail from '../ServiceDetail';

const VegCatering = () => {
    const content = {
        title: "Pure Veg Catering Services in Chennai",
        subtitle: "The Purest Taste of Tradition",
        description: "Specializing in authentic vegetarian cuisine, VIP Catering offers a divine culinary experience. We strictly follow traditional preparation methods to ensure 100% pure vegetarian excellence for your religious ceremonies and family gatherings.",
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070",
        highlights: [
            "Strictly 100% Vegetarian",
            "Authentic South & North Indian",
            "Jain Menus Available",
            "Hygienic Traditional Prep",
            "Premium Banana Leaf Service"
        ],
        whyChooseUs: [
            {
                title: "Tradition Kept Alive",
                description: "Over 8 years of serving pure veg delicacies in traditional Chennai style."
            },
            {
                title: "Pure Ingredients",
                description: "Sourcing best quality spices and fresh produce for pure flavors."
            },
            {
                title: "Ceremony Expertise",
                description: "Specialized in catering for Housewarmings, Upanayanams, and traditional weddings."
            }
        ],
        seoAlt: "Pure vegetarian catering service setup in Chennai"
    };

    return <ServiceDetail {...content} />;
};

export default VegCatering;
