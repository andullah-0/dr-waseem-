import React from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Building2,
  Star
} from 'lucide-react';
import { LocationPinScene } from '../components/scenes/LocationPinScene';

export const ContactPage: React.FC = () => {
  const googleMapsDirectionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=Dr.+Waseem+Allergy+Clinic+Unity+Heights+Block+13-C+Gulshan-e-Iqbal+Karachi';

  const googleMapsEmbedUrl =
    'https://maps.google.com/maps?q=Dr.%20Waseem%20Allergy%20Clinic,%20Unity%20Heights,%20Block%2013-C,%20Gulshan-e-Iqbal,%20Karachi&t=&z=16&ie=UTF8&iwloc=&output=embed';

  return (
    <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      {/* 3D Floating Location Pin & Radar Scene */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <LocationPinScene />
        <div className="absolute inset-0 bg-slate-950/75 dark:bg-slate-950/85 bg-white/80 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clinic Address & Directions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Contact & Clinic Location
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            Conveniently located off University Road in Block 13-C, Gulshan-e-Iqbal, Karachi. Reach out via phone or WhatsApp, or use the interactive map below for turn-by-turn directions.
          </p>
        </div>

        {/* Contact Details & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Clinic Information Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            {/* Address Card */}
            <div className="p-6 rounded-3xl glass-panel border border-teal-500/25 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Clinic Address
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                    Unity Heights, off University Road, opposite Haq Bahu Apartments, Block 13-C, Gulshan-e-Iqbal, Karachi, 75300, Pakistan
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                  <Navigation className="w-4 h-4" />
                  <span>Plus Code: W36Q+Q4 Gulshan-e-Iqbal, Karachi</span>
                </div>
              </div>

              <div className="pt-1">
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="p-6 rounded-3xl glass-panel border border-teal-500/25 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Phone & WhatsApp Contact
                  </h3>
                  <p className="text-lg font-extrabold text-teal-400 mt-0.5">
                    +92 323 3772039
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Available for appointment inquiries and clinic directions
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href="tel:+923233772039"
                  className="py-2.5 px-4 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-teal-500/25 transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>Click to Call</span>
                </a>
                <a
                  href="https://wa.me/923233772039"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-500/30 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Clinic Timings Card */}
            <div className="p-6 rounded-3xl glass-panel border border-teal-500/25 space-y-3">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Clinic Timings
                  </h3>
                  <p className="text-sm font-extrabold text-amber-400 mt-0.5">
                    Every Night: 10:00 PM to 11:30 PM
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Monday through Sunday • Evening/Night Consultations
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                  Daytime: Pakistan Allergy & Asthma Centre
                </span>
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.0 (14)
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Interactive Google Map */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex-1 min-h-[420px] rounded-3xl glass-panel p-3 border border-teal-500/30 shadow-2xl flex flex-col">
              <div className="flex items-center justify-between px-3 py-2.5 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Dr. Waseem Allergy Clinic — Gulshan-e-Iqbal, Karachi
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">Opposite Haq Bahu Apartments</span>
              </div>

              <div className="relative flex-1 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 min-h-[360px]">
                <iframe
                  title="Google Map Location for Dr. Waseem Allergy Clinic, Gulshan-e-Iqbal, Karachi"
                  src={googleMapsEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
