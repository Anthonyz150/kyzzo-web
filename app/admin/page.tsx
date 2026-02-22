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
    type: 'chanson',
    album_id: '',
    // Nouveaux champs pour les plateformes
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
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({ ...formData, title, slug: generateSlug(title) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      album_id: formData.type === 'chanson' && formData.album_id !== '' ? formData.album_id : null
    };

    const { error } = await supabase.from('musiques').insert([dataToSubmit]);

    if (error) {
      alert("Erreur : " + error.message);
    } else {
      alert(`🔥 ${formData.type === 'album' ? 'Album' : 'Chanson'} publié(e) !`);
      setFormData({
        title: '',
        year: new Date().getFullYear().toString(),
        slug: '',
        cover_url: '',
        type: 'chanson',
        album_id: '',
        link_spotify: '',
        link_apple: '',
        link_deezer: '',
        link_youtube: ''
      });
    }
  };

  if (loading) return (
    <div className="h-screen bg-black text-white flex items-center justify-center font-mono animate-pulse">
      CHARGEMENT DU STUDIO...
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-6">

      <div className="w-full max-w-xl flex justify-between items-end mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">Studio Admin</h1>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] mt-2">Gestion du catalogue Kyzzo</p>
        </div>
        <button
          onClick={() => supabase.auth.signOut().then(() => router.push('/login'))}
          className="text-[10px] text-zinc-600 hover:text-white border border-white/5 px-4 py-2 rounded-full transition-all uppercase tracking-widest"
        >
          Sortir
        </button>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-10">

        {/* CHOIX DU TYPE */}
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">Type de contenu</label>
          <div className="flex gap-3 p-1.5 bg-zinc-900/50 rounded-2xl border border-white/5">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'chanson', album_id: '' })}
              className={`flex-1 py-4 rounded-xl text-[10px] uppercase font-black tracking-[0.2em] transition-all ${formData.type === 'chanson' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
            >
              Chanson
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'album', album_id: '' })}
              className={`flex-1 py-4 rounded-xl text-[10px] uppercase font-black tracking-[0.2em] transition-all ${formData.type === 'album' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
            >
              Album / EP
            </button>
          </div>
        </div>

        {/* SECTION INFOS PRINCIPALES */}
        <div className="space-y-6">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold border-b border-white/5 pb-2">Informations Générales</h2>
          
          {formData.type === 'chanson' && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-4">
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">Rattacher à un album ?</label>
              <select
                className="w-full bg-zinc-900 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-white/30"
                value={formData.album_id}
                onChange={(e) => setFormData({ ...formData, album_id: e.target.value })}
              >
                <option value="">-- Single (Pas d'album) --</option>
                {albums.map((album) => (
                  <option key={album.id} value={album.id}>{album.title}</option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">Titre</label>
              <input required className="w-full bg-zinc-900/50 border border-white/5 p-4 rounded-xl focus:border-white/20 outline-none transition-all" value={formData.title} onChange={handleTitleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">Année</label>
              <input required className="w-full bg-zinc-900/50 border border-white/5 p-4 rounded-xl focus:border-white/20 outline-none transition-all" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">Lien de la Cover (URL)</label>
            <input required className="w-full bg-zinc-900/50 border border-white/5 p-4 rounded-xl focus:border-white/20 outline-none transition-all" value={formData.cover_url} onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })} />
          </div>
        </div>

        {/* SECTION LIENS DE STREAMING */}
        <div className="space-y-6 bg-white/[0.02] p-6 rounded-[32px] border border-white/5">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold border-b border-white/5 pb-2">Liens Plateformes (Pop-up)</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#1DB954] ml-1">Lien Spotify</label>
              <input placeholder="https://open.spotify.com/..." className="w-full bg-black/40 border border-white/5 p-3 rounded-lg text-sm focus:border-[#1DB954]/50 outline-none transition-all" value={formData.link_spotify} onChange={(e) => setFormData({ ...formData, link_spotify: e.target.value })} />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#FC3C44] ml-1">Lien Apple Music</label>
              <input placeholder="https://music.apple.com/..." className="w-full bg-black/40 border border-white/5 p-3 rounded-lg text-sm focus:border-[#FC3C44]/50 outline-none transition-all" value={formData.link_apple} onChange={(e) => setFormData({ ...formData, link_apple: e.target.value })} />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#A238FF] ml-1">Lien Deezer</label>
              <input placeholder="https://www.deezer.com/..." className="w-full bg-black/40 border border-white/5 p-3 rounded-lg text-sm focus:border-[#A238FF]/50 outline-none transition-all" value={formData.link_deezer} onChange={(e) => setFormData({ ...formData, link_deezer: e.target.value })} />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#FF0000] ml-1">Lien YouTube</label>
              <input placeholder="https://youtube.com/..." className="w-full bg-black/40 border border-white/5 p-3 rounded-lg text-sm focus:border-[#FF0000]/50 outline-none transition-all" value={formData.link_youtube} onChange={(e) => setFormData({ ...formData, link_youtube: e.target.value })} />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-zinc-200 transition-all shadow-2xl"
        >
          Mettre en ligne
        </button>
      </form>

    </main>
  );
}