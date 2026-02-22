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
    type: 'chanson', // Par défaut sur chanson
    album_id: '' // ID de l'album parent
  });
  const router = useRouter();

  useEffect(() => {
    const initAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      // On récupère la liste des albums pour le sélecteur
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
    
    // On prépare les données : si c'est un album, l'album_id doit être nul
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
        album_id: '' 
      });
    }
  };

  if (loading) return (
    <div className="h-screen bg-black text-white flex items-center justify-center font-mono">
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

      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-8">
        
        {/* CHOIX DU TYPE */}
        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">Type de contenu</label>
          <div className="flex gap-3 p-1.5 bg-zinc-900/50 rounded-2xl border border-white/5">
            <button
              type="button"
              onClick={() => setFormData({...formData, type: 'chanson', album_id: ''})}
              className={`flex-1 py-4 rounded-xl text-[10px] uppercase font-black tracking-[0.2em] transition-all ${formData.type === 'chanson' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
            >
              Chanson
            </button>
            <button
              type="button"
              onClick={() => setFormData({...formData, type: 'album', album_id: ''})}
              className={`flex-1 py-4 rounded-xl text-[10px] uppercase font-black tracking-[0.2em] transition-all ${formData.type === 'album' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
            >
              Album / EP
            </button>
          </div>
        </div>

        {/* LISTE DES ALBUMS (Uniquement si type === 'chanson') */}
        {formData.type === 'chanson' && (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-500">
            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">Rattacher à un album existant ?</label>
            <select 
              className="w-full bg-zinc-900/80 border border-white/10 p-4 rounded-xl outline-none text-sm text-white focus:border-white/40 appearance-none"
              value={formData.album_id}
              onChange={(e) => setFormData({...formData, album_id: e.target.value})}
            >
              <option value="">-- Single (Pas d'album) --</option>
              {albums.map((album) => (
                <option key={album.id} value={album.id}>
                  {album.title}
                </option>
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
            <input required className="w-full bg-zinc-900/50 border border-white/5 p-4 rounded-xl focus:border-white/20 outline-none transition-all" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 ml-1">Lien de la Cover (URL)</label>
          <input required className="w-full bg-zinc-900/50 border border-white/5 p-4 rounded-xl focus:border-white/20 outline-none transition-all" value={formData.cover_url} onChange={(e) => setFormData({...formData, cover_url: e.target.value})} />
        </div>

        <button 
          type="submit" 
          className="w-full bg-white text-black py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-zinc-200 transition-all shadow-2xl cursor-pointer"
        >
          Mettre en ligne
        </button>
      </form>

    </main>
  );
}