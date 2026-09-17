import React from "react";
import {
  Calendar,
  MapPin,
  Check,
  Award,
  ShieldCheck,
  CheckCircle2,
  FileBadge,
  MessageCircle,
  Mail,
  ArrowRight
} from "lucide-react";

// Partner SVG Logos matching the screenshot with subtle lift
const BBBLogo = () => (
  <div className="h-11 px-2.5 py-1.5 bg-white border border-slate-200/80 rounded-xl flex items-center justify-center shadow-2xs hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none">
    <div className="bg-[#005a9c] text-white font-extrabold text-[11px] px-1.5 py-0.5 rounded tracking-tighter">
      BBB
    </div>
    <div className="text-[8px] font-bold text-slate-700 ml-1.5 leading-none text-left">
      ACCREDITED<br />BUSINESS
    </div>
  </div>
);

const ChamberLogo = () => (
  <div className="h-11 px-2.5 py-1.5 bg-white border border-slate-200/80 rounded-xl flex items-center justify-center shadow-2xs hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none">
    <div className="h-6 w-6 rounded-full border-2 border-slate-800 flex items-center justify-center text-[8px] font-black text-slate-800">
      C
    </div>
    <div className="text-[8px] font-bold text-slate-700 ml-1.5 leading-none text-left">
      CHAMBER<br /><span className="text-[7px] text-slate-500 font-medium">OF COMMERCE</span>
    </div>
  </div>
);

const PHCCLogo = () => (
  <div className="h-11 px-2.5 py-1.5 bg-white border border-slate-200/80 rounded-xl flex items-center justify-center shadow-2xs hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none">
    <div className="bg-[#c8102e] text-white font-black text-[10.5px] px-1.5 py-0.5 rounded">
      PHCC
    </div>
    <div className="text-[7.5px] font-bold text-slate-700 ml-1.5 leading-none text-left">
      PLUMBING<br /><span className="text-[6.5px] text-slate-500 font-medium">CONTRACTORS</span>
    </div>
  </div>
);

// Map Visual SVG matching Dallas radius graphic in design
const DallasMapGraphic = () => (
  <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-[#e8f1f5] border border-slate-200/80 shadow-2xs">
    <svg className="w-full h-full" viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
      {/* Background grid / streets */}
      <rect width="300" height="180" fill="#f1f5f9" />
      <path d="M0 45 L300 45" stroke="#e2e8f0" strokeWidth="3" />
      <path d="M0 130 L300 130" stroke="#e2e8f0" strokeWidth="3" />
      <path d="M60 0 L60 180" stroke="#e2e8f0" strokeWidth="3" />
      <path d="M220 0 L220 180" stroke="#e2e8f0" strokeWidth="3" />

      {/* Major highways */}
      <path d="M150 0 L150 180" stroke="#cbd5e1" strokeWidth="4" />
      <path d="M0 90 L300 90" stroke="#cbd5e1" strokeWidth="4" />
      <path d="M40 20 L260 160" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="6 3" />

      {/* Highway shields */}
      <rect x="142" y="18" width="16" height="12" rx="3" fill="#3b82f6" />
      <text x="150" y="27" fontSize="7" fontWeight="bold" fill="#fff" textAnchor="middle">75</text>

      <rect x="230" y="40" width="18" height="12" rx="3" fill="#3b82f6" />
      <text x="239" y="49" fontSize="7" fontWeight="bold" fill="#fff" textAnchor="middle">635</text>

      <rect x="52" y="125" width="16" height="12" rx="3" fill="#3b82f6" />
      <text x="60" y="134" fontSize="7" fontWeight="bold" fill="#fff" textAnchor="middle">30</text>

      {/* Radius Circle */}
      <circle cx="150" cy="90" r="58" fill="#3b82f6" fillOpacity="0.22" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="150" cy="90" r="28" fill="#3b82f6" fillOpacity="0.15" />

      {/* City Markers */}
      <text x="195" y="32" fontSize="9" fontWeight="bold" fill="#334155" textAnchor="middle">Plano</text>
      <text x="245" y="85" fontSize="9" fontWeight="bold" fill="#334155" textAnchor="middle">Garland</text>
      <text x="50" y="95" fontSize="9" fontWeight="bold" fill="#334155" textAnchor="middle">Irving</text>

      {/* Center Marker: Dallas */}
      <circle cx="150" cy="90" r="8" fill="#2563eb" />
      <circle cx="150" cy="90" r="3" fill="#ffffff" />
      <text x="150" y="112" fontSize="11" fontWeight="extrabold" fill="#0f172a" textAnchor="middle">Dallas</text>
    </svg>
  </div>
);

const SERVICE_AREA_CITIES = [
  "Plano",
  "Richardson",
  "Garland",
  "Carrollton",
  "Frisco",
  "McKinney",
];

const VendorRightSidebar = ({ onRequestQuote, onOpenMessageModal }) => {
  return (
    <aside className="w-full flex flex-col gap-6 font-sans">
      {/* 1. Book a Service Card */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-6 sm:p-7 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05),0_1px_3px_0_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2.5 mb-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-2xs">
            <Calendar size={18} />
          </span>
          <h3 className="font-extrabold text-[17px] text-slate-900 tracking-tight">
            Book a Service
          </h3>
        </div>

        {/* Orange CTA Button with lift and hover darken */}
        <button
          type="button"
          onClick={() => onRequestQuote({})}
          className="w-full py-3.5 px-4 bg-[#f26e06] hover:bg-[#d95a00] text-white font-extrabold text-[15px] rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-out motion-reduce:transform-none cursor-pointer tracking-wide"
        >
          Request a Quote
        </button>

        {/* Fine Print */}
        <p className="mt-4 text-center text-[11px] text-slate-400 font-medium tracking-tight">
          No obligation • Free estimates • Quick response
        </p>
      </div>

      {/* 2. Service Area Card */}
      <div id="service-area" className="scroll-mt-28 bg-white rounded-2xl border border-slate-200/70 p-6 sm:p-7 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05),0_1px_3px_0_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-2xs">
            <MapPin size={18} />
          </span>
          <h3 className="font-extrabold text-[16px] text-slate-900 tracking-tight">
            Service Area
          </h3>
        </div>

        {/* Map Radius Graphic */}
        <DallasMapGraphic />

        {/* Primary Location */}
        <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-900">
          <MapPin size={15} className="text-blue-600 shrink-0" />
          <span>Dallas, TX (Primary)</span>
        </div>

        {/* Checklist */}
        <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 mt-3.5">
          {SERVICE_AREA_CITIES.map((city) => (
            <div key={city} className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors">
              <Check size={14} strokeWidth={3} className="text-emerald-500 shrink-0" />
              <span>{city}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3.5 border-t border-slate-100">
          <a
            href="#service-area"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <span>View Full Service Area</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-200 ease-out motion-reduce:transform-none" />
          </a>
        </div>
      </div>

      {/* 3. Certifications & Affiliations Card */}
      <div id="certifications" className="scroll-mt-28 bg-white rounded-2xl border border-slate-200/70 p-6 sm:p-7 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05),0_1px_3px_0_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-2xs">
            <Award size={18} />
          </span>
          <h3 className="font-extrabold text-[16px] text-slate-900 tracking-tight">
            Certifications & Affiliations
          </h3>
        </div>

        {/* 3 Badge Tiles with subtle hover lift */}
        <div className="grid grid-cols-3 gap-2.5 text-center">
          <div className="p-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none flex flex-col items-center justify-center min-h-[84px]">
            <FileBadge size={20} className="text-blue-600 mb-1.5" />
            <span className="text-[10px] font-bold text-slate-800 leading-tight">
              Licensed Plumber #M-42678
            </span>
          </div>

          <div className="p-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none flex flex-col items-center justify-center min-h-[84px]">
            <ShieldCheck size={20} className="text-blue-600 mb-1.5" />
            <span className="text-[10px] font-bold text-slate-800 leading-tight">
              Insured General Liability
            </span>
          </div>

          <div className="p-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none flex flex-col items-center justify-center min-h-[84px]">
            <CheckCircle2 size={20} className="text-blue-600 mb-1.5" />
            <span className="text-[10px] font-bold text-slate-800 leading-tight">
              Background Checked
            </span>
          </div>
        </div>

        {/* Partner Logos Strip with subtle lift */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <BBBLogo />
          <ChamberLogo />
          <PHCCLogo />
        </div>
      </div>

      {/* 4. Connect With Me Card */}
      <div id="contact" className="scroll-mt-28 bg-white rounded-2xl border border-slate-200/70 p-6 sm:p-7 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05),0_1px_3px_0_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-2xs">
            <MessageCircle size={18} />
          </span>
          <h3 className="font-extrabold text-[16px] text-slate-900 tracking-tight">
            Connect With Me
          </h3>
        </div>

        {/* Social Icons with scale and hover lift */}
        <div className="grid grid-cols-4 gap-2.5 mb-4">
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="h-10 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 transition-all duration-200 ease-out motion-reduce:transform-none shadow-2xs font-bold text-sm"
          >
            f
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="h-10 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 transition-all duration-200 ease-out motion-reduce:transform-none shadow-2xs text-xs font-bold"
          >
            IG
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="h-10 rounded-2xl bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 transition-all duration-200 ease-out motion-reduce:transform-none shadow-2xs text-xs font-bold"
          >
            in
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            className="h-10 rounded-2xl bg-[#FF0000] text-white flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 transition-all duration-200 ease-out motion-reduce:transform-none shadow-2xs text-xs font-bold"
          >
            ▶
          </a>
        </div>

        {/* Send a Message Button */}
        <button
          type="button"
          onClick={onOpenMessageModal}
          className="w-full py-3 px-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs sm:text-[13px] rounded-2xl shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 transition-all duration-200 ease-out motion-reduce:transform-none cursor-pointer"
        >
          <Mail size={16} />
          <span>Send a Message</span>
        </button>
      </div>
    </aside>
  );
};

export default VendorRightSidebar;
