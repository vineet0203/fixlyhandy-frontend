import React from "react";
import { Star } from "lucide-react";

const badges = [
  { name: "Google", rating: "4.9" },
  { name: "facebook", rating: "4.8" },
  { name: "yelp", rating: "4.7" },
  { name: "Angi", rating: "4.8" },
  { name: "BBB", rating: "A+" },
];

const TrustBadgesSection = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-none px-6 md:px-10 lg:px-14 xl:px-16 2xl:px-20 py-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Trusted by homeowners and businesses across the country
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-sm font-semibold text-slate-500">
          {badges.map((badge) => (
            <div key={badge.name} className="text-center">
              <div className="text-lg font-semibold text-slate-400">{badge.name}</div>
              <div className="mt-1 flex items-center justify-center gap-1 text-brand-gold">
                <Star size={12} />
                <Star size={12} />
                <Star size={12} />
                <Star size={12} />
                <Star size={12} />
                <span className="ml-1 text-xs text-slate-400">{badge.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadgesSection;
