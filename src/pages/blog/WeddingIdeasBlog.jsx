import React from 'react';
import BlogPost from '../BlogPost';

const WeddingIdeasBlog = () => {
    const content = [
        {
            heading: "1. Fusion Live Counters",
            text: `Modern weddings in Chennai are moving away from the static buffet. Fusion live counters that combine Italian pastas with Indian spices, or Mexican tacos with South Indian fillings, are the biggest trend right now. It creates an interactive experience where guests can customize their plates while watching the chefs in action.`
        },
        {
            heading: "2. Themed Dessert Boulevards",
            text: `Instead of a small dessert table, create a 'Dessert Boulevard' featuring a mix of traditional Madurai sweets and modern French patisserie. Including a live Jalebi counter alongside a Chocolate Fountain provides something for everyone.`
        },
        {
            heading: "3. Signature Mocktail Bars",
            text: `Refresh your guests with unique local infusions. Think 'Nannari Mojitos' or 'Spiced Buttermilk' with a gourmet twist. A signature drink adds a personal touch to the welcoming experience.`
        },
        {
            heading: "4. Plated Service for VIPs",
            text: `While buffets are efficient, providing a course-by-course plated service for the immediate family and senior guests adds a layer of luxury and respect that is highly valued in Chennai culture.`
        },
        {
            heading: "5. Sustainable & Organic Menus",
            text: `Farm-to-table is the new gold standard. Sourcing organic grains and locally grown vegetables not only tastes better but also resonates with the eco-conscious mindset of modern couples.`
        },
        {
            heading: "6. Miniature Appetizers",
            text: `Small, bite-sized versions of classics—like mini Vadais with a dollop of chutney or tiny Paneer Tikkas—allow guests to sample a variety of flavors without feeling too full before the main course.`
        },
        {
            heading: "7. Regional Showcase",
            text: `Highlight different parts of Tamil Nadu in your menu. A Chetinnad corner, a Kongunadu special, and a Tanjore tiffin section showcase the rich culinary diversity of the state.`
        },
        {
            heading: "8. Artisanal Breads",
            text: `Go beyond the standard Naan. Offer a variety of artisanal breads like malabar parottas, sheermal, and flavored rotis to complement the rich gravies.`
        },
        {
            heading: "9. Interactive Salad Bars",
            text: `For the health-conscious guests, an interactive salad bar with fresh sprouts, local greens, and unique dressings is a refreshing addition to a heavy wedding feast.`
        },
        {
            heading: "10. Midnight Snack Stations",
            text: `For those long wedding nights, a midnight snack station serving hot idlis or mini dosas is a thoughtful gesture that your guests will definitely remember.`
        }
    ];

    return (
        <BlogPost
            title="Top 10 Wedding Catering Ideas in Chennai for 2026"
            date="March 11, 2026"
            author="VIP Culinary Team"
            readTime="8 min read"
            image="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070"
            seoAlt="Top wedding catering ideas and trends in Chennai"
            content={content}
        />
    );
};

export default WeddingIdeasBlog;
