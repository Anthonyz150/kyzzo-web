"use client";
import { useState } from 'react';
import Link from 'next/link';
import { X, Youtube, Music, Disc, Instagram } from 'lucide-react';

export default function Hero() {
  const [showContact, setShowContact] = useState(false);

  // On crée une petite liste de tes liens pour que le code soit propre
  const socialLinks = [
    { 
      name: 'Spotify', 
      icon: <Music size={20}/>, 
      url: 'https://open.spotify.com/intl-fr/artist/6NMoQfI3m6XryDbWDJCmg3?si=MvjwW66BTwiBjhwkuMfN2A', 
      color: 'hover:text-[#1DB954]' 
    },
    { 
      name: 'Apple Music', 
      icon: <Disc size={20}/>, 
      url: 'https://music.apple.com/fr/artist/kyzzo/1518082587', 
      color: 'hover:text-[#FA243C]' 
    },
    { 
      name: 'Deezer', 
      icon: <Music size={20}/>, 
      url: 'https://link.deezer.com/s/32vUjW110dnIYpnQh6nET', 
      color: 'hover:text-[#EF5466]' 
    },
    { 
      name: 'YouTube', 
      icon: <Youtube size={20}/>, 
      url: 'https://www.youtube.com/@Kyyzzo', 
      color: 'hover:text-[#FF0000]' 
    },
    { 
      name: 'TikTok', 
      icon: <Music size={20}/>, 
      url: 'https://www.tiktok.com/@kyyzzo06', 
      color: 'hover:text-[#69C9D0]' 
    },
  ];

  return (
    <section className="relative h-[80vh] flex flex-col items-center justify-center text-center bg-zinc-950 text-white overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
      
      <h1 className="z-10 text-8xl font-black tracking-tighter uppercase md:text-9xl">
        Kyzzo
      </h1>
      <p className="z-10 mt-4 text-xl font-light tracking-[0.6em] uppercase text-zinc-500">
        Artiste & Producteur
      </p>
      
      <div className="z-10 mt-12 flex gap-4">
        <Link href="#discography" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition">
          Dernier Release
        </Link>
        
        <button 
          onClick={() => setShowContact(true)}
          className="px-8 py-3 border border-white/20 hover:bg-white/10 transition rounded-full font-bold"
        >
          Contact & Plateformes
        </button>
      </div>

      {/* --- FENÊTRE DES INFOS (MODAL) --- */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
          <div className="relative bg-zinc-900 border border-white/10 p-8 rounded-3xl max-w-sm w-full">
            <button 
              onClick={() => setShowContact(false)}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">Retrouve Kyzzo</h2>

            <div className="grid gap-3">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 transition-all ${link.color} hover:bg-white/10`}
                >
                  <span className="font-bold uppercase text-xs tracking-widest">{link.name}</span>
                  {link.icon}
                </a>
              ))}
            </div>

            <p className="text-[10px] text-zinc-600 text-center mt-8 uppercase tracking-[0.2em]">
              © 2026 Kyzzo Production
            </p>
          </div>
        </div>
      )}
    </section>
  );
}