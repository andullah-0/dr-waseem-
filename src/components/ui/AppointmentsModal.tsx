import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Calendar,
  Phone,
  FileText,
  MessageCircle,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  AppointmentData,
  fetchAppointments,
  updateAppointmentStatus
} from '../../firebase';

interface AppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentsModal: React.FC<AppointmentsModalProps> = ({ isOpen, onClose }) => {
  const { user, isAdmin, loginWithGoogle } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await fetchAppointments(user.uid, isAdmin);
      setAppointments(data);
    } catch (err) {
      console.error('Failed to load appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, user, isAdmin]);

  const handleStatusChange = async (appointmentId: string, newStatus: AppointmentData['status']) => {
    setUpdatingId(appointmentId);
    try {
      await updateAppointmentStatus(appointmentId, newStatus);
      setAppointments(prev =>
        prev.map(a => (a.id === appointmentId ? { ...a, status: newStatus } : a))
      );
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-2xl bg-slate-900 border border-teal-500/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
      >
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {isAdmin ? 'Admin Appointment Manager' : 'My Clinic Appointments'}
              </h2>
              <p className="text-xs text-slate-400">
                {isAdmin ? 'Live database feed of patient requests' : 'Your consultation bookings with Dr. Waseem'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              disabled={loading}
              title="Refresh appointments"
              className="p-2 rounded-xl text-slate-400 hover:text-teal-400 hover:bg-slate-800 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {!user ? (
            <div className="text-center py-10 space-y-4">
              <p className="text-slate-300 text-sm">Please sign in with Google to view your appointments.</p>
              <button
                onClick={() => loginWithGoogle()}
                className="px-5 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-sm shadow-md"
              >
                Sign In with Google
              </button>
            </div>
          ) : loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
              <RefreshCw className="w-6 h-6 animate-spin text-teal-400" />
              <p className="text-xs">Fetching records from Firestore...</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <FileText className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-300">No appointments found</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {isAdmin
                  ? 'No patient appointments currently booked in the database.'
                  : 'You have not booked any appointments yet. Head to the Book Appointment page to reserve your slot.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-teal-500/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{app.patientName}</span>
                      <span className="text-xs text-slate-400">({app.age} yrs)</span>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                          app.status === 'confirmed'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : app.status === 'completed'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                            : app.status === 'cancelled'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-teal-400" />
                        {app.preferredDate} (10:00 PM – 11:30 PM)
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-teal-400" />
                        {app.phone}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 italic pt-1 line-clamp-2">
                      &quot;{app.problemDescription}&quot;
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center gap-2 shrink-0">
                    <a
                      href={`https://wa.me/${app.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Assalam-o-Alaikum ${app.patientName}, regarding your allergy appointment at Dr. Waseem Clinic.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-500/30 flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    {isAdmin && (
                      <select
                        value={app.status}
                        disabled={updatingId === app.id}
                        onChange={(e) =>
                          handleStatusChange(app.id!, e.target.value as AppointmentData['status'])
                        }
                        className="bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded-lg px-2 py-1 focus:ring-1 focus:ring-teal-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
