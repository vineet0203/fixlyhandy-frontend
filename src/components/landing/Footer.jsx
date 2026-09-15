import React, { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  Tag,
  Users,
  Zap,
  Calendar,
  Home,
  Bot,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  Globe,
  Leaf,
  Handshake,
  CheckCircle2,
  Lock,
  Star,
  Clock,
  Send
} from "lucide-react";

const Footer = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  
  // Section visibility states for scroll-triggered fade up
  const [visibleSections, setVisibleSections] = useState({
    band1: false,
    band2: false,
    band3: false,
    band4: false,
    band5: false,
  });

  const band1Ref = useRef(null);
  const band2Ref = useRef(null);
  const band3Ref = useRef(null);
  const band4Ref = useRef(null);
  const band5Ref = useRef(null);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionKey = entry.target.getAttribute("data-band");
          if (sectionKey) {
            setVisibleSections((prev) => ({ ...prev, [sectionKey]: true }));
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const refs = [
      { ref: band1Ref, key: "band1" },
      { ref: band2Ref, key: "band2" },
      { ref: band3Ref, key: "band3" },
      { ref: band4Ref, key: "band4" },
      { ref: band5Ref, key: "band5" },
    ];

    refs.forEach(({ ref, key }) => {
      if (ref.current) {
        ref.current.setAttribute("data-band", key);
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmailInput("");
    }
  };

  return (
    <footer className="w-full font-sans bg-white text-slate-900 selection:bg-[#f26e06] selection:text-white">
      {/* Self-contained styling for handwritten font, wipe animation, shine sweep, reduced motion */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');

        .font-script {
          font-family: 'Caveat', cursive, sans-serif;
        }

        /* Underline wipe on link hover */
        .footer-link-wipe {
          position: relative;
          display: inline-block;
          text-decoration: none;
          transition: color 200ms ease-out;
        }
        .footer-link-wipe::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 0;
          height: 1.5px;
          background-color: #f26e06;
          transition: width 220ms ease-out;
        }
        .footer-link-wipe:hover::after {
          width: 100%;
        }

        /* Subtle tile lift with soft shadow */
        .tile-lift {
          transition: transform 250ms ease-out, box-shadow 250ms ease-out;
        }
        .tile-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25);
        }

        /* Social icons scale */
        .social-scale {
          transition: transform 200ms ease-out;
        }
        .social-scale:hover {
          transform: scale(1.12) translateY(-2px);
        }

        /* Shine sweep on Subscribe button */
        .shine-sweep {
          position: relative;
          overflow: hidden;
        }
        .shine-sweep::before {
          content: '';
          position: absolute;
          top: 0;
          left: -130%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
          transform: skewX(-25deg);
          transition: left 600ms cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }
        .shine-sweep:hover::before {
          left: 130%;
        }

        /* Staggered scroll fade up */
        .scroll-fade {
          transition: opacity 300ms ease-out, transform 300ms ease-out;
        }
        .scroll-fade.hidden-fade {
          opacity: 0;
          transform: translateY(20px);
        }
        .scroll-fade.show-fade {
          opacity: 1;
          transform: translateY(0);
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .scroll-fade,
          .footer-link-wipe,
          .footer-link-wipe::after,
          .tile-lift,
          .social-scale,
          .shine-sweep,
          .shine-sweep::before {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>

      {/* ============================================================ */}
      {/* BAND 1: LINK GRID (White Background) */}
      {/* ============================================================ */}
      <div
        ref={band1Ref}
        className={`bg-white border-t border-slate-200 pt-12 pb-14 px-4 sm:px-6 lg:px-10 xl:px-12 scroll-fade ${
          visibleSections.band1 ? "show-fade" : "hidden-fade"
        }`}
      >
        <div className="max-w-[1520px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-8 items-start justify-between">
          
          {/* Left Column: Brand Logo, Tagline, Trust Badges, Handwritten Script */}
          <div className="w-full lg:w-[220px] xl:w-[230px] flex-shrink-0 flex flex-col items-start">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2.5 group">
              <div className="relative w-12 h-12 flex-shrink-0">
                <svg viewBox="0 0 54 54" className="w-full h-full drop-shadow-sm">
                  {/* Roof eaves (orange) */}
                  <path d="M27 5 L50 24 L45 28 L27 13 L9 28 L4 24 Z" fill="#f26e06" />
                  {/* House base (brand-navy) */}
                  <polygon points="11,26 27,15 43,26 43,47 11,47" fill="#0D1B2A" />
                  {/* White hammer tilted inside */}
                  <g transform="translate(19, 24) rotate(-35) scale(0.72)">
                    <rect x="7" y="0" width="11" height="8" rx="2" fill="#ffffff" />
                    <rect x="11" y="6" width="3.5" height="17" rx="1.5" fill="#ffffff" />
                    <path d="M2 3 L7 0 L7 6 L3 7 Z" fill="#ffffff" />
                  </g>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[26px] font-black tracking-tight leading-none">
                  <span className="text-[#0D1B2A]">fixly</span>
                  <span className="text-[#f26e06]">handy</span>
                </span>
              </div>
            </a>

            {/* Slogan */}
            <p className="mt-2 text-[12px] font-extrabold text-[#0D1B2A] tracking-wider uppercase">
              Find &bull; Hire &bull; Get It Done
            </p>

            {/* Tagline */}
            <p className="mt-1.5 text-[12px] leading-relaxed text-slate-600 max-w-[210px]">
              Trusted Local Providers for Every Project, Big or Small.
            </p>

            {/* Three Trust Badges (Row) */}
            <div className="mt-4 grid grid-cols-3 gap-2 w-full max-w-[220px] pt-1">
              <div className="flex flex-col items-center text-center group">
                <div className="w-8 h-8 rounded-full border border-orange-200 bg-orange-50 flex items-center justify-center text-[#f26e06] group-hover:bg-[#f26e06] group-hover:text-white transition-colors duration-200">
                  <ShieldCheck size={16} strokeWidth={2.2} />
                </div>
                <span className="mt-1.5 text-[10px] font-bold text-slate-800 leading-tight">
                  Verified Providers
                </span>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-8 h-8 rounded-full border border-orange-200 bg-orange-50 flex items-center justify-center text-[#f26e06] group-hover:bg-[#f26e06] group-hover:text-white transition-colors duration-200">
                  <Tag size={15} strokeWidth={2.2} />
                </div>
                <span className="mt-1.5 text-[10px] font-bold text-slate-800 leading-tight">
                  Fair Pricing
                </span>
              </div>

              <div className="flex flex-col items-center text-center group">
                <div className="w-8 h-8 rounded-full border border-orange-200 bg-orange-50 flex items-center justify-center text-[#f26e06] group-hover:bg-[#f26e06] group-hover:text-white transition-colors duration-200">
                  <Users size={15} strokeWidth={2.2} />
                </div>
                <span className="mt-1.5 text-[10px] font-bold text-slate-800 leading-tight">
                  Trusted Community
                </span>
              </div>
            </div>

            {/* Handwritten Script with Orange Swash */}
            <div className="mt-6 flex flex-col items-start pl-1">
              <span className="font-script text-[28px] xl:text-[32px] font-bold text-[#0D1B2A] -rotate-3 select-none leading-none">
                A Handier Tomorrow
              </span>
              <svg
                viewBox="0 0 170 18"
                className="w-40 h-3.5 text-[#f26e06] -mt-1 fill-current overflow-visible"
                aria-hidden="true"
              >
                <path d="M4 12 C 45 16, 105 17, 166 3 C 115 10, 60 12, 4 12 Z" />
              </svg>
            </div>
          </div>

          {/* Center 7 Link Columns */}
          <nav
            aria-label="Footer Navigation"
            className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-x-6 gap-y-8"
          >
            {/* Column 1: PRODUCTS */}
            <div>
              <h3 className="text-[12px] font-bold text-[#0D1B2A] tracking-wider uppercase">
                PRODUCTS
              </h3>
              <div className="w-5 h-[2.5px] bg-[#f26e06] rounded-full mt-1 mb-3.5" />
              <ul className="space-y-2 text-[13px]">
                {[
                  "Find a Provider",
                  "Book a Service",
                  "Instant Quotes",
                  "Project Management",
                  "Payments & Invoicing",
                  "Ratings & Reviews",
                  "Mobile Apps",
                  "Business Solutions",
                  "API & Integrations",
                  "Pricing Plans",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="footer-link-wipe text-slate-600 hover:text-[#f26e06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f26e06] rounded"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: FIXLYHANDY PROVIDERS */}
            <div>
              <h3 className="text-[12px] font-bold text-[#0D1B2A] tracking-wider uppercase">
                FIXLYHANDY PROVIDERS
              </h3>
              <div className="w-5 h-[2.5px] bg-[#f26e06] rounded-full mt-1 mb-3.5" />
              <ul className="space-y-2 text-[13px]">
                {[
                  "Join as a Provider",
                  "Provider Dashboard",
                  "Manage Jobs",
                  "Availability & Scheduling",
                  "Verify Your Skills",
                  "Background Check",
                  "Provider Resources",
                  "Tools & Training",
                  "Success Stories",
                  "Provider Community",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="footer-link-wipe text-slate-600 hover:text-[#f26e06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f26e06] rounded"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: SERVICES */}
            <div>
              <h3 className="text-[12px] font-bold text-[#0D1B2A] tracking-wider uppercase">
                SERVICES
              </h3>
              <div className="w-5 h-[2.5px] bg-[#f26e06] rounded-full mt-1 mb-3.5" />
              <ul className="space-y-2 text-[13px]">
                {[
                  "Home Repairs",
                  "Plumbing",
                  "Electrical",
                  "Carpentry",
                  "Painting",
                  "HVAC",
                  "Landscaping",
                  "Cleaning",
                  "Flooring & Tile",
                  "All Services",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="footer-link-wipe text-slate-600 hover:text-[#f26e06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f26e06] rounded"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: OUR COMMUNITY */}
            <div>
              <h3 className="text-[12px] font-bold text-[#0D1B2A] tracking-wider uppercase">
                OUR COMMUNITY
              </h3>
              <div className="w-5 h-[2.5px] bg-[#f26e06] rounded-full mt-1 mb-3.5" />
              <ul className="space-y-2 text-[13px]">
                {[
                  "Customer Stories",
                  "Provider Stories",
                  "Tips & Guides",
                  "Home Improvement Blog",
                  "DIY Resources",
                  "Community Projects",
                  "Charity & Give Back",
                  "Refer a Friend",
                  "Events & Initiatives",
                  "Local Impact",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="footer-link-wipe text-slate-600 hover:text-[#f26e06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f26e06] rounded"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: AI & SMART TOOLS */}
            <div>
              <h3 className="text-[12px] font-bold text-[#0D1B2A] tracking-wider uppercase">
                AI &amp; SMART TOOLS
              </h3>
              <div className="w-5 h-[2.5px] bg-[#f26e06] rounded-full mt-1 mb-3.5" />

              {/* Masterdesk AI Highlight Item with NEW pill */}
              <div className="mb-2.5 p-1.5 -ml-1 rounded-lg hover:bg-orange-50/60 transition-colors">
                <a
                  href="#masterdesk-ai"
                  className="group flex items-start gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f26e06] rounded"
                >
                  <div className="w-6 h-6 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0 mt-0.5">
                    <Bot size={14} />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[13px] font-semibold text-slate-800 group-hover:text-[#f26e06] transition-colors">
                        Masterdesk AI
                      </span>
                      <span className="bg-[#f26e06] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase leading-none shadow-xs">
                        NEW
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 leading-tight">
                      Answering Service
                    </span>
                  </div>
                </a>
              </div>

              <ul className="space-y-2 text-[13px]">
                {[
                  "AI Service Match",
                  "AI Project Estimator",
                  "AI Scheduling Assistant",
                  "AI Chat Support",
                  "AI Home Maintenance Tips",
                  "AI for Providers",
                  "Smart Notifications",
                  "Business Automation",
                  "AI Insights & Reports",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="footer-link-wipe text-slate-600 hover:text-[#f26e06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f26e06] rounded"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 6: MANAGE YOUR WORK */}
            <div>
              <h3 className="text-[12px] font-bold text-[#0D1B2A] tracking-wider uppercase">
                MANAGE YOUR WORK
              </h3>
              <div className="w-5 h-[2.5px] bg-[#f26e06] rounded-full mt-1 mb-3.5" />
              <ul className="space-y-2 text-[13px]">
                {[
                  "Job Tracking",
                  "Scheduling",
                  "Customer Messages",
                  "Estimates & Invoices",
                  "Work History",
                  "Client Management",
                  "Calendar & Reminders",
                  "Mobile Access",
                  "Analytics & Reports",
                  "Grow Your Business",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="footer-link-wipe text-slate-600 hover:text-[#f26e06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f26e06] rounded"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 7: MOBILE APPS + App Store & Google Play Badges */}
            <div>
              <h3 className="text-[12px] font-bold text-[#0D1B2A] tracking-wider uppercase">
                MOBILE APPS
              </h3>
              <div className="w-5 h-[2.5px] bg-[#f26e06] rounded-full mt-1 mb-3.5" />
              <ul className="space-y-2 text-[13px] mb-4">
                {[
                  "iOS App",
                  "Android App",
                  "Provider App",
                  "Customer App",
                  "Push Notifications",
                  "GPS & Live Tracking",
                  "Offline Access",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="footer-link-wipe text-slate-600 hover:text-[#f26e06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f26e06] rounded"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>

              {/* App Store & Google Play download badges */}
              <div className="space-y-2 pt-1">
                {/* App Store */}
                <a
                  href="#app-store"
                  aria-label="Download FixlyHandy on the App Store"
                  className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors border border-slate-700 shadow-sm w-full max-w-[140px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f26e06]"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 1.01-2.85-.9.04-2 .6-2.65 1.35-.58.66-1.09 1.73-1.03 2.76 1.01.08 2.05-.51 2.67-1.26z" />
                  </svg>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[8px] text-slate-300 font-normal uppercase tracking-tight">
                      Download on the
                    </span>
                    <span className="text-[12px] font-semibold text-white tracking-tight">
                      App Store
                    </span>
                  </div>
                </a>

                {/* Google Play */}
                <a
                  href="#google-play"
                  aria-label="Get FixlyHandy on Google Play"
                  className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors border border-slate-700 shadow-sm w-full max-w-[140px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f26e06]"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0">
                    <path
                      d="M3.609 1.814L13.792 12 3.61 22.186a1.99 1.99 0 0 1-.61-1.444V3.258c0-.568.225-1.087.609-1.444z"
                      fill="#00D3FF"
                    />
                    <path
                      d="M17.208 8.583L13.792 12l3.416 3.417 3.864-2.228c.638-.368.638-1.97 0-2.338l-3.864-2.268z"
                      fill="#FFD200"
                    />
                    <path
                      d="M3.61 1.814l10.182 10.186 3.416-3.417L5.592.747C4.85.32 3.992.83 3.61 1.814z"
                      fill="#00F176"
                    />
                    <path
                      d="M3.61 22.186c.382.984 1.24 1.494 1.982 1.067l11.616-6.836-3.416-3.417L3.61 22.186z"
                      fill="#FF3954"
                    />
                  </svg>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[8px] text-slate-300 font-normal uppercase tracking-tight">
                      GET IT ON
                    </span>
                    <span className="text-[12px] font-semibold text-white tracking-tight">
                      Google Play
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </nav>

          {/* Right Column: Realistic Phone Mockup (Hidden below lg) */}
          <div className="hidden lg:block w-[185px] xl:w-[200px] flex-shrink-0">
            <div className="relative mx-auto w-full max-w-[200px] rounded-[32px] border-[5px] border-slate-900 bg-slate-900 shadow-2xl overflow-hidden ring-1 ring-slate-800">
              
              {/* Dynamic Island / Speaker Pill */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-full z-20 flex items-center justify-end px-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              </div>

              {/* Inner Screen */}
              <div className="relative w-full bg-[#0a2038] text-white pt-6 pb-2 flex flex-col items-center">
                
                {/* Header in Phone: Logo */}
                <div className="flex flex-col items-center pt-1 px-3 text-center">
                  <div className="w-7 h-7">
                    <svg viewBox="0 0 54 54" className="w-full h-full">
                      <path d="M27 5 L50 24 L45 28 L27 13 L9 28 L4 24 Z" fill="#f26e06" />
                      <polygon points="11,26 27,15 43,26 43,47 11,47" fill="#ffffff" />
                      <g transform="translate(19, 24) rotate(-35) scale(0.72)">
                        <rect x="7" y="0" width="11" height="8" rx="2" fill="#0D1B2A" />
                        <rect x="11" y="6" width="3.5" height="17" rx="1.5" fill="#0D1B2A" />
                      </g>
                    </svg>
                  </div>
                  <span className="text-[14px] font-black tracking-tight leading-tight mt-0.5">
                    <span className="text-white">fixly</span>
                    <span className="text-[#f26e06]">handy</span>
                  </span>
                  <span className="text-[9px] text-slate-300 font-medium">
                    Your Home Projects Made Easy
                  </span>
                </div>

                {/* 4 Action Pills */}
                <div className="w-full px-2.5 space-y-1.5 mt-2.5">
                  <div className="bg-white/95 rounded-lg px-2 py-1.5 flex items-center gap-2 shadow-xs">
                    <div className="w-5 h-5 rounded-md bg-[#f26e06] text-white flex items-center justify-center flex-shrink-0">
                      <Calendar size={11} strokeWidth={2.5} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-800">Book a Service</span>
                  </div>

                  <div className="bg-white/95 rounded-lg px-2 py-1.5 flex items-center gap-2 shadow-xs">
                    <div className="w-5 h-5 rounded-md bg-sky-500 text-white flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={11} strokeWidth={2.5} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-800">Track Progress</span>
                  </div>

                  <div className="bg-white/95 rounded-lg px-2 py-1.5 flex items-center gap-2 shadow-xs">
                    <div className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center flex-shrink-0">
                      <Lock size={11} strokeWidth={2.5} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-800">Pay Securely</span>
                  </div>

                  <div className="bg-white/95 rounded-lg px-2 py-1.5 flex items-center gap-2 shadow-xs">
                    <div className="w-5 h-5 rounded-md bg-purple-500 text-white flex items-center justify-center flex-shrink-0">
                      <Star size={11} strokeWidth={2.5} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-800">Rate &amp; Review</span>
                  </div>
                </div>

                {/* House Photo Preview */}
                <div className="w-full px-2 mt-2">
                  <div className="w-full h-[76px] rounded-t-lg overflow-hidden border-t border-x border-white/20 shadow-xs relative bg-slate-800">
                    <img
                      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80"
                      alt="Modern home"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Orange Bottom Button */}
                <div className="w-full px-2">
                  <div className="w-full bg-[#f26e06] hover:bg-[#e05d00] transition-colors text-white text-[10.5px] font-extrabold py-2 text-center rounded-b-xl shadow-md cursor-pointer">
                    Get It Done Today!
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* BAND 2: FEATURE STRIP (Navy Background) */}
      {/* ============================================================ */}
      <div
        ref={band2Ref}
        className={`bg-[#0A1B2D] text-white py-6 px-4 sm:px-6 lg:px-10 xl:px-12 border-t border-b border-white/10 scroll-fade ${
          visibleSections.band2 ? "show-fade" : "hidden-fade"
        }`}
      >
        <div className="max-w-[1520px] mx-auto flex flex-col xl:flex-row items-center justify-between gap-6">
          
          {/* 6 Feature Items with Divider Lines */}
          <div className="w-full flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            
            {/* Feature 1: Fast & Easy */}
            <div className="flex items-center gap-3.5 py-2 sm:py-0 px-2 tile-lift cursor-default rounded-xl">
              <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center text-white flex-shrink-0 shadow-md">
                <Zap size={18} strokeWidth={2.4} />
              </div>
              <div className="flex flex-col">
                <h4 className="text-[13px] font-bold text-white leading-snug">
                  Fast &amp; Easy
                </h4>
                <p className="text-[11px] text-slate-300 leading-tight">
                  Book in minutes, get it done.
                </p>
              </div>
            </div>

            {/* Feature 2: Verified Providers */}
            <div className="flex items-center gap-3.5 py-2 sm:py-0 px-2 sm:pl-4 tile-lift cursor-default rounded-xl">
              <div className="w-10 h-10 rounded-full bg-[#f26e06] flex items-center justify-center text-white flex-shrink-0 shadow-md">
                <ShieldCheck size={18} strokeWidth={2.4} />
              </div>
              <div className="flex flex-col">
                <h4 className="text-[13px] font-bold text-white leading-snug">
                  Verified Providers
                </h4>
                <p className="text-[11px] text-slate-300 leading-tight">
                  Background checked and trusted.
                </p>
              </div>
            </div>

            {/* Feature 3: Secure Payments */}
            <div className="flex items-center gap-3.5 py-2 sm:py-0 px-2 sm:pl-4 tile-lift cursor-default rounded-xl">
              <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center text-white flex-shrink-0 shadow-md">
                <DollarSign size={18} strokeWidth={2.4} />
              </div>
              <div className="flex flex-col">
                <h4 className="text-[13px] font-bold text-white leading-snug">
                  Secure Payments
                </h4>
                <p className="text-[11px] text-slate-300 leading-tight">
                  Pay safely and hassle-free.
                </p>
              </div>
            </div>

            {/* Feature 4: Flexible Scheduling */}
            <div className="flex items-center gap-3.5 py-2 sm:py-0 px-2 sm:pl-4 tile-lift cursor-default rounded-xl">
              <div className="w-10 h-10 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white flex-shrink-0 shadow-md">
                <Calendar size={18} strokeWidth={2.4} />
              </div>
              <div className="flex flex-col">
                <h4 className="text-[13px] font-bold text-white leading-snug">
                  Flexible Scheduling
                </h4>
                <p className="text-[11px] text-slate-300 leading-tight">
                  Choose a time that works for you.
                </p>
              </div>
            </div>

            {/* Feature 5: All Home Services */}
            <div className="flex items-center gap-3.5 py-2 sm:py-0 px-2 sm:pl-4 tile-lift cursor-default rounded-xl">
              <div className="w-10 h-10 rounded-full bg-[#E11D48] flex items-center justify-center text-white flex-shrink-0 shadow-md">
                <Home size={18} strokeWidth={2.4} />
              </div>
              <div className="flex flex-col">
                <h4 className="text-[13px] font-bold text-white leading-snug">
                  All Home Services
                </h4>
                <p className="text-[11px] text-slate-300 leading-tight">
                  From small fixes to big renovations.
                </p>
              </div>
            </div>

            {/* Feature 6: Powered by Masterdesk AI */}
            <div className="flex items-center gap-3.5 py-2 sm:py-0 px-2 sm:pl-4 tile-lift cursor-default rounded-xl">
              <div className="w-10 h-10 rounded-full bg-[#1D4ED8] flex items-center justify-center text-white flex-shrink-0 shadow-md">
                <Bot size={18} strokeWidth={2.4} />
              </div>
              <div className="flex flex-col">
                <h4 className="text-[13px] font-bold text-white leading-snug">
                  Powered by Masterdesk AI
                </h4>
                <p className="text-[11px] text-slate-300 leading-tight">
                  AI answering, scheduling &amp; customer support.
                </p>
              </div>
            </div>

          </div>

          {/* Right Slogan Script: "Better Homes Stronger Communities" */}
          <div className="flex-shrink-0 xl:pl-6 xl:border-l xl:border-white/10 flex flex-col items-center xl:items-end">
            <div className="text-center xl:text-right">
              <p className="font-script text-[22px] xl:text-[24px] font-bold text-white leading-tight -rotate-2 select-none">
                Better Homes
              </p>
              <p className="font-script text-[22px] xl:text-[24px] font-bold text-white leading-tight -rotate-2 select-none -mt-1">
                Stronger Communities
              </p>
              <svg
                viewBox="0 0 170 18"
                className="w-44 h-3.5 text-[#f26e06] mt-0.5 fill-current overflow-visible mx-auto xl:ml-auto"
                aria-hidden="true"
              >
                <path d="M4 12 C 45 16, 105 17, 166 3 C 115 10, 60 12, 4 12 Z" />
              </svg>
            </div>
          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* BAND 3: ASSOCIATIONS (White Background) */}
      {/* ============================================================ */}
      <div
        ref={band3Ref}
        className={`bg-white py-6 px-4 sm:px-6 lg:px-10 xl:px-12 border-b border-slate-200 scroll-fade ${
          visibleSections.band3 ? "show-fade" : "hidden-fade"
        }`}
      >
        <div className="max-w-[1520px] mx-auto flex flex-wrap lg:flex-nowrap items-center justify-between gap-6 lg:gap-4">
          
          {/* Left Title */}
          <div className="text-[11px] font-extrabold text-[#0D1B2A] tracking-wider uppercase max-w-[130px] leading-tight flex-shrink-0">
            WE ARE PROUDLY ASSOCIATED WITH
          </div>

          {/* 4 Association Badges */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8 xl:gap-10">
            
            {/* BBB Accredited Business */}
            <div className="flex items-center gap-2 group">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full fill-[#005a9c]">
                  <path d="M18 2 C16 6 12 10 12 15 C12 19 15 22 18 22 C21 22 24 19 24 15 C24 10 20 6 18 2 Z" />
                  <path d="M18 10 C17 12 15 14 15 16 C15 18 16.5 19 18 19 C19.5 19 21 18 21 16 C21 14 19 12 18 10 Z" fill="#f26e06" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-black text-[#005a9c] tracking-tight leading-none">
                  BBB
                </span>
                <span className="text-[8px] font-bold text-[#005a9c] uppercase tracking-tighter">
                  Accredited Business
                </span>
              </div>
            </div>

            {/* Chamber of Commerce */}
            <div className="flex items-center gap-2 group">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full fill-[#0c356a]">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="#0c356a" strokeWidth="2.5" />
                  <path d="M12 18 C12 13 16 10 21 10 C24 10 26 12 27 14 C25 14 23 13 21 13 C18 13 15 15 15 18 C15 21 18 23 21 23 C23 23 25 22 27 22 C26 24 24 26 21 26 C16 26 12 23 12 18 Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold text-[#0D1B2A] tracking-wider uppercase leading-tight">
                  CHAMBER
                </span>
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tight">
                  OF COMMERCE
                </span>
                <span className="text-[7px] text-slate-400 italic">
                  Stronger Together
                </span>
              </div>
            </div>

            {/* Builderslog */}
            <div className="flex items-center gap-2 group">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <polygon points="18,3 32,10 18,17 4,10" fill="#f26e06" />
                  <polygon points="4,10 18,17 18,33 4,26" fill="#0D1B2A" />
                  <polygon points="32,10 18,17 18,33 32,26" fill="#1D4ED8" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-extrabold text-[#0D1B2A] tracking-tight leading-tight">
                  Builderslog
                </span>
                <span className="text-[8px] font-medium text-slate-500">
                  Build. Connect. Grow.
                </span>
              </div>
            </div>

            {/* Google Reviews */}
            <div className="flex items-center gap-2 group">
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {/* Google colored wordmark */}
                  <span className="font-semibold text-[13px] tracking-tight">
                    <span className="text-[#4285F4]">G</span>
                    <span className="text-[#EA4335]">o</span>
                    <span className="text-[#FBBC05]">o</span>
                    <span className="text-[#4285F4]">g</span>
                    <span className="text-[#34A853]">l</span>
                    <span className="text-[#EA4335]">e</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[11px] font-extrabold text-slate-900">5.0</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={11} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <span className="text-[8px] text-slate-500 font-medium leading-none">
                  Customer Reviews
                </span>
              </div>
            </div>

          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-[1px] h-9 bg-slate-300 flex-shrink-0" />

          {/* 4 Community Impact Badges */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8 xl:gap-10">
            
            {/* Support Local Businesses */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Leaf size={16} strokeWidth={2.2} />
              </div>
              <span className="mt-1 text-[10px] font-bold text-slate-800 max-w-[90px] leading-tight">
                Support Local Businesses
              </span>
            </div>

            <div className="hidden md:block w-[1px] h-7 bg-slate-200" />

            {/* Create Local Jobs */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Handshake size={16} strokeWidth={2.2} />
              </div>
              <span className="mt-1 text-[10px] font-bold text-slate-800 max-w-[80px] leading-tight">
                Create Local Jobs
              </span>
            </div>

            <div className="hidden md:block w-[1px] h-7 bg-slate-200" />

            {/* Stronger Communities */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users size={16} strokeWidth={2.2} />
              </div>
              <span className="mt-1 text-[10px] font-bold text-slate-800 max-w-[80px] leading-tight">
                Stronger Communities
              </span>
            </div>

            <div className="hidden md:block w-[1px] h-7 bg-slate-200" />

            {/* A Cleaner Greener Tomorrow */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Globe size={16} strokeWidth={2.2} />
              </div>
              <span className="mt-1 text-[10px] font-bold text-slate-800 max-w-[90px] leading-tight">
                A Cleaner Greener Tomorrow
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* BAND 4: CONTACT / LEGAL & NEWSLETTER (Navy Background) */}
      {/* ============================================================ */}
      <div
        ref={band4Ref}
        className={`bg-[#0A192F] text-white pt-10 pb-12 px-4 sm:px-6 lg:px-10 xl:px-12 scroll-fade ${
          visibleSections.band4 ? "show-fade" : "hidden-fade"
        }`}
      >
        <div className="max-w-[1520px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 xl:gap-10">
          
          {/* Column 1: CONTACT US (3 cols) */}
          <div className="lg:col-span-3 lg:border-r lg:border-white/10 lg:pr-6">
            <h4 className="text-[12px] font-bold text-white tracking-wider uppercase mb-4">
              CONTACT US
            </h4>
            <address className="not-italic space-y-3 text-[13px] text-slate-300">
              <div className="flex items-start gap-3 group">
                <MapPin size={16} className="text-sky-400 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  7920 Belt Line Rd., Ste. 720<br />
                  Dallas, TX 75254
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <Phone size={16} className="text-sky-400 flex-shrink-0" />
                <a
                  href="tel:2145010100"
                  className="hover:text-[#f26e06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f26e06] rounded"
                >
                  (214) 501-0100
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <Mail size={16} className="text-sky-400 flex-shrink-0" />
                <a
                  href="mailto:support@fixlyhandy.com"
                  className="hover:text-[#f26e06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f26e06] rounded"
                >
                  support@fixlyhandy.com
                </a>
              </div>
              <div className="flex items-center gap-3 group">
                <Mail size={16} className="text-sky-400 flex-shrink-0" />
                <a
                  href="mailto:info@fixlyhandy.com"
                  className="hover:text-[#f26e06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f26e06] rounded"
                >
                  info@fixlyhandy.com
                </a>
              </div>
            </address>
          </div>

          {/* Column 2: COMPANY (2 cols) */}
          <div className="lg:col-span-2 lg:border-r lg:border-white/10 lg:pr-6">
            <h4 className="text-[12px] font-bold text-white tracking-wider uppercase mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2 text-[13px]">
              {["About Us", "Careers", "Press & Media", "Partners", "Blog", "Sitemap"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="footer-link-wipe text-slate-300 hover:text-[#f26e06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f26e06] rounded"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 3: HELP & SUPPORT (2 cols) */}
          <div className="lg:col-span-2 lg:border-r lg:border-white/10 lg:pr-6">
            <h4 className="text-[12px] font-bold text-white tracking-wider uppercase mb-4">
              HELP &amp; SUPPORT
            </h4>
            <ul className="space-y-2 text-[13px]">
              {[
                "Help Center",
                "Safety Tips",
                "Trust & Safety",
                "Report an Issue",
                "Contact Us",
                "FAQ",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="footer-link-wipe text-slate-300 hover:text-[#f26e06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f26e06] rounded"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: LEGAL (2 cols) */}
          <div className="lg:col-span-2 lg:border-r lg:border-white/10 lg:pr-6">
            <h4 className="text-[12px] font-bold text-white tracking-wider uppercase mb-4">
              LEGAL
            </h4>
            <ul className="space-y-2 text-[13px]">
              {[
                "Terms of Service",
                "Privacy Policy",
                "Cookie Policy",
                "Accessibility",
                "Do Not Sell My Info",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="footer-link-wipe text-slate-300 hover:text-[#f26e06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f26e06] rounded"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: STAY CONNECTED & NEWSLETTER (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-between lg:pl-2">
            
            {/* STAY CONNECTED */}
            <div>
              <h4 className="text-[12px] font-bold text-white tracking-wider uppercase mb-3">
                STAY CONNECTED
              </h4>
              {/* Row of 7 Social Icons in Brand Colours */}
              <div className="flex items-center gap-2 flex-wrap">
                
                {/* Facebook (#1877F2) */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow FixlyHandy on Facebook"
                  className="w-8 h-8 rounded-lg bg-[#1877F2] text-white flex items-center justify-center social-scale shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram (Gradient) */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow FixlyHandy on Instagram"
                  className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center social-scale shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* LinkedIn (#0A66C2) */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow FixlyHandy on LinkedIn"
                  className="w-8 h-8 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center social-scale shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* YouTube (#FF0000) */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow FixlyHandy on YouTube"
                  className="w-8 h-8 rounded-lg bg-[#FF0000] text-white flex items-center justify-center social-scale shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* X / Twitter (#000000) */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow FixlyHandy on X"
                  className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center social-scale shadow-sm border border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* Pinterest (#E60023) */}
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow FixlyHandy on Pinterest"
                  className="w-8 h-8 rounded-lg bg-[#E60023] text-white flex items-center justify-center social-scale shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M12 0a12 12 0 0 0-4.37 23.17c-.07-.94-.13-2.39.03-3.42.14-.94.94-3.97.94-3.97s-.24-.48-.24-1.19c0-1.12.65-1.95 1.46-1.95.69 0 1.02.52 1.02 1.14 0 .69-.44 1.73-.67 2.69-.19.81.41 1.47 1.2 1.47 1.45 0 2.56-1.53 2.56-3.73 0-1.95-1.4-3.32-3.4-3.32-2.32 0-3.68 1.74-3.68 3.53 0 .7.27 1.45.61 1.86.07.08.08.15.06.24-.07.27-.22.88-.25.99-.04.18-.14.22-.32.13-1.19-.55-1.93-2.29-1.93-3.68 0-3 2.18-5.75 6.28-5.75 3.3 0 5.86 2.35 5.86 5.49 0 3.28-2.07 5.92-4.94 5.92-.96 0-1.87-.5-2.18-1.09l-.59 2.27c-.22.83-.8 1.87-1.19 2.5A12 12 0 1 0 12 0z" />
                  </svg>
                </a>

                {/* TikTok (#000000) */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow FixlyHandy on TikTok"
                  className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center social-scale shadow-sm border border-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>

              </div>
            </div>

            {/* SUBSCRIBE TO OUR NEWSLETTER */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <h4 className="text-[12px] font-bold text-white tracking-wider uppercase">
                SUBSCRIBE TO OUR NEWSLETTER
              </h4>
              <p className="text-[11px] text-slate-300 mt-1.5 mb-3 leading-relaxed">
                Get home improvement tips, special offers and community updates.
              </p>
              
              <form onSubmit={handleSubscribe} className="flex items-center w-full max-w-sm">
                <label htmlFor="newsletter-email" className="sr-only">
                  Your email address
                </label>
                <input
                  type="email"
                  id="newsletter-email"
                  name="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="bg-white text-slate-900 placeholder-slate-400 px-3.5 py-2.5 text-[12px] rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-[#f26e06] border-0"
                />
                <button
                  type="submit"
                  className="shine-sweep bg-[#f26e06] hover:bg-[#e05d00] text-white font-extrabold text-[12px] px-5 py-2.5 rounded-r-md transition-colors duration-200 flex-shrink-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {subscribed ? "Subscribed!" : "Subscribe"}
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* BAND 5: BOTTOM BAR (Darkest Navy Background) */}
      {/* ============================================================ */}
      <div
        ref={band5Ref}
        className={`relative bg-[#040C16] text-white py-5 px-4 sm:px-6 lg:px-10 xl:px-12 border-t border-white/5 overflow-hidden scroll-fade ${
          visibleSections.band5 ? "show-fade" : "hidden-fade"
        }`}
      >
        {/* Faint House Silhouettes across the background */}
        <div
          className="absolute inset-x-0 bottom-0 top-0 pointer-events-none opacity-15 overflow-hidden flex justify-center items-end"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            className="w-full h-16 text-slate-500 fill-current"
          >
            {/* House Silhouettes: Gables, Roofs, Chimneys */}
            <path d="
              M0,80 L0,50 L20,30 L40,50 L40,80
              L50,80 L50,45 L75,22 L100,45 L100,80
              L105,80 L105,35 L115,35 L115,42 L135,24 L160,45 L160,80
              L175,80 L175,55 L200,35 L225,55 L225,80
              L240,80 L240,40 L270,15 L300,40 L300,80
              L315,80 L315,48 L340,25 L365,48 L365,80
              L380,80 L380,38 L390,38 L390,44 L415,22 L440,44 L440,80
              L460,80 L460,52 L490,28 L520,52 L520,80
              L540,80 L540,42 L570,16 L600,42 L600,80
              L620,80 L620,50 L645,28 L670,50 L670,80
              L690,80 L690,38 L720,12 L750,38 L750,80
              L770,80 L770,48 L800,24 L830,48 L830,80
              L850,80 L850,36 L860,36 L860,42 L885,20 L910,42 L910,80
              L930,80 L930,50 L960,26 L990,50 L990,80
              L1010,80 L1010,42 L1040,16 L1070,42 L1070,80
              L1090,80 L1090,48 L1115,26 L1140,48 L1140,80
              L1160,80 L1160,35 L1185,15 L1200,30 L1200,80 Z
            " />
          </svg>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-[1520px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          {/* Left: FixlyHandy Logo + Divider + Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 flex-shrink-0">
                <svg viewBox="0 0 54 54" className="w-full h-full">
                  <path d="M27 5 L50 24 L45 28 L27 13 L9 28 L4 24 Z" fill="#f26e06" />
                  <polygon points="11,26 27,15 43,26 43,47 11,47" fill="#ffffff" />
                  <g transform="translate(19, 24) rotate(-35) scale(0.72)">
                    <rect x="7" y="0" width="11" height="8" rx="2" fill="#040C16" />
                    <rect x="11" y="6" width="3.5" height="17" rx="1.5" fill="#040C16" />
                  </g>
                </svg>
              </div>
              <span className="text-[16px] font-black tracking-tight leading-none">
                <span className="text-white">fixly</span>
                <span className="text-[#f26e06]">handy</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-300 ml-1">
                Find &bull; Hire &bull; Get It Done
              </span>
            </div>

            {/* Subtle Divider */}
            <div className="hidden sm:block w-[1px] h-4 bg-slate-700" />

            {/* Copyright */}
            <p className="text-[12px] text-slate-400 font-normal">
              &copy; 2026 FixlyHandy. All rights reserved.
            </p>
          </div>

          {/* Right: "A Handier Tomorrow" Handwritten Script + Orange Swash */}
          <div className="flex flex-col items-center md:items-end">
            <span className="font-script text-[24px] xl:text-[26px] font-bold text-white -rotate-2 select-none leading-none">
              A Handier Tomorrow
            </span>
            <svg
              viewBox="0 0 170 18"
              className="w-36 h-3 text-[#f26e06] -mt-1 fill-current overflow-visible"
              aria-hidden="true"
            >
              <path d="M4 12 C 45 16, 105 17, 166 3 C 115 10, 60 12, 4 12 Z" />
            </svg>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
