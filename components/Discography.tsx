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
      <div className="h-96 flex items-center justify-center text-zinc-500 font-mono tracking-widest animate-pulse">
        CHARGEMENT DU STUDIO...
      </div>
    );

  return (
    <section
      id="discography"
      className="py-24 px-6 max-w-7xl mx-auto bg-black text-white scroll-mt-24"
    >
      <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-5xl font-black uppercase tracking-tighter">
            Discographie
          </h2>
          <p className="text-zinc-500 text-xs uppercase tracking-[0.4em] mt-2">
            Dernières Releases & Productions
          </p>
        </div>
      </div>

      {songs.length === 0 && (
        <p className="text-center text-zinc-600 italic">
          Aucun projet publié pour le moment.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {songs.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group flex flex-col gap-5 cursor-pointer"
          >
            <div className="relative aspect-square bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 group-hover:border-white/20 transition-all duration-700 shadow-2xl">
              {project.cover_url && (
                <img
                  src={project.cover_url}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                <span className="bg-white text-black px-8 py-3 rounded-full font-black text-xs tracking-[0.2em] uppercase">
                  Écouter
                </span>
              </div>
            </div>

            <div className="space-y-1 px-2">
              <h3 className="text-2xl font-bold group-hover:text-zinc-400 transition-colors tracking-tight uppercase">
                {project.title}
              </h3>
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest">
                {project.year}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* MODALE */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-zinc-900 border border-white/10 p-8 rounded-[40px] max-w-sm w-full relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white text-2xl"
            >
              ✕
            </button>

            <img
              src={selectedProject.cover_url}
              className="w-40 h-40 mx-auto rounded-2xl shadow-2xl mb-6 object-cover"
            />

            <h3 className="text-center text-2xl font-black uppercase mb-1">
              {selectedProject.title}
            </h3>

            <p className="text-center text-zinc-500 text-[10px] tracking-[0.2em] uppercase mb-8">
              Choisir une plateforme
            </p>

            <div className="space-y-3">
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
                    className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
                  >
                    <span className="font-bold text-sm">
                      {platform.name}
                    </span>
                    <span className="text-[10px] opacity-50 uppercase tracking-widest">
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