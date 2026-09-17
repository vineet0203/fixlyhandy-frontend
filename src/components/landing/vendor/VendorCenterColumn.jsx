import React, { useState } from "react";
import {
  Calendar,
  Clock,
  ShieldCheck,
  Star,
  ArrowRight,
  Droplet,
  Flame,
  ChevronDown,
  Check,
  AlertCircle
} from "lucide-react";

import faucetImg from "../../../assets/vendor/project_faucet.jpg";
import pipeImg from "../../../assets/vendor/project_pipe_repair.jpg";
import heaterImg from "../../../assets/vendor/project_water_heater.jpg";
import showerImg from "../../../assets/vendor/project_shower.jpg";

// Custom SVG Icons matching the specific design tiles
const PipeDrainIcon = ({ className = "w-7 h-7 text-blue-600" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h4v6a4 4 0 0 0 4 4h4v6" />
    <path d="M16 20h4" />
    <circle cx="18" cy="4" r="2" />
  </svg>
);

const WaterHeaterIcon = ({ className = "w-7 h-7 text-blue-600" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="2" width="12" height="20" rx="3" />
    <circle cx="12" cy="9" r="2" />
    <line x1="12" y1="14" x2="12" y2="18" />
  </svg>
);

const FaucetIcon = ({ className = "w-7 h-7 text-blue-600" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12h8a4 4 0 0 0 4-4V5" />
    <path d="M14 5h4" />
    <path d="M16 3v4" />
    <path d="M6 12v6" />
    <path d="M3 18h6" />
  </svg>
);

const ToiletIcon = ({ className = "w-7 h-7 text-blue-600" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="3" width="10" height="7" rx="1" />
    <path d="M6 10h12v4a6 6 0 0 1-6 6H9a3 3 0 0 1-3-3v-7z" />
  </svg>
);

const PipeReplacementIcon = ({ className = "w-7 h-7 text-blue-600" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7h6a3 3 0 0 1 3 3v8a3 3 0 0 0 3 3h6" />
    <path d="M3 11h3" />
  </svg>
);

const DisposalIcon = ({ className = "w-7 h-7 text-blue-600" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="12" height="16" rx="2" />
    <line x1="6" y1="9" x2="18" y2="9" />
    <circle cx="12" cy="14" r="2" />
  </svg>
);

const SumpPumpIcon = ({ className = "w-7 h-7 text-blue-600" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 20h8" />
    <rect x="9" y="8" width="6" height="12" rx="1" />
    <path d="M12 4v4" />
    <path d="M6 8h12" />
  </svg>
);

const GasFlameIcon = ({ className = "w-7 h-7 text-blue-600" }) => (
  <Flame className={className} />
);

const WaterFilterIcon = ({ className = "w-7 h-7 text-blue-600" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="4" width="10" height="16" rx="2" />
    <line x1="7" y1="10" x2="17" y2="10" />
    <circle cx="12" cy="15" r="1.5" />
  </svg>
);

const EmergencyIcon = () => (
  <div className="relative flex items-center justify-center">
    <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-red-500 text-red-500 font-extrabold text-[10px] group-hover:scale-110 group-hover:bg-red-50 transition-all duration-200">
      24/7
    </span>
  </div>
);

// Fallback services mapping
const DEFAULT_SERVICE_TILES = [
  { name: "Leak Detection & Repair", icon: Droplet, isCustom: false },
  { name: "Drain Cleaning & Unclogging", icon: PipeDrainIcon, isCustom: true },
  { name: "Water Heater Installation & Repair", icon: WaterHeaterIcon, isCustom: true },
  { name: "Faucet & Fixture Installation", icon: FaucetIcon, isCustom: true },
  { name: "Toilet Repair & Installation", icon: ToiletIcon, isCustom: true },
  { name: "Pipe Repair & Replacement", icon: PipeReplacementIcon, isCustom: true },
  { name: "Garbage Disposal Installation", icon: DisposalIcon, isCustom: true },
  { name: "Sump Pump Installation", icon: SumpPumpIcon, isCustom: true },
  { name: "Gas Line Installation", icon: GasFlameIcon, isCustom: true },
  { name: "Water Filtration Systems", icon: WaterFilterIcon, isCustom: true },
  { name: "Emergency Plumbing (24/7)", icon: EmergencyIcon, isCustom: true },
];

const PROJECTS = [
  { title: "Kitchen Faucet Installation", img: faucetImg },
  { title: "Pipe Repair", img: pipeImg },
  { title: "Water Heater Installation", img: heaterImg },
  { title: "Shower Installation", img: showerImg },
];

const REVIEWS = [
  {
    initials: "SM",
    avatarBg: "bg-blue-600",
    name: "Sarah M.",
    date: "Aug 20, 2026",
    rating: 5.0,
    text: "John was professional, on time, and fixed our leaking pipe quickly. Great communication and fair pricing. Highly recommend!",
    tags: ["Professional", "On Time", "Great Quality"],
  },
  {
    initials: "JD",
    avatarBg: "bg-indigo-600",
    name: "James D.",
    date: "Aug 12, 2026",
    rating: 5.0,
    text: "Excellent service! Installed a new water heater for us. Very knowledgeable and clean work. Will definitely use again.",
    tags: ["Knowledgeable", "Clean Work", "Highly Recommend"],
  },
];

const FAQS = [
  {
    q: "Are you licensed and insured in Dallas, TX?",
    a: "Yes, fully licensed Master Plumber (#M-42678) with comprehensive liability insurance and complete Texas state compliance for residential and commercial systems."
  },
  {
    q: "Do you offer free estimates before starting work?",
    a: "Yes, all quote requests and on-site initial inspections for standard repairs and installations come with free, clear upfront estimates with zero obligation."
  },
  {
    q: "How fast is your 24/7 emergency response time?",
    a: "For emergency water leaks, burst pipes, and gas line issues across the Dallas-Fort Worth service area, on-site arrival is typically within 60 minutes."
  },
  {
    q: "What warranty or guarantee comes with your services?",
    a: "Every repair and installation is backed by our full 1-year Workmanship Guarantee covering parts, fittings, and labor for complete peace of mind."
  }
];

const VendorCenterColumn = ({ catalog, onSelectService }) => {
  const [openFaq, setOpenFaq] = useState(null);

  // Extract plumbing services from catalog if available
  const plumbingCategory = catalog?.find((c) =>
    c.name.toLowerCase().includes("plumbing")
  );

  const displayServices = DEFAULT_SERVICE_TILES.map((tile) => {
    const matchedService = plumbingCategory?.services?.find((s) =>
      s.name.toLowerCase().includes(tile.name.split(" ")[0].toLowerCase())
    );
    return {
      ...tile,
      apiData: matchedService || null,
    };
  });

  return (
    <div className="flex-1 w-full flex flex-col gap-8 font-sans">
      {/* 1. About Me Section */}
      <section
        id="about-me"
        className="scroll-mt-28 bg-white rounded-2xl border border-slate-200/70 p-6 sm:p-8 lg:p-9 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05),0_1px_3px_0_rgba(0,0,0,0.02)]"
      >
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-5 tracking-tight">
          About Me
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Left: 2 Paragraphs */}
          <div className="md:col-span-2 space-y-4 text-sm sm:text-[15px] leading-relaxed text-slate-600 font-normal">
            <p>
              Hi, I'm John Martinez, a licensed and insured plumber with over 8 years
              of experience serving homes and businesses in Dallas, TX and surrounding
              areas. I specialize in providing high-quality plumbing services with honest
              pricing, reliable scheduling, and a commitment to 100% customer satisfaction.
            </p>
            <p>
              Whether it's a small repair or a major installation, I treat every job
              with care and professionalism. Your home is important, and I'm here to
              keep your plumbing running smoothly.
            </p>
          </div>

          {/* Right: Stats Panel */}
          <div className="md:col-span-1 bg-slate-50/90 border border-slate-100 rounded-2xl p-5 flex flex-col gap-4">
            {/* Stat 1 */}
            <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/80 hover:-translate-y-0.5 transition-all duration-200 ease-out motion-reduce:transform-none">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100/70 text-blue-600">
                <Calendar size={18} />
              </span>
              <div>
                <div className="text-base font-black text-slate-900 leading-tight">
                  150+
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  Projects Completed
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/80 hover:-translate-y-0.5 transition-all duration-200 ease-out motion-reduce:transform-none">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100/70 text-blue-600">
                <Clock size={18} />
              </span>
              <div>
                <div className="text-base font-black text-slate-900 leading-tight">
                  98%
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  On-Time Service
                </div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/80 hover:-translate-y-0.5 transition-all duration-200 ease-out motion-reduce:transform-none">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100/70 text-blue-600">
                <ShieldCheck size={18} />
              </span>
              <div>
                <div className="text-base font-black text-slate-900 leading-tight">
                  100%
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  Customer Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. My Expertise & Services Section */}
      <section
        id="services"
        className="scroll-mt-28 bg-white rounded-2xl border border-slate-200/70 p-6 sm:p-8 lg:p-9 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05),0_1px_3px_0_rgba(0,0,0,0.02)]"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            My Expertise & Services
          </h2>
          <button
            type="button"
            onClick={() => onSelectService(displayServices[0].name)}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <span>View All Services</span>
            <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-200 ease-out motion-reduce:transform-none" />
          </button>
        </div>

        {/* 11 Bordered Tiles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {displayServices.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectService(item.name)}
                className="group p-4 sm:p-4.5 rounded-2xl border border-slate-200/80 bg-white hover:border-blue-600 hover:shadow-md hover:-translate-y-1 transition-all duration-200 ease-out motion-reduce:transform-none flex flex-col items-center justify-center text-center gap-3 min-h-[118px] cursor-pointer"
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-50/70 group-hover:bg-blue-100/70 group-hover:scale-110 transition-all duration-200 ease-out motion-reduce:transform-none">
                  {item.isCustom ? (
                    <Icon className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-200" />
                  ) : (
                    <Icon className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-200" />
                  )}
                </div>
                <span className="text-xs sm:text-[12.5px] font-bold text-slate-800 group-hover:text-blue-700 leading-tight transition-colors duration-200">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Recent Projects Section */}
      <section
        id="projects"
        className="scroll-mt-28 bg-white rounded-2xl border border-slate-200/70 p-6 sm:p-8 lg:p-9 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05),0_1px_3px_0_rgba(0,0,0,0.02)]"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Recent Projects
          </h2>
          <a
            href="#projects"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <span>View More Photos</span>
            <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-200 ease-out motion-reduce:transform-none" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROJECTS.map((proj, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-slate-200/80 overflow-hidden bg-white shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 ease-out motion-reduce:transform-none flex flex-col"
            >
              <div className="h-40 sm:h-44 w-full overflow-hidden bg-slate-100 relative">
                <img
                  src={proj.img}
                  alt={proj.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out motion-reduce:transform-none"
                />
              </div>
              <div className="p-3.5 text-center bg-white group-hover:bg-slate-50/80 transition-colors duration-200">
                <h3 className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-200">
                  {proj.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Customer Reviews Section */}
      <section
        id="reviews"
        className="scroll-mt-28 bg-white rounded-2xl border border-slate-200/70 p-6 sm:p-8 lg:p-9 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05),0_1px_3px_0_rgba(0,0,0,0.02)]"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Customer Reviews
          </h2>
          <a
            href="#reviews"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <span>See All Reviews</span>
            <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-200 ease-out motion-reduce:transform-none" />
          </a>
        </div>

        <div className="flex flex-col gap-4">
          {REVIEWS.map((rev, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 rounded-2xl border border-slate-200/70 bg-slate-50/40 hover:bg-white hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 ease-out motion-reduce:transform-none flex flex-col sm:flex-row gap-4 sm:gap-5 items-start"
            >
              {/* Circular Avatar */}
              <div
                className={`h-12 w-12 shrink-0 rounded-full ${rev.avatarBg} text-white flex items-center justify-center font-bold text-sm shadow-xs`}
              >
                {rev.initials}
              </div>

              {/* Review Details */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={16}
                          className="fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {rev.rating.toFixed(1)}
                    </span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 ml-1">
                      {rev.name}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400 font-medium">
                    {rev.date}
                  </span>
                </div>

                <p className="text-xs sm:text-[14px] text-slate-600 leading-relaxed font-normal mb-3.5">
                  {rev.text}
                </p>

                {/* Tag Chips */}
                <div className="flex flex-wrap gap-2">
                  {rev.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-lg bg-white border border-slate-200/80 text-slate-700 text-xs font-semibold shadow-2xs hover:border-slate-300 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Availability Section (Anchor for Left Nav) */}
      <section
        id="availability"
        className="scroll-mt-28 bg-white rounded-2xl border border-slate-200/70 p-6 sm:p-8 lg:p-9 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05),0_1px_3px_0_rgba(0,0,0,0.02)]"
      >
        <div className="flex items-center gap-2.5 mb-5">
          <Calendar className="text-blue-600" size={22} />
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Availability & Working Hours
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl border border-slate-200/70 bg-slate-50/50 hover:bg-white hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none">
            <span className="text-xs sm:text-sm font-extrabold text-slate-800 block">
              Monday – Friday
            </span>
            <span className="text-xs sm:text-sm text-slate-600 font-medium mt-1 block">
              7:00 AM – 7:00 PM
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-bold mt-2.5">
              <Check size={13} /> Regular Rates
            </span>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200/70 bg-slate-50/50 hover:bg-white hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none">
            <span className="text-xs sm:text-sm font-extrabold text-slate-800 block">
              Saturday
            </span>
            <span className="text-xs sm:text-sm text-slate-600 font-medium mt-1 block">
              8:00 AM – 5:00 PM
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-bold mt-2.5">
              <Check size={13} /> Standard Scheduling
            </span>
          </div>

          <div className="p-4 rounded-2xl border border-blue-200/60 bg-blue-50/40 hover:bg-blue-50/70 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none">
            <span className="text-xs sm:text-sm font-extrabold text-blue-900 block">
              Sunday & Holidays
            </span>
            <span className="text-xs sm:text-sm text-blue-700 font-medium mt-1 block">
              24/7 Emergency Calls
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-red-600 font-bold mt-2.5">
              <AlertCircle size={13} /> On-Demand Dispatch
            </span>
          </div>
        </div>
      </section>

      {/* 6. FAQ Section (Anchor for Left Nav) */}
      <section
        id="faq"
        className="scroll-mt-28 bg-white rounded-2xl border border-slate-200/70 p-6 sm:p-8 lg:p-9 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05),0_1px_3px_0_rgba(0,0,0,0.02)]"
      >
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-5 tracking-tight">
          Frequently Asked Questions
        </h2>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4.5 text-left flex items-center justify-between font-bold text-sm sm:text-[15px] text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 transition-transform duration-200 ease-out ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default VendorCenterColumn;
