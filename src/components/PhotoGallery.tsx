import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Play, Pause } from "lucide-react";

const images = [
  {
    src: "/assets/gallery1.png",
    alt: "Kareem and Nouran walking in the rose garden during their engagement session",
    caption: "A Walk in the Roses"
  },
  {
    src: "/assets/gallery2.png",
    alt: "Sunset close-up portrait of Kareem and Nouran during their engagement",
    caption: "Sunset Romance"
  },
  {
    src: "/assets/gallery3.png",
    alt: "Close-up of Nouran wearing her diamond engagement ring, held gently by Kareem",
    caption: "Our Covenant of Love"
  }
];

export function PhotoGallery() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [activeLightboxIdx, setActiveLightboxIdx] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play function
  useEffect(() => {
    if (isPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, 4500); // Transitions every 4.5 seconds
    } else {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleLightboxPrev = () => {
    if (activeLightboxIdx === null) return;
    setActiveLightboxIdx((prev) => (prev === 0 ? images.length - 1 : prev! - 1));
  };

  const handleLightboxNext = () => {
    if (activeLightboxIdx === null) return;
    setActiveLightboxIdx((prev) => (prev === images.length - 1 ? 0 : prev! + 1));
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIdx === null) return;
      if (e.key === "Escape") setActiveLightboxIdx(null);
      if (e.key === "ArrowLeft") handleLightboxPrev();
      if (e.key === "ArrowRight") handleLightboxNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIdx]);

  return (
    <section className="reveal text-center px-4">
      <h2 className="font-script text-5xl text-[#c4954a]">Engagement Gallery</h2>
      <div className="mt-4 mb-10">
        <div className="mx-auto w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4a857] to-transparent" />
      </div>

      {/* Main Slideshow Showcase Container */}
      <div className="relative mx-auto max-w-4xl h-[450px] sm:h-[550px] rounded-3xl overflow-hidden glass-card p-2 shadow-2xl transition-all duration-700 hover:shadow-[0_20px_50px_rgba(212,168,87,0.3)]">
        {/* Slides list */}
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
          {images.map((img, idx) => {
            const isActive = idx === currentIdx;
            return (
              <div
                key={idx}
                onClick={() => setActiveLightboxIdx(idx)}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out cursor-pointer group ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {/* Continuous smooth Zoom effect on the active photo */}
                {isActive && (
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover animate-ken-burns"
                  />
                )}
                {/* Visual Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#100b05]/90 via-[#100b05]/20 to-transparent transition-all duration-500" />
                
                {/* Bottom slide info */}
                <div className="absolute bottom-10 left-6 right-6 text-left sm:left-12 sm:right-12 z-20">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#f4d98a] font-medium font-sans block mb-2 animate-fade-in">
                    Photoshoot
                  </span>
                  <h3 className="font-serif text-2xl sm:text-4xl text-white leading-tight font-light animate-fade-up">
                    {img.caption}
                  </h3>
                </div>

                {/* Hover zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                  <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-500 border border-white/20">
                    <Maximize2 className="h-6 w-6" />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Left Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous Slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white flex items-center justify-center transition border border-white/10 cursor-pointer shadow-md"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next Slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/40 hover:bg-black/60 text-white/80 hover:text-white flex items-center justify-center transition border border-white/10 cursor-pointer shadow-md"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Play/Pause Control Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
            aria-label={isPlaying ? "Pause Autoplay" : "Play Autoplay"}
            className="absolute bottom-4 right-4 z-30 h-8 w-8 rounded-full bg-black/55 text-white/80 hover:text-white flex items-center justify-center transition border border-white/10 cursor-pointer"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Dots navigation indicator */}
      <div className="flex justify-center gap-3 mt-6 z-20 relative">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={`h-2.5 transition-all duration-500 rounded-full cursor-pointer ${
              idx === currentIdx ? "w-8 bg-[#d4a857]" : "w-2.5 bg-[#d4a857]/30 hover:bg-[#d4a857]/60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#100b05]/95 backdrop-blur-md animate-fade-in p-4 sm:p-10">
          {/* Close button */}
          <button
            onClick={() => setActiveLightboxIdx(null)}
            className="absolute top-6 right-6 z-50 h-12 w-12 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Lightbox Left arrow */}
          <button
            onClick={handleLightboxPrev}
            className="absolute left-4 sm:left-8 z-50 h-14 w-14 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          {/* Lightbox Display */}
          <div className="relative max-w-5xl max-h-[80vh] w-full flex flex-col items-center justify-center">
            <img
              src={images[activeLightboxIdx].src}
              alt={images[activeLightboxIdx].alt}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10 animate-scale-in"
            />
            {/* Caption & Counter */}
            <div className="text-center mt-6">
              <p className="font-serif text-xl sm:text-2xl text-white/90 font-light">
                {images[activeLightboxIdx].caption}
              </p>
              <p className="text-xs uppercase tracking-wider text-[#d4a857] mt-1 font-sans">
                {activeLightboxIdx + 1} of {images.length}
              </p>
            </div>
          </div>

          {/* Lightbox Right arrow */}
          <button
            onClick={handleLightboxNext}
            className="absolute right-4 sm:right-8 z-50 h-14 w-14 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </section>
  );
}
