import React from "react";
import { motion } from "framer-motion";
import { Brain, Bell, Wand2, Radar, TrendingUp } from "lucide-react";

const items = [
  { title: "AI quote generation", icon: Brain },
  { title: "Smart dispatching", icon: Radar },
  { title: "Automated reminders", icon: Bell },
  { title: "Real-time notifications", icon: Wand2 },
  { title: "Vendor performance insights", icon: TrendingUp },
];

const AIAutomationSection = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-none px-6 md:px-10 lg:px-14 xl:px-16 2xl:px-20 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            AI and Automation
          </p>
          <h2 className="mt-2 text-3xl font-display text-brand-navy">Future-ready service ops</h2>
          <p className="mt-3 text-slate-600">
            Intelligent automation keeps your teams faster and customers happier.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-navy text-white">
                <item.icon size={20} />
              </div>
              <p className="mt-4 text-sm font-semibold text-brand-navy">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIAutomationSection;
