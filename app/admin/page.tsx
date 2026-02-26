"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { LogOut, PlusCircle, Globe, Music, Loader2 } from "lucide-react";

type FormData = {
  title: string;
  year: string;
  cover_url: string;
  link_spotify: string;
  link_apple: string;
  link_deezer: string;
  link_youtube: string;
};

const getDefaultFormData = (): FormData => ({
  title: "",
  year: new Date().getFullYear().toString(),
  cover_url: "",
  link_spotify: "",
  link_apple: "",
  link_deezer: "",
  link_youtube: "",
});

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>(getDefaultFormData());

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      setLoading(false);
    };
    checkSession();
  }, [router]);

  const generateSlug = useCallback((text: string) => {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const payload = { ...formData, slug: generateSlug(formData.title) };
    const { error } = await supabase.from("musiques").insert([payload]);

    if (error) {
      alert("Erreur : " + error.message);
      setIsSubmitting(false);
      return;
    }

    alert("🔥 Projet ajouté au catalogue !");
    setFormData(getDefaultFormData());
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="h-screen bg-black text-white flex flex-col items-center justify-center font-mono gap-4">
        <Loader2 className="animate-spin text-zinc-500" size={32} />
        <span className="text-[10px] tracking-[0.5em] uppercase">Accès au Studio...</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      {/* Header : Fixe sur mobile pour toujours avoir le bouton Sortir */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5 px-6 py-6 mb-8">
        <div className="max-w-xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter italic">Studio</h1>
            <p className="hidden sm:block text-zinc-500 text-[8px] uppercase tracking-[0.3em]">Management</p>
          </div>

          <button
            onClick={() => supabase.auth.signOut().then(() => router.push("/login"))}
            className="flex items-center gap-2 text-[10px] text-zinc-400 hover:text-white border border-white/10 px-4 py-2 rounded-full uppercase transition-all active:scale-95"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Sortir</span>
          </button>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1 : Identité */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-zinc-500 mb-2">
              <PlusCircle size={16} />
              <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold">Nouveau Projet</h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 ml-1">Titre de l'oeuvre</label>
                <input
                  required
                  placeholder="Ex: Midnight City"
                  className="w-full bg-zinc-900 border border-white/5 p-4 rounded-2xl outline-none focus:border-white/20 transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 ml-1">Année de sortie</label>
                <input
                  required
                  type="number"
                  className="w-full bg-zinc-900 border border-white/5 p-4 rounded-2xl outline-none focus:border-white/20"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Section 2 : Visuel */}
          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 ml-1 flex items-center gap-2">
              <Globe size={14} /> URL de la Cover (JPG/PNG)
            </label>
            <input
              required
              type="url"
              placeholder="https://imgur.com/..."
              className="w-full bg-zinc-900 border border-white/5 p-4 rounded-2xl outline-none focus:border-white/20"
              value={formData.cover_url}
              onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
            />
          </div>

          {/* Section 3 : Liens Plateformes */}
          <div className="p-6 bg-zinc-900/50 rounded-[2rem] border border-white/5 space-y-4">
            <div className="flex items-center gap-2 mb-2 text-zinc-400">
              <Music size={14} />
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold">Plateformes</span>
            </div>

            {[
              { key: "link_spotify", placeholder: "URL Spotify" },
              { key: "link_apple", placeholder: "URL Apple Music" },
              { key: "link_deezer", placeholder: "URL Deezer" },
              { key: "link_youtube", placeholder: "URL YouTube" },
            ].map((p) => (
              <input
                key={p.key}
                type="url"
                placeholder={p.placeholder}
                className="w-full bg-black/40 border border-white/5 p-4 rounded-xl text-xs outline-none focus:border-white/20"
                value={(formData as any)[p.key]}
                onChange={(e) => setFormData({ ...formData, [p.key]: e.target.value })}
              />
            ))}
          </div>

          {/* Bouton Fixe ou Large sur Mobile */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-zinc-200 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl"
            >
              {isSubmitting && <Loader2 className="animate-spin" size={16} />}
              {isSubmitting ? "Enregistrement..." : "Publier le projet"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}