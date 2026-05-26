import { useEffect, useState } from "react";

type P = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
};

export function Particles({ count = 15 }: { count?: number }) {
  const [particles, setParticles] = useState<P[]>([]);

  useEffect(() => {
    // Reduce count on mobile/low-power devices
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const effectiveCount = isMobile ? Math.floor(count / 2) : count;
    setParticles(
      Array.from({ length: effectiveCount }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 14 + Math.random() * 16,
        delay: -Math.random() * 20,
        drift: (Math.random() - 0.5) * 150,
        opacity: 0.25 + Math.random() * 0.5,
      })),
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "radial-gradient(circle, #f4d98a 0%, rgba(244,217,138,0) 70%)",
            boxShadow: "0 0 6px rgba(244, 217, 138, 0.7)",
            animation: `float-particle ${p.duration}s linear ${p.delay}s infinite`,
            ["--drift" as never]: `${p.drift}px`,
            opacity: p.opacity,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
