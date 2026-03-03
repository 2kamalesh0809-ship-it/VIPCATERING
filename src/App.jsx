import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background selection:bg-primary/30">
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
      </div>
    </Router>
  );
}

export default App;
