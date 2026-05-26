import React, { useState, useEffect } from "react";
import { MessageSquare, Send, Heart, User } from "lucide-react";
import { Divider } from "./Divider";

interface Blessing {
  id: string;
  name: string;
  message: string;
  date: string;
}

const INITIAL_BLESSINGS: Blessing[] = [];

export function Guestbook() {
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load blessings from KVdb with localStorage SWR cache
  useEffect(() => {
    // 1. Instantly load from localStorage if available
    const cached = localStorage.getItem("kareem_nouran_blessings_cache");
    if (cached) {
      try {
        setBlessings(JSON.parse(cached));
      } catch (e) {
        // Ignore cache parse errors
      }
    }

    // 2. Fetch fresh data from network
    const fetchBlessings = async () => {
      try {
        const res = await fetch("https://kvdb.io/6c6ago6YGyTTCV9fDWiRhd/blessings");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setBlessings(data);
            localStorage.setItem("kareem_nouran_blessings_cache", JSON.stringify(data));
          }
        }
      } catch (e) {
        console.error("Error loading blessings:", e);
      }
    };
    fetchBlessings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newBlessing: Blessing = {
      id: `blessing-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      })
    };

    try {
      // 1. Fetch latest state from server to append correctly
      const res = await fetch("https://kvdb.io/6c6ago6YGyTTCV9fDWiRhd/blessings");
      let currentList: Blessing[] = [];
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          currentList = data;
        }
      }

      const updated = [newBlessing, ...currentList];

      // 2. Post updated list back to KVdb
      const saveRes = await fetch("https://kvdb.io/6c6ago6YGyTTCV9fDWiRhd/blessings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updated),
      });

      if (saveRes.ok) {
        setBlessings(updated);
        localStorage.setItem("kareem_nouran_blessings_cache", JSON.stringify(updated));
        setName("");
        setMessage("");
      } else {
        console.error("Failed to save blessing to KVdb");
      }
    } catch (e) {
      console.error("Error submitting blessing:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="reveal text-center max-w-4xl mx-auto px-4">
      <h2 className="font-script text-5xl text-[#c4954a]">Wishes & Blessings</h2>
      <div className="mt-4 mb-4">
        <Divider />
      </div>
      <p className="font-serif italic text-[#5a4530] text-lg max-w-lg mx-auto">
        Leave a warm blessing, a congratulatory wish, or a loving message for Kareem & Nouran.
        <br />
        <span className="text-sm font-sans block mt-1 text-[#a8762f]">
          شارك كريم ونوران بتهنئة جميلة بمناسبة خطوبتهما السعيدة.
        </span>
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-12 text-left">
        {/* Blessing Form */}
        <div className="md:col-span-5 glass-card rounded-3xl p-8 h-fit border border-[#d4a857]/30 shadow-lg">
          <h3 className="font-serif text-xl text-[#2a1d10] mb-6 flex items-center gap-2 font-medium">
            <MessageSquare className="h-5 w-5 text-[#d4a857]" /> Write a Blessing / اكتب تهنئة
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="guest-name" className="block text-xs uppercase tracking-wider text-[#a8762f] font-semibold mb-2 font-sans flex justify-between">
                <span>Your Name</span>
                <span>الاسم</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#d4a857]/50">
                  <User className="h-4 w-4" />
                </span>
                <input
                  id="guest-name"
                  type="text"
                  required
                  placeholder="الاسم الكريم"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#fcf9f2]/70 border border-[#d4a857]/20 rounded-xl focus:outline-none focus:border-[#d4a857] text-[#2a1d10] font-serif placeholder-[#5a4530]/40 transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="guest-blessing" className="block text-xs uppercase tracking-wider text-[#a8762f] font-semibold mb-2 font-sans flex justify-between">
                <span>Your Message</span>
                <span>الرسالة</span>
              </label>
              <textarea
                id="guest-blessing"
                required
                rows={4}
                placeholder="اكتب أمنياتك الطيبة هنا..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 bg-[#fcf9f2]/70 border border-[#d4a857]/20 rounded-xl focus:outline-none focus:border-[#d4a857] text-[#2a1d10] font-serif placeholder-[#5a4530]/40 transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="glow-button w-full inline-flex items-center justify-center gap-3 rounded-full py-4 text-sm font-medium uppercase transition"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? "Sending... / جاري الإرسال" : "Send Wishes / إرسال"}
            </button>
          </form>
        </div>

        {/* Blessings Display Board */}
        <div className="md:col-span-7 flex flex-col">
          <h3 className="font-serif text-xl text-[#2a1d10] mb-6 flex items-center gap-2 font-medium">
            <Heart className="h-5 w-5 text-[#d4a857]" fill="currentColor" /> Wishes Board / دفتر التهاني ({blessings.length})
          </h3>

          <div className="space-y-4 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
            {blessings.length === 0 ? (
              <div className="text-center py-12 text-[#5a4530]/60 italic font-serif">
                Be the first to leave a warm message!
                <br />
                <span className="text-sm font-sans mt-1 block">كن أول من يكتب تهنئة للعروسين!</span>
              </div>
            ) : (
              blessings.map((b) => (
                <div
                  key={b.id}
                  className="glass-card rounded-2xl p-6 border border-[#d4a857]/20 hover:border-[#d4a857]/40 shadow-sm transition duration-300 animate-fade-up relative overflow-hidden"
                >
                  {/* Decorative top gold ribbon accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4a857]/30 to-transparent" />
                  
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="font-serif font-semibold text-[#2a1d10]">{b.name}</h4>
                    <span className="text-xxs uppercase tracking-wider text-[#a8762f] font-sans">
                      {b.date}
                    </span>
                  </div>
                  <p className="mt-3 font-serif text-[#5a4530] text-sm leading-relaxed whitespace-pre-line italic">
                    "{b.message}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
