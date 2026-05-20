import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  DoorOpen,
  Hammer,
  Layers,
  Paintbrush,
  PlugZap,
  Snowflake,
  Wrench,
} from "lucide-react";

const featuredServices = [
  { label: "Plumbing", serviceName: "Tap Repair", icon: Wrench },
  { label: "Electrical", serviceName: "Light Installation", icon: PlugZap },
  { label: "Carpentry", serviceName: "Modular Furniture Work", icon: Hammer },
  { label: "Painting", serviceName: "Interior Painting", icon: Paintbrush },
  { label: "Flooring", serviceName: "Flooring Repair", icon: Layers },
  { label: "Door & Window", serviceName: "Door Repair & Installation", icon: DoorOpen },
  { label: "HVAC", serviceName: "AC Service & Repair", icon: Snowflake },
  { label: "Cleaning", serviceName: "Deep Home Cleaning", icon: Paintbrush },
  { label: "Commercial", serviceName: "Office Setup Assistance", icon: Building2 },
];

const PopularServices = ({ onBook, catalog }) => {
  const serviceLookup = useMemo(() => {
    const map = new Map();
    (catalog || []).forEach((category) => {
      category.services.forEach((service) => {
        map.set(service.name, { ...service, category: category.name });
      });
    });
    return map;
  }, [catalog]);

  const handleBook = (serviceTitle) => {
    const service = serviceLookup.get(serviceTitle);
    if (!service || !onBook) return;
    onBook({
      location: "Your Area",
      service,
    });
  };

  return (
    <section id="services" className="bg-white">
      <div className="mx-auto w-full max-w-none px-6 md:px-10 lg:px-14 xl:px-16 2xl:px-20 py-12">
        <h2 className="text-center text-2xl font-semibold text-slate-900 md:text-3xl">
          Our Most Popular Services
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-4 lg:grid-cols-9">
          {featuredServices.map((service) => {
            const details = serviceLookup.get(service.serviceName);
            return (
              <motion.button
                key={service.label}
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-slate-100 bg-white px-3 py-5 text-center shadow-sm transition hover:border-brand-gold/40 hover:shadow-md"
                onClick={() => handleBook(service.serviceName)}
                disabled={!details}
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy/5 text-brand-navy">
                  <service.icon size={22} />
                </span>
                <p className="mt-3 text-xs font-semibold text-brand-navy sm:text-sm">
                  {service.label}
                </p>
              </motion.button>
            );
          })}
          <button className="rounded-2xl border border-slate-200 bg-white px-3 py-5 text-center text-xs font-semibold text-brand-navy sm:text-sm">
            <span className="flex flex-col items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold/20 text-brand-navy">
                <ArrowRight size={16} />
              </span>
              View All
              <span>Services</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
