import React from 'react';
import ServiceDetail from '../ServiceDetail';

const EventCatering = () => {
    const content = {
        title: "Special Event Catering in Chennai",
        subtitle: "Any Occasion, Extraordinary Food",
        description: "From housewarmings to social gatherings, VIP Catering turns every event into a grand success. Our versatile menus and professional service ensure that your guests are treated to world-class hospitality, no matter the scale of the event.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
        highlights: [
            "Versatile Multi-Cuisine Menus",
            "Customized Theme Setups",
            "Professional Service Staff",
            "End-to-End Planning Support",
            "State-of-the-art Equipment"
        ],
        whyChooseUs: [
            {
                title: "Scaleable Service",
                description: "Capable of handling intimate 50-person events to large 5000+ guest gatherings."
            },
            {
                title: "One-Stop Solution",
                description: "Complete catering management from menu planning to post-event cleanup."
            },
            {
                title: "Award-Winning Taste",
                description: "Consistently rated as one of the best caterers in Chennai for all celebrations."
            }
        ],
        seoAlt: "Premium social event catering service in Chennai"
    };

    return <ServiceDetail {...content} />;
};

export default EventCatering;
