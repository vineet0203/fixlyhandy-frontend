import React from "react";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle2, Globe, LineChart, Users } from "lucide-react";

const stats = [
  { label: "Active Vendors", value: "2,400+", icon: Briefcase },
  { label: "Completed Jobs", value: "180K+", icon: CheckCircle2 },
  { label: "Cities Served", value: "50+", icon: Globe },
  { label: "Customer Satisfaction", value: "98%", icon: Users },
  { label: "Revenue Managed", value: "$45M+", icon: LineChart },
];

const StatsSection = () => {
  return (
    <section className="bg-slate-50/60">
      <div className="mx-auto w-full max-w-none px-6 md:px-10 lg:px-14 xl:px-16 2xl:px-20 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
        >
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-navy">
                  <item.icon size={18} />
                </span>
                <div>
                  <p className="text-xs text-slate-500">{item.label}</p>
                  <p className="text-lg font-semibold text-brand-navy">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
