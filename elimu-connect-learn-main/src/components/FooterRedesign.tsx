import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlus, 
  faMinus,
  faFacebookF,
  faWhatsapp,
  faLinkedinIn
} from "@fortawesome/free-solid-svg-icons";
import { 
  faFacebookF as faFacebookBrand,
  faWhatsapp as faWhatsappBrand,
  faLinkedinIn as faLinkedinBrand
} from "@fortawesome/free-brands-svg-icons";

interface FooterSection {
  title: string;
  links: Array<{ label: string; href: string }>;
}

const FooterRedesign: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    company: false,
    courses: false,
    support: false,
    followUs: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const footerSections: Record<string, FooterSection> = {
    company: {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    courses: {
      title: "Courses",
      links: [
        { label: "Browse", href: "/courses" },
        { label: "Categories", href: "/courses#categories" },
        { label: "Enroll Now", href: "/courses" },
      ],
    },
    support: {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "FAQs", href: "/faq" },
        { label: "Report Issue", href: "/support" },
      ],
    },
  };

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/elimuspace",
      icon: faFacebookBrand,
      color: "#1877F2",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/255768423139",
      icon: faWhatsappBrand,
      color: "#25D366",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/elimuspace",
      icon: faLinkedinBrand,
      color: "#0A66C2",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
          {/* Section 1: Company */}
          <div className="border-b md:border-b-0 border-slate-700 pb-4 md:pb-0">
            {/* Mobile: Collapsible */}
            <div className="md:hidden">
              <button
                onClick={() => toggleSection("company")}
                className="w-full flex items-center justify-between py-3 text-left focus:outline-none group"
                aria-expanded={openSections.company}
              >
                <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {footerSections.company.title}
                </h3>
                <FontAwesomeIcon
                  icon={openSections.company ? faMinus : faPlus}
                  className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-all duration-300"
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openSections.company ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-2 pt-2 pb-4">
                  {footerSections.company.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-sm text-slate-300 hover:text-blue-400 hover:pl-2 transition-all duration-200 block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Desktop: Always Expanded */}
            <div className="hidden md:block">
              <h3 className="text-base font-semibold text-white mb-4">
                {footerSections.company.title}
              </h3>
              <ul className="space-y-3">
                {footerSections.company.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-300 hover:text-blue-400 hover:pl-2 transition-all duration-200 block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 2: Courses */}
          <div className="border-b md:border-b-0 border-slate-700 pb-4 md:pb-0">
            {/* Mobile: Collapsible */}
            <div className="md:hidden">
              <button
                onClick={() => toggleSection("courses")}
                className="w-full flex items-center justify-between py-3 text-left focus:outline-none group"
                aria-expanded={openSections.courses}
              >
                <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {footerSections.courses.title}
                </h3>
                <FontAwesomeIcon
                  icon={openSections.courses ? faMinus : faPlus}
                  className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-all duration-300"
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openSections.courses ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-2 pt-2 pb-4">
                  {footerSections.courses.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-sm text-slate-300 hover:text-blue-400 hover:pl-2 transition-all duration-200 block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Desktop: Always Expanded */}
            <div className="hidden md:block">
              <h3 className="text-base font-semibold text-white mb-4">
                {footerSections.courses.title}
              </h3>
              <ul className="space-y-3">
                {footerSections.courses.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-300 hover:text-blue-400 hover:pl-2 transition-all duration-200 block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 3: Support */}
          <div className="border-b md:border-b-0 border-slate-700 pb-4 md:pb-0">
            {/* Mobile: Collapsible */}
            <div className="md:hidden">
              <button
                onClick={() => toggleSection("support")}
                className="w-full flex items-center justify-between py-3 text-left focus:outline-none group"
                aria-expanded={openSections.support}
              >
                <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {footerSections.support.title}
                </h3>
                <FontAwesomeIcon
                  icon={openSections.support ? faMinus : faPlus}
                  className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-all duration-300"
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openSections.support ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-2 pt-2 pb-4">
                  {footerSections.support.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-sm text-slate-300 hover:text-blue-400 hover:pl-2 transition-all duration-200 block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Desktop: Always Expanded */}
            <div className="hidden md:block">
              <h3 className="text-base font-semibold text-white mb-4">
                {footerSections.support.title}
              </h3>
              <ul className="space-y-3">
                {footerSections.support.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-300 hover:text-blue-400 hover:pl-2 transition-all duration-200 block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 4: Follow Us */}
          <div className="pb-4 md:pb-0">
            {/* Mobile: Collapsible */}
            <div className="md:hidden">
              <button
                onClick={() => toggleSection("followUs")}
                className="w-full flex items-center justify-between py-3 text-left focus:outline-none group"
                aria-expanded={openSections.followUs}
              >
                <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                  Follow Us
                </h3>
                <FontAwesomeIcon
                  icon={openSections.followUs ? faMinus : faPlus}
                  className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-all duration-300"
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openSections.followUs ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex gap-4 pt-2 pb-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 
                               flex items-center justify-center text-white
                               transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      style={{
                        boxShadow: `0 4px 12px ${social.color}20`,
                      }}
                      aria-label={social.name}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = social.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "";
                      }}
                    >
                      <FontAwesomeIcon icon={social.icon} className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop: Always Expanded */}
            <div className="hidden md:block">
              <h3 className="text-base font-semibold text-white mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-slate-700 hover:bg-slate-600 
                             flex items-center justify-center text-white
                             transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    style={{
                      boxShadow: `0 4px 12px ${social.color}20`,
                    }}
                    aria-label={social.name}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = social.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "";
                    }}
                  >
                    <FontAwesomeIcon icon={social.icon} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom - Copyright */}
      <div className="border-t border-slate-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-slate-400 text-center md:text-left">
              © {new Date().getFullYear()} Elimu Space. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm">
              <a
                href="/privacy-policy"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <span className="text-slate-600">|</span>
              <a
                href="/terms"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button (Desktop Only) */}
      <button
        onClick={scrollToTop}
        className="hidden md:flex fixed bottom-8 right-8 w-12 h-12 
                 bg-blue-600 hover:bg-blue-700 rounded-full 
                 items-center justify-center text-white
                 shadow-lg hover:shadow-xl
                 transition-all duration-300 hover:-translate-y-1 z-40"
        aria-label="Back to top"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
};

export default FooterRedesign;
