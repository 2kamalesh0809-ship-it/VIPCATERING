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
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import QuotationPage from './pages/QuotationPage';
import SubmissionSuccess from './pages/SubmissionSuccess';
import MobileBottomNav from './components/MobileBottomNav';
import WeddingCatering from './pages/services/WeddingCatering';
import CorporateCatering from './pages/services/CorporateCatering';
import BirthdayCatering from './pages/services/BirthdayCatering';
import VegCatering from './pages/services/VegCatering';
import EventCatering from './pages/services/EventCatering';
import BlogPage from './pages/BlogPage';
import WeddingIdeasBlog from './pages/blog/WeddingIdeasBlog';
import CorporateMenuBlog from './pages/blog/CorporateMenuBlog';
import ChooseCatererBlog from './pages/blog/ChooseCatererBlog';

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
        className="absolute inset-x-0 -top-[20%] h-[140%] scale-[1.05] will-change-transform"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070"
          alt="Luxury VIP Catering Atmosphere"
          className="w-full h-full object-cover brightness-[0.4] saturate-[1.1] blur-[3px]"
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
            <Route path="/quotation" element={<QuotationPage />} />
            <Route path="/submission-success" element={<SubmissionSuccess />} />

            {/* SEO Service Pages */}
            <Route path="/wedding-catering-chennai" element={<WeddingCatering />} />
            <Route path="/corporate-catering-chennai" element={<CorporateCatering />} />
            <Route path="/birthday-party-catering-chennai" element={<BirthdayCatering />} />
            <Route path="/veg-catering-services-chennai" element={<VegCatering />} />
            <Route path="/event-catering-services-chennai" element={<EventCatering />} />

            {/* Blog Routes */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/wedding-catering-ideas-chennai" element={<WeddingIdeasBlog />} />
            <Route path="/blog/corporate-catering-menu-guide" element={<CorporateMenuBlog />} />
            <Route path="/blog/how-to-choose-best-caterer-chennai" element={<ChooseCatererBlog />} />

            {/* Private Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <MobileBottomNav />
      </motion.div>
    </Router>
  );
}

export default App;
