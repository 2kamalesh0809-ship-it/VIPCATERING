import React from 'react';
import BlogPost from '../BlogPost';

const CorporateMenuBlog = () => {
    const content = [
        {
            heading: "1. The Executive Breakfast Power-Up",
            text: `Start the day right with a mix of high-protein and energy-boosting options. Instead of just heavy parathas, offer a 'Wellness Bar' with Greek yogurt parfaits, fresh fruit bowls, and mini egg white frittatas. For the local favorites, include mini Steamed Idlis with fiber-rich flaxseed chutneys.`
        },
        {
            heading: "2. The Networking Bento Box",
            text: `When attendees need to move around, a seated buffet can be a hurdle. Professional 'Gourmet Bento Boxes' allow for a high-quality, multi-course meal that can be enjoyed anywhere. Our bento boxes include a balanced mix of a protein (like Grilled Paneer or Lemon Chicken), a complex carb (Brown Rice or Quinoa), and a refreshing salad.`
        },
        {
            heading: "3. Interactive Global Tapas",
            text: `Gala dinners are shifting towards Tapas-style dining. Small, bite-sized portions of global cuisines—Mediterranean Hummus cups, Mini Peking Duck rolls, and Thai Satays—encourage guests to sample everything without the commitment of a heavy plate.`
        },
        {
            heading: "4. The Artisan Coffee & Tea Break",
            text: `High-quality caffeine is the fuel of any corporate event. Upgrade from instant coffee to an 'Artisan Coffee Bar' featuring freshly roasted estates from Coorg, served by professional baristas. Pair this with low-sugar, high-energy snacks like almond biscotti or protein bites.`
        },
        {
            heading: "5. Focus on Inclusivity",
            text: `A modern corporate menu must respect diverse dietary choices. Ensure at least 30% of your menu is Vegan, and clearly label Gluten-Free and Nut-Free options. Inclusivity isn't just a trend; it's a mark of a professional organization.`
        }
    ];

    return (
        <BlogPost
            title="Building the Perfect Catering Menu for Your Next Corporate Event"
            date="March 11, 2026"
            author="VIP Corporate Events Division"
            readTime="6 min read"
            image="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2070"
            seoAlt="Sophisticated corporate event catering menu setup in Chennai"
            content={content}
        />
    );
};

export default CorporateMenuBlog;
