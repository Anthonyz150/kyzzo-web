import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Play } from 'lucide-react';

export default async function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  // Adaptation pour Next.js 15+ (params est une Promise)
  const { slug } = await params;

  // 1. Récupération de l'album
  const { data: album } = await supabase
    .from('musiques')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!album) notFound();

  // 2. Récupération des chansons
  const { data: songs } = await supabase
    .from('musiques')
    .select('*')
    .eq('album_id', album.id)
    .order('created_at', { ascending: true });

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      {/* Header Image de fond floue (effet immersif) */}
      <div className="absolute top-0 left-0 w-full h-[40vh] overflow-hidden opacity-30 pointer-events-none">
        <img src={album.cover_url} className="w-full h-full object-cover blur-3xl" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-10 md:pt-20">
        
        {/* Bouton Retour */}
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
          <ChevronLeft size={20} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Retour</span>
        </Link>

        {/* Info Album : Stacked on mobile, side-by-side on desktop */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-end">
          <div className="w-64 h-64 md:w-80 md:h-80 flex-shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <img 
              src={album.cover_url} 
              alt={album.title} 
              className="w-full h-full object-cover rounded-lg border border-white/5"
            />
          </div>
          
          <div className="text-center md:text-left">
            <span className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold">
              {album.type || "Projet"}
            </span>
            <h1 className="text-4xl md:text-7xl font-black uppercase mt-3 tracking-tighter leading-none">
              {album.title}
            </h1>
            <p className="text-zinc-400 mt-4 text-xs md:text-sm font-medium tracking-wide">
              {album.year} • Kyzzo Production
            </p>
          </div>
        </div>

        {/* TRACKLIST SECTION */}
        <div className="mt-16 md:mt-24">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Tracklist</h2>
            <span className="text-[10px] text-zinc-600 uppercase font-mono">{songs?.length || 0} Titres</span>
          </div>

          <div className="space-y-1">
            {songs && songs.length > 0 ? (
              songs.map((song, index) => (
                <div 
                  key={song.id} 
                  className="flex items-center gap-4 group py-4 px-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer active:bg-white/10"
                >
                  <span className="w-6 text-zinc-600 font-mono text-xs text-center">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  
                  <div className="flex-1">
                    <p className="text-sm md:text-base font-bold uppercase tracking-tight group-hover:text-white transition-colors">
                      {song.title}
                    </p>
                  </div>

                  <Play size={14} className="text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))
            ) : (
              <p className="text-center py-10 text-zinc-600 italic text-sm">
                Aucun titre ajouté pour le moment.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}