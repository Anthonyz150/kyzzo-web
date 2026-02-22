// app/page.tsx
import Hero from '../components/Hero';
import Discography from '../components/Discography';
// Tu peux supprimer l'import suivant s'il n'est plus utilisé ailleurs
// import Links from '../components/Links'; 
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <Discography />
      
      {/* On a retiré <Links /> ici pour épurer le bas de page */}

      {/* --- LE BOUTON ADMIN --- */}
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