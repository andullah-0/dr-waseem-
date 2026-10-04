import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { AppointmentClockScene } from '../components/scenes/AppointmentClockScene';
import { useAuth } from '../context/AuthContext';
import { createAppointment } from '../firebase';

export const AppointmentPage: React.FC = () => {
  const { user, loginWithGoogle } = useAuth();

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [problemDescription, setProblemDescription] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState<string | null>(null);
  const [savedToCloud, setSavedToCloud] = useState(false);

  useEffect(() => {
    if (user?.displayName && !patientName) {
      setPatientName(user.displayName);
    }
    if (!preferredDate) {
      const today = new Date().toISOString().split('T')[0];
      setPreferredDate(today);
    }
  }, [user]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (patientName.trim().length < 2) {
      newErrors.patientName = 'Please enter patient full name (at least 2 characters).';
    }
    if (phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone or WhatsApp number.';
    }
    if (!age.trim() || isNaN(Number(age)) || Number(age) < 0 || Number(age) > 120) {
      newErrors.age = 'Please enter a valid age (e.g. 28).';
    }
    if (!preferredDate) {
      newErrors.preferredDate = 'Please select your preferred consultation date.';
    }
    if (problemDescription.trim().length < 5) {
      newErrors.problemDescription = 'Please briefly describe the allergy symptoms (at least 5 characters).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppLink = () => {
    const message = [
      `*New Appointment Request - Dr. Waseem Allergy Clinic*`,
      `----------------------------------`,
      `*Patient Name:* ${patientName.trim()}`,
      `*Phone:* ${phone.trim()}`,
      `*Age:* ${age.trim()} years`,
      `*Preferred Date:* ${preferredDate} (Night Clinic: 10:00 PM - 11:30 PM)`,
      `*Symptoms / Problem:* ${problemDescription.trim()}`,
      `----------------------------------`,
      `Please confirm my appointment slot. Thank you!`,
    ].join('\n');

    return `https://wa.me/923233772039?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSavedToCloud(false);

    const waUrl = generateWhatsAppLink();

    if (user) {
      try {
        await createAppointment({
          patientName: patientName.trim().slice(0, 100),
          phone: phone.trim().slice(0, 25),
          age: age.trim().slice(0, 10),
          preferredDate: preferredDate.slice(0, 30),
          problemDescription: problemDescription.trim().slice(0, 1000),
          userId: user.uid,
          userEmail: user.email || '',
        });
        setSavedToCloud(true);
      } catch (err) {
        console.warn('Could not save to cloud, proceeding with WhatsApp:', err);
      }
    }

    setSubmittedWhatsappUrl(waUrl);
    setIsSubmitting(false);

    const a = document.createElement('a');
    a.href = waUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="relative min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20 overflow-hidden w-full">
      {/* 3D Night Clock Scene */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <AppointmentClockScene />
        <div className="absolute inset-0 bg-slate-950/75 dark:bg-slate-950/85 bg-white/80 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Clinic Hours & Info */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Nightly Allergy Consultations</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Book Your Appointment
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 sm:mt-3 leading-relaxed">
                Complete the consultation request form. Your details will be pre-filled for immediate WhatsApp confirmation with Dr. Waseem Allergy Clinic.
              </p>
            </div>

            {/* Night Clinic Timings Card */}
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl glass-panel border border-amber-500/30 bg-amber-500/5 space-y-2.5 sm:space-y-3 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-5 sm:w-6 h-5 sm:h-6" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-extrabold text-amber-400">
                    Important Timing Note
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    10:00 PM – 11:30 PM Nightly
                  </h3>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Dr. Waseem Allergy Clinic operates <strong>every night from 10:00 PM to 11:30 PM</strong> at Unity Heights, Block 13-C, Gulshan-e-Iqbal, Karachi. Please arrive 10 minutes prior to your scheduled visit.
              </p>
            </div>

            {/* Cloud Persistence Status */}
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl glass-panel border border-teal-500/20 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Online Patient Record Sync</span>
              </div>
              {user ? (
                <p className="text-xs text-slate-400">
                  Signed in as <strong className="text-white">{user.email}</strong>. Your appointment will also be saved to your online Patient Portal.
                </p>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-slate-400">
                    Want to track your appointment history online? Sign in with Google before submitting (optional).
                  </p>
                  <button
                    type="button"
                    onClick={() => loginWithGoogle()}
                    className="px-3.5 py-1.5 rounded-lg bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-semibold hover:bg-teal-500/25 transition"
                  >
                    Sign In with Google
                  </button>
                </div>
              )}
            </div>

            {/* Direct Call Box */}
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl glass-panel border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-400 shrink-0" />
                <div>
                  <p className="text-[11px] text-slate-400">Prefer calling directly?</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">+92 323 3772039</p>
                </div>
              </div>
              <a
                href="tel:+923233772039"
                className="px-3.5 sm:px-4 py-2 rounded-xl bg-teal-500/20 text-teal-300 text-xs font-bold hover:bg-teal-500/30 transition shrink-0"
              >
                Call Clinic
              </a>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-8 md:p-9 rounded-2xl sm:rounded-3xl glass-panel border border-teal-500/30 shadow-2xl">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-5 sm:mb-6">
                Patient Consultation Form
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
                {/* Patient Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g., Muhammad Ali"
                    className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-base sm:text-sm focus:border-teal-400 focus:outline-none"
                  />
                  {errors.patientName && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.patientName}
                    </p>
                  )}
                </div>

                {/* Phone & Age Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g., 0323 3772039"
                      className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-base sm:text-sm focus:border-teal-400 focus:outline-none"
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Patient Age (Years) *
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={120}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g., 32"
                      className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-base sm:text-sm focus:border-teal-400 focus:outline-none"
                    />
                    {errors.age && (
                      <p className="text-xs text-rose-400 mt-1">{errors.age}</p>
                    )}
                  </div>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Preferred Date (10:00 PM – 11:30 PM Night Slot) *
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-base sm:text-sm focus:border-teal-400 focus:outline-none"
                  />
                  {errors.preferredDate && (
                    <p className="text-xs text-rose-400 mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                {/* Problem Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Allergy Symptoms / Problem Description *
                  </label>
                  <textarea
                    rows={4}
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                    placeholder="Briefly describe your allergy symptoms (e.g., sneezing, dust allergy, skin hives, asthma wheezing, sinus congestion)..."
                    className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-base sm:text-sm focus:border-teal-400 focus:outline-none"
                  />
                  {errors.problemDescription && (
                    <p className="text-xs text-rose-400 mt-1">{errors.problemDescription}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-teal-500/25 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <span className="truncate">
                    {isSubmitting
                      ? 'Preparing Appointment...'
                      : 'Book & Send via WhatsApp (+92 323 3772039)'}
                  </span>
                </button>
              </form>

              {/* Confirmation Box */}
              {submittedWhatsappUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 sm:mt-6 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-emerald-500/15 border border-emerald-500/40 space-y-3"
                >
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Appointment Details Ready!</span>
                  </div>
                  {savedToCloud && (
                    <p className="text-xs text-teal-300">
                      ✓ Saved to your online clinic record.
                    </p>
                  )}
                  <p className="text-xs text-slate-200 leading-relaxed">
                    If WhatsApp did not open automatically, click the button below to send your pre-filled booking message directly to <strong>+92 323 3772039</strong>:
                  </p>
                  <a
                    href={submittedWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-emerald-400 transition text-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp with Details</span>
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
