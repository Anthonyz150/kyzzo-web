"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function Discography() {
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSongs() {
      const { data, error } = await supabase
        .from('musiques')
        .select('*')
        .eq('type', 'album') // <--- AJOUTE CETTE LIGNE ICI
        .order('year', { ascending: false });
  
      if (data) setSongs(data);
      setLoading(false);
    }
    getSongs();
  }, []);

  if (loading) return (
    <div className="h-96 flex items-center justify-center text-zinc-500 font-mono tracking-widest animate-pulse">
      CHARGEMENT DU STUDIO...
    </div>
  );

  return (
    // L'ID 'discography' permet au bouton du Hero de savoir où scroller
    // 'scroll-mt-24' empêche le titre d'être collé en haut de l'écran après le scroll
    <section 
      id="discography" 
      className="py-24 px-6 max-w-7xl mx-auto bg-black text-white scroll-mt-24"
    >
      <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-5xl font-black uppercase tracking-tighter">Discographie</h2>
          <p className="text-zinc-500 text-xs uppercase tracking-[0.4em] mt-2">Dernières Releases & Productions</p>
        </div>
        <span className="text-zinc-700 font-mono text-sm hidden md:block">
          {songs.length} PROJETS DISPONIBLES
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {songs.map((project) => (
          <Link
            href={`/musique/${song.slug}`}
            key={project.id}
            className="group flex flex-col gap-5"
          >
            {/* Conteneur de l'image avec effet Glassmorphism sur le hover */}
            <div className="relative aspect-square bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 group-hover:border-white/20 transition-all duration-700 shadow-2xl">
              <img
                src={project.cover_url}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-110 blur-0 group-hover:blur-[2px]"
              />
              
              {/* Overlay qui apparaît au survol */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                <span className="bg-white text-black px-8 py-3 rounded-full font-black text-xs tracking-[0.2em] uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  Découvrir
                </span>
              </div>
            </div>

            <div className="space-y-1 px-2">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white group-hover:text-zinc-400 transition-colors tracking-tight">
                  {project.title}
                </h3>
                <span className="text-[10px] font-mono text-zinc-600 bg-zinc-900 px-2 py-1 rounded">
                  {project.year}
                </span>
              </div>
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Single / Album</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}