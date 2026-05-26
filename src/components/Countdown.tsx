import { useState, useEffect } from "react";

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Wedding date: June 26, 2026 at 8:00 PM (20:00)
    const targetDate = new Date("2026-06-26T20:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex justify-center gap-4 sm:gap-6 mt-8 animate-fade-in opacity-50">
        {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
          <div key={label} className="flex flex-col items-center">
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full glass-card flex items-center justify-center border-2 border-[#d4a857]/20">
              <div className="absolute inset-1.5 rounded-full border border-dashed border-[#d4a857]/10" />
              <span className="font-serif text-2xl sm:text-3xl text-[#2a1d10]">--</span>
            </div>
            <span className="mt-2 text-xs uppercase tracking-wider text-[#a8762f]">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-2 sm:gap-6 mt-8 animate-fade-in">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="relative h-16 w-16 sm:h-24 sm:w-24 rounded-full glass-card flex items-center justify-center border-2 border-[#d4a857]/40 transition-all duration-500 hover:border-[#d4a857] hover:scale-105 hover:shadow-[0_0_25px_rgba(212,168,87,0.35)] cursor-pointer group">
            {/* Elegant inner circle line */}
            <div className="absolute inset-1.5 rounded-full border border-dashed border-[#d4a857]/20 group-hover:border-[#d4a857]/40 transition-all duration-500 group-hover:rotate-45" />
            <span className="font-serif text-xl sm:text-3xl gold-gradient-text font-bold z-10">
              {String(item.value).padStart(2, "0")}
            </span>
          </div>
          <span className="mt-2 sm:mt-3 text-[10px] sm:text-xs uppercase tracking-widest text-[#a8762f] font-sans font-semibold">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
