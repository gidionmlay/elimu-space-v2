/**
 * MobileNav Component
 * Slide-in mobile navigation menu with backdrop
 */

import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface NavLink {
  label: string;
  path: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  className?: string;
}

const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  navLinks,
  className
}) => {
  const location = useLocation();

  // Close menu on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close menu when route changes
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Mobile Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={cn(
              'fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px]',
              'bg-white shadow-2xl z-50 overflow-y-auto lg:hidden',
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-[#0D3B66]">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-[#0D3B66]" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-6">
              <ul className="space-y-2">
                {navLinks.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={cn(
                        'block px-4 py-3 rounded-lg font-semibold transition-all duration-200',
                        'hover:bg-gray-50 hover:translate-x-1',
                        isActive(item.path)
                          ? 'bg-[#F97316] text-white shadow-md'
                          : 'text-[#0D3B66] hover:text-[#F97316]'
                      )}
                      onClick={onClose}
                    >
                      <span className="flex items-center gap-3">
                        {isActive(item.path) && (
                          <span className="w-1 h-6 bg-white rounded-full" />
                        )}
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Bottom Section (Optional) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
              <p className="text-xs text-gray-600 text-center">
                Elimu Space © 2025
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;

