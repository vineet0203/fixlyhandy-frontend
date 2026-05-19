import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how" },
  { label: "Vendors", href: "#vendors" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="mx-auto w-full max-w-none px-6 md:px-10 lg:px-14 xl:px-16 2xl:px-20 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold text-brand-navy font-bold">
            TJ
          </span>
          <span className="text-lg font-semibold text-brand-navy">
            TRAK<span className="text-brand-gold">JOBS</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition text-slate-600 hover:text-brand-navy"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href="/auth/login" className="text-sm font-semibold text-slate-600">
            Login
          </a>
          <a
            href="#cta"
            className="rounded-full bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-navy shadow-lg shadow-amber-200/60 transition hover:-translate-y-0.5"
          >
            Get Started
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
            <div className="flex items-center gap-4 pt-2">
              <a href="/auth/login" className="text-sm font-semibold text-slate-600">
                Login
              </a>
              <a
                href="#cta"
                className="rounded-full bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-navy"
              >
                Get Started
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
