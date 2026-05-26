export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#d4a857] to-[#d4a857]/60" />
      <svg
        viewBox="0 0 40 40"
        className="h-8 w-8 text-[#d4a857] drop-shadow-[0_0_6px_rgba(212,168,87,0.5)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M20 8 C 14 14, 14 22, 20 32 C 26 22, 26 14, 20 8 Z" />
        <circle cx="20" cy="20" r="2.5" fill="currentColor" />
      </svg>
      <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent via-[#d4a857] to-[#d4a857]/60" />
    </div>
  );
}
