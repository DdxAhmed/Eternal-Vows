import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const quotes = [
  {
    text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
    author: "Maya Angelou"
  },
  {
    text: "When I look at you, I see the rest of my life in front of my eyes.",
    author: "Unknown"
  },
  {
    text: "You are my today and all of my tomorrows.",
    author: "Leo Christopher"
  },
  {
    text: "True love stories never have endings, but they surely have beautiful beginnings.",
    author: "Richard Bach"
  }
];

export function QuotesSlider() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev === quotes.length - 1 ? 0 : prev + 1));
    }, 6000); // Transitions every 6 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="reveal text-center max-w-3xl mx-auto px-4">
      <div className="relative overflow-hidden rounded-3xl glass-card border border-[#d4a857]/30 p-10 sm:p-14 shadow-lg min-h-[220px] flex flex-col justify-center items-center">
        {/* Floating background decorative accents */}
        <div className="absolute -top-10 -left-10 h-28 w-28 rounded-full bg-gradient-to-tr from-[#f4d98a]/10 to-transparent blur-xl" />
        <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br from-[#d4a857]/10 to-transparent blur-xl" />

        {/* Elegant Gold Quote Icon */}
        <div className="mb-6 opacity-30 text-[#d4a857]">
          <Quote className="h-8 w-8 mx-auto rotate-180" />
        </div>

        {/* Slides with cross-fade */}
        <div className="relative w-full flex-1">
          {quotes.map((q, idx) => {
            const isActive = idx === currentIdx;
            return (
              <div
                key={idx}
                className={`transition-all duration-1000 ease-in-out ${
                  isActive ? "opacity-100 transform translate-y-0 scale-100" : "opacity-0 absolute inset-0 transform translate-y-2 scale-98 pointer-events-none"
                }`}
              >
                <p className="font-serif text-xl sm:text-2xl italic leading-relaxed text-[#2a1d10]">
                  "{q.text}"
                </p>
                <p className="mt-4 text-xs uppercase tracking-widest text-[#a8762f] font-sans font-semibold">
                  — {q.author}
                </p>
              </div>
            );
          })}
        </div>

        {/* Indicator dots */}
        <div className="flex gap-2 mt-8">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIdx(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                idx === currentIdx ? "w-6 bg-[#d4a857]" : "w-1.5 bg-[#d4a857]/20 hover:bg-[#d4a857]/50"
              }`}
              aria-label={`Go to quote ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
