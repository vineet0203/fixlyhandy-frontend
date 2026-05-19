import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, ChevronDown, MapPin, Search, Sparkles, Zap } from "lucide-react";

const stats = [
  { label: "Customers", value: "10K+" },
  { label: "Vendors", value: "500+" },
  { label: "Cities", value: "50+" },
];

const floatingCards = [
  { title: "Verified Vendors", icon: CalendarCheck },
  { title: "Real-Time Tracking", icon: MapPin },
  { title: "Instant Quotes", icon: Sparkles },
  { title: "Smart Scheduling", icon: Zap },
];

const HeroSection = ({ catalog, onBook }) => {
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const dropdownRef = useRef(null);

  const filteredGroups = useMemo(() => {
    if (!catalog) return [];
    return catalog
      .map((category) => {
        const filtered = category.services.filter((service) =>
          service.name.toLowerCase().includes(query.toLowerCase())
        );
        return { ...category, services: filtered };
      })
      .filter((category) => category.services.length > 0);
  }, [catalog, query]);

  const flatServices = useMemo(() => {
    return filteredGroups.flatMap((category) =>
      category.services.map((service) => ({
        ...service,
        category: category.name,
      }))
    );
  }, [filteredGroups]);

  const handleSelect = (service) => {
    setSelectedService(service);
    setQuery("");
    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (!isOpen) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlighted((prev) => Math.min(prev + 1, flatServices.length - 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlighted((prev) => Math.max(prev - 1, 0));
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const chosen = flatServices[highlighted];
      if (chosen) {
        handleSelect(chosen);
      }
    }
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);
  return (
    <section id="home" className="relative bg-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-brand-gold/20 blur-3xl" />
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-brand-navy/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-none px-6 md:px-10 lg:px-14 xl:px-16 2xl:px-20 pt-20 pb-14 grid gap-12 lg:gap-16 xl:gap-20 lg:grid-cols-[1.12fr_1fr] items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-brand-navy/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-navy">
            Premium Field Service Platform
          </p>
          <h1 className="mt-5 text-4xl font-display font-semibold leading-tight text-brand-navy md:text-5xl">
            Manage Service Jobs Smarter, Faster and Better
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            TrackJobs helps service businesses manage bookings, vendors, employees, dispatching,
            quotes, invoices and customers in one powerful platform.
          </p>

          <div className="mt-8 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-100/80 md:grid-cols-[1fr_1.2fr_auto]">
            <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-500">
              <MapPin size={16} />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="w-full border-none bg-transparent text-sm text-slate-700 outline-none"
              />
            </label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-500"
              >
                <span className="flex items-center gap-2">
                  <CalendarCheck size={16} />
                  {selectedService ? selectedService.name : "Select Service"}
                </span>
                <ChevronDown size={16} />
              </button>
              {isOpen && (
                <div className="absolute left-0 right-0 top-[110%] z-20 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-500">
                    <Search size={14} />
                    <input
                      type="text"
                      value={query}
                      onChange={(event) => {
                        setQuery(event.target.value);
                        setHighlighted(0);
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Search services"
                      className="w-full border-none bg-transparent text-sm text-slate-700 outline-none"
                      autoFocus
                    />
                  </div>
                  <div className="mt-3 max-h-64 overflow-y-auto text-sm">
                    {filteredGroups.length === 0 && (
                      <div className="rounded-xl bg-slate-50 px-3 py-4 text-center text-slate-400">
                        No services found.
                      </div>
                    )}
                    {filteredGroups.map((category) => (
                      <div key={category.name} className="mb-3">
                        <p className="px-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                          {category.name}
                        </p>
                        <div className="mt-2 grid gap-1">
                          {category.services.map((service) => {
                            const index = flatServices.findIndex(
                              (item) => item.name === service.name
                            );
                            const active = index === highlighted;
                            return (
                              <button
                                key={service.name}
                                type="button"
                                onClick={() =>
                                  handleSelect({
                                    ...service,
                                    category: category.name,
                                  })
                                }
                                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm ${
                                  active
                                    ? "bg-brand-gold/20 text-brand-navy"
                                    : "text-slate-600 hover:bg-slate-50"
                                }`}
                              >
                                <span>{service.name}</span>
                                <span className="text-xs text-slate-400">{service.duration}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              className="rounded-xl bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-navy shadow-lg shadow-amber-200/70 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!location || !selectedService}
              onClick={() =>
                onBook?.({
                  location,
                  service: {
                    name: selectedService?.name,
                    category: selectedService?.category,
                    basePrice: selectedService?.basePrice,
                    duration: selectedService?.duration,
                  },
                })
              }
            >
              Book Service
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-6">
            {stats.map((item) => (
              <div key={item.label} className="text-sm text-slate-500">
                <div className="text-xl font-semibold text-brand-navy">{item.value}</div>
                {item.label}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="relative rounded-[28px] border border-slate-200 bg-white p-6 lg:p-8 shadow-2xl shadow-slate-200/70">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 via-white to-amber-100">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80"
                alt="Technician"
                className="h-64 w-full object-cover md:h-72"
              />
            </div>
            <div className="mt-4 grid gap-3">
              {floatingCards.map((card) => (
                <div
                  key={card.title}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm"
                >
                  <div className="flex items-center gap-3 text-sm font-semibold text-brand-navy">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold/20 text-brand-navy">
                      <card.icon size={18} />
                    </span>
                    {card.title}
                  </div>
                  <span className="text-xs text-slate-400">Live</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -right-6 -top-8 hidden rounded-2xl border border-white/50 bg-white/60 p-4 shadow-xl backdrop-blur lg:block">
            <p className="text-xs text-slate-500">Monthly Revenue</p>
            <p className="text-lg font-semibold text-brand-navy">$1.2M</p>
            <div className="mt-3 h-2 w-32 rounded-full bg-slate-200">
              <div className="h-2 w-20 rounded-full bg-brand-gold" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
