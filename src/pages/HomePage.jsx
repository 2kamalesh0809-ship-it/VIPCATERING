import React from 'react';
import Hero from '../sections/Hero';
import TrustSection from '../sections/TrustSection';
import FeaturedEvents from '../sections/FeaturedEvents';
import UpcomingEvents from '../sections/UpcomingEvents';
import Gallery from '../sections/Gallery';
import Services from '../sections/Services';
import CTASection from '../sections/CTASection';

const HomePage = () => {
    return (
        <>
            <Hero />
            <TrustSection />
            <FeaturedEvents />
            <UpcomingEvents />
            <Gallery />
            <Services />
            <CTASection />
        </>
    );
};

export default HomePage;
