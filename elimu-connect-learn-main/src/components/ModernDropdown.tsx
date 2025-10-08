import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';

interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
  count?: number;
  description?: string;
}

interface ModernDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  width?: 'auto' | 'full' | number;
}

const ModernDropdown: React.FC<ModernDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  label,
  width = 'auto'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  // Debug log
  useEffect(() => {
    console.log('ModernDropdown - isOpen:', isOpen, 'options:', options.length);
  }, [isOpen, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Calculate position on open (direction-aware)
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < 320 && spaceAbove > spaceBelow) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
  }, [isOpen]);

  const getDropdownWidth = () => {
    if (width === 'full') return '100%';
    if (typeof width === 'number') return `${width}px`;
    return 'auto';
  };

  return (
    <div
      ref={dropdownRef}
      className="modern-dropdown"
      style={{
        position: 'relative',
        width: getDropdownWidth(),
        minWidth: width === 'auto' ? '200px' : undefined
      }}
    >
      {/* Label */}
      {label && (
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '8px'
        }}>
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: '12px 16px',
          background: 'white',
          border: `2px solid ${isOpen ? '#F97316' : '#E5E7EB'}`,
          borderRadius: '12px',
          fontSize: '15px',
          fontWeight: '500',
          color: '#111827',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          outline: 'none',
          boxShadow: isOpen ? '0 0 0 4px rgba(249, 115, 22, 0.1)' : 'none',
          fontFamily: 'inherit'
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = '#D1D5DB';
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = '#E5E7EB';
          }
        }}
      >
        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flex: 1,
          textAlign: 'left'
        }}>
          {selectedOption?.icon && <span style={{ fontSize: '18px' }}>{selectedOption.icon}</span>}
          <span style={{ color: selectedOption ? '#111827' : '#9CA3AF' }}>
            {selectedOption?.label || placeholder}
          </span>
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="w-5 h-5"
          style={{
            color: '#6B7280',
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="dropdown-menu"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            top: dropdownPosition === 'bottom' ? 'calc(100% + 8px)' : 'auto',
            bottom: dropdownPosition === 'top' ? 'calc(100% + 8px)' : 'auto',
            left: 0,
            minWidth: '280px',
            width: width === 'auto' ? 'max-content' : typeof width === 'number' ? `${width}px` : '100%',
            maxWidth: '450px',
            background: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.1)',
            border: '2px solid #F97316',
            zIndex: 9999,
            animation: `${dropdownPosition === 'bottom' ? 'slideDown' : 'slideUp'} 0.25s cubic-bezier(0.4, 0, 0.2, 1)`,
            transformOrigin: dropdownPosition === 'bottom' ? 'top' : 'bottom',
            overflow: 'hidden'
          }}
        >
          <div style={{
            maxHeight: '320px',
            overflowY: 'auto',
            padding: '8px'
          }}>
            {options.map((option, index) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  padding: '12px 14px',
                  background: value === option.value ? '#FFF7ED' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: value === option.value ? '600' : '500',
                  color: value === option.value ? '#F97316' : '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  animation: `fadeInItem 0.3s ease-out ${index * 0.05}s both`,
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = value === option.value ? '#FFF7ED' : '#F9FAFB';
                  e.currentTarget.style.transform = 'translateX(4px)';
                  if (value !== option.value) {
                    e.currentTarget.style.color = '#F97316';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = value === option.value ? '#FFF7ED' : 'transparent';
                  e.currentTarget.style.transform = 'translateX(0)';
                  if (value !== option.value) {
                    e.currentTarget.style.color = '#374151';
                  }
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  flex: 1
                }}>
                  {option.icon && (
                    <span style={{ fontSize: '18px' }}>{option.icon}</span>
                  )}
                  <div style={{ flex: 1 }}>
                    <div>{option.label}</div>
                    {option.description && (
                      <div style={{
                        fontSize: '12px',
                        color: '#9CA3AF',
                        marginTop: '2px'
                      }}>
                        {option.description}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  {option.count !== undefined && (
                    <span style={{
                      padding: '2px 8px',
                      background: value === option.value ? 'rgba(249, 115, 22, 0.2)' : '#F3F4F6',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: value === option.value ? '#F97316' : '#6B7280'
                    }}>
                      {option.count}
                    </span>
                  )}
                  {value === option.value && (
                    <FontAwesomeIcon icon={faCheck} className="w-4 h-4" style={{ color: '#F97316' }} />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInItem {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Custom scrollbar for dropdown */
        .dropdown-menu div::-webkit-scrollbar {
          width: 6px;
        }

        .dropdown-menu div::-webkit-scrollbar-track {
          background: transparent;
        }

        .dropdown-menu div::-webkit-scrollbar-thumb {
          background: #D1D5DB;
          border-radius: 3px;
        }

        .dropdown-menu div::-webkit-scrollbar-thumb:hover {
          background: #9CA3AF;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .modern-dropdown {
            width: 100% !important;
            min-width: 100% !important;
          }

          .dropdown-menu {
            position: fixed !important;
            top: auto !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            max-width: 100% !important;
            border-radius: 16px 16px 0 0 !important;
            animation: slideUpMobile 0.3s ease-out !important;
          }
        }

        @keyframes slideUpMobile {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ModernDropdown;
