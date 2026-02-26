export default function MusicPlayer() {
  return (
    <section className="py-12 md:py-20 bg-black flex justify-center px-4">
      <div className="w-full max-w-4xl">
        {/* Titre avec petit accent visuel pour mobile */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] w-8 bg-white/20 md:hidden" />
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-[0.2em] md:tracking-widest">
            Dernière Sortie
          </h2>
        </div>

        {/* Container de l'iframe avec ombre portée pour donner du relief */}
        <div className="relative group shadow-[0_0_50px_rgba(255,255,255,0.05)] rounded-2xl overflow-hidden">
          <iframe 
            className="rounded-2xl transition-all duration-500"
            src="https://open.spotify.com/embed/track/TON_ID_ICI" // Assure-toi que c'est bien l'URL d'intégration (embed)
            width="100%" 
            height="152" 
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            style={{ borderRadius: '12px' }}
          ></iframe>
        </div>

        {/* Petit rappel pour inciter à l'action sur mobile */}
        <p className="mt-4 text-center md:text-left text-zinc-500 text-[10px] uppercase tracking-widest opacity-60">
          Disponible sur toutes les plateformes
        </p>
      </div>
    </section>
  );
}