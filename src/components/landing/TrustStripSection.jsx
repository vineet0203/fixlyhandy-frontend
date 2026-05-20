import React from "react";
import { CalendarCheck, MapPin, ShieldCheck, Zap } from "lucide-react";

const items = [
  {
    title: "Book in Minutes",
    description: "Easy online booking anytime, anywhere.",
    icon: CalendarCheck,
  },
  {
    title: "Skilled Professionals",
    description: "Experienced, vetted & background checked.",
    icon: ShieldCheck,
  },
  {
    title: "We Come to You",
    description: "On-time service at your home or business.",
    icon: MapPin,
  },
  {
    title: "Satisfaction Guaranteed",
    description: "Quality work with a promise you can count on.",
    icon: Zap,
  },
];

const TrustStripSection = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-none px-6 md:px-10 lg:px-14 xl:px-16 2xl:px-20 pb-10">
        <div className="rounded-3xl bg-brand-navy px-6 py-6 text-white shadow-xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-brand-gold">
                  <item.icon size={18} />
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

export default TrustStripSection;
