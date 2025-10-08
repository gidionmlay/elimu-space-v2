import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt, faHeart, faPaperPlane, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faFacebookF, faTwitter, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface SocialLink {
  platform: string;
  href: string;
  icon: React.ReactNode;
}

interface CompanyInfo {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  address?: string;
}

interface FooterProps {
  companyInfo?: CompanyInfo;
  quickLinks?: FooterLink[];
  socialLinks?: SocialLink[];
  showNewsletter?: boolean;
}

const defaultCompanyInfo: CompanyInfo = {
  name: "Elimu Space",
  tagline: "Empowering Tanzanian youth with practical skills for the digital economy",
  email: "info@elimuspace.co.tz",
  phone: "+255 123 456 789",
  whatsapp: "+255 987 654 321",
  address: "Dar es Salaam, Tanzania"
};

const defaultQuickLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Browse Courses", href: "/courses" },
  { label: "Success Stories", href: "/stories" },
  { label: "About Us", href: "/about" },
  { label: "Contact Support", href: "/support" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" }
];

const courseCategories: FooterLink[] = [
  { label: "Digital Literacy", href: "/courses/digital-literacy" },
  { label: "Entrepreneurship", href: "/courses/entrepreneurship" },
  { label: "Financial Skills", href: "/courses/finance" },
  { label: "Soft Skills", href: "/courses/soft-skills" },
  { label: "Agriculture Technology", href: "/courses/agtech" },
  { label: "View All Categories", href: "/courses" }
];

const defaultSocialLinks: SocialLink[] = [
  { 
    platform: "Facebook", 
    href: "https://facebook.com/elimuspace", 
    icon: <FontAwesomeIcon icon={faFacebookF} className="w-5 h-5" /> 
  },
  { 
    platform: "Twitter", 
    href: "https://twitter.com/elimuspace", 
    icon: <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" /> 
  },
  { 
    platform: "Instagram", 
    href: "https://instagram.com/elimuspace", 
    icon: <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" /> 
  },
  { 
    platform: "YouTube", 
    href: "https://youtube.com/elimuspace", 
    icon: <FontAwesomeIcon icon={faYoutube} className="w-5 h-5" /> 
  }
];

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20 
      }}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 flex items-center justify-center z-50 hover:shadow-xl hover:-translate-y-1"
      style={{ 
        boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
        display: isVisible ? 'flex' : 'none'
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <FontAwesomeIcon icon={faArrowUp} className="w-5 h-5" />
    </motion.button>
  );
};

const Footer = ({ 
  companyInfo = defaultCompanyInfo,
  quickLinks = defaultQuickLinks,
  socialLinks = defaultSocialLinks,
  showNewsletter = true
}: FooterProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [email, setEmail] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <>
      <footer 
        ref={ref}
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          color: "#f1f5f9"
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='37' cy='7' r='1'/%3E%3Ccircle cx='7' cy='37' r='1'/%3E%3Ccircle cx='37' cy='37' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }} />
        </div>

        <div className="relative z-10">
          {/* Main Footer Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="container mx-auto px-4 pt-16 pb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              
              {/* Column 1: About Elimu Space */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <div className="mb-6">
                  <img 
                    src="/logo.png" 
                    alt="Elimu Space" 
                    className="h-20 w-auto mb-4"
                  />
                  <p className="text-slate-300 leading-relaxed mb-6">
                    {companyInfo.tagline}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-primary" />
                    <a 
                      href={`mailto:${companyInfo.email}`}
                      className="text-slate-300 hover:text-primary transition-colors duration-200"
                    >
                      {companyInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faPhone} className="w-4 h-4 text-primary" />
                    <a 
                      href={`tel:${companyInfo.phone}`}
                      className="text-slate-300 hover:text-primary transition-colors duration-200"
                    >
                      {companyInfo.phone}
                    </a>
                  </div>
                  {companyInfo.address && (
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 text-primary" />
                      <span className="text-slate-300">{companyInfo.address}</span>
                    </div>
                  )}
                </div>

                {/* WhatsApp CTA */}
                <Button 
                  size="lg" 
                  className="bg-[#25D366] hover:bg-[#20BD5A] text-white border-0 w-full group"
                  asChild
                >
                  <a 
                    href={`https://wa.me/${companyInfo.whatsapp.replace(/\s+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Join WhatsApp Community
                  </a>
                </Button>
              </motion.div>

              {/* Column 2: Quick Links */}
              <motion.div variants={itemVariants}>
                <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : "_self"}
                        rel={link.external ? "noopener noreferrer" : ""}
                        className="text-slate-300 hover:text-primary transition-colors duration-200 flex items-center group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {link.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Column 3: Categories */}
              <motion.div variants={itemVariants}>
                <h4 className="text-lg font-semibold text-white mb-6">Categories</h4>
                <ul className="space-y-3">
                  {courseCategories.map((category, index) => (
                    <li key={index}>
                      <a
                        href={category.href}
                        className="text-slate-300 hover:text-primary transition-colors duration-200 flex items-center group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {category.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Column 4: Connect With Us */}
              <motion.div variants={itemVariants}>
                <h4 className="text-lg font-semibold text-white mb-6">Connect With Us</h4>
                
                {/* Social Links */}
                <div className="flex gap-4 mb-6">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-slate-700/50 hover:bg-primary rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>

                {/* Newsletter Signup */}
                {showNewsletter && (
                  <div>
                    <h5 className="text-white font-medium mb-3">Stay Updated</h5>
                    <p className="text-sm text-slate-300 mb-4">
                      Get the latest courses and updates delivered to your inbox.
                    </p>
                    <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-primary"
                        required
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary-dark"
                      >
                        <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4 mr-2" />
                        Subscribe
                      </Button>
                    </form>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Footer */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="border-t border-slate-700 py-6"
          >
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                  <p className="text-slate-400 text-sm">
                    © 2025 {companyInfo.name}. All rights reserved.
                  </p>
                  <p className="text-slate-400 text-sm flex items-center justify-center md:justify-start gap-1 mt-1">
                    Made with <FontAwesomeIcon icon={faHeart} className="w-4 h-4 text-red-500" /> in Tanzania
                  </p>
                </div>
                
                {/* Language Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm">Language:</span>
                  <div className="flex gap-1">
                    <button className="px-3 py-1 text-sm bg-primary text-white rounded">
                      EN
                    </button>
                    <button className="px-3 py-1 text-sm bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition-colors">
                      SW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
};

export default Footer;