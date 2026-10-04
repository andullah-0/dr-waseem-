import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingActions } from './components/ui/FloatingActions';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { AppointmentsModal } from './components/ui/AppointmentsModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { ContactPage } from './pages/ContactPage';

function ScrollAndTitleManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const titles: Record<string, string> = {
      '/': 'Dr. Waseem Allergy Clinic | Gulshan-e-Iqbal, Karachi',
      '/about': 'About Dr. Waseem | Allergy & Asthma Specialist in Karachi',
      '/services': 'Clinical Services & Allergy Testing | Dr. Waseem Allergy Clinic',
      '/reviews': 'Patient Reviews & Testimonials | Dr. Waseem Allergy Clinic',
      '/appointment': 'Book Night Consultation (10:00 PM - 11:30 PM) | Dr. Waseem Clinic',
      '/contact': 'Clinic Location & Contact | Gulshan-e-Iqbal, Karachi',
    };

    document.title = titles[pathname] || 'Dr. Waseem Allergy Clinic | Karachi';
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="min-h-screen"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [portalOpen, setPortalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollAndTitleManager />
          <AnimatePresence>
            {initialLoading && <LoadingScreen key="loader" />}
          </AnimatePresence>

          <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <Navbar onOpenPortal={() => setPortalOpen(true)} />
            <AnimatedRoutes />
            <Footer />
            <FloatingActions />
            <AppointmentsModal isOpen={portalOpen} onClose={() => setPortalOpen(false)} />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
