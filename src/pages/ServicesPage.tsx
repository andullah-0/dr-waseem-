import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { ServicesScene } from '../components/scenes/ServicesScene';
import { ServiceCard3D } from '../components/ui/ServiceCard3D';
import { Link } from 'react-router-dom';

export const CLINIC_SERVICES = [
  {
    id: 'allergic-rhinitis',
    title: 'Allergic Rhinitis',
    subtitle: 'Nasal & Eye Allergies',
    description:
      'Allergic rhinitis occurs when the immune system overreacts to airborne allergens such as tree/grass pollens, dust mites, and pet dander, causing chronic inflammation of the nasal lining.',
    symptoms: ['Repeated Sneezing', 'Itchy Nose & Roof of Mouth', 'Watery & Red Eyes', 'Chronic Congestion'],
    treatment: 'Evaluation of allergen triggers, nasal spray optimization, non-sedating antihistamines, and environmental barrier strategies.',
    iconShape: 'droplet' as const,
  },
  {
    id: 'bronchial-asthma',
    title: 'Bronchial Asthma',
    subtitle: 'Pulmonary Care',
    description:
      'A chronic inflammatory disorder of the airways that causes periodic breathlessness, wheezing, and chest tightness. Dr. Waseem offers precise management plans to restore active living.',
    symptoms: ['Exertional Wheezing', 'Chest Tightness', 'Persistent Night Cough', 'Shortness of Breath'],
    treatment: 'Comprehensive symptom evaluation, inhaler technique instruction, controller medication, and trigger avoidance.',
    iconShape: 'lungs' as const,
  },
  {
    id: 'skin-allergies',
    title: 'Skin Allergies (Urticaria & Eczema)',
    subtitle: 'Dermatological Immunology',
    description:
      'Dermatological allergic reactions including acute and chronic urticaria (hives/welts), angioedema (tissue swelling), and atopic eczema flare-ups triggered by immune sensitivities.',
    symptoms: ['Itchy Welts / Hives', 'Facial or Lip Swelling', 'Dry Flaking Patches', 'Eczema Flare-ups'],
    treatment: 'Targeted mast-cell stabilization, barrier emollients, skin prick testing consultation, and flare-prevention protocols.',
    iconShape: 'shield' as const,
  },
  {
    id: 'food-allergies',
    title: 'Food Allergies & Hypersensitivity',
    subtitle: 'Gastro & Systemic Care',
    description:
      'Assessment of adverse immune responses to dietary triggers such as nuts, dairy, seafood, and eggs, differentiating true IgE-mediated food allergies from non-allergic intolerances.',
    symptoms: ['Lip / Tongue Tingling', 'Digestive Distress', 'Sudden Hives', 'Anaphylaxis Risk'],
    treatment: 'Detailed dietary recall, systemic allergy risk screening, emergency action plans, and safe nutritional avoidance plans.',
    iconShape: 'molecule' as const,
  },
  {
    id: 'chronic-sinusitis',
    title: 'Chronic Sinusitis',
    subtitle: 'Sinus & Facial Pressure',
    description:
      'Prolonged inflammation of the sinus passages frequently aggravated by persistent allergic rhinitis, leading to facial pressure, headache, and impaired nasal airflow.',
    symptoms: ['Facial Pressure & Pain', 'Thick Discolored Mucus', 'Loss of Smell', 'Post-Nasal Irritation'],
    treatment: 'Sinonasal anti-inflammatory therapy, allergen mitigation, saline irrigation regimens, and secondary infection assessment.',
    iconShape: 'sinus' as const,
  },
  {
    id: 'allergy-testing-consultation',
    title: 'Allergy Testing & Consultation',
    subtitle: 'Diagnostic Screening',
    description:
      'Dedicated diagnostic consultations to pinpoint specific environmental, seasonal, and contact allergens. Learn exactly what is causing your reactions and how to effectively treat them.',
    symptoms: ['Unexplained Recurrent Allergies', 'Seasonal Symptoms', 'Workplace Allergies', 'Multi-organ Reactions'],
    treatment: 'Personalized diagnostic roadmap, review of previous lab reports, skin test consultation, and long-term care plans.',
    iconShape: 'testing' as const,
  },
];

export const ServicesPage: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20 overflow-hidden w-full">
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
        <ServicesScene />
        <div className="absolute inset-0 bg-slate-950/80 dark:bg-slate-950/85 bg-white/80 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Specialized Clinical Scope</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Specialized Allergy & Respiratory Services
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 mt-3 sm:mt-4 leading-relaxed">
            Every patient&apos;s immune system is unique. Our clinical evaluations are designed to identify underlying triggers and establish clear, safe treatment roadmaps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CLINIC_SERVICES.map((service) => (
            <ServiceCard3D
              key={service.id}
              id={service.id}
              title={service.title}
              subtitle={service.subtitle}
              description={service.description}
              symptoms={service.symptoms}
              treatment={service.treatment}
              iconShape={service.iconShape}
            />
          ))}
        </div>

        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl sm:rounded-3xl glass-panel border border-teal-500/25 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
              <span>Not Sure Which Allergy Evaluation You Need?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              Book a night consultation with Dr. Waseem (10:00 PM – 11:30 PM nightly) or message our clinic staff on WhatsApp. We will guide you on the necessary steps.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              to="/appointment"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition text-center"
            >
              Book An Evaluation
            </Link>
            <a
              href="https://wa.me/923233772039?text=Assalam-o-Alaikum%20Dr.%20Waseem%20Clinic,%20I%20would%20like%20guidance%20on%20which%20allergy%20service%20I%20need."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl border border-teal-500/40 text-teal-300 font-semibold text-xs hover:bg-teal-500/10 transition text-center"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
