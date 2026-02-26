"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2 } from 'lucide-react'; // Pour un look plus pro

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Erreur : " + error.message);
      setIsLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6 sm:p-0">
      <div className="w-full max-w-sm animate-in fade-in zoom-in duration-500">
        
        {/* Logo / Header discret */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-[0.2em] uppercase">
            Kyzzo
          </h1>
          <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-2">
            Administration sécurisée
          </p>
        </div>

        <form 
          onSubmit={handleLogin} 
          className="bg-zinc-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-3xl"
        >
          <div className="flex flex-col gap-5">
            
            {/* Champ Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="email" 
                required
                placeholder="Email" 
                className="w-full pl-12 pr-4 py-4 bg-black/50 rounded-2xl border border-white/5 outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-all text-sm" 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>

            {/* Champ Mot de passe */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="password" 
                required
                placeholder="Mot de passe" 
                className="w-full pl-12 pr-4 py-4 bg-black/50 rounded-2xl border border-white/5 outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-all text-sm" 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>

            {/* Bouton avec état de chargement */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Se connecter"
              )}
            </button>
          </div>
        </form>

        <button 
          onClick={() => router.push('/')}
          className="w-full mt-8 text-zinc-600 text-[10px] uppercase tracking-widest hover:text-zinc-400 transition"
        >
          ← Retour au site public
        </button>
      </div>
    </main>
  );
}