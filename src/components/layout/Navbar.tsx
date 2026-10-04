import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  X,
  Sun,
  Moon,
  Phone,
  Calendar,
  Clock,
  ShieldCheck,
  User as UserIcon,
  LogOut,
  FileText
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onOpenPortal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPortal }) => {
  const { toggleTheme, isDark } = useTheme();
  const { user, loginWithGoogle, logout, isAdmin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isClinicOpenNow = () => {
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const pktMinutes = (utcHours * 60 + utcMinutes + 5 * 60) % (24 * 60);
    return pktMinutes >= 1320 && pktMinutes <= 1410;
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Doctor', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Book Appointment', path: '/appointment' },
    { name: 'Contact & Location', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 bg-slate-950/85 dark:bg-slate-950/85 bg-white/90 backdrop-blur-md shadow-lg border-b border-teal-500/15'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 p-0.5 shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-[10px] bg-slate-950 dark:bg-slate-950 bg-white flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-teal-400" />
              </div>
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                Dr. Waseem <span className="text-teal-500">Allergy Clinic</span>
              </span>
              <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Gulshan-e-Iqbal, Karachi
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-teal-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-teal-500/10 dark:bg-teal-500/15 border border-teal-500/30 text-teal-600 dark:text-teal-300">
              <span
                className={`w-2 h-2 rounded-full ${
                  isClinicOpenNow() ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'
                }`}
              />
              <Clock className="w-3.5 h-3.5" />
              <span>10:00 PM – 11:30 PM Nightly</span>
            </div>

            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-500/40 text-slate-700 dark:text-slate-300 hover:text-teal-500 transition-colors bg-white/70 dark:bg-slate-900/70"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-4 h-4 text-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-4 h-4 text-teal-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl border border-teal-500/30 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 transition"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-7 h-7 rounded-full" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-teal-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                      {user.displayName?.[0] || 'U'}
                    </div>
                  )}
                  <span className="hidden sm:inline text-xs font-semibold max-w-[90px] truncate text-slate-800 dark:text-slate-200">
                    {user.displayName?.split(' ')[0] || 'Patient'}
                  </span>
                  {isAdmin && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1 rounded border border-amber-500/30">
                      Admin
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel shadow-2xl p-2 z-50 border border-teal-500/20 text-slate-800 dark:text-slate-100"
                    >
                      <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800 text-xs">
                        <p className="font-semibold truncate">{user.displayName || 'Signed In'}</p>
                        <p className="text-slate-400 truncate">{user.email}</p>
                      </div>
                      {onOpenPortal && (
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            onOpenPortal();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium hover:bg-teal-500/15 text-left text-teal-600 dark:text-teal-300 transition"
                        >
                          <FileText className="w-4 h-4" />
                          <span>{isAdmin ? 'Manage Appointments' : 'My Appointments'}</span>
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium hover:bg-rose-500/15 text-rose-500 transition text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => loginWithGoogle()}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-teal-500/40 text-teal-600 dark:text-teal-300 hover:bg-teal-500/10 transition"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Google Sign In</span>
              </button>
            )}

            <Link
              to="/appointment"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 hover:brightness-110 active:scale-95 shadow-md shadow-teal-500/25 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Visit</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-teal-400"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-950/95 dark:bg-slate-950/95 bg-white/95 backdrop-blur-xl border-b border-teal-500/20 px-4 pt-3 pb-6 shadow-2xl"
          >
            <div className="flex flex-col gap-1.5">
              <div className="p-3 mb-2 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-400" />
                  <span className="font-semibold text-teal-300">Hours: 10:00 PM – 11:30 PM Nightly</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold">
                  {isClinicOpenNow() ? 'OPEN' : 'NIGHTS'}
                </span>
              </div>

              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? 'bg-teal-500/20 text-teal-400 font-bold border-l-4 border-teal-400'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                {!user && (
                  <button
                    onClick={() => loginWithGoogle()}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-teal-500/40 text-teal-400 text-sm font-semibold"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Sign in with Google</span>
                  </button>
                )}
                {onOpenPortal && user && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenPortal();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800/80 text-teal-300 text-sm font-semibold"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{isAdmin ? 'Admin Dashboard' : 'My Appointments'}</span>
                  </button>
                )}
                <Link
                  to="/appointment"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-sm shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </Link>
                <a
                  href="tel:+923233772039"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm font-medium"
                >
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span>Call: +92 323 3772039</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
