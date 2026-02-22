export default function MusicPlayer() {
    return (
      <section className="py-10 bg-black flex justify-center">
        <div className="w-full max-w-4xl px-6">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">Dernière Sortie</h2>
          {/* Remplace l'URL ci-dessous par le lien "Embed" de ton morceau Spotify */}
          <iframe 
            className="rounded-xl"
            src="https://open.spotify.com/embed/track/TON_ID_ICI?utm_source=generator&theme=0" 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          ></iframe>
        </div>
      </section>
    );
  }