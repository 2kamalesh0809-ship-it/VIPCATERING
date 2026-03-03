import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Counter = ({ value, label }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(value.substring(0, value.length - 1));
        if (start === end) return;

        let totalMilisecondsStep = 2000 / end;
        let timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, totalMilisecondsStep);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <div className="text-center">
            <div className="text-4xl md:text-5xl font-display font-bold text-accent-dark">
                {count}{value.slice(-1)}
            </div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-widest mt-2">{label}</div>
        </div>
    );
};

const TrustSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                {/* Counters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
                    <Counter value="1000+" label="Events Completed" />
                    <Counter value="50+" label="Clients" />
                    <Counter value="10+" label="Years Experience" />
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
