import React from 'react';
import ServiceDetail from '../ServiceDetail';

const CorporateCatering = () => {
    const content = [
        {
            heading: "Elevating Business Excellence with Premium Corporate Catering",
            text: `In the corporate world of Chennai, from the IT hubs of OMR to the business centers of Ambtattur, first impressions are everything. At VIP Catering Chennai, we provide sophisticated catering solutions that reflect your organization's professionalism and attention to detail. Whether it's a high-stakes board meeting, a large-scale product launch, or a company-anniversary gala, our service is designed to impress your partners and energize your team.

We understand that corporate events have unique requirements—punctuality is paramount, dietary diversity is essential, and the presentation must be sharp. Our team specializes in delivering high-quality meals that leave a lasting positive impression on your clients and stakeholders.`
        },
        {
            heading: "Modern Solutions for Every Business Need",
            text: `Our corporate catering menu is versatile and scalable. We offer:

- Executive Bento Boxes for power lunches
- Gourmet Networking Buffets for seminars
- Premium Tea & Coffee Break setups with artisanal snacks
- Grand Gala Dinner menus for annual celebrations

We take pride in our ability to cater to a global palate. From traditional Indian delicacies to International cuisines (Continental, Oriental, and Mediterranean), our chefs ensure global standards of flavor and presentation. We also provide dedicated options for vegan, gluten-free, and keto diets to ensure every attendee is well-catered for.`
        },
        {
            heading: "Precision Logistics & Seamless Service",
            text: `A corporate caterer must be a logistics partner as much as a culinary one. Our team is trained in precision timing—we ensure that food is ready exactly when the schedule demands. Our on-site staff is groomed to blend into a professional environment, providing efficient and unobtrusive service.

We maintain rigorous food safety standards (HACCP compliant) in our central kitchen. This commitment to hygiene ensures your team stays healthy and focused. We use premium eco-friendly disposables or high-end Chinaware based on the formality of your event.`
        },
        {
            heading: "Partnering with Chennai's Top Organizations",
            text: `For over 8 years, VIP Catering has been the preferred partner for many of Chennai's leading tech firms and industrial giants. Our experience in handling bulk orders without compromising on individual plate quality is what sets us apart. 

We offer customized contract catering for regular office lunches as well as one-off event management. Let us handle the nourishment while you focus on the networking. Experience the gold standard of corporate catering in Chennai.`
        }
    ];

    const highlights = [
        "Punctual Delivery Guarantee",
        "Executive Lunch & Bento Box Specialist",
        "Global Cuisines & Dietary Options",
        "Professional Hospitality Staff",
        "Rigorous Food Safety Standards",
        "Custom Branding Options for Events",
        "Seamless Event Logistics Support"
    ];

    return (
        <ServiceDetail
            title="Premium Corporate Catering Chennai | VIP Catering"
            h1="Professional Corporate Catering Services in Chennai"
            highlights={highlights}
            content={content}
            image="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2070"
            seoAlt="Professional corporate catering setup for business events in Chennai"
        />
    );
};

export default CorporateCatering;
