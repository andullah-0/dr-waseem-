import React from 'react';
import {
  Award,
  GraduationCap,
  Building2,
  Clock,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { DnaImmuneScene } from '../components/scenes/DnaImmuneScene';
import { Link } from 'react-router-dom';
import drWaseemPhoto from '../assets/images/dr_waseem_photo_1791102071340.jpg';

export const AboutPage: React.FC = () => {
  /**
   * =========================================================================
   * CUSTOMIZATION GUIDE:
   * To change the doctor's photo, credentials, or bio, modify the constants below:
   * =========================================================================
   */
  const DOCTOR_PHOTO_URL = drWaseemPhoto;
  const DOCTOR_QUALIFICATIONS = '[Add MBBS / FCPS / MCPS / Diploma in Allergy & Immunology qualifications here]';

  const timelineMilestones = [
    {
      year: 'Medical Foundation',
      title: 'Medical Degree & Clinical Residency',
      description: 'Completed foundational medical degree and specialized clinical residency in Internal Medicine and Respiratory care. [Add specific university/institution name here]',
      icon: GraduationCap,
    },
    {
      year: 'Specialization',
      title: 'Allergy & Immunology Focus',
      description: 'Advanced training in allergen immunotherapy, prick skin testing, bronchial asthma diagnostics, and immunology management.',
      icon: Award,
    },
    {
      year: 'Daytime Practice',
      title: 'Pakistan Allergy & Asthma Centre',
      description: 'Consultant physician offering comprehensive allergy evaluations and daytime pulmonary function assessments at the Pakistan Allergy & Asthma Centre.',
      icon: Building2,
    },
    {
      year: 'Night Clinic In Karachi',
      title: 'Dr. Waseem Allergy Clinic (Gulshan-e-Iqbal)',
      description: 'Established the dedicated night allergy practice at Unity Heights, Block 13-C, Gulshan-e-Iqbal, providing daily 10:00 PM to 11:30 PM consultations for Karachi residents.',
      icon: Clock,
    },
  ];

  return (
    <div className="relative min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20 overflow-hidden w-full">
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <DnaImmuneScene />
        <div className="absolute inset-0 bg-slate-950/75 dark:bg-slate-950/85 bg-white/75 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Consultant Allergy Specialist</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About Dr. Waseem
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
            Dedicated to helping patients in Karachi manage chronic allergic disorders, breathe easily, and regain their quality of life through scientific diagnosis and evidence-based clinical care.
          </p>
        </div>

        {/* Doctor Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start mb-14 sm:mb-20">
          <div className="lg:col-span-5">
            <div className="rounded-2xl sm:rounded-3xl glass-panel p-3.5 sm:p-4 border border-teal-500/25 shadow-2xl relative overflow-hidden group">
              <div className="relative aspect-[4/5] sm:aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src={DOCTOR_PHOTO_URL}
                  alt="Dr. Waseem Allergy Specialist"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                  <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-teal-500/90 text-slate-950 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">
                    Specialist Physician
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Dr. Waseem</h3>
                  <p className="text-xs text-teal-200 font-medium">Allergy & Respiratory Care Consultant</p>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 mt-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-300">
                <strong className="block text-white font-semibold mb-0.5">Qualifications:</strong>
                {DOCTOR_QUALIFICATIONS}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="p-5 sm:p-7 rounded-2xl sm:rounded-3xl glass-panel border border-teal-500/20 shadow-xl space-y-4 sm:space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Clinical Philosophy & Dual Practice
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Allergic diseases can significantly impact sleep, cognitive focus, productivity, and emotional well-being. Dr. Waseem specializes in diagnosing the root physiological causes of allergic rhinitis, asthma, chronic sinusitis, eczema, and unexplained hives.
              </p>

              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-start gap-3">
                <Building2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                    Daytime Practice at Pakistan Allergy & Asthma Centre
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px] sm:text-xs">
                    In addition to his dedicated evening clinic in Gulshan-e-Iqbal, Dr. Waseem also practices during the day at the prestigious <strong>Pakistan Allergy & Asthma Centre</strong>, contributing to broad respiratory health and allergic care in Karachi.
                  </p>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                    Night Clinic Consultations: 10:00 PM to 11:30 PM
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px] sm:text-xs">
                    Designed specifically for working professionals, students, and busy families in Karachi who need access to specialized healthcare after daytime work hours. Available every night at Unity Heights, Block 13-C, Gulshan-e-Iqbal.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Key Diagnostic & Treatment Expertise:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {[
                    'Allergic Rhinitis & Pollen Sensitization',
                    'Bronchial Asthma & Wheeze Assessment',
                    'Chronic Urticaria & Atopic Eczema',
                    'Food Allergens & Anaphylaxis Protocols',
                    'Comprehensive Skin Prick Testing Advice',
                    'Long-term Immunological Management',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200">
                      <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  to="/appointment"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition text-center"
                >
                  Schedule Consultation
                </Link>
                <a
                  href="tel:+923233772039"
                  className="px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-white text-xs font-semibold transition text-center"
                >
                  Contact Clinic (+92 323 3772039)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Career Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Professional Journey & Clinical Milestones
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              A timeline of dedication to allergy and immunology healthcare in Pakistan
            </p>
          </div>

          <div className="relative border-l-2 border-teal-500/30 ml-4 sm:ml-28 md:ml-32 space-y-6 sm:space-y-10">
            {timelineMilestones.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div key={idx} className="relative pl-6 sm:pl-10 group">
                  <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-slate-900 border-2 border-teal-400 flex items-center justify-center text-teal-300 shadow-md group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>

                  <span className="sm:absolute sm:-left-32 sm:top-1 sm:text-right sm:w-24 block text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-teal-400 mb-1 sm:mb-0">
                    {m.year}
                  </span>

                  <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl glass-panel border border-teal-500/15 group-hover:border-teal-500/40 transition">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-1">{m.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{m.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
