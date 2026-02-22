"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear().toString(),
    slug: '',
    cover_url: '',
    album_id: '', // Si vide = c'est un Album, si rempli = c'est une Chanson
    link_spotify: '',
    link_apple: '',
    link_deezer: '',
    link_youtube: ''
  });
  const router = useRouter();

  useEffect(() => {
    const initAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      // On récupère les albums pour savoir à quoi rattacher les futures chansons
      const { data } = await supabase.from('musiques').select('id, title').eq('type', 'album');
      if (data) setAlbums(data);
      setLoading(false);
    };
    initAdmin();
  }, [router]);

  const generateSlug = (text: string) => {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // LOGIQUE UNIQUE : 
    // Si album_id est vide, le type est 'album'. Sinon, c'est une 'chanson'.
    const isAlbum = formData.album_id === '';
    
    const dataToSubmit = {
      ...formData,
      type: isAlbum ? 'album' : 'chanson',
      album_id: isAlbum ? null : formData.album_id,
      slug: generateSlug(formData.title)
    };

    const { error } = await supabase.from('musiques').insert([dataToSubmit]);

    if (error) {
      alert("Erreur : " + error.message);
    } else {
      alert(`🔥 ${isAlbum ? 'ALBUM' : 'CHANSON'} ajouté(e) au catalogue !`);
      setFormData({
        title: '',
        year: new Date().getFullYear().toString(),
        slug: '',
        cover_url: '',
        album_id: '',
        link_spotify: '',
        link_apple: '',
        link_deezer: '',
        link_youtube: ''
      });
      // Rafraîchir la liste des albums au cas où on vient d'en créer un
      const { data } = await supabase.from('musiques').select('id, title').eq('type', 'album');
      if (data) setAlbums(data);
    }
  };

  if (loading) return <div className="h-screen bg-black text-white flex items-center justify-center font-mono">ACCÈS AU STUDIO...</div>;

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-6">
      
      <div className="w-full max-w-xl flex justify-between items-end mb-12 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">Studio Admin</h1>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mt-2">Formulaire Unique Kyzzo</p>
        </div>
        <button onClick={() => supabase.auth.signOut().then(() => router.push('/login'))} className="text-[10px] text-zinc-600 hover:text-white border border-white/5 px-4 py-2 rounded-full uppercase">Sortir</button>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-8">
        
        {/* RATTACHEMENT (La clé du formulaire unique) */}
        <div className="space-y-3 bg-zinc-900/30 p-6 rounded-3xl border border-white/5">
          <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">Ce projet est :</label>
          <select 
            className="w-full bg-zinc-900 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-white/40 transition-all"
            value={formData.album_id}
            onChange={(e) => setFormData({...formData, album_id: e.target.value})}
          >
            <option value="">💿 UN NOUVEL ALBUM / EP (PROJET PARENT)</option>
            <optgroup label="OU RATTACHER À UN ALBUM EXISTANT (DEVIENT UNE CHANSON)">
              {albums.map((album) => (
                <option key={album.id} value={album.id}>🎵 Titre pour : {album.title}</option>
              ))}
            </optgroup>
          </select>
          <p className="text-[9px] text-zinc-600 italic px-2">
            {formData.album_id === '' 
              ? "Info : En laissant 'Nouvel Album', le projet apparaîtra dans la discographie." 
              : "Info : En choisissant un album, ce titre sera listé dans la tracklist de l'album."}
          </p>
        </div>

        {/* INFOS PROJET */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">Titre</label>
            <input required className="w-full bg-zinc-900 border border-white/5 p-4 rounded-xl outline-none" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">Année</label>
            <input required className="w-full bg-zinc-900 border border-white/5 p-4 rounded-xl outline-none" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">Lien de la Cover (URL)</label>
          <input required className="w-full bg-zinc-900 border border-white/5 p-4 rounded-xl outline-none" value={formData.cover_url} onChange={(e) => setFormData({...formData, cover_url: e.target.value})} />
        </div>

        {/* LIENS STREAMING */}
        <div className="space-y-4 p-6 bg-white/[0.02] rounded-3xl border border-white/5">
          <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 block mb-2 font-bold">Plateformes (Optionnel)</label>
          <input placeholder="Lien Spotify" className="w-full bg-black/40 border border-white/5 p-3 rounded-lg text-xs outline-none focus:border-[#1DB954]/50" value={formData.link_spotify} onChange={(e) => setFormData({...formData, link_spotify: e.target.value})} />
          <input placeholder="Lien Apple Music" className="w-full bg-black/40 border border-white/5 p-3 rounded-lg text-xs outline-none focus:border-[#FC3C44]/50" value={formData.link_apple} onChange={(e) => setFormData({...formData, link_apple: e.target.value})} />
          <input placeholder="Lien YouTube" className="w-full bg-black/40 border border-white/5 p-3 rounded-lg text-xs outline-none focus:border-[#FF0000]/50" value={formData.link_youtube} onChange={(e) => setFormData({...formData, link_youtube: e.target.value})} />
        </div>

        <button type="submit" className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-zinc-200 transition-all">
          Confirmer la publication
        </button>
      </form>
    </main>
  );
}