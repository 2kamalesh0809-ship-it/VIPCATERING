import React from 'react';
import ServiceDetail from '../ServiceDetail';

const BirthdayCatering = () => {
    const content = {
        title: "Birthday Party Catering in Chennai",
        subtitle: "Celebrate Life's Special Milestones",
        description: "Make every birthday magical with VIP Catering. Whether it's a child's first birthday or a grand 50th celebration, we bring joy to the table with fun, flavor, and flair. Our menus are designed to delight guests of all ages.",
        image: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=2070",
        highlights: [
            "Kids-Friendly Food Stations",
            "Themed Buffet Presentations",
            "Live Popcorn & Cotton Candy",
            "Innovative Finger Foods",
            "Custom Dessert Bars"
        ],
        whyChooseUs: [
            {
                title: "Fun & Creative",
                description: "We bring creative food presentation that children and adults both love."
            },
            {
                title: "Stress-Free",
                description: "Full service so you can enjoy the party with your loved ones."
            },
            {
                title: "Hygiene First",
                description: "Highest standards of kitchen hygiene for your family's safety."
            }
        ],
        seoAlt: "Fun birthday party catering buffet in Chennai"
    };

    return <ServiceDetail {...content} />;
};

export default BirthdayCatering;
