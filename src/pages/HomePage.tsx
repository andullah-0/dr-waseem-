import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Calendar,
  Phone,
  Star,
  Clock,
  ShieldCheck,
  ArrowRight,
  Activity,
  Sparkles
} from 'lucide-react';
import { HomeHeroScene } from '../components/scenes/HomeHeroScene';
import { ServiceCard3D } from '../components/ui/ServiceCard3D';

export const HomePage: React.FC = () => {
  const reviewsPreview = [
    {
      name: 'Faraz Ahmed',
      comment: 'Dr. Waseem is truly an extraordinary doctor, offering exceptional treatment and care.',
      rating: 5,
      tag: 'Helpful staff',
    },
    {
      name: 'Farhan Salahuddin',
      comment: 'Very good doctor, takes keen interest in patients.',
      rating: 5,
      tag: 'Allergy clinic',
    },
    {
      name: 'Abrar Ahmed',
      comment:
        'Great experience! The staff was helpful and the doctor explained everything clearly. The allergy treatment was quick and accurate. Highly recommended.',
      rating: 5,
      tag: 'Helpful staff',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <HomeHeroScene />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent dark:from-slate-950/95 dark:via-slate-950/70 dark:to-transparent pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>Specialized Allergy & Respiratory Medicine • Karachi</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Breathe Freely with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-200">
                Dr. Waseem Allergy Clinic
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Targeted diagnosis and compassionate immunological care for chronic rhinitis, asthma, eczema, and complex allergies. Providing dedicated night consultations in Gulshan-e-Iqbal, Karachi.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/appointment"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-teal-500/25 hover:brightness-110 active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Link>

              <a
                href="tel:+923233772039"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-teal-500/40 text-teal-300 font-semibold text-sm backdrop-blur-md hover:bg-teal-500/10 active:scale-95 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now (+92 323 3772039)</span>
              </a>
            </div>

            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-base font-extrabold text-white">4.0</span>
                    <span className="text-xs text-amber-400">★★★★</span>
                  </div>
                  <span className="text-[11px] text-slate-400">14 Google Reviews</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">10:00 – 11:30 PM</p>
                  <p className="text-[11px] text-teal-300 font-medium">Every Night Clinic</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Helpful Staff</p>
                  <p className="text-[11px] text-slate-400">Gulshan-e-Iqbal, KHI</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold mb-3 border border-teal-500/20">
              <Activity className="w-3.5 h-3.5" />
              <span>Specialized Clinical Scope</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Expert Allergy Treatments
            </h2>
          </div>
          <Link
            to="/services"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-teal-600 dark:text-teal-400 hover:underline"
          >
            <span>Explore all clinical treatments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard3D
            id="rhinitis"
            title="Allergic Rhinitis"
            subtitle="Hay Fever & Pollen"
            description="Persistent sneezing, nasal congestion, watery eyes, and itching caused by environmental pollens and dust mites."
            symptoms={['Sneezing', 'Nasal Congestion', 'Watery Eyes', 'Post-nasal Drip']}
            treatment="Targeted nasal anti-inflammatory protocols, allergy testing, and environmental avoidance plans."
            iconShape="droplet"
          />

          <ServiceCard3D
            id="asthma"
            title="Bronchial Asthma"
            subtitle="Respiratory Care"
            description="Chronic airway hyper-responsiveness, wheezing, and chest tightness triggered by seasonal allergens and air quality."
            symptoms={['Wheezing', 'Shortness of Breath', 'Nighttime Cough', 'Chest Tightness']}
            treatment="Individualized asthma action plans, controller optimization, and trigger elimination."
            iconShape="lungs"
          />

          <ServiceCard3D
            id="skin"
            title="Skin Allergies"
            subtitle="Urticaria & Eczema"
            description="Itchy skin rashes, hives (urticaria), and atopic dermatitis causing severe skin inflammation and discomfort."
            symptoms={['Intense Itching', 'Red Welts / Hives', 'Dry Flaking Skin', 'Swelling']}
            treatment="Antihistamine stabilization, barrier repair, and allergy trigger identification."
            iconShape="shield"
          />
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>Google Patient Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Trusted by Patients Across Karachi
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
            Rated 4.0 stars from 14 verified Google reviews, recognized for helpful staff and precise allergy treatments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsPreview.map((review, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-panel border border-teal-500/15 flex flex-col justify-between hover:border-teal-500/35 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-400 border border-teal-500/30">
                    {review.tag}
                  </span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed mb-6">
                  &quot;{review.comment}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-xs">
                  {review.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{review.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Verified Patient Review</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 text-sm font-bold text-teal-500 hover:text-teal-400"
          >
            <span>Read all reviews and submit your experience</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl p-8 sm:p-12 relative overflow-hidden bg-gradient-to-r from-teal-950/80 via-slate-900/90 to-cyan-950/80 border border-teal-500/30 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Night Clinic Hours: 10:00 PM – 11:30 PM Every Night</span>
            </span>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Need Prompt Allergy Relief Tonight?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Dr. Waseem attends to patients every night at Unity Heights, off University Road, Block 13-C, Gulshan-e-Iqbal. Book your slot online or contact our clinic directly via WhatsApp.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/appointment"
                className="px-5 py-3 rounded-xl bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-teal-300 transition"
              >
                Reserve Your Appointment
              </Link>
              <a
                href="https://wa.me/923233772039"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600/90 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-emerald-500 transition"
              >
                Instant WhatsApp (+92 323 3772039)
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
