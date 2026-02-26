export default function Links() {
  const socials = [
    { name: "Instagram", url: "#", color: "hover:text-pink-500" },
    { name: "YouTube", url: "#", color: "hover:text-red-600" },
    { name: "TikTok", url: "#", color: "hover:text-cyan-400" },
    { name: "Spotify", url: "#", color: "hover:text-green-500" },
  ];

  return (
    <section className="py-16 md:py-20 bg-zinc-950 border-t border-white/5 px-6">
      {/* Container des réseaux : 2 colonnes sur petit mobile, puis ligne fluide */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-y-8 gap-x-4 md:gap-16 max-w-4xl mx-auto">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-zinc-400 text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-widest transition-colors text-center p-2 active:text-white ${social.color}`}
          >
            {social.name}
          </a>
        ))}
      </div>

      {/* Ligne de séparation subtile pour mobile */}
      <div className="w-12 h-[1px] bg-white/10 mx-auto mt-12 mb-8 md:hidden" />

      <div className="flex flex-col items-center gap-2">
        <p className="text-center text-zinc-600 text-[9px] md:text-xs tracking-tighter uppercase">
          © {new Date().getFullYear()} KYZZO MUSIC - Tous droits réservés
        </p>
        <p className="text-[8px] text-zinc-800 uppercase tracking-[0.3em]">
          Design & Dev by AI
        </p>
      </div>
    </section>
  );
}