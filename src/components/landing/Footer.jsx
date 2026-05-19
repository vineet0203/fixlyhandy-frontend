import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-brand-navy text-slate-200">
      <div className="mx-auto w-full max-w-none px-6 md:px-10 lg:px-14 xl:px-16 2xl:px-20 py-16 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 text-lg font-semibold text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold text-brand-navy">
              TJ
            </span>
            <span className="text-brand-gold">TRAKJOBS</span>
          </div>
          <p className="mt-4 text-sm text-slate-300">
            Your trusted partner for service marketplace operations, vendor management, and
            enterprise-grade dispatch.
          </p>
          <div className="mt-4 flex items-center gap-3 text-slate-300">
            <Facebook size={18} />
            <Instagram size={18} />
            <Twitter size={18} />
            <Linkedin size={18} />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>About</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Services</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>Electrical</li>
            <li>Plumbing</li>
            <li>Cleaning</li>
            <li>Appliance Repair</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Newsletter</p>
          <p className="mt-4 text-sm text-slate-300">
            Get product updates and platform insights.
          </p>
          <div className="mt-4 flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-white/20 bg-transparent px-3 py-2 text-sm text-white placeholder:text-slate-400"
            />
            <button className="rounded-xl bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-navy">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        © 2024 TRAKJOBS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
