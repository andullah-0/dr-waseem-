import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  Quote,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Send,
  User as UserIcon,
  MessageSquarePlus
} from 'lucide-react';
import { ReviewsScene } from '../components/scenes/ReviewsScene';
import { useAuth } from '../context/AuthContext';
import { createReview, subscribeToReviews, ReviewData } from '../firebase';

const GOOGLE_VERIFIED_REVIEWS = [
  {
    id: 'google-1',
    authorName: 'Faraz Ahmed',
    rating: 5,
    comment: 'Dr. Waseem is truly an extraordinary doctor, offering exceptional treatment and care.',
    tag: 'Allergy clinic',
    source: 'Google Review',
  },
  {
    id: 'google-2',
    authorName: 'Farhan Salahuddin',
    rating: 5,
    comment: 'Very good doctor, takes keen interest in patients.',
    tag: 'Helpful staff',
    source: 'Google Review',
  },
  {
    id: 'google-3',
    authorName: 'Abrar Ahmed',
    rating: 5,
    comment:
      'Great experience! The staff was helpful and the doctor explained everything clearly. The allergy treatment was quick and accurate. Highly recommended.',
    tag: 'Helpful staff',
    source: 'Google Review',
  },
];

export const ReviewsPage: React.FC = () => {
  const { user, loginWithGoogle } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedRating, setAnimatedRating] = useState(0);
  const [communityReviews, setCommunityReviews] = useState<ReviewData[]>([]);

  // Review submission state
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [selectedTag, setSelectedTag] = useState('Helpful staff');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Animated star rating counter up to 4.0
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 0.2;
      if (current >= 4.0) {
        setAnimatedRating(4.0);
        clearInterval(interval);
      } else {
        setAnimatedRating(Number(current.toFixed(1)));
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Subscribe to Firestore reviews
  useEffect(() => {
    const unsub = subscribeToReviews((data) => {
      setCommunityReviews(data);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (user?.displayName && !authorName) {
      setAuthorName(user.displayName);
    }
  }, [user]);

  const allReviews = [
    ...GOOGLE_VERIFIED_REVIEWS,
    ...communityReviews.map((r) => ({
      id: r.id || Math.random().toString(),
      authorName: r.authorName,
      rating: r.rating,
      comment: r.comment,
      tag: r.tag || 'Allergy clinic',
      source: 'Verified Patient Portal',
    })),
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % allReviews.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + allReviews.length) % allReviews.length);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setErrorMsg(null);

    if (authorName.trim().length < 2) {
      setErrorMsg('Please enter your name (at least 2 characters).');
      return;
    }
    if (comment.trim().length < 5) {
      setErrorMsg('Please write a brief comment (at least 5 characters).');
      return;
    }

    setSubmitting(true);
    try {
      await createReview({
        authorName: authorName.trim().slice(0, 100),
        rating,
        comment: comment.trim().slice(0, 1000),
        tag: selectedTag,
        userId: user.uid,
      });
      setComment('');
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 4000);
    } catch (err) {
      setErrorMsg('Could not submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      {/* 3D Floating Stars & Rings Scene */}
      <div className="absolute inset-0 z-0 opacity-75 pointer-events-none">
        <ReviewsScene />
        <div className="absolute inset-0 bg-slate-950/75 dark:bg-slate-950/85 bg-white/80 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Rating Header & Counter */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Patient Testimonials & Feedback</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What Our Patients Say
          </h1>

          {/* Animated Star Rating Counter Badge */}
          <div className="mt-8 inline-flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl glass-panel border border-teal-500/25 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="text-5xl font-extrabold text-amber-400 tracking-tight">
                {animatedRating.toFixed(1)}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                  <Star className="w-5 h-5 text-slate-600" />
                </div>
                <p className="text-xs font-semibold text-slate-400 mt-1">
                  Based on 14 Google reviews
                </p>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-800 hidden sm:block" />

            {/* Highlighted Tags */}
            <div className="flex flex-col items-start gap-2">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                Most Mentioned Highlights:
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/40 text-teal-300 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  Helpful staff
                </span>
                <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  Allergy clinic
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Floating Carousel */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative rounded-3xl glass-panel p-8 sm:p-12 border border-teal-500/30 shadow-2xl min-h-[260px] flex flex-col justify-between">
            <Quote className="w-12 h-12 text-teal-500/20 absolute top-6 right-8 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={allReviews[activeIndex]?.id}
                initial={{ opacity: 0, x: 30, rotateY: 8 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -30, rotateY: -8 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: allReviews[activeIndex]?.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30">
                    {allReviews[activeIndex]?.tag}
                  </span>
                </div>

                <p className="text-lg sm:text-2xl font-medium text-slate-900 dark:text-white leading-relaxed italic">
                  &quot;{allReviews[activeIndex]?.comment}&quot;
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200/50 dark:border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-teal-500 to-cyan-400 text-slate-950 font-extrabold flex items-center justify-center text-base">
                      {allReviews[activeIndex]?.authorName?.[0] || 'P'}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        {allReviews[activeIndex]?.authorName}
                      </h4>
                      <p className="text-xs text-teal-500 font-medium">
                        {allReviews[activeIndex]?.source}
                      </p>
                    </div>
                  </div>

                  {/* Carousel Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevSlide}
                      aria-label="Previous review"
                      className="p-2.5 rounded-xl border border-slate-700 hover:border-teal-400 text-slate-300 hover:text-teal-400 transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      aria-label="Next review"
                      className="p-2.5 rounded-xl border border-slate-700 hover:border-teal-400 text-slate-300 hover:text-teal-400 transition"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* All Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {allReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl glass-panel border border-teal-500/20 flex flex-col justify-between hover:border-teal-400/40 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 font-semibold">
                    {rev.tag}
                  </span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed mb-5">
                  &quot;{rev.comment}&quot;
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800 flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900 dark:text-white">{rev.authorName}</span>
                <span className="text-[11px] text-slate-400">{rev.source}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Leave a Review & Google Link Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Google Maps Review Callout */}
          <div className="lg:col-span-5 p-7 rounded-3xl glass-panel border border-teal-500/25 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              View & Post on Google Maps
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Dr. Waseem Allergy Clinic is rated 4.0 stars on Google Maps by patients in Karachi. Your feedback helps others find specialized nighttime allergy care in Gulshan-e-Iqbal.
            </p>
            <div className="pt-2">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Dr.+Waseem+Allergy+Clinic+Gulshan-e-Iqbal+Karachi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition"
              >
                <span>See Reviews on Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Patient Portal Feedback Form */}
          <div className="lg:col-span-7 p-7 rounded-3xl glass-panel border border-teal-500/25">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquarePlus className="w-5 h-5 text-teal-400" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Share Your Clinic Experience
              </h3>
            </div>

            {!user ? (
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
                <p className="text-xs text-slate-300">
                  Sign in with your Google account to post a verified patient review on our clinic wall.
                </p>
                <button
                  onClick={() => loginWithGoogle()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Sign In with Google to Review</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-teal-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Highlight Tag</label>
                    <select
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-teal-400 focus:outline-none"
                    >
                      <option value="Helpful staff">Helpful staff</option>
                      <option value="Allergy clinic">Allergy clinic</option>
                      <option value="Accurate treatment">Accurate treatment</option>
                      <option value="Night consultation">Night consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Star Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setRating(num)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            num <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Your Feedback</label>
                  <textarea
                    rows={3}
                    required
                    maxLength={1000}
                    placeholder="Share your experience with Dr. Waseem and the clinic staff..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:border-teal-400 focus:outline-none"
                  />
                </div>

                {errorMsg && <p className="text-xs text-rose-400">{errorMsg}</p>}
                {submitSuccess && (
                  <p className="text-xs text-emerald-400 font-semibold">
                    Thank you! Your review has been published.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-teal-400 transition disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Submitting...' : 'Post Verified Review'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
