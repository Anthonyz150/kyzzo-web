// app/page.tsx
import Hero from '../components/Hero';
import Discography from '../components/Discography';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <Discography />

      {/* --- FOOTER AVEC TOUS DROITS RÉSERVÉS --- */}
      <footer className="py-16 flex flex-col items-center gap-6 border-t border-white/5">
        <div className="text-center">
          <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em]">
            © 2026 KYZZO MUSIC - TOUS DROITS RÉSERVÉS
          </p>
        </div>

        <Link 
          href="/admin" 
          className="text-zinc-700 hover:text-white text-[9px] uppercase tracking-[0.2em] transition-all duration-500 italic"
        >
          Accès Administration
        </Link>
      </footer>
    </main>
  );
}