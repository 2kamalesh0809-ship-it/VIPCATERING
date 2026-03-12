import React from 'react';
import BlogPost from '../BlogPost';

const WeddingIdeasBlog = () => {
    const blogData = {
        title: "Top 5 Wedding Catering Trends in Chennai for 2026",
        date: "March 10, 2026",
        author: "JAFFER SADIQ",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
        seoAlt: "Wedding catering trends in Chennai featuring grand buffet and live counters",
        content: [
            {
                heading: "The Return of Traditional Flavors with a Modern Twist",
                text: "Chennai weddings are seeing a massive shift back to authentic roots. Families are increasingly requesting forgotten recipes like Gulkand Badam Halwa or traditional Elai Sapadu, but served with premium, gold-standard presentation. At VIP Catering, we've pioneered the 'Luxury Traditional' experience."
            },
            {
                heading: "Interactive Live Counters",
                text: "Static buffets are a thing of the past. Guests today want to see their food being prepared. From live Dim Sum stations to Nitro-Ice Cream parlors and specialized Appam & Stew counters, the theater of cooking is a major wedding highlight."
            },
            {
                heading: "Sustainability & Pure Ingredients",
                text: "Eco-friendly weddings are trending. Using organic produce sourced directly from farmers around Tamil Nadu not only supports the local economy but also ensures that the 'Gold Standard of Taste' starts with the safest ingredients."
            },
            {
                heading: "Miniature Plated Starters",
                text: "Instead of heavy appetizers, modern Chennai weddings prefer bite-sized, artistically plated starters like Mini Puliyodharai Arancini or small servings of Chettinad Chicken tacos. This allows guests to sample more variety without feeling overly full before the main course."
            },
            {
                heading: "The 'Grand Finale' Dessert Boulevard",
                text: "A single sweet is no longer enough. The 2026 wedding demands a 'Dessert Boulevard' featuring a mix of traditional South Indian sweets, French pastries, and live fusion desserts. It's the last thing your guests remember, so make it spectacular!"
            }
        ]
    };

    return <BlogPost {...blogData} />;
};

export default WeddingIdeasBlog;
