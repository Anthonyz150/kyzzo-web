import { projects } from '@/data/music';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react'; // Pour un bouton retour plus élégant

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10 md:p-20">
      {/* Bouton Retour optimisé pour le pouce */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm uppercase tracking-widest group"
      >
        <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
        Retour
      </Link>
      
      <div className="mt-10 flex flex-col lg:flex-row gap-10 md:gap-16">
        
        {/* Cover : Ajustée pour ne pas être trop géante sur tablette */}
        <div className="w-full lg:w-1/3 max-w-md mx-auto lg:mx-0">
          <img 
            src={project.cover} 
            alt={project.title} 
            className="w-full aspect-square object-cover rounded-3xl shadow-2xl shadow-white/5 border border-white/5" 
          />
        </div>
        
        <div className="flex-1">
          {/* Titre : Taille adaptative */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
            {project.title}
          </h1>
          
          <div className="flex items-center gap-4 mt-4">
             <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">{project.year}</p>
             <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          <p className="mt-8 text-base md:text-lg text-zinc-300 leading-relaxed font-medium">
            {project.description}
          </p>
          
          {/* Section Paroles : Scroll interne pour éviter une page infinie */}
          <div className="mt-12 p-6 md:p-8 bg-zinc-900/50 border border-white/5 rounded-[2rem]">
             <h3 className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-6 font-bold">Paroles</h3>
             <div className="max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
               <pre className="whitespace-pre-wrap font-sans text-sm md:text-base text-zinc-300 leading-loose italic">
                 {project.lyrics}
               </pre>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}