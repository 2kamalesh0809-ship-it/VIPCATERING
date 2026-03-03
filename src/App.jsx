import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import IntroAnimation from './components/IntroAnimation';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import MenuPage from './pages/MenuPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import EventsPage from './pages/EventsPage';
import MobileBottomNav from './components/MobileBottomNav';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Cinematic Floating Background
const ParallaxBackground = () => {
  // Track scroll position
  const { scrollY } = useScroll();

  // Slower, subtle scroll: Moves -1px for every 4px scrolled (25% speed)
  const y = useTransform(scrollY, [0, 4000], [0, -1000], { clamp: false });

  return (
    <div className="fixed inset-0 z-[-1] bg-[#0F0F0F] overflow-hidden pointer-events-none">
      {/* Layer 1 & 2: Background Image with blur, scaling, and parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-x-0 -top-[20%] h-[140%] scale-[1.15] md:scale-[1.1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      >
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070"
          alt="Luxury VIP Catering Atmosphere"
          className="w-full h-full object-cover blur-[8px] md:blur-[15px] brightness-[0.85] saturate-[1.1] will-change-transform"
        />
      </motion.div>

      {/* Layer 3: Dark Overlay (Cinematic contrast) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 will-change-transform" />

      {/* Layer 4: Deep Gold Ambient Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(201,162,39,0.18),transparent_60%)] mix-blend-screen" />

      {/* Layer 5: Cinematic Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />

      {/* Premium Parallax Background System */}
      <ParallaxBackground />

      <IntroAnimation />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 3.5, ease: "easeOut" }}
        className="min-h-screen selection:bg-primary/30 relative z-0"
      >
        <Navbar />
        <main className="pb-20 md:pb-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/events" element={<EventsPage />} />
          </Routes>
        </main>
        <Footer />
        <MobileBottomNav />
      </motion.div>
    </Router>
  );
}

export default App;
