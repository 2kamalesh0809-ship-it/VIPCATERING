import React from 'react';
import BlogPost from '../BlogPost';

const CorporateMenuBlog = () => {
    const blogData = {
        title: "The Ultimate Guide to Planning a Corporate Menu",
        date: "March 11, 2026",
        author: "JAFFER SADIQ",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069",
        seoAlt: "Corporate catering menu planning guide with professional food display",
        content: [
            {
                heading: "Know Your Audience",
                text: "The first step in corporate catering is understanding the profile of your attendees. A board meeting requires a different approach than a team building day. Focus on light, energizing meals that prevent the 'afternoon slump' while still feeling premium."
            },
            {
                heading: "The Power of Variety",
                text: "Diversity in diet is the new corporate standard. Your menu must cater to vegetarian, vegan, and gluten-free requirements without making those guests feel like an afterthought. A well-designed multi-cuisine buffet ensures everyone has something to enjoy."
            },
            {
                heading: "Efficiency is Key",
                text: "Time is money in the corporate world. Meals should be easy to eat (often finger foods or clean fork-and-knife dishes) and the service must be lightning-fast. At VIP Catering, we specialize in high-speed, high-quality corporate execution."
            },
            {
                heading: "Beverage Strategy",
                text: "Don't overlook the drinks. Beyond standard tea and coffee, consider fresh cold-press juices or artisanal infused waters. It shows a level of care and sophistication that reflects well on your organization's brand."
            }
        ]
    };

    return <BlogPost {...blogData} />;
};

export default CorporateMenuBlog;
