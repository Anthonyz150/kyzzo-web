export default function Links() {
    const socials = [
      { name: "Instagram", url: "#", color: "hover:text-pink-500" },
      { name: "YouTube", url: "#", color: "hover:text-red-600" },
      { name: "TikTok", url: "#", color: "hover:text-cyan-400" },
      { name: "Spotify", url: "#", color: "hover:text-green-500" },
    ];
  
    return (
      <section className="py-20 bg-zinc-950 border-t border-white/5">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              className={`text-zinc-400 text-sm font-bold uppercase tracking-widest transition-colors ${social.color}`}
            >
              {social.name}
            </a>
          ))}
        </div>
        <p className="text-center text-zinc-600 text-xs mt-12">
          © {new Date().getFullYear()} KYZZO MUSIC - Tous droits réservés
        </p>
      </section>
    );
  }