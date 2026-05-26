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

export function Particles({ count = 35 }: { count?: number }) {
  const [particles, setParticles] = useState<P[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 5,
        duration: 12 + Math.random() * 18,
        delay: -Math.random() * 20,
        drift: (Math.random() - 0.5) * 200,
        opacity: 0.3 + Math.random() * 0.6,
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
            boxShadow: "0 0 8px rgba(244, 217, 138, 0.8)",
            animation: `float-particle ${p.duration}s linear ${p.delay}s infinite`,
            ["--drift" as never]: `${p.drift}px`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
