// app/page.tsx
import Hero from '../components/Hero';
import Discography from '../components/Discography';
import Links from '../components/Links';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <Discography />
      <Links />

      {/* --- LE BOUTON ADMIN EST ICI --- */}
      <footer className="py-12 flex justify-center border-t border-white/5">
        <Link 
          href="/admin" 
          className="text-zinc-500 hover:text-white text-[10px] uppercase tracking-[0.3em] transition-all duration-300"
        >
          Accès Administration
        </Link>
      </footer>
    </main>
  );
}