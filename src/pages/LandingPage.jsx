import React, { useState, useEffect } from "react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import Chatbot from "../components/chatbot/Chatbot";
import serviceCatalog, { fetchServiceCatalog } from "../components/landing/serviceCatalog";

import VendorHero from "../components/landing/vendor/VendorHero";
import VendorLeftSidebar from "../components/landing/vendor/VendorLeftSidebar";
import { NAV_ITEMS } from "../components/landing/vendor/navConstants";
import VendorCenterColumn from "../components/landing/vendor/VendorCenterColumn";
import VendorRightSidebar from "../components/landing/vendor/VendorRightSidebar";
import VendorBookingModal from "../components/landing/vendor/VendorBookingModal";
import VendorMessageModal from "../components/landing/vendor/VendorMessageModal";

const LandingPage = () => {
  const [catalog, setCatalog] = useState(serviceCatalog);
  const [selectedService, setSelectedService] = useState("Plumbing Service");
  const [activeSection, setActiveSection] = useState("overview");

  // Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingModalData, setBookingModalData] = useState({});

  // Message Modal State
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  // Fetch live service catalog on mount (falls back gracefully to serviceCatalog.js)
  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const data = await fetchServiceCatalog();
        if (data && data.length > 0) {
          setCatalog(data);
        }
      } catch (err) {
        console.warn("Failed to load live service catalog:", err);
      }
    };
    loadCatalog();
  }, []);

  // IntersectionObserver to dynamically highlight left nav item based on scroll position
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible entries
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by top offset to pick highest in view
          visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Smooth scroll handler
  const handleScrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handler for service tile selection
  const handleSelectService = (serviceName) => {
    setSelectedService(serviceName);
    // On mobile or tablet, scroll down to the booking widget, or open quote modal
    const bookElement = document.getElementById("book-service-widget");
    if (bookElement && window.innerWidth < 1024) {
      bookElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Trigger Quote Request Modal
  const handleRequestQuote = ({ service, date, time }) => {
    setBookingModalData({
      service: service || selectedService,
      date,
      time,
    });
    setIsBookingModalOpen(true);
  };

  // Handler for Header "Book Now"
  const handleHeaderBook = (bookingData) => {
    setBookingModalData({
      service: bookingData?.service?.name || selectedService || "Plumbing Service",
      date: "",
      time: "",
    });
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Reused Header as-is */}
      <Navbar onBook={handleHeaderBook} catalog={catalog} />

      {/* Mobile Horizontal Navigation Strip (<1024px) */}
      <div className="lg:hidden sticky top-[73px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-2 shadow-2xs">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleScrollToSection(item.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all duration-200 ease-out motion-reduce:transition-none ${
                isActive
                  ? "bg-[#2563eb] text-white shadow-xs"
                  : "bg-slate-100/90 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
              }`}
            >
              <Icon size={13} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Container - Full-bleed Generous Max Width */}
      <main className="mx-auto max-w-[1600px] 2xl:max-w-[1800px] px-6 lg:px-12 xl:px-16 py-8 sm:py-10">
        {/* Section 1: Hero Card (Full Width) */}
        <div id="overview" className="scroll-mt-28 mb-8">
          <VendorHero
            onScrollToReviews={() => handleScrollToSection("reviews")}
          />
        </div>

        {/* Mobile Quick "Book a Service" Widget (<1024px) */}
        <div id="book-service-widget" className="lg:hidden mb-8">
          <VendorRightSidebar
            catalog={catalog}
            selectedService={selectedService}
            onSelectService={setSelectedService}
            onRequestQuote={handleRequestQuote}
            onOpenMessageModal={() => setIsMessageModalOpen(true)}
          />
        </div>

        {/* Section 2: Three-Column Body Layout */}
        <div className="flex flex-col lg:flex-row items-start gap-8 xl:gap-10">
          {/* Left Column (Sticky Sidebar on Desktop) */}
          <div className="hidden lg:block w-[260px] xl:w-[280px] 2xl:w-[300px] shrink-0 sticky top-24 self-start">
            <VendorLeftSidebar
              activeSection={activeSection}
              onNavigate={handleScrollToSection}
            />
          </div>

          {/* Center Column (Core Content) */}
          <div className="flex-1 min-w-0 w-full">
            <VendorCenterColumn
              catalog={catalog}
              onSelectService={handleSelectService}
            />
          </div>

          {/* Right Column (Sticky Sidebar on Desktop) */}
          <div className="hidden lg:block w-[340px] xl:w-[360px] 2xl:w-[380px] shrink-0 sticky top-24 self-start">
            <VendorRightSidebar
              catalog={catalog}
              selectedService={selectedService}
              onSelectService={setSelectedService}
              onRequestQuote={handleRequestQuote}
              onOpenMessageModal={() => setIsMessageModalOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Quote Request Modal */}
      <VendorBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialData={bookingModalData}
        catalog={catalog}
      />

      {/* Direct Message Modal */}
      <VendorMessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
      />

      {/* Reused Footer as-is */}
      <Footer />

      {/* Chatbot Widget */}
      <Chatbot />
    </div>
  );
};

export default LandingPage;
