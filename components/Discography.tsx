"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Music = {
  id: string;
  title: string;
  year: string;
  cover_url: string;
  link_spotify?: string;
  link_apple?: string;
  link_deezer?: string;
  link_youtube?: string;
};

export default function Discography() {
  const [songs, setSongs] = useState<Music[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Music | null>(null);

  useEffect(() => {
    async function getSongs() {
      const { data, error } = await supabase
        .from("musiques")
        .select("*")
        .order("year", { ascending: false });

      if (!error && data) setSongs(data);
      setLoading(false);
    }
    getSongs();
  }, []);

  if (loading)
    return (
      <div className="h-96 flex items-center justify-center text-zinc-500 font-mono text-xs md:text-sm tracking-[0.3em] animate-pulse px-6 text-center">
        CHARGEMENT DU STUDIO...
      </div>
    );

  return (
    <section
      id="discography"
      className="py-16 md:py-24 px-6 max-w-7xl mx-auto bg-black text-white scroll-mt-10 md:scroll-mt-24"
    >
      {/* Header : Stacked on mobile, side-by-side on desktop */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 border-b border-white/10 pb-6 gap-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            Discographie
          </h2>
          <p className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] mt-2">
            Dernières Releases & Productions
          </p>
        </div>
      </div>

      {songs.length === 0 && (
        <p className="text-center text-zinc-600 italic py-10">
          Aucun projet publié pour le moment.
        </p>
      )}

      {/* Grid : 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {songs.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group flex flex-col gap-4 md:gap-5 cursor-pointer"
          >
            <div className="relative aspect-square bg-zinc-900 rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 transition-all duration-500 shadow-2xl">
              {project.cover_url && (
                <img
                  src={project.cover_url}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 md:group-hover:scale-110"
                />
              )}
              {/* Overlay : Always visible or touch-triggered on mobile */}
              <div className="absolute inset-0 bg-black/40 md:bg-black/60 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 flex items-center justify-center md:backdrop-blur-sm">
                <span className="bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded-full font-black text-[10px] md:text-xs tracking-[0.2em] uppercase">
                  Écouter
                </span>
              </div>
            </div>

            <div className="space-y-1 px-1">
              <h3 className="text-xl md:text-2xl font-bold group-hover:text-zinc-400 transition-colors tracking-tight uppercase">
                {project.title}
              </h3>
              <p className="text-zinc-500 text-[9px] md:text-[10px] uppercase tracking-widest">
                {project.year}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* MODALE MOBILE OPTIMIZED */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl transition-all">
          <div className="bg-zinc-900 border border-white/10 p-6 md:p-8 rounded-[32px] md:rounded-[40px] max-w-sm w-full relative animate-in slide-in-from-bottom-4 duration-300">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 text-zinc-500 hover:text-white text-xl p-2"
            >
              ✕
            </button>

            <img
              src={selectedProject.cover_url}
              className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-xl shadow-2xl mb-6 object-cover"
              alt="Cover"
            />

            <h3 className="text-center text-xl md:text-2xl font-black uppercase mb-1 px-4">
              {selectedProject.title}
            </h3>

            <p className="text-center text-zinc-500 text-[9px] tracking-[0.2em] uppercase mb-8">
              Choisir une plateforme
            </p>

            <div className="space-y-2 md:space-y-3 max-h-[40vh] overflow-y-auto px-1">
              {[
                { name: "Spotify", link: selectedProject.link_spotify },
                { name: "Apple Music", link: selectedProject.link_apple },
                { name: "Deezer", link: selectedProject.link_deezer },
                { name: "YouTube", link: selectedProject.link_youtube },
              ]
                .filter((p) => p.link)
                .map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-xl md:rounded-2xl active:bg-white/10 transition-all"
                  >
                    <span className="font-bold text-xs md:text-sm">
                      {platform.name}
                    </span>
                    <span className="text-[9px] opacity-50 uppercase tracking-widest border border-white/20 px-2 py-1 rounded-md">
                      Ouvrir
                    </span>
                  </a>
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}