import React from 'react';
import ServiceDetail from '../ServiceDetail';

const BirthdayCatering = () => {
    const content = [
        {
            heading: "Make Every Milestone Delicious with VIP Birthday Catering",
            text: `Birthdays are milestones of joy, and the food should be a reflection of that happiness. At VIP Catering Chennai, we bring a youthful, energetic, and highly creative approach to birthday party catering. Whether you are celebrating a child's first birthday, a teenager's milestone, or a grand 60th 'Sashtiapthapoorthi', we create menus that cater to all age groups and stay true to your theme.

As one of the leading birthday party caterers in Chennai, we specialize in high-energy catering that features interactive elements, keeping your guests engaged and satisfied.`
        },
        {
            heading: "Interactive Food Stations & Kids' Favorites",
            text: `We believe that party food should be fun! Our birthday packages include:

- Interactive Live Popcorn & Candy Floss Stations
- Mini Pizza & Pasta Live Counters
- Artisan Ice Cream & Waffle Bars
- Kid-Friendly 'No-Spice' Buffet Options

But we don't forget the adults. While the kids enjoy their favorites, we provide sophisticated gourmet starters and main courses for the grown-ups. Our fusion menus, combining traditional Indian tastes with global favorites like Tacos or Sliders, are always a hit at modern Chennai house parties.`
        },
        {
            heading: "Total Peace of Mind for the Host",
            text: `Hosting a party can be stressful, but with VIP Catering, the kitchen is off your mind. We handle everything from the initial menu design to the final cleanup. Our staff is courteous and helpful, ensuring that the birthday boy or girl and their family can focus on making memories.

We offer flexible catering solutions, whether you need a full-service team for a venue party or a 'drop-off' luxury catering service for a home celebration. Our portion sizes are generous, and our quality is uncompromising.`
        },
        {
            heading: "Setting the Party Trend in Chennai",
            text: `With our 8-year legacy, we have catered thousands of parties across Chennai, from Adyar to Ambattur. We stay ahead of food trends, offering themed setups that complement your party's decor. 

Our commitment to using fresh, high-quality ingredients means the food doesn't just look good—it tastes spectacular. Discover why families across Chennai trust VIP Catering to add flavor to their most special days.`
        }
    ];

    const highlights = [
        "Themed Food Concepts & Setups",
        "Interactive Live Food Stations",
        "Customized Menus for All Ages",
        "Staff Trained for Family Events",
        "Hygienic Home Catering Packages",
        "Creative Dessert & Cake Displays",
        "Flexible Service for Small & Large Groups"
    ];

    return (
        <ServiceDetail
            title="Best Birthday Party Catering Chennai | VIP Catering"
            h1="Delicious Birthday Party Catering Services in Chennai"
            highlights={highlights}
            content={content}
            image="https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=2070"
            seoAlt="Colorful birthday party catering with live food stations in Chennai"
        />
    );
};

export default BirthdayCatering;
