import React from 'react';
import ServiceDetail from '../ServiceDetail';

const WeddingCatering = () => {
    const content = [
        {
            heading: "The Premium Choice for Wedding Catering in Chennai",
            text: `Your wedding day is a masterpiece in the making, and the menu should be its most memorable chapter. At VIP Catering Chennai, we redefine wedding feast experiences by blending time-honored South Indian traditions with cutting-edge modern culinary arts. As one of the top-rated wedding caterers in Chennai, we understand that a wedding meal is not just food—it's a gesture of gratitude to your guests and a celebration of your new journey.

Whether you are planning a grand royal wedding at an elite marriage hall in Mogappair or an intimate luxury wedding at a premium resort in ECR, our team is equipped to deliver excellence. We specialize in both traditional banana leaf service (Elai Sappadu) and extravagant modern buffets that feature live gourmet counters, artisanal dessert stations, and signature mocktail bars.`
        },
        {
            heading: "Crafting a Menu as Unique as Your Love Story",
            text: `No two weddings are the same, and your menu shouldn't be either. Our expert chefs work closely with you to curate a bespoke culinary list that caters to your family's heritage and your personal preferences. We are renowned for our diversity in cuisine, offering:

- Authentic Tamil Brahmin Sambar & Karaikudi Specials
- Royal Mughal Dum Biryanis and Starters
- Contemporary Fusion Live Counters (Pasta, Tacos, Teppanyaki)
- Traditional Sweets made with pure ghee and organic ingredients

We source the freshest local produce and premium spices to ensure every morsel carries the "VIP" hallmark of quality and taste.`
        },
        {
            heading: "Service That Sets the Gold Standard",
            text: `Exquisite food deserves exceptional service. Our professional waitstaff and hospitality team are trained to provide a 5-star experience that rivals the best luxury hotels. From the moment your guests enter the dining hall to the final cup of filter coffee, we ensure a seamless flow of service.

Our team doesn't just serve food; we manage the entire dining atmosphere. This includes premium table settings, artistic food presentation, and diligent floor management to ensure every guest feels like a VIP. Hygiene is our top priority, and we maintain ultra-modern kitchen standards to guarantee food safety.`
        },
        {
            heading: "Why Chennai Prefers VIP Catering for Weddings",
            text: `With over 8 years of excellence in the Chennai catering industry, we have built a reputation for trust and transparency. We don't believe in "hidden costs"—what you see in the contract is what you get. Our scalability allows us to handle guest lists ranging from 200 to over 5,000 with the same level of precision and flavor consistency.

Choosing VIP Catering means choosing peace of mind. Let us handle the complexities of the kitchen while you create beautiful memories with your loved ones.`
        }
    ];

    const highlights = [
        "Specialized Wedding Menu Planning",
        "Artisanal Live Food Counters",
        "Luxury Table Setups & Decor",
        "Expert Waitstaff & Hospitality",
        "Hygienic, High-Capacity Kitchens",
        "Traditional & Modern Service Styles",
        "Premium Dessert & Mocktail Bars"
    ];

    return (
        <ServiceDetail
            title="Best Wedding Catering Services in Chennai | VIP Catering"
            h1="Luxury Wedding Catering Services in Chennai"
            highlights={highlights}
            content={content}
            image="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070"
            seoAlt="Luxury wedding catering setup in Chennai by VIP Catering"
        />
    );
};

export default WeddingCatering;
