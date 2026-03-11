import React from 'react';
import ServiceDetail from '../ServiceDetail';

const EventCatering = () => {
    const content = [
        {
            heading: "A Full Spectrum of Event Catering Excellence in Chennai",
            text: `Every event has a unique pulse—a gala dinner feels different from a startup launch, and a family reunion has a different warmth than a college fest. At VIP Catering Chennai, we pride ourselves on being the most versatile event caterers in the city. We don't just provide food; we provide a culinary experience tailored to the specific energy and objectives of your event.

Serving across Chennai, from the bustling streets of T-Nagar to the quiet luxury of ECR, our team is ready to scale our services to match any occasion, big or small.`
        },
        {
            heading: "Catering for All Occasions",
            text: `Our broad expertise covers a wide range of event types:

- Gala Dinners & Award Ceremonies
- Product Launches & Brand Activations
- Community Get-togethers & Religious Fairs
- Sporting Events & Private Social Clubs

Our chefs are experts at creating menus that spark conversation. We offer a mix of seated dining, grand buffets, and 'passed' appetizers depending on the level of interaction your event requires. Our fusion counters—where traditional Indian snacks like Samosas meet modern sauces—are a perennial favorite for events that want a contemporary feel.`
        },
        {
            heading: "Global Flavors, Local Expertise",
            text: `In a cosmopolitan city like Chennai, your guests might have diverse palates. We offer a global menu that includes authentic Italian pastas, Lebanese mezze, and Chinese stir-fries, alongside our legendary South and North Indian dishes. 

We source premium ingredients globally but maintain the heart of the cooking here in Chennai. Our central kitchen is a hub of innovation where we constantly refine our recipes to ensure they are the best you'll find in the city.`
        },
        {
            heading: "Professional Event Management Support",
            text: `As your catering partner, we go beyond the plate. We coordinate closely with your event planners, decorators, and venue managers to ensure a seamless integration. Our setup is always clean, on-brand, and visually stunning. 

With over 8 years of excellence, VIP Catering is more than just a vendor; we are your partner in success. Let us help you elevate your next event with food that people will talk about long after the lights go down.`
        }
    ];

    const highlights = [
        "Versatile Event Menu Planning",
        "Large-Scale Gathering Specialists",
        "Seamless Venue Integration",
        "Fusion & International Cuisines",
        "On-Site Culinary Management",
        "Elite Presentation & Decor Coordination",
        "Punctual & Reliable Service Delivery"
    ];

    return (
        <ServiceDetail
            title="Professional Event Catering Chennai | VIP Catering"
            h1="Complete Event Catering Services in Chennai"
            highlights={highlights}
            content={content}
            image="https://images.unsplash.com/photo-1467453272184-7a5dd65edae7?q=80&w=2070"
            seoAlt="Sophisticated event catering setup for big gatherings in Chennai"
        />
    );
};

export default EventCatering;
