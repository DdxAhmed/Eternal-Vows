import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Music2, VolumeX } from "lucide-react";
import { Particles } from "@/components/Particles";
import { Divider } from "@/components/Divider";
import { useAudio } from "@/context/AudioContext";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();
  const { isPlaying, toggle, play } = useAudio();
  const [isOpen, setIsOpen] = useState(false);
  const [isCardUp, setIsCardUp] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [exiting, setExiting] = useState(false);
  
  // 3D Tilt Coordinates
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  // Sparkle particles state
  const [sparkles, setSparkles] = useState<{ id: number; angle: number; delay: number }[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOpen) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setTilt({ x: x * 12, y: -y * 12 }); // Tilt up to 12 degrees
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const openEnvelope = () => {
    if (isOpen) return;

    // 1. Play background music
    play();

    // 2. Explode sparkles
    const newSparkles = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      angle: (i * 360) / 28 + Math.random() * 10,
      delay: Math.random() * 0.15,
    }));
    setSparkles(newSparkles);

    // 3. Crack seal & open envelope flap
    setIsOpen(true);
    setTilt({ x: 0, y: 0 }); // Reset tilt once opened

    // 4. Slide card up
    setTimeout(() => {
      setIsCardUp(true);
    }, 800);

    // 5. Trigger floating animation
    setTimeout(() => {
      setIsFloating(true);
    }, 2200);

    // 6. Fly card to screen (Zoom-in transition)
    setTimeout(() => {
      setIsFloating(false);
      setIsZoomed(true);
    }, 3800);

    // 7. Trigger screen exit transition
    setTimeout(() => {
      setExiting(true);
    }, 4300);

    // 8. Navigate to main invitation page
    setTimeout(() => {
      navigate({ to: "/invitation" });
    }, 5000);
  };

  // Dynamic Card Styles for the premium 3D movement
  const cardStyle: React.CSSProperties = isZoomed
    ? {
        height: "90%",
        transform: "translateY(-20%) scale(2.4) rotateY(0deg) rotateX(0deg)",
        opacity: 0,
        transition: "transform 1.1s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.9s ease-in-out",
        zIndex: 100,
      }
    : isFloating
    ? {
        height: "90%",
        animation: "float-card 4.5s ease-in-out infinite",
        transition: "transform 1.4s cubic-bezier(0.25, 1, 0.5, 1)",
        zIndex: 25,
      }
    : isCardUp
    ? {
        height: "90%",
        transform: "translateY(-68%) rotateY(8deg) rotateX(4deg) translateZ(20px)",
        transition: "transform 1.4s cubic-bezier(0.25, 1, 0.5, 1)",
        zIndex: 25,
      }
    : {
        height: "85%",
        transform: "translateY(0) scale(0.92) rotateY(0deg) rotateX(0deg)",
        transition: "transform 1.4s cubic-bezier(0.25, 1, 0.5, 1)",
        zIndex: 5,
      };

  return (
    <main
      className={`relative min-h-screen overflow-hidden bg-[#fbf6ec] floral-bg transition-all duration-1000 ${
        exiting ? "opacity-0 scale-105 blur-sm" : "opacity-100"
      }`}
    >
      {/* Dynamic Keyframes for Sparkle Burst and Float */}
      <style>{`
        @keyframes sparkle-burst {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
            box-shadow: 0 0 8px #ffe8a3, 0 0 15px #d4a857;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0);
            opacity: 0;
          }
        }
        @keyframes float-card {
          0%, 100% {
            transform: translateY(-68%) rotateY(8deg) rotateX(4deg) translateZ(20px);
          }
          50% {
            transform: translateY(-72%) rotateY(12deg) rotateX(8deg) translateZ(40px);
          }
        }
      `}</style>

      {/* Ambient gradient layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[#f4d98a]/30 blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-40 -right-40 h-[700px] w-[700px] rounded-full bg-[#f1c6c9]/30 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#fff4d6]/40 blur-3xl" />
      </div>

      <Particles count={40} />

      {/* Music toggle */}
      <button
        onClick={toggle}
        aria-label="Play or pause background music"
        className="absolute right-5 top-5 z-20 grid h-12 w-12 place-items-center rounded-full glass-card text-[#a8762f] transition hover:scale-110 cursor-pointer"
      >
        {isPlaying ? <Music2 className="h-5 w-5 animate-pulse" /> : <VolumeX className="h-5 w-5" />}
      </button>

      {/* Decorative corner flourishes */}
      <CornerFlourish className="absolute left-6 top-6 h-24 w-24 text-[#d4a857]/40" />
      <CornerFlourish className="absolute right-6 bottom-6 h-24 w-24 rotate-180 text-[#d4a857]/40" />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center select-none">
        <p
          className="mb-4 font-script text-3xl sm:text-4xl text-[#c4954a] animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          Together with their families
        </p>

        <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <Divider />
        </div>

        {/* 3D Tilting Envelope Container */}
        <div 
          className="relative flex flex-col items-center justify-center w-full max-w-[460px] px-4 mt-6 animate-scale-in"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            perspective: "1200px",
          }}
        >
          {/* Envelope Body */}
          <div 
            className="relative w-full aspect-[4/3] bg-[#efe2cf] rounded-b-2xl shadow-[0_30px_70px_-15px_rgba(42,29,16,0.4)] border border-[#d4a857]/20"
            style={{
              transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
              transition: isOpen ? "transform 1s ease-out" : "transform 0.2s ease-out",
            }}
          >
            {/* Inside lining of the envelope with luxury pattern */}
            <div className="absolute inset-0 bg-[#e5d4bc] rounded-b-2xl shadow-inner overflow-hidden">
              <div 
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: "radial-gradient(#d4a857 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />
              {/* Elegant internal shadow fold */}
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/10 to-transparent" />
            </div>

            {/* The Luxury Arched Card (slides out & zooms) */}
            <div
              className="absolute left-[5%] right-[5%] bottom-[5%] bg-[#fffcf7] rounded-t-[120px] rounded-b-2xl border-2 border-[#d4a857]/50 p-4 sm:p-5 shadow-[0_15px_40px_rgba(42,29,16,0.25)] flex flex-col justify-center items-center overflow-hidden"
              style={{
                ...cardStyle,
                boxShadow: "0 20px 50px rgba(42,29,16,0.3), inset 0 0 40px rgba(212,168,87,0.05)",
              }}
            >
              {/* Gold foil arched inner border */}
              <div className="border border-[#d4a857]/30 rounded-t-[115px] rounded-b-xl w-full h-full p-3 sm:p-4 flex flex-col justify-between items-center bg-[#fdfaf4] relative">
                {/* Elegant Vintage Monogram Crest at top */}
                <div className="flex flex-col items-center mt-2">
                  <div className="w-10 h-10 rounded-full border border-[#d4a857]/40 flex items-center justify-center relative bg-white">
                    <div className="absolute inset-[2px] rounded-full border border-dashed border-[#d4a857]/30" />
                    <span className="font-serif text-xs font-bold text-[#c4954a] tracking-wider">K&N</span>
                  </div>
                  {/* Small gold leaf line */}
                  <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#d4a857] to-transparent mt-1" />
                </div>

                {/* Main Content */}
                <div className="my-auto flex flex-col items-center">
                  <span className="font-script text-2xl sm:text-3xl text-[#c4954a] tracking-wide animate-pulse">
                    Save the Date
                  </span>
                  
                  <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-[#d4a857]/50 to-transparent my-2" />
                  
                  <p className="font-serif text-[8px] uppercase tracking-[0.25em] text-[#a8762f] font-semibold">
                    For the Engagement Celebration of
                  </p>
                  
                  <h2 className="font-script gold-gradient-text text-4xl sm:text-5xl my-2 drop-shadow-sm select-text font-bold">
                    Kareem & Nouran
                  </h2>
                  
                  <p className="font-serif text-[9px] uppercase tracking-[0.2em] text-[#5a4530] font-medium my-1">
                    Friday, June 26, 2026
                  </p>
                  
                  <p className="font-serif text-[8px] tracking-[0.1em] text-[#8a6421] italic">
                    Bedaya Hall, Damanhour
                  </p>
                </div>

                {/* Bottom ornament */}
                <div className="flex flex-col items-center mb-1">
                  <Heart className="h-4 w-4 text-[#d4a857] animate-pulse" fill="currentColor" />
                  <span className="font-serif text-[7px] uppercase tracking-[0.3em] text-[#a8762f] mt-1">
                    Click to Open
                  </span>
                </div>
              </div>
            </div>

            {/* Luxury Satin Lace Ribbon Wrap (dissolves on click) */}
            <div 
              className="absolute left-0 right-0 h-9 bg-gradient-to-r from-transparent via-[#d4a857]/20 to-transparent border-y border-[#d4a857]/30 backdrop-blur-[1px] flex justify-center items-center pointer-events-none transition-all duration-700"
              style={{
                top: "43%",
                zIndex: 22,
                opacity: isOpen ? 0 : 1,
                transform: isOpen ? "scaleX(1.3) translateY(-10px)" : "scaleX(1) translateY(0)",
              }}
            >
              <span className="font-serif text-[9px] uppercase tracking-[0.25em] text-[#a8762f]/80 font-bold">
                Invitation
              </span>
            </div>

            {/* Front Side/Bottom Flaps */}
            <svg 
              className="absolute inset-0 w-full h-full drop-shadow-[0_-10px_20px_rgba(42,29,16,0.2)] pointer-events-none z-10" 
              viewBox="0 0 100 75" 
              preserveAspectRatio="none"
            >
              {/* Bottom Flap */}
              <polygon points="0,75 50,42 100,75" fill="#f4efe6" stroke="#d4a857" strokeWidth="0.15" />
              {/* Left Flap */}
              <polygon points="0,0 50,42 0,75" fill="#eae1d4" stroke="#d4a857" strokeWidth="0.15" />
              {/* Right Flap */}
              <polygon points="100,0 50,42 100,75" fill="#eae1d4" stroke="#d4a857" strokeWidth="0.15" />
            </svg>

            {/* Top Flap (flips open 180deg) */}
            <div 
              className="absolute inset-x-0 top-0 origin-top"
              style={{
                height: "56%",
                transform: isOpen ? "rotateX(180deg)" : "rotateX(0deg)",
                transformOrigin: "top",
                transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), z-index 0s 0.3s",
                transformStyle: "preserve-3d",
                zIndex: isOpen ? 0 : 20,
              }}
            >
              {/* Front Side of Top Flap */}
              <svg 
                className="absolute inset-0 w-full h-full drop-shadow-[0_10px_12px_rgba(42,29,16,0.2)]" 
                viewBox="0 0 100 56" 
                preserveAspectRatio="none" 
                style={{ backfaceVisibility: "hidden" }}
              >
                <polygon points="0,0 50,56 100,0" fill="#f9efe0" stroke="#d4a857" strokeWidth="0.15" />
              </svg>
              {/* Back Side of Top Flap (lined pattern inside) */}
              <svg 
                className="absolute inset-0 w-full h-full" 
                viewBox="0 0 100 56" 
                preserveAspectRatio="none" 
                style={{ 
                  backfaceVisibility: "hidden", 
                  transform: "rotateX(180deg)",
                }}
              >
                <polygon points="0,0 50,56 100,0" fill="#eae1d4" stroke="#d4a857" strokeWidth="0.15" />
              </svg>
            </div>

            {/* Splitting Golden Wax Seal */}
            <button
              onClick={openEnvelope}
              className={`absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer z-30 transition-all duration-700 ${
                isOpen ? "pointer-events-none" : "hover:scale-105 active:scale-95 animate-pulse-glow"
              }`}
            >
              {/* Left Half */}
              <div 
                className="absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden bg-gradient-to-br from-[#ffe8a3] via-[#d4a857] to-[#8a6421] rounded-l-full border-r border-[#b8893d]/30 transition-all duration-1000 ease-out shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)]"
                style={{
                  transform: isOpen ? "translateX(-24px) rotate(-20deg)" : "translateX(0) rotate(0)",
                  opacity: isOpen ? 0 : 1,
                  transformOrigin: "bottom left",
                }}
              >
                <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center text-[#3e2307]">
                  <span className="text-[12px] font-serif font-bold ml-4">K</span>
                </div>
              </div>

              {/* Right Half */}
              <div 
                className="absolute top-0 bottom-0 right-0 w-1/2 overflow-hidden bg-[#efe2cf] bg-gradient-to-br from-[#ffe8a3] via-[#d4a857] to-[#8a6421] rounded-r-full border-l border-[#b8893d]/30 transition-all duration-1000 ease-out shadow-[inset_-1px_1px_2px_rgba(255,255,255,0.4)]"
                style={{
                  transform: isOpen ? "translateX(24px) rotate(20deg)" : "translateX(0) rotate(0)",
                  opacity: isOpen ? 0 : 1,
                  transformOrigin: "bottom right",
                }}
              >
                <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center text-[#3e2307]">
                  <span className="text-[12px] font-serif font-bold mr-4">N</span>
                </div>
              </div>

              {/* Gold Crest Heart (Center core of seal) */}
              <div 
                className="absolute z-10 transition-all duration-700 ease-out bg-[#d4a857] p-1.5 rounded-full shadow-inner border border-[#ffe8a3]/40"
                style={{
                  transform: isOpen ? "scale(3.5) rotate(45deg)" : "scale(1)",
                  opacity: isOpen ? 0 : 1,
                }}
              >
                <Heart className="h-3 w-3 text-[#3e2307] fill-[#3e2307]" />
              </div>
            </button>

            {/* Sparkle Burst Render */}
            {sparkles.map((sp) => {
              const rad = (sp.angle * Math.PI) / 180;
              const x = Math.cos(rad) * (90 + Math.random() * 50);
              const y = Math.sin(rad) * (90 + Math.random() * 50);
              return (
                <div
                  key={sp.id}
                  className="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#ffe8a3] to-[#d4a857] z-40 pointer-events-none"
                  style={{
                    animation: "sparkle-burst 0.9s cubic-bezier(0.1, 0.8, 0.3, 1) forwards",
                    animationDelay: `${sp.delay}s`,
                    "--tx": `${x}px`,
                    "--ty": `${y}px`,
                  } as React.CSSProperties}
                />
              );
            })}
          </div>
        </div>

        {/* Dynamic prompt at the bottom */}
        <p className="mt-8 font-script text-2xl text-[#c4954a] animate-fade-in">
          {isOpen ? "~ Kareem & Nouran ~" : "Tap the golden seal to reveal the invitation"}
        </p>
      </section>
    </main>
  );
}

function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="0.8">
      <path d="M5 5 Q 40 10, 50 50 Q 60 90, 95 95" />
      <path d="M5 5 Q 25 30, 30 30 Q 15 25, 20 50" />
      <circle cx="30" cy="30" r="2" fill="currentColor" />
      <circle cx="50" cy="50" r="2.5" fill="currentColor" />
      <path d="M50 50 Q 70 40, 75 25 Q 60 35, 50 50" />
    </svg>
  );
}
