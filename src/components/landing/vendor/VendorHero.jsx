import React, { useState } from "react";
import {
  Check,
  CheckCircle2,
  ShieldCheck,
  Star,
  Share2,
  Heart,
  Briefcase,
  MapPin,
  Zap,
  Award,
} from "lucide-react";
import johnPhoto from "../../../assets/vendor/john_martinez.jpg";

const VendorHero = ({ onScrollToReviews }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="w-full bg-white rounded-2xl border border-slate-200/70 shadow-[0_4px_30px_-4px_rgba(0,0,0,0.05),0_1px_3px_0_rgba(0,0,0,0.02)] p-6 sm:p-8 lg:p-9 xl:p-10 font-sans transition-all duration-200">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-10 xl:gap-12">
        {/* Left Photo with Floating Pills */}
        <div className="relative shrink-0 w-full sm:w-[320px] lg:w-[360px] xl:w-[400px] aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-50">
          <img
            src={johnPhoto}
            alt="John Martinez - Licensed Plumber"
            className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-500 ease-out motion-reduce:transform-none"
          />

          {/* Top-Right Badge: Available Today */}
          <div className="absolute top-4 right-4 bg-[#16a34a] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform duration-200 ease-out motion-reduce:transform-none">
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white/25">
              <Check size={11} strokeWidth={3} className="text-white" />
            </span>
            <span>Available Today</span>
          </div>

          {/* Bottom-Left Badge: Verified Provider */}
          <div className="absolute bottom-4 left-4 bg-[#0d1b2a]/95 backdrop-blur-md text-white text-xs font-bold px-4 py-2.5 rounded-2xl flex items-center gap-2 border border-white/20 shadow-lg hover:scale-105 transition-transform duration-200 ease-out motion-reduce:transform-none">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20 text-green-400">
              <ShieldCheck size={16} className="text-green-400" />
            </span>
            <span>Verified Provider</span>
          </div>
        </div>

        {/* Right Info Details */}
        <div className="flex-1 w-full flex flex-col justify-between self-stretch">
          <div className="space-y-5">
            {/* Top row: Name & Subtitle on left, Share & Save on right */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
                    John Martinez
                  </h1>
                  <span title="Verified Professional" className="inline-flex items-center justify-center text-blue-600">
                    <CheckCircle2 size={26} className="fill-blue-600 text-white" />
                  </span>
                </div>
                <p className="text-slate-600 font-medium text-base sm:text-lg mt-1.5">
                  Licensed Plumber | Residential & Commercial
                </p>
              </div>

              {/* Share & Save Actions */}
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none cursor-pointer"
                  aria-label="Share vendor profile"
                >
                  <Share2 size={13} className="text-slate-500" />
                  <span>{copied ? "Copied!" : "Share"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsSaved(!isSaved)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none cursor-pointer"
                  aria-label="Save vendor"
                >
                  <Heart
                    size={13}
                    className={isSaved ? "text-red-500 fill-red-500" : "text-slate-500"}
                  />
                  <span>Save</span>
                </button>
              </div>
            </div>

            {/* Ratings row */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm sm:text-base font-extrabold text-slate-900">4.9</span>
              <span className="text-xs sm:text-sm text-slate-500 font-medium">(186 reviews)</span>
              <button
                type="button"
                onClick={onScrollToReviews}
                className="group inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors ml-1 cursor-pointer"
              >
                <span>See all reviews</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200 ease-out motion-reduce:transform-none">
                  ›
                </span>
              </button>
            </div>

            {/* 3 Stats in a row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              <div className="flex items-center gap-3 p-3 sm:p-3.5 bg-slate-50/90 border border-slate-100 rounded-2xl hover:bg-slate-100/70 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-100/70 text-blue-600">
                  <Briefcase size={16} />
                </span>
                <span className="text-slate-800 text-xs sm:text-sm font-bold">8+ Years Experience</span>
              </div>

              <div className="flex items-center gap-3 p-3 sm:p-3.5 bg-slate-50/90 border border-slate-100 rounded-2xl hover:bg-slate-100/70 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-100/70 text-blue-600">
                  <MapPin size={16} />
                </span>
                <span className="text-slate-800 text-xs sm:text-sm font-bold">Dallas, TX Service Area</span>
              </div>

              <div className="flex items-center gap-3 p-3 sm:p-3.5 bg-slate-50/90 border border-slate-100 rounded-2xl hover:bg-slate-100/70 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-100/70 text-blue-600">
                  <Zap size={16} />
                </span>
                <span className="text-slate-800 text-xs sm:text-sm font-bold">Responds in 1 hour</span>
              </div>
            </div>

            {/* Pull Quote */}
            <div className="p-4 sm:p-5 bg-slate-50/80 rounded-2xl border border-slate-100">
              <p className="text-slate-700 text-sm sm:text-[15px] italic leading-relaxed font-medium">
                &ldquo;Reliable plumbing solutions for a better home. Quality work, honest pricing, and your satisfaction is my priority.&rdquo;
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-500 mt-2">
                – John Martinez
              </p>
            </div>
          </div>

          {/* Bottom Bordered Strip with 3 Trust Badges */}
          <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50/80 hover:-translate-y-0.5 transition-all duration-200 ease-out motion-reduce:transform-none">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 size={18} className="fill-emerald-600 text-white" />
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                Licensed & Insured
              </span>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50/80 hover:-translate-y-0.5 transition-all duration-200 ease-out motion-reduce:transform-none">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <ShieldCheck size={18} className="fill-emerald-600 text-white" />
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                Background Checked
              </span>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50/80 hover:-translate-y-0.5 transition-all duration-200 ease-out motion-reduce:transform-none">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Award size={18} className="fill-blue-600 text-white" />
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                Satisfaction Guarantee
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorHero;
