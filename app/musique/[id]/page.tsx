import { projects } from '@/data/music';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) notFound(); // Si l'id n'existe pas, page 404

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <Link href="/" className="text-zinc-500 hover:text-white transition">← Retour</Link>
      
      <div className="mt-12 flex flex-col md:flex-row gap-12">
        <img src={project.cover} alt={project.title} className="w-full md:w-1/3 rounded-2xl shadow-2xl shadow-white/5" />
        
        <div className="flex-1">
          <h1 className="text-6xl font-black uppercase">{project.title}</h1>
          <p className="text-zinc-400 mt-2">{project.year}</p>
          <p className="mt-8 text-lg text-zinc-300 leading-relaxed">{project.description}</p>
          
          <div className="mt-10 p-6 bg-zinc-900 rounded-xl">
             <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-4">Paroles</h3>
             <pre className="whitespace-pre-wrap font-sans text-zinc-300">{project.lyrics}</pre>
          </div>
        </div>
      </div>
    </main>
  );
}