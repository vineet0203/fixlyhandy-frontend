import React from "react";
import { ShieldCheck } from "lucide-react";
import { NAV_ITEMS } from "./navConstants";

const VendorLeftSidebar = ({ activeSection, onNavigate }) => {
  return (
    <aside className="w-full flex flex-col gap-6 font-sans">
      {/* 1. Vertical Navigation Card */}
      <nav
        aria-label="Profile navigation"
        className="bg-white rounded-2xl border border-slate-200/70 p-3.5 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05),0_1px_3px_0_rgba(0,0,0,0.02)]"
      >
        <ul className="flex flex-col gap-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-left text-[14px] font-semibold transition-all duration-200 ease-out motion-reduce:transition-none cursor-pointer ${
                    isActive
                      ? "bg-[#2563eb] text-white shadow-sm font-bold translate-x-0.5"
                      : "text-slate-600 hover:bg-blue-50/70 hover:text-blue-700 hover:translate-x-0.5"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon
                    size={18}
                    className={`shrink-0 transition-colors duration-200 ${
                      isActive ? "text-white" : "text-slate-400 group-hover:text-blue-600"
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 2. Workmanship Guarantee Card */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-6 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05),0_1px_3px_0_rgba(0,0,0,0.02)] text-center transition-all duration-200 hover:shadow-md">
        <div className="flex items-center gap-2.5 justify-center mb-3.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-2xs">
            <ShieldCheck size={22} className="fill-blue-600 text-white" />
          </span>
          <h3 className="font-extrabold text-[15px] text-slate-900 tracking-tight">
            Workmanship Guarantee
          </h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed font-normal">
          I stand behind my work. All services are guaranteed for your peace of mind.
        </p>

        {/* Cursive Signature Graphic */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col items-center">
          <svg
            className="w-40 h-11 text-slate-800"
            viewBox="0 0 160 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M15 32 C 22 18, 30 10, 36 24 C 40 34, 45 12, 55 22 C 65 32, 75 14, 82 25 C 90 35, 96 16, 105 24 C 115 32, 120 18, 130 25 C 138 30, 142 22, 148 26"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32 15 C 28 26, 24 38, 20 42"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <text
              x="22"
              y="22"
              fontFamily="Brush Script MT, cursive, 'Caveat', sans-serif"
              fontSize="22"
              fontWeight="600"
              fill="currentColor"
              fontStyle="italic"
            >
              John Martinez
            </text>
          </svg>

          <span className="text-xs font-bold text-slate-900 mt-1">
            John Martinez
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            Licensed Plumber
          </span>
        </div>
      </div>

      {/* 3. We Accept Payment Card */}
      <div className="bg-white rounded-2xl border border-slate-200/70 p-6 shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05),0_1px_3px_0_rgba(0,0,0,0.02)]">
        <h3 className="font-extrabold text-[15px] text-slate-900 mb-4 tracking-tight">
          We Accept
        </h3>

        <div className="flex flex-col gap-2.5">
          {/* Row 1: Credit Cards */}
          <div className="grid grid-cols-4 gap-2">
            {/* Visa */}
            <div className="h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center font-extrabold text-[11px] text-[#1a1f71] tracking-wider shadow-2xs hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none">
              VISA
            </div>
            {/* Mastercard */}
            <div className="h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center shadow-2xs hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none">
              <div className="flex -space-x-1.5">
                <span className="h-4 w-4 rounded-full bg-[#eb001b] inline-block opacity-95"></span>
                <span className="h-4 w-4 rounded-full bg-[#f79e1b] inline-block opacity-90"></span>
              </div>
            </div>
            {/* Amex */}
            <div className="h-9 rounded-xl border border-slate-200 bg-[#006fcf] text-white flex items-center justify-center font-bold text-[9px] tracking-tight shadow-2xs hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none">
              AMEX
            </div>
            {/* Discover */}
            <div className="h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-[9px] font-black text-[#ff6000] tracking-tighter shadow-2xs hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none">
              DISC<span className="text-slate-800">OVER</span>
            </div>
          </div>

          {/* Row 2: Digital Wallets */}
          <div className="grid grid-cols-3 gap-2">
            {/* Apple Pay */}
            <div className="h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center gap-1 text-[11px] font-bold text-slate-900 shadow-2xs hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none">
              <span></span>Pay
            </div>
            {/* Google Pay */}
            <div className="h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center gap-0.5 text-[11px] font-bold text-slate-700 shadow-2xs hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none">
              <span className="text-blue-500 font-extrabold">G</span>Pay
            </div>
            {/* PayPal */}
            <div className="h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center gap-0.5 text-[11px] font-extrabold text-[#003087] italic shadow-2xs hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 ease-out motion-reduce:transform-none">
              PayPal
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default VendorLeftSidebar;
