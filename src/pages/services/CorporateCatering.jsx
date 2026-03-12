import React from 'react';
import ServiceDetail from '../ServiceDetail';

const CorporateCatering = () => {
    const content = {
        title: "Corporate Catering in Chennai",
        subtitle: "Professional Excellence in Every Bite",
        description: "Elevate your corporate events with our premium catering services. From high-stakes board meetings to grand office celebrations, VIP Catering provides seamless service and sophisticated menus designed to impress your clients and energize your team.",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069",
        highlights: [
            "Elegant Packed Lunches",
            "Sophisticated Tea/Coffee Breaks",
            "Multi-Cuisine Buffets",
            "Timely Delivery & Setup",
            "Uniformed Service Staff"
        ],
        whyChooseUs: [
            {
                title: "Reliability",
                description: "We understand corporate timelines and ensure 100% on-time service."
            },
            {
                title: "Uniform Quality",
                description: "Consistent taste and presentation across all your office locations."
            },
            {
                title: "Flexibility",
                description: "Menu scales from intimate executive lunches to thousands of employees."
            }
        ],
        seoAlt: "Premium corporate catering event in Chennai"
    };

    return <ServiceDetail {...content} />;
};

export default CorporateCatering;
