import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Star,
  ExternalLink,
  Navigation,
  AlertTriangle
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-teal-500/20 pt-16 pb-12 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 p-0.5 shadow-md shadow-teal-500/20">
                <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-teal-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Dr. Waseem <span className="text-teal-400">Allergy Clinic</span>
                </h3>
                <p className="text-xs text-slate-400">Karachi, Pakistan</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Specialized diagnosis and targeted therapeutic management for chronic allergies, asthma, allergic rhinitis, and immunological disorders.
            </p>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-teal-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <Star className="w-4 h-4 text-slate-600" />
                  </div>
                  <span className="text-sm font-bold text-white">4.0</span>
                </div>
                <span className="text-[11px] font-medium text-slate-400">14 Google reviews</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 font-medium">
                  Helpful staff
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-medium">
                  Allergy clinic
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-teal-400">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-slate-400 hover:text-teal-400 transition">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-teal-400 transition">
                  About Dr. Waseem
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-teal-400 transition">
                  Clinical Services & Allergy Testing
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-slate-400 hover:text-teal-400 transition">
                  Patient Reviews & Testimonials
                </Link>
              </li>
              <li>
                <Link to="/appointment" className="text-slate-400 hover:text-teal-400 transition">
                  Book Night Consultation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-teal-400 transition">
                  Contact & Location Directions
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-teal-400">Clinic Hours & Timings</h4>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-teal-500/20 space-y-2.5">
              <div className="flex items-start gap-2 text-xs">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Night Clinic Timings:</p>
                  <p className="text-teal-300 font-bold">10:00 PM – 11:30 PM</p>
                  <p className="text-[11px] text-slate-400">Every night (Monday to Sunday)</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                <p className="font-semibold text-slate-300">Daytime Affiliation:</p>
                <p>Pakistan Allergy & Asthma Centre</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-teal-400">Clinic Location</h4>
            <div className="text-xs space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <p>
                  Unity Heights, off University Road, opposite Haq Bahu Apartments, Block 13-C, Gulshan-e-Iqbal, Karachi, 75300, Pakistan
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-cyan-400 shrink-0" />
                <p>
                  <span className="text-slate-300 font-medium">Plus Code:</span> W36Q+Q4 Gulshan-e-Iqbal, Karachi
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="tel:+923233772039"
                  className="text-teal-300 hover:text-teal-200 font-semibold transition"
                >
                  +92 323 3772039
                </a>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Dr.+Waseem+Allergy+Clinic+Gulshan-e-Iqbal+Karachi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-semibold hover:bg-teal-500/25 transition"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-amber-500/10 border border-amber-500/25 p-4 mb-8 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-200/90 leading-relaxed">
            <strong className="text-amber-300">Medical Disclaimer:</strong> This website is for information only and is not a substitute for professional medical advice. In an emergency, go to the nearest hospital.
          </p>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Dr. Waseem Allergy Clinic. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with modern precision for Karachi healthcare
          </p>
        </div>
      </div>
    </footer>
  );
};
