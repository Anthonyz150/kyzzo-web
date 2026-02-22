"use client"; // Obligatoire pour utiliser les hooks React (state/effect)

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // Importe le client qu'on a créé
import Link from 'next/link';

export default function Discography() {
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSongs() {
      const { data, error } = await supabase
        .from('musiques') // Le nom de ta table Supabase
        .select('*')
        .order('year', { ascending: false }); // Trie par année

      if (data) setSongs(data);
      setLoading(false);
    }
    getSongs();
  }, []);

  if (loading) return <div className="text-center py-20 text-white">Chargement du studio...</div>;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto bg-black text-white">
      <h2 className="text-4xl font-bold mb-12 tracking-tight">Discographie</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {songs.map((project) => (
          <Link
            href={`/musique/${project.slug}`} // On utilise le 'slug' de la base de données
            key={project.id}
            className="group flex flex-col gap-4"
          >
            <div className="relative aspect-square bg-zinc-900 rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500">
              <img
                src={project.cover_url} // URL venant de Supabase
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="border border-white text-white px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase">
                  Voir Détails
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white group-hover:text-zinc-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-zinc-500">{project.year}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}