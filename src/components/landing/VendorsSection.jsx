import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Star } from "lucide-react";

const vendors = [
  {
    name: "Northside Electrical",
    rating: "4.9",
    jobs: "1,240 jobs",
    years: "12 years exp",
  },
  {
    name: "BluePipe Plumbing",
    rating: "4.8",
    jobs: "980 jobs",
    years: "9 years exp",
  },
  {
    name: "CoolTech Services",
    rating: "4.9",
    jobs: "1,620 jobs",
    years: "14 years exp",
  },
];

const VendorsSection = () => {
  return (
    <section className="bg-slate-50/70">
      <div className="mx-auto w-full max-w-none px-6 md:px-10 lg:px-14 xl:px-16 2xl:px-20 py-16" id="vendors">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Top Vendors
          </p>
          <h2 className="mt-2 text-3xl font-display text-brand-navy">Verified professionals</h2>
          <p className="mt-3 text-slate-600">Enterprise vetted vendors and partners.</p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {vendors.map((vendor) => (
            <motion.div
              key={vendor.name}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-slate-100" />
                  <div>
                    <h3 className="text-lg font-semibold text-brand-navy">{vendor.name}</h3>
                    <p className="text-xs text-slate-500">{vendor.years}</p>
                  </div>
                </div>
                <BadgeCheck size={18} className="text-brand-gold" />
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <Star size={14} className="text-brand-gold" /> {vendor.rating}
              </div>
              <p className="mt-3 text-sm text-slate-500">{vendor.jobs}</p>
              <button className="mt-5 w-full rounded-xl border border-brand-navy px-4 py-2 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy hover:text-white">
                View Profile
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VendorsSection;
