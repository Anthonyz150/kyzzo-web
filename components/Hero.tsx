"use client";

import { useState } from "react";
import { X, Youtube, Music, Disc } from "lucide-react";

type SocialLink = {
  name: string;
  url: string;
  color: string;
  icon: React.ReactNode;
};

export default function Hero() {
  const [showContact, setShowContact] = useState(false);

  const scrollToDiscography = () => {
    const element = document.getElementById("discography");
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const socialLinks: SocialLink[] = [
    { name: "Spotify", icon: <Music size={20} />, url: "#", color: "hover:text-[#1DB954]" },
    { name: "Apple Music", icon: <Disc size={20} />, url: "https://music.apple.com/fr/artist/kyzzo/1518082587", color: "hover:text-[#FA243C]" },
    { name: "Deezer", icon: <Music size={20} />, url: "https://link.deezer.com/s/32vUjW110dnIYpnQh6nET", color: "hover:text-[#EF5466]" },
    { name: "YouTube", icon: <Youtube size={20} />, url: "https://www.youtube.com/@Kyyzzo", color: "hover:text-[#FF0000]" },
    { name: "TikTok", icon: <Music size={20} />, url: "https://www.tiktok.com/@kyyzzo06", color: "hover:text-[#69C9D0]" },
  ];

  return (
    <section className="relative min-h-[90vh] md:h-[85vh] flex flex-col items-center justify-center text-center bg-black text-white overflow-hidden px-4">
      
      {/* Background Image - Ajustée pour mobile */}
      <div className="absolute inset-0 z-0">
        <img
          src="/kyzzo-photo-de-profile.png"
          className="w-full h-full object-cover blur-[2px] md:blur-[1px] opacity-50 md:opacity-60"
          alt="Background Kyzzo"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_transparent_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
      </div>

      {/* Glow background - Réduit sur mobile pour la performance */}
      <div className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-white/5 rounded-full blur-[80px] md:blur-[140px] animate-pulse pointer-events-none" />

      {/* Title - Responsive font size */}
      <h1
        className="z-10 text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none"
        style={{ textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}
      >
        Kyzzo
      </h1>

      <p className="z-10 mt-4 text-sm md:text-xl font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase text-white/80 drop-shadow-lg px-2">
        Artiste & Producteur
      </p>

      {/* Buttons - Stacked on small mobiles */}
      <div className="z-10 mt-10 md:mt-14 flex flex-col sm:flex-row justify-center gap-4 w-full max-w-[280px] sm:max-w-none">
        <button
          onClick={scrollToDiscography}
          className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-3 bg-white text-black font-bold rounded-full transition-all active:scale-95 md:hover:scale-105 shadow-lg text-sm md:text-base"
        >
          Dernier Album
        </button>

        <button
          onClick={() => setShowContact(true)}
          className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-3 border border-white/30 backdrop-blur-md rounded-full font-bold transition-all active:scale-95 md:hover:bg-white/10 text-sm md:text-base"
        >
          Plateformes
        </button>
      </div>

      {/* Modal - Full screen mobile friendly */}
      {showContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="relative bg-zinc-900 border border-white/10 p-6 md:p-8 rounded-[2rem] max-w-sm w-full animate-in zoom-in duration-300 shadow-2xl">
            <button
              onClick={() => setShowContact(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white transition p-2"
            >
              <X size={28} />
            </button>

            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center pt-2">
              Retrouve Kyzzo
            </h2>

            <div className="grid gap-2 md:gap-3 max-h-[60vh] overflow-y-auto pr-1">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 transition-all active:bg-white/20 ${link.color}`}
                >
                  <span className="font-bold uppercase text-[10px] md:text-xs tracking-widest">
                    {link.name}
                  </span>
                  {link.icon}
                </a>
              ))}
            </div>

            <p className="text-[9px] text-zinc-500 text-center mt-8 uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} Kyzzo Production
            </p>
          </div>
        </div>
      )}
    </section>
  );
}