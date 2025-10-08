import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

interface Trail {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

const RegisterButton: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [trails, setTrails] = useState<Trail[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particleIdRef = useRef(0);
  const rippleIdRef = useRef(0);
  const trailIdRef = useRef(0);

  // Cleanup ripples after animation
  useEffect(() => {
    if (ripples.length === 0) return;

    const timer = setTimeout(() => {
      setRipples([]);
    }, 600);

    return () => clearTimeout(timer);
  }, [ripples]);

  // Cleanup particles after animation
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.02,
          }))
          .filter((p) => p.life > 0)
      );
    }, 16);

    return () => clearInterval(interval);
  }, [particles.length]);

  // Cleanup trails after fade
  useEffect(() => {
    if (trails.length === 0) return;

    const timer = setTimeout(() => {
      setTrails((prev) => prev.filter((t) => Date.now() - t.timestamp < 500));
    }, 100);

    return () => clearTimeout(timer);
  }, [trails]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) return;

    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create ripple
    setRipples([{ id: rippleIdRef.current++, x, y, timestamp: Date.now() }]);

    // Simulate loading state and navigate
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/register');
    }, 1000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create cursor trail
    setTrails((prev) => [
      ...prev.slice(-8),
      { id: trailIdRef.current++, x, y, timestamp: Date.now() },
    ]);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create particle explosion
    const newParticles: Particle[] = [];
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      const speed = 1 + Math.random() * 2;
      newParticles.push({
        id: particleIdRef.current++,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
      });
    }
    setParticles(newParticles);
  };

  const handleMouseLeave = () => {
    setTrails([]);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={isLoading}
      aria-busy={isLoading}
      aria-label={isLoading ? "Registering" : "Register now"}
      className="relative overflow-hidden text-white font-bold px-4 py-2 rounded-lg
                 shadow-md transition-all duration-300 ease-out
                 hover:shadow-xl hover:-translate-y-[2px]
                 active:translate-y-[1px] active:shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-[#0D3B66] focus:ring-offset-2 focus:ring-offset-[#F5F5F5]
                 disabled:cursor-not-allowed disabled:opacity-90"
      style={{
        background: isLoading
          ? "linear-gradient(135deg, #0A2A4A 0%, #0D3B66 100%)"
          : "#0D3B66",
      }}
    >
      {/* Cursor trails */}
      {trails.map((trail) => {
        const age = Date.now() - trail.timestamp;
        const opacity = Math.max(0, 1 - age / 500);
        return (
          <span
            key={trail.id}
            className="absolute w-2 h-2 rounded-full pointer-events-none"
            style={{
              left: trail.x - 4,
              top: trail.y - 4,
              background: `rgba(255, 255, 255, ${opacity * 0.6})`,
              boxShadow: `0 0 8px rgba(255, 255, 255, ${opacity * 0.4})`,
              transition: "opacity 0.3s ease-out",
            }}
          />
        );
      })}

      {/* Ripple effect */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            background: "rgba(255, 255, 255, 0.4)",
            animation: "ripple 0.6s ease-out",
          }}
        />
      ))}

      {/* Particles */}
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            background: `rgba(13, 59, 102, ${particle.life})`,
            opacity: particle.life,
            boxShadow: `0 0 4px rgba(13, 59, 102, ${particle.life})`,
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Registering...
          </>
        ) : (
          "Register now"
        )}
      </span>

      {/* Inline animation styles */}
      <style>{`
        @keyframes ripple {
          from {
            width: 0;
            height: 0;
            opacity: 0.6;
          }
          to {
            width: 300px;
            height: 300px;
            opacity: 0;
            transform: translate(-50%, -50%);
          }
        }

        .animate-ripple {
          animation: ripple 0.6s ease-out;
        }
      `}</style>
    </button>
  );
};

export default RegisterButton;
