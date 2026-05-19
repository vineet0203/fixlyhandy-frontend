import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const services = [
  {
    title: "Light Installation",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "AC Service & Repair",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Deep Home Cleaning",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
  },
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
    <section className="bg-white">
      <div className="mx-auto w-full max-w-none px-6 md:px-10 lg:px-14 xl:px-16 2xl:px-20 py-16">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold">
            Popular Services
          </p>
          <h2 className="text-3xl font-display text-brand-navy">Top booked services</h2>
          <p className="text-slate-600">Marketplace offerings with transparent pricing.</p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {services.map((service) => {
            const details = serviceLookup.get(service.title);
            const displayPrice = details ? `$${details.basePrice}` : "$--";
            return (
            <motion.div
              key={service.title}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-slate-100 bg-white shadow-sm"
            >
              <div className="overflow-hidden rounded-t-2xl">
                <img src={service.image} alt={service.title} className="h-40 w-full object-cover" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-brand-navy">{service.title}</h3>
                  <span className="text-sm font-semibold text-brand-gold">{displayPrice}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <Star size={14} className="text-brand-gold" /> {service.rating}
                </div>
                <button
                  className="mt-4 w-full rounded-xl bg-brand-navy px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={() => handleBook(service.title)}
                  disabled={!details}
                >
                  Book Service
                </button>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularServices;
