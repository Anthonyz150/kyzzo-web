export default function Links() {
  const socials = [
    { name: "Instagram", url: "#", color: "hover:text-pink-500" },
    { name: "YouTube", url: "#", color: "hover:text-red-600" },
    { name: "TikTok", url: "#", color: "hover:text-cyan-400" },
    { name: "Spotify", url: "#", color: "hover:text-green-500" },
  ];

  return (
    <section className="py-16 bg-zinc-950 border-t border-white/5 px-6">
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
    </section>
  );
}