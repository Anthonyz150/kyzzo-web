"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Erreur : " + error.message);
    } else {
      router.push('/admin'); // Si ça marche, on t'envoie sur l'admin
    }
  };

  return (
    <main className="h-screen bg-black text-white flex items-center justify-center p-6">
      <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-2xl w-full max-w-sm border border-white/10 shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center tracking-tighter uppercase">Kyzzo Admin</h1>
        
        <div className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 bg-black rounded border border-white/5 outline-none focus:border-white/20 transition" 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Mot de passe" 
            className="w-full p-3 bg-black rounded border border-white/5 outline-none focus:border-white/20 transition" 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" className="w-full bg-white text-black p-3 rounded-full font-black uppercase tracking-widest hover:bg-zinc-200 transition">
            Se connecter
          </button>
        </div>
      </form>
    </main>
  );
}