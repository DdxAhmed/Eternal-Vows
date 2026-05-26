import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, MapPin, Shirt, Heart, ArrowLeft, Music2, VolumeX, BookOpen, Sparkles } from "lucide-react";
import { Particles } from "@/components/Particles";
import { Divider } from "@/components/Divider";
import { useReveal } from "@/hooks/use-reveal";
import { useAudio } from "@/context/AudioContext";
import { Countdown } from "@/components/Countdown";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Guestbook } from "@/components/Guestbook";
import { QuotesSlider } from "@/components/QuotesSlider";

export const Route = createFileRoute("/invitation")({
  component: Invitation,
});

function Invitation() {
  useReveal();
  const { isPlaying, toggle } = useAudio();

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#fbf6ec] via-[#f9efe0] to-[#fdf5e6]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#f4d98a]/15 blur-2xl" />
        <div className="absolute bottom-1/4 -left-40 h-[350px] w-[350px] rounded-full bg-[#f1c6c9]/18 blur-2xl" />
        <div className="absolute top-1/2 -right-40 h-[350px] w-[350px] rounded-full bg-[#fff4d6]/30 blur-2xl" />
      </div>

      <div className="fixed inset-0 floral-bg opacity-50 pointer-events-none" />
      <Particles count={15} />

      <Link
        to="/"
        className="fixed left-5 top-5 z-30 inline-flex items-center gap-2 rounded-full glass-card px-4 py-2 text-sm text-[#a8762f] transition hover:scale-105"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      {/* Floating music toggle */}
      <button
        onClick={toggle}
        aria-label="Play or pause background music"
        className="fixed right-5 top-5 z-30 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full glass-card text-[#a8762f] transition hover:scale-110 cursor-pointer shadow-sm"
      >
        {isPlaying ? <Music2 className="h-5 w-5 animate-pulse" /> : <VolumeX className="h-5 w-5" />}
      </button>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 space-y-32">
        <Couple />
        <LoveStory />
        <Timeline />
        <PhotoGallery />
        <EventDetails />
        <GuestMessage />
        <QuotesSlider />
        <Location />
        <Guestbook />
        <Footer />
      </div>
    </main>
  );
}

function Couple() {
  return (
    <section className="text-center animate-fade-up">
      <p className="font-script text-2xl text-[#c4954a]">We are delighted to invite you to celebrate the engagement of</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-10">
        <h1 className="gold-gradient-text font-serif text-6xl sm:text-8xl italic leading-none">
          Kareem
        </h1>
        <span className="font-script text-5xl text-[#2a1d10]">&</span>
        <h1 className="gold-gradient-text font-serif text-6xl sm:text-8xl italic leading-none">
          Nouran
        </h1>
      </div>
      <div className="mt-10">
        <Divider />
      </div>
      <p className="mt-8 font-serif italic text-lg text-[#5a4530]">
        "Two hearts bound by the beautiful bond of eternity."
      </p>

      {/* Countdown timer component */}
      <div className="mt-10">
        <Countdown />
      </div>
    </section>
  );
}

function LoveStory() {
  return (
    <section className="reveal text-center">
      <h2 className="font-script text-5xl text-[#c4954a]">Our Love Story</h2>
      <div className="mt-4">
        <Divider />
      </div>
      <div className="mx-auto mt-10 max-w-2xl glass-card rounded-3xl p-10 sm:p-14">
        <p className="font-serif text-xl sm:text-2xl leading-relaxed text-[#3a2a18] italic">
          Our story began with a simple glance across a candlelit room — a quiet hello that blossomed into shared laughter, whispered dreams, and a thousand beautiful adventures.
        </p>
        <p className="mt-6 font-serif text-lg leading-relaxed text-[#5a4530]">
          Through golden mornings and starlit nights, across changing seasons and quiet storms, we discovered that love is not a single moment, but a gentle, steady turning toward one another. Today, we begin our most beautiful chapter yet — together, forever.
        </p>
      </div>
    </section>
  );
}

function EventDetails() {
  const details = [
    { icon: Calendar, label: "Date", value: "Friday", sub: "June 26, 2026" },
    { icon: Clock, label: "Time", value: "8:00 PM", sub: "Until the late hours" },
    { icon: MapPin, label: "Venue", value: "Bedaya Hall", sub: "Damanhour, Egypt" },
    { icon: Shirt, label: "Dress Code", value: "Formal & Elegant", sub: "Champagne & Ivory tones" },
  ];
  return (
    <section className="reveal">
      <div className="text-center">
        <h2 className="font-script text-5xl text-[#c4954a]">The Engagement Details</h2>
        <div className="mt-4">
          <Divider />
        </div>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {details.map((d, i) => (
          <div
            key={d.label}
            className="glass-card group rounded-2xl p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(212,168,87,0.5)]"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[#f4d98a] to-[#d4a857] text-[#2a1d10] shadow-lg transition group-hover:scale-110 group-hover:rotate-6">
              <d.icon className="h-7 w-7" />
            </div>
            <p className="mt-5 text-xs uppercase text-[#a8762f]">{d.label}</p>
            <p className="mt-3 font-serif text-2xl text-[#2a1d10]">{d.value}</p>
            <p className="mt-1 text-sm text-[#5a4530] italic">{d.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Engagement+of+Kareem+%26+Nouran&dates=20260626T170000Z/20260626T230000Z&details=We+are+delighted+to+invite+you+to+celebrate+the+engagement+of+Kareem+%26+Nouran+at+Bedaya+Hall.&location=Bedaya+Hall"
          target="_blank"
          rel="noreferrer"
          className="glow-button inline-flex items-center gap-3 rounded-full px-8 py-3.5 text-sm font-medium uppercase transition hover:scale-105"
        >
          <Calendar className="h-4 w-4" /> Add to Google Calendar
        </a>
      </div>
    </section>
  );
}

function GuestMessage() {
  return (
    <section className="reveal text-center">
      <div className="mx-auto max-w-3xl glass-card rounded-3xl p-12 sm:p-16">
        <Heart className="mx-auto h-10 w-10 text-[#d4a857] animate-pulse" fill="currentColor" />
        <p className="mt-6 font-serif text-2xl sm:text-3xl italic leading-relaxed text-[#3a2a18]">
          "Your presence will add a special joy to our celebration.
          <br />
          We are honored and overjoyed to share this beautiful day with you."
        </p>
        <p className="mt-8 font-script text-3xl text-[#c4954a]">With all our love, Kareem & Nouran</p>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="reveal text-center">
      <h2 className="font-script text-5xl text-[#c4954a]">The Location</h2>
      <div className="mt-4">
        <Divider />
      </div>
      <div className="mt-10 overflow-hidden rounded-3xl glass-card p-2">
        <div className="relative h-72 sm:h-96 overflow-hidden rounded-2xl">
          <iframe
            title="Venue Location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=30.43%2C31.01%2C30.51%2C31.07&layer=mapnik"
            className="absolute inset-0 h-full w-full grayscale-[40%] sepia-[20%]"
            loading="lazy"
          />
        </div>
      </div>
      <a
        href="https://maps.app.goo.gl/KHMunwz1We3q8QC78"
        target="_blank"
        rel="noreferrer"
        className="glow-button mt-10 inline-flex items-center gap-3 rounded-full px-10 py-4 text-sm font-medium uppercase"
      >
        <MapPin className="h-4 w-4" /> View on Google Maps
      </a>
    </section>
  );
}

function Timeline() {
  const steps = [
    {
      date: "March 22, 2026",
      titleAr: "أول لقاء جمعنا",
      titleEn: "Our First Meet",
      descAr: "حين التقت أعيننا للمرة الأولى وتبدلت الكلمات البسيطة إلى حديث لا ينتهي ومشاعر صادقة.",
      descEn: "When our eyes first met, and simple words blossomed into endless conversations and genuine feelings.",
      icon: Heart,
    },
    {
      date: "May 2, 2026",
      titleAr: "قراءة الفاتحة",
      titleEn: "Reading the Fatiha",
      descAr: "خطوة مباركة جمعت بين عائلتينا وتكللت بالدعاء بالخير والبركة لرحلتنا القادمة.",
      descEn: "A blessed step that brought our families together, crowned with prayers for goodness and blessing.",
      icon: BookOpen,
    },
    {
      date: "June 26, 2026",
      titleAr: "حفل الخطوبة",
      titleEn: "The Engagement Day",
      descAr: "اليوم الذي نعلن فيه حبنا أمام الجميع ونبدأ فيه كتابة أجمل فصول حياتنا معاً.",
      descEn: "The day we declare our love before everyone and begin writing the most beautiful chapters of our lives together.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="reveal text-center max-w-5xl mx-auto px-4">
      <h2 className="font-script text-5xl text-[#c4954a]">Our Journey</h2>
      <div className="mt-4 mb-16">
        <Divider />
      </div>

      <div className="relative mx-auto max-w-4xl">
        {/* Central Vertical Line (Desktop) / Left Line (Mobile) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#d4a857]/50 via-[#d4a857]/30 to-transparent" />

        <div className="space-y-12">
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Connector / Dot */}
                <div className="absolute left-4 md:left-1/2 top-6 md:top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#f4d98a] to-[#d4a857] text-[#2a1d10] shadow-md border-4 border-[#fdf5e6] transition-transform duration-300 hover:scale-125">
                    <step.icon className="h-4 w-4" />
                  </div>
                </div>

                {/* Content Box */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                  <div className="glass-card rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(212,168,87,0.3)] hover:-translate-y-1 relative group">
                    {/* Tiny triangle pointer */}
                    <div
                      className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-[#ffffff]/60 backdrop-blur-md border-b border-l border-[#d4a857]/20 ${
                        isEven
                          ? "-left-1.5 border-[#d4a857]/20 border-r-0 border-t-0"
                          : "-right-1.5 border-[#d4a857]/20 border-l-0 border-b-0 border-r border-t"
                      }`}
                    />

                    {/* Date Tag */}
                    <span className="inline-block px-3 py-1 rounded-full bg-[#d4a857]/10 text-xs font-serif text-[#a8762f] tracking-wide uppercase font-semibold mb-4">
                      {step.date}
                    </span>

                    {/* Titles */}
                    <div className="flex justify-between items-baseline flex-wrap gap-2 border-b border-[#d4a857]/10 pb-3">
                      <h3 className="font-serif text-lg sm:text-xl text-[#2a1d10] font-semibold">
                        {step.titleEn}
                      </h3>
                      <span className="font-sans text-lg text-[#c4954a] font-medium" dir="rtl">
                        {step.titleAr}
                      </span>
                    </div>

                    {/* Descriptions */}
                    <div className="mt-4 space-y-3">
                      <p className="font-serif italic text-sm text-[#5a4530] leading-relaxed">
                        "{step.descEn}"
                      </p>
                      <p className="font-sans text-base text-[#3a2a18] leading-relaxed text-right" dir="rtl">
                        "{step.descAr}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Empty Spacer Column for Desktop alignment */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="text-center pt-10">
      <Divider />
      <p className="mt-8 font-script text-4xl gold-gradient-text">Kareem & Nouran</p>
      <p className="mt-2 text-xs uppercase text-[#a8762f]">
        26 · 06 · 2026 · Damanhour
      </p>
      <p className="mt-6 font-serif italic text-sm text-[#5a4530]">
        "And so, hand in hand, they began their happily ever after."
      </p>
    </footer>
  );
}
