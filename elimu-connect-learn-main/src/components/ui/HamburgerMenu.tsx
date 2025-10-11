/**
 * HamburgerMenu Component
 * Animated hamburger icon that morphs into X
 * Uses Tailwind CSS for smooth animations
 */

import React from 'react';
import { cn } from '@/lib/utils';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  onClick,
  className
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative w-10 h-10 flex flex-col items-center justify-center',
        'focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2 rounded-lg',
        'transition-all duration-200 hover:bg-gray-100/50',
        className
      )}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      role="button"
    >
      {/* Top line */}
      <span
        className={cn(
          'absolute w-6 h-0.5 bg-[#0D3B66] transition-all duration-300 ease-in-out',
          isOpen
            ? 'rotate-45 translate-y-0'
            : '-translate-y-2'
        )}
      />
      
      {/* Middle line */}
      <span
        className={cn(
          'absolute w-6 h-0.5 bg-[#0D3B66] transition-all duration-300 ease-in-out',
          isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        )}
      />
      
      {/* Bottom line */}
      <span
        className={cn(
          'absolute w-6 h-0.5 bg-[#0D3B66] transition-all duration-300 ease-in-out',
          isOpen
            ? '-rotate-45 translate-y-0'
            : 'translate-y-2'
        )}
      />
    </button>
  );
};

export default HamburgerMenu;

