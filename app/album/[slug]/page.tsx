// app/musique/[slug]/page.tsx
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function AlbumPage({ params }: { params: { slug: string } }) {
  // 1. On récupère les infos de l'album via le slug
  const { data: album } = await supabase
    .from('musiques')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!album) notFound();

  // 2. On récupère les chansons rattachées à cet album
  const { data: songs } = await supabase
    .from('musiques')
    .select('*')
    .eq('album_id', album.id)
    .order('created_at', { ascending: true });

  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-end">
          <img 
            src={album.cover_url} 
            alt={album.title} 
            className="w-80 h-80 object-cover shadow-2xl"
          />
          <div>
            <span className="text-zinc-500 uppercase tracking-[0.3em] text-xs">{album.type}</span>
            <h1 className="text-6xl font-black uppercase mt-2">{album.title}</h1>
            <p className="text-zinc-400 mt-4">{album.year} • Kyzzo Production</p>
          </div>
        </div>

        {/* TRACKLIST */}
        <div className="mt-20">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-white/10 pb-4 mb-6">Tracklist</h2>
          <div className="space-y-4">
            {songs && songs.length > 0 ? (
              songs.map((song, index) => (
                <div key={song.id} className="flex items-center gap-6 group py-2">
                  <span className="text-zinc-600 font-mono text-sm">{(index + 1).toString().padStart(2, '0')}</span>
                  <p className="font-bold uppercase tracking-tight group-hover:text-zinc-400 transition-colors">{song.title}</p>
                </div>
              ))
            ) : (
              <p className="text-zinc-600 italic text-sm">Aucun titre ajouté pour le moment.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}