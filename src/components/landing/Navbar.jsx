import React, { useState } from "react";
import { Home, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "For Business", href: "#features" },
  { label: "About Us", href: "#about" },
  { label: "How It Works", href: "#how" },
  { label: "Contact Us", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100">
      <div className="mx-auto w-full max-w-none px-6 md:px-10 lg:px-14 xl:px-16 2xl:px-20 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold/20 text-brand-navy">
            <Home size={18} />
          </span>
          <div className="leading-tight">
            <span className="text-lg font-semibold text-brand-navy">
              Trak<span className="text-brand-gold">Jobs</span>
            </span>
            <div className="text-xs text-slate-500">Fix it. Right on time.</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative transition hover:text-brand-navy ${
                link.label === "Home" ? "text-brand-navy" : "text-slate-600"
              }`}
            >
              {link.label}
              {link.label === "Home" && (
                <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-brand-gold" />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy/10 text-brand-navy">
              📞
            </span>
            <div className="leading-tight">
              <div className="font-semibold text-brand-navy">(833) 349-4399</div>
              <div className="text-xs text-slate-500">Available 24/7</div>
            </div>
          </div>
          <a
            href="#home"
            className="rounded-lg bg-brand-gold px-6 py-2.5 text-sm font-semibold text-brand-navy shadow-lg shadow-amber-200/60 transition hover:-translate-y-0.5"
          >
            Book Now
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="lg:hidden inline-flex items-center justify-center rounded-xl border border-slate-200 p-2"
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="lg:hidden border-t border-slate-100 bg-white"
        >
          <div className="mx-auto w-full max-w-none px-6 md:px-10 lg:px-14 xl:px-16 2xl:px-20 py-4 flex flex-col gap-4 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy/10 text-brand-navy">
                  📞
                </span>
                <div className="leading-tight">
                  <div className="font-semibold text-brand-navy">(833) 349-4399</div>
                  <div className="text-xs text-slate-500">Available 24/7</div>
                </div>
              </div>
              <a
                href="#home"
                className="rounded-lg bg-brand-gold px-5 py-2.5 text-center text-sm font-semibold text-brand-navy"
              >
                Book Now
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
