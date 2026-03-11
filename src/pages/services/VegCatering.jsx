import React from 'react';
import ServiceDetail from '../ServiceDetail';

const VegCatering = () => {
    const content = [
        {
            heading: "The Ultimate Destination for Pure Veg Catering in Chennai",
            text: `Vegetarianism in Chennai is not just a dietary choice—it's an art form. At VIP Catering Chennai, we take this tradition seriously, offering 'Pure Veg' catering services that are unsurpassed in quality and flavor. As a specialized veg caterer in Chennai, we understand the nuances of various vegetarian cuisines, from the strict Sattvic requirements of religious ceremonies to the rich, spicy flavors of North Indian and fusion veg cuisines.

We maintain a strictly vegetarian central kitchen, ensuring complete peace of mind for our clients who prioritize traditional purity.`
        },
        {
            heading: "From Traditional Elai Sappadu to Modern Veg Fusion",
            text: `Our vegetarian menus are a celebration of diversity. We are famous for:

- Traditional South Indian 'Big Elai' Banquet (Wedding Feast)
- Authentic Brahmin Cuisine (Sambar, Rasam, Vathal Kuzhambu)
- Luxury North Indian Gravies and Tandoor Starters
- Innovative Veg Fusion (Mushroom Galouti, Paneer Tikkas, Veg Sushi)

Our chefs use farm-fresh vegetables and premium-grade spices and oils. We emphasize 'slow cooking' for our traditional recipes to bring out the natural depth of flavors that pre-packaged ingredients can never match.`
        },
        {
            heading: "Perfect for Religious & Family Functions",
            text: `Whether it's an Upanayanam, a Grahapravesam (Housewarming), or a Temple event, our team is well-versed in the protocols of religious catering. We offer 'No Onion, No Garlic' options upon request, prepared with the same level of gourmet expertise.

Our service includes elegant setups that respect the sanctity of your event. From traditional copper serving vessels to modern ceramic platters, we tailor the presentation to match the mood of your ceremony.`
        },
        {
            heading: "Why Choose VIP for Veg Catering?",
            text: `Being in the Chennai catering industry for over 8 years, we have mastered the delicate balance of taste and nutrition. Our vegetarian catering is designed to satisfy the soul, not just the stomach. We are committed to hygiene, using RO processed water for cooking and maintaining a sanitized environment.

Join the thousands of happy customers who have celebrated their life's biggest moments with our premium vegetarian fare. Experience the gold standard of veg catering in Chennai.`
        }
    ];

    const highlights = [
        "Strictly 100% Vegetarian Kitchen",
        "Authentic South Indian & Brahmin Specialties",
        "No-Onion, No-Garlic Options",
        "Farm-Fresh Ingredients & Ghee",
        "Specialist Religious Function Catering",
        "Hygienic Traditional & Modern Service",
        "Comprehensive Veg Menu Customization"
    ];

    return (
        <ServiceDetail
            title="Pure Veg Catering Services in Chennai | VIP Catering"
            h1="Premium Pure Veg Catering Services in Chennai"
            highlights={highlights}
            content={content}
            image="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070"
            seoAlt="Premium pure vegetarian buffet setup in Chennai by VIP Catering"
        />
    );
};

export default VegCatering;
