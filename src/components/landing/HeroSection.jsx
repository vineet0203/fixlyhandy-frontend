import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  ChevronDown,
  MapPin,
  PlayCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
} from "lucide-react";

const trustHighlights = [
  { title: "Residential & Commercial Services", icon: CalendarCheck },
  { title: "Skilled & Background Checked Pros", icon: ShieldCheck },
  { title: "On-Time Guaranteed", icon: Timer },
  { title: "Satisfaction 100% Guaranteed", icon: Sparkles },
];

const featureStrip = [
  {
    title: "Book in Minutes",
    description: "Easy online booking anytime, anywhere.",
    icon: "📅",
  },
  {
    title: "Skilled Professionals",
    description: "Experienced, vetted & background checked.",
    icon: "👤",
  },
  {
    title: "We Come to You",
    description: "On-time service at your home or business.",
    icon: "📍",
  },
  {
    title: "Satisfaction Guaranteed",
    description: "Quality work with a promise you can count on.",
    icon: "🛡️",
  },
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
    <section id="home" className="relative min-h-[520px] overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-none px-6 md:px-10 lg:px-14 xl:px-16 2xl:px-20">
        <div className="grid min-h-[520px] grid-cols-1 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center py-12 lg:py-16"
          >
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-navy/5 px-4 py-2 text-xs font-semibold text-brand-navy">
              <Star size={12} className="text-brand-gold" />
              Your Trusted Handyman Partner
            </div>
            <h1 className="mt-6 text-4xl font-display font-semibold leading-tight text-brand-navy md:text-5xl">
              Reliable Handyman Services for Every
              <span className="mt-2 block text-brand-gold">Home &amp; Business</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Professional. Punctual. Affordable. We handle the fixes, so you can focus on what
              matters.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-navy shadow-lg shadow-amber-200/70 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
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
                <CalendarCheck size={16} />
                Book a Service
              </button>
              <a
                href="#how"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-brand-navy"
              >
                <PlayCircle size={18} />
                How It Works
              </a>
            </div>

            <div className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-100/80 md:grid-cols-[1fr_1.2fr]">
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-500">
                <MapPin size={16} />
                <input
                  type="text"
                  placeholder="Enter your location"
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
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center">
                {[
                  "https://i.pravatar.cc/40?img=12",
                  "https://i.pravatar.cc/40?img=32",
                  "https://i.pravatar.cc/40?img=47",
                ].map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt="Customer"
                    className="-ml-2 h-8 w-8 rounded-full border-2 border-white object-cover first:ml-0"
                  />
                ))}
              </div>
              <span className="flex items-center gap-1 text-brand-gold">
                <Star size={14} />
                <Star size={14} />
                <Star size={14} />
                <Star size={14} />
                <Star size={14} />
              </span>
              4.9/5 | From 2,000+ Happy Customers
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden"
          >
            <div className="h-[300px] sm:h-[360px] lg:h-[520px]">
              <img
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1200&q=80"
                alt="Handyman"
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="absolute right-0 top-0 w-[280px] rounded-bl-3xl bg-brand-navy p-6 text-white shadow-2xl">
              <div className="space-y-4 text-sm">
                {trustHighlights.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                      <item.icon size={16} className="text-brand-gold" />
                    </span>
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="bg-brand-navy text-white">
        <div className="mx-auto w-full max-w-none px-6 md:px-10 lg:px-14 xl:px-16 2xl:px-20 py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featureStrip.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-brand-gold">
                  {item.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-1 text-xs text-white/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
