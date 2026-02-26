import Hero from '../components/Hero';
import Discography from '../components/Discography';
import MusicPlayer from '../components/MusicPlayer'; // Ajout de l'import
import Links from '../components/Links'; // Import des réseaux sociaux
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black selection:bg-white selection:text-black">
      {/* 1. Entrée visuelle forte */}
      <Hero />

      {/* 2. Le lecteur de la dernière sortie (parfait pour le tunnel de conversion) */}
      <MusicPlayer />

      {/* 3. La liste complète des projets */}
      <Discography />

      {/* 4. Les réseaux sociaux */}
      <Links />

      {/* 5. Footer final avec accès discret */}
      <footer className="py-12 md:py-16 flex flex-col items-center gap-8 border-t border-white/5 bg-zinc-950/50">
        <div className="text-center px-6">
          <p className="text-zinc-600 text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] leading-loose">
            © {new Date().getFullYear()} KYZZO MUSIC - TOUS DROITS RÉSERVÉS
          </p>
        </div>

        <Link 
          href="/admin" 
          className="group flex flex-col items-center gap-2 text-zinc-800 hover:text-zinc-400 transition-all duration-700"
        >
          <span className="text-[8px] uppercase tracking-[0.5em] italic">
            Espace Privé
          </span>
          <div className="w-4 h-[1px] bg-zinc-800 group-hover:w-8 group-hover:bg-zinc-400 transition-all duration-700" />
        </Link>
      </footer>
    </main>
  );
}