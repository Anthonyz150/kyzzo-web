"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', year: '', slug: '', cover_url: '' });
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('musiques').insert([formData]);
    if (error) alert("Erreur : " + error.message);
    else {
      alert("🔥 Musique ajoutée au catalogue !");
      setFormData({ title: '', year: '', slug: '', cover_url: '' });
    }
  };

  if (loading) return (
    <div className="h-screen bg-black text-white flex items-center justify-center font-mono tracking-widest">
      CHARGEMENT DU STUDIO...
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      
      {/* Header Admin */}
      <div className="w-full max-w-xl flex justify-between items-end mb-8 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Studio Admin</h1>
          <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1">Ajouter un nouveau projet</p>
        </div>
        <button 
          onClick={() => supabase.auth.signOut().then(() => router.push('/login'))}
          className="text-[10px] text-zinc-500 hover:text-red-500 border border-white/10 px-3 py-1 rounded-full transition-all"
        >
          DÉCONNEXION
        </button>
      </div>

      {/* Formulaire stylisé */}
      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 ml-1">Titre du projet</label>
            <input 
              required
              placeholder="Ex: Dernier Single" 
              className="bg-zinc-900/50 border border-white/5 p-4 rounded-xl focus:border-white/20 focus:bg-zinc-900 outline-none transition-all" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-zinc-400 ml-1">Année</label>
            <input 
              required
              placeholder="2026" 
              className="bg-zinc-900/50 border border-white/5 p-4 rounded-xl focus:border-white/20 focus:bg-zinc-900 outline-none transition-all" 
              value={formData.year} 
              onChange={(e) => setFormData({...formData, year: e.target.value})} 
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-zinc-400 ml-1">Slug URL (Identifiant unique)</label>
          <input 
            required
            placeholder="ex: mon-titre-single" 
            className="bg-zinc-900/50 border border-white/5 p-4 rounded-xl focus:border-white/20 focus:bg-zinc-900 outline-none transition-all font-mono text-sm text-zinc-400" 
            value={formData.slug} 
            onChange={(e) => setFormData({...formData, slug: e.target.value})} 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-zinc-400 ml-1">Lien de la Cover (URL)</label>
          <input 
            required
            placeholder="https://images.unsplash.com/..." 
            className="bg-zinc-900/50 border border-white/5 p-4 rounded-xl focus:border-white/20 focus:bg-zinc-900 outline-none transition-all text-sm" 
            value={formData.cover_url} 
            onChange={(e) => setFormData({...formData, cover_url: e.target.value})} 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        >
          Publier sur le site
        </button>
      </form>

      {/* Footer discret */}
      <p className="mt-12 text-zinc-700 text-[10px] uppercase tracking-widest">
        Kyzzo Official Dashboard v1.0
      </p>

    </main>
  );
}