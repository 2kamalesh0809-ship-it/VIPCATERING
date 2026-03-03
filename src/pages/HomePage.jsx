import React from 'react';
import TrustSection from '../sections/TrustSection';
import Gallery from '../sections/Gallery';
import Services from '../sections/Services';
import CTASection from '../sections/CTASection';
import UpcomingEvents from '../sections/UpcomingEvents';

const HomePage = () => {
    return (
        <>
            <Services />
            <UpcomingEvents />
            <Gallery />
            <TrustSection />
            <CTASection />
        </>
    );
};

export default HomePage;
