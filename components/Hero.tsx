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

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const socialLinks: SocialLink[] = [
    {
      name: "Spotify",
      icon: <Music size={20} />,
      url: "https://open.spotify.com/intl-fr/artist/6NMoQfI3m6XryDbWDJCmg3?si=MvjwW66BTwiBjhwkuMfN2A",
      color: "hover:text-[#1DB954]",
    },
    {
      name: "Apple Music",
      icon: <Disc size={20} />,
      url: "https://music.apple.com/fr/artist/kyzzo/1518082587",
      color: "hover:text-[#FA243C]",
    },
    {
      name: "Deezer",
      icon: <Music size={20} />,
      url: "https://link.deezer.com/s/32vUjW110dnIYpnQh6nET",
      color: "hover:text-[#EF5466]",
    },
    {
      name: "YouTube",
      icon: <Youtube size={20} />,
      url: "https://www.youtube.com/@Kyyzzo",
      color: "hover:text-[#FF0000]",
    },
    {
      name: "TikTok",
      icon: <Music size={20} />,
      url: "https://www.tiktok.com/@kyyzzo06",
      color: "hover:text-[#69C9D0]",
    },
  ];

  return (
    <section className="relative h-[85vh] flex flex-col items-center justify-center text-center bg-black text-white overflow-hidden">
      
      {/* Background Image avec Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/kyzzo-photo-de-profile.png" // <--- Remplace par le chemin de ton image
          alt="Kyzzo Background"
          className="w-full h-full object-cover opacity-50"
        />
        {/* Dégradé pour fondre l'image dans le noir en bas et adoucir le haut */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      {/* Glow background (ajusté pour ne pas trop polluer l'image) */}
      <div className="absolute w-[600px] h-[600px] bg-white/5 rounded-full blur-[140px] animate-pulse" />

      {/* Title */}
      <h1 className="z-10 text-8xl md:text-9xl font-black tracking-tighter uppercase drop-shadow-2xl">
        Kyzzo
      </h1>

      <p className="z-10 mt-4 text-lg md:text-xl font-light tracking-[0.6em] uppercase text-zinc-300 drop-shadow-md">
        Artiste & Producteur
      </p>

      {/* Buttons */}
      <div className="z-10 mt-14 flex gap-4">
        <button
          onClick={scrollToDiscography}
          className="px-10 py-3 bg-white text-black font-bold rounded-full transition-all hover:scale-105 hover:bg-zinc-200 shadow-lg"
        >
          Dernier Album
        </button>

        <button
          onClick={() => setShowContact(true)}
          className="px-10 py-3 border border-white/20 backdrop-blur-sm rounded-full font-bold transition-all hover:bg-white/10 hover:scale-105"
        >
          Contact & Plateformes
        </button>
      </div>

      {/* Modal - Identique au tien */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
          <div className="relative bg-zinc-900 border border-white/10 p-8 rounded-3xl max-w-sm w-full animate-in zoom-in duration-300">
            <button
              onClick={() => setShowContact(false)}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-8 text-center">
              Retrouve Kyzzo
            </h2>

            <div className="grid gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 transition-all hover:bg-white/10 ${link.color}`}
                >
                  <span className="font-bold uppercase text-xs tracking-widest">
                    {link.name}
                  </span>
                  {link.icon}
                </a>
              ))}
            </div>

            <p className="text-[10px] text-zinc-600 text-center mt-10 uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} Kyzzo Production
            </p>
          </div>
        </div>
      )}
    </section>
  );
}