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
    type: 'chanson', // Par défaut
    album_id: '',    // Pour rattacher une chanson
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

      // On récupère uniquement les albums existants pour pouvoir y rattacher des chansons
      const { data: albumsData } = await supabase
        .from('musiques')
        .select('id, title')
        .eq('type', 'album');

      if (albumsData) setAlbums(albumsData);
      setLoading(false);
    };
    initAdmin();
  }, [router]);

  const generateSlug = (text: string) => {
    return text.toLowerCase().trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({ ...formData, title, slug: generateSlug(title) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Logique de fusion : 
    // Si c'est un album, on force l'album_id à null.
    // Si c'est une chanson sans album sélectionné, on force aussi à null (Single).
    const dataToSubmit = {
      ...formData,
      album_id: formData.type === 'chanson' && formData.album_id !== '' ? formData.album_id : null
    };

    const { error } = await supabase.from('musiques').insert([dataToSubmit]);

    if (error) {
      alert("Erreur : " + error.message);
    } else {
      alert(`🔥 ${formData.type === 'album' ? 'Album' : 'Chanson'} ajouté(e) avec succès !`);
      
      // On réinitialise tout sauf l'année
      setFormData({
        ...formData,
        title: '',
        slug: '',
        cover_url: '',
        album_id: '',
        link_spotify: '',
        link_apple: '',
        link_deezer: '',
        link_youtube: ''
      });
      
      // On rafraîchit la liste des albums au cas où on vient d'en créer un nouveau
      const { data: refreshAlbums } = await supabase.from('musiques').select('id, title').eq('type', 'album');
      if (refreshAlbums) setAlbums(refreshAlbums);
    }
  };

  if (loading) return (
    <div className="h-screen bg-black text-white flex items-center justify-center font-mono animate-pulse">
      SYNCHRONISATION DU STUDIO...
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-6">
      
      {/* HEADER */}
      <div className="w-full max-w-xl flex justify-between items-end mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">Studio Admin</h1>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mt-2">Gestion Unique du Catalogue</p>
        </div>
        <button
          onClick={() => supabase.auth.signOut().then(() => router.push('/login'))}
          className="text-[10px] text-zinc-600 hover:text-white border border-white/5 px-4 py-2 rounded-full transition-all uppercase tracking-widest"
        >
          Déconnexion
        </button>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-10">
        
        {/* SÉLECTEUR DE MODE (FUSION) */}
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">Que voulez-vous publier ?</label>
          <div className="flex gap-3 p-1.5 bg-zinc-900/50 rounded-2xl border border-white/5">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'chanson' })}
              className={`flex-1 py-4 rounded-xl text-[10px] uppercase font-black tracking-[0.2em] transition-all ${formData.type === 'chanson' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
            >
              Une Chanson
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'album' })}
              className={`flex-1 py-4 rounded-xl text-[10px] uppercase font-black tracking-[0.2em] transition-all ${formData.type === 'album' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
            >
              Un Album / EP
            </button>
          </div>
        </div>

        {/* INFOS DE BASE */}
        <div className="space-y-6">
          {formData.type === 'chanson' && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">Appartient à l'album :</label>
              <select
                className="w-full bg-zinc-900 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-white/30"
                value={formData.album_id}
                onChange={(e) => setFormData({ ...formData, album_id: e.target.value })}
              >
                <option value="">-- Single Indépendant --</option>
                {albums.map((album) => (
                  <option key={album.id} value={album.id}>{album.title}</option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">Nom du projet / Titre</label>
              <input required className="w-full bg-zinc-900/50 border border-white/5 p-4 rounded-xl outline-none focus:border-white/20 transition-all" value={formData.title} onChange={handleTitleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">Année de sortie</label>
              <input required className="w-full bg-zinc-900/50 border border-white/5 p-4 rounded-xl outline-none focus:border-white/20 transition-all" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">URL de la pochette (Cover)</label>
            <input required className="w-full bg-zinc-900/50 border border-white/5 p-4 rounded-xl outline-none focus:border-white/20 transition-all" value={formData.cover_url} onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })} />
          </div>
        </div>

        {/* LIENS DE STREAMING (Pour la Pop-up) */}
        <div className="p-6 bg-white/[0.02] rounded-[32px] border border-white/5 space-y-5">
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-bold border-b border-white/5 pb-2">Plateformes de streaming</p>
          
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-widest text-[#1DB954] font-bold">Lien Spotify</label>
              <input placeholder="https://open.spotify.com/..." className="w-full bg-black/40 border border-white/5 p-3 rounded-lg text-xs outline-none focus:border-[#1DB954]/50" value={formData.link_spotify} onChange={(e) => setFormData({...formData, link_spotify: e.target.value})} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-widest text-[#FC3C44] font-bold">Lien Apple Music</label>
              <input placeholder="https://music.apple.com/..." className="w-full bg-black/40 border border-white/5 p-3 rounded-lg text-xs outline-none focus:border-[#FC3C44]/50" value={formData.link_apple} onChange={(e) => setFormData({...formData, link_apple: e.target.value})} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-widest text-[#FF0000] font-bold">Lien YouTube</label>
              <input placeholder="https://youtube.com/..." className="w-full bg-black/40 border border-white/5 p-3 rounded-lg text-xs outline-none focus:border-[#FF0000]/50" value={formData.link_youtube} onChange={(e) => setFormData({...formData, link_youtube: e.target.value})} />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-zinc-200 transition-all shadow-2xl active:scale-95 transition-transform"
        >
          Confirmer la publication
        </button>
      </form>
    </main>
  );
}