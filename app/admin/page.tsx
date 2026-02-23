"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

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

  // 🔐 Vérification session
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      setLoading(false);
    };

    checkSession();
  }, [router]);

  const generateSlug = useCallback((text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }, []);

  const resetForm = () => {
    setFormData(getDefaultFormData());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const payload = {
      ...formData,
      slug: generateSlug(formData.title),
    };

    const { error } = await supabase.from("musiques").insert([payload]);

    if (error) {
      alert("Erreur : " + error.message);
      setIsSubmitting(false);
      return;
    }

    alert("🔥 Projet ajouté au catalogue !");
    resetForm();
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center font-mono">
        ACCÈS AU STUDIO...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-6">
      {/* Header */}
      <div className="w-full max-w-xl flex justify-between items-end mb-12 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">
            Studio Admin
          </h1>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mt-2">
            Publication directe
          </p>
        </div>

        <button
          onClick={() =>
            supabase.auth.signOut().then(() => router.push("/login"))
          }
          className="text-[10px] text-zinc-600 hover:text-white border border-white/5 px-4 py-2 rounded-full uppercase"
        >
          Sortir
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-8">
        {/* Infos principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">
              Titre
            </label>
            <input
              required
              className="w-full bg-zinc-900 border border-white/5 p-4 rounded-xl outline-none"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">
              Année
            </label>
            <input
              required
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              className="w-full bg-zinc-900 border border-white/5 p-4 rounded-xl outline-none"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
            />
          </div>
        </div>

        {/* Cover */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">
            Lien de la Cover (URL)
          </label>
          <input
            required
            type="url"
            className="w-full bg-zinc-900 border border-white/5 p-4 rounded-xl outline-none"
            value={formData.cover_url}
            onChange={(e) =>
              setFormData({ ...formData, cover_url: e.target.value })
            }
          />
        </div>

        {/* Streaming */}
        <div className="space-y-4 p-6 bg-white/[0.02] rounded-3xl border border-white/5">
          <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 block mb-2 font-bold">
            Plateformes (Optionnel)
          </label>

          {[
            { key: "link_spotify", placeholder: "Lien Spotify" },
            { key: "link_apple", placeholder: "Lien Apple Music" },
            { key: "link_deezer", placeholder: "Lien Deezer" },
            { key: "link_youtube", placeholder: "Lien YouTube" },
          ].map((platform) => (
            <input
              key={platform.key}
              type="url"
              placeholder={platform.placeholder}
              className="w-full bg-black/40 border border-white/5 p-3 rounded-lg text-xs outline-none"
              value={(formData as any)[platform.key]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [platform.key]: e.target.value,
                })
              }
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-zinc-200 transition-all disabled:opacity-50"
        >
          {isSubmitting ? "Publication..." : "Confirmer la publication"}
        </button>
      </form>
    </main>
  );
}