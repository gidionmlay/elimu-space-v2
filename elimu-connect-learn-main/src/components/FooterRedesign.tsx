import React from "react";

const FooterRedesign: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const pagesColumn1 = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "About Us", href: "/about" },
    { label: "Career", href: "/career" },
    { label: "Contact us", href: "/contact" },
  ];

  const pagesColumn2 = [
    { label: "Location", href: "/locations" },
    { label: "FAQ", href: "/faq" },
    { label: "Testimonial", href: "/testimonials" },
    { label: "Better concerns", href: "/support" },
  ];

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com/elimuspace",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com/elimuspace",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/elimuspace",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2"/>
          <path strokeWidth="2" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"/>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/elimuspace",
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="elimu-footer">
      {/* Curved Wave Top Border */}
      <div className="w-full h-20 overflow-hidden leading-none">
        <svg
          className="w-full block"
          height="80"
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00A859" />
              <stop offset="33%" stopColor="#2B7FE5" />
              <stop offset="66%" stopColor="#FF8C42" />
              <stop offset="100%" stopColor="#D3D3D3" />
            </linearGradient>
          </defs>
          <path
            d="M0 0 Q180 60, 360 40 T720 50 Q900 45, 1080 40 T1440 30 L1440 80 L0 80 Z"
            fill="url(#waveGradient)"
          />
          <path
            d="M0 15 Q180 70, 360 50 T720 60 Q900 55, 1080 50 T1440 40 L1440 80 L0 80 Z"
            fill="#4169E1"
          />
        </svg>
      </div>

      {/* Main Footer Content */}
      <div
        className="py-12 px-8"
        style={{
          background: "linear-gradient(180deg, #4169E1 0%, #001F3F 100%)",
        }}
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] lg:grid-cols-[2fr_1fr_1fr_0.5fr] gap-8 lg:gap-12 items-start">
            {/* Column 1: Company Info */}
            <div className="max-w-[380px]">
              <div className="mb-6">
                <img 
                  src="/logo.png" 
                  alt="Elimu Space" 
                  className="h-20 w-auto"
                />
              </div>
              <p
                className="text-sm leading-[1.75] m-0"
                style={{ color: "rgba(255, 255, 255, 0.85)" }}
              >
                Elimu Space is one of Tanzania's trusted e-learning platforms empowering
                youth with practical skills in digital literacy, entrepreneurship, financial
                education, and soft skills development. Learn, Grow, Succeed.
              </p>
            </div>

            {/* Column 2: Pages */}
            <div>
              <h3 className="text-white text-[15px] font-semibold mb-4 capitalize m-0">
                Pages
              </h3>
              <ul className="list-none p-0 m-0 space-y-2.5">
                {pagesColumn1.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-[13px] inline-block transition-all duration-300"
                      style={{ color: "rgba(255, 255, 255, 0.7)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#FFFFFF";
                        e.currentTarget.style.paddingLeft = "4px";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                        e.currentTarget.style.paddingLeft = "0";
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: More Pages */}
            <div>
              <h3 className="text-white text-[15px] font-semibold mb-4 capitalize m-0">
                Pages
              </h3>
              <ul className="list-none p-0 m-0 space-y-2.5">
                {pagesColumn2.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-[13px] inline-block transition-all duration-300"
                      style={{ color: "rgba(255, 255, 255, 0.7)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#FFFFFF";
                        e.currentTarget.style.paddingLeft = "4px";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                        e.currentTarget.style.paddingLeft = "0";
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Back to Top Button */}
            <div className="flex justify-start lg:justify-end items-start">
              <button
                onClick={scrollToTop}
                className="w-11 h-11 bg-[#10B981] rounded-full flex items-center justify-center
                         text-white cursor-pointer transition-all duration-300 border-none"
                style={{
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#059669";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(16, 185, 129, 0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#10B981";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.25)";
                }}
                aria-label="Back to top"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Social Icons + Copyright */}
      <div
        className="py-4 px-8"
        style={{
          background: "#001F3F",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            {/* Social Icons */}
            <div className="flex gap-3 items-center order-1 md:order-1">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <div
                    className="w-9 h-9 bg-white rounded-full flex items-center justify-center
                             transition-all duration-300 cursor-pointer"
                    style={{ color: "#4169E1" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#F0F0F0";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#FFFFFF";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>

            {/* Copyright & Legal Links */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-center order-2 md:order-2">
              <span
                className="text-xs whitespace-nowrap"
                style={{ color: "rgba(255, 255, 255, 0.75)" }}
              >
                © 2025 - All rights reserved by Elimu Space
              </span>
              <div className="flex gap-2.5 items-center flex-wrap justify-center">
                <a
                  href="/privacy-policy"
                  className="text-xs transition-colors duration-300 whitespace-nowrap"
                  style={{ color: "rgba(255, 255, 255, 0.75)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)";
                  }}
                >
                  Privacy Policy
                </a>
                <span style={{ color: "rgba(255, 255, 255, 0.3)" }} className="text-xs">
                  |
                </span>
                <a
                  href="/terms"
                  className="text-xs transition-colors duration-300 whitespace-nowrap"
                  style={{ color: "rgba(255, 255, 255, 0.75)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)";
                  }}
                >
                  Terms & Conditions
                </a>
                <span style={{ color: "rgba(255, 255, 255, 0.3)" }} className="text-xs">
                  |
                </span>
                <a
                  href="/support"
                  className="text-xs transition-colors duration-300 whitespace-nowrap"
                  style={{ color: "rgba(255, 255, 255, 0.75)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.75)";
                  }}
                >
                  Help & Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterRedesign;
