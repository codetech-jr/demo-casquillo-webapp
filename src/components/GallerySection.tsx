import Image from "next/image";

// Curated images: 1 big club shot + 5 atmosphere/drinks/DJ shots
const IMAGES = [
    {
        src: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1200&auto=format&fit=crop",
        alt: "Ambiente VIP y música en vivo",
        // Big cell on desktop: 2 cols & 2 rows
        className: "col-span-2 row-span-2",
    },
    {
        src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
        alt: "Coctelería de autor",
        className: "",
    },
    {
        src: "https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=800&auto=format&fit=crop",
        alt: "DJ invitado en vivo",
        className: "",
    },
    {
        src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
        alt: "Conciertos y shows",
        className: "",
    },
    {
        src: "https://images.unsplash.com/photo-1525268771113-32d9e9021a97?q=80&w=800&auto=format&fit=crop",
        alt: "Servicio exclusivo en mesa",
        className: "",
    },
    {
        src: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop",
        alt: "Nuestras noches VIP",
        className: "",
    },
];

export function GallerySection() {
    return (
        <section id="galeria" className="py-12 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-8">
                <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-2">El Ambiente</p>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider mb-2">
                    Nuestras <span className="text-yellow-500">Noches</span>
                </h2>
                <p className="text-zinc-400 text-sm max-w-md mx-auto">
                    Vive la experiencia de la mejor Tasca VIP de los Valles del Tuy.
                </p>
            </div>

            {/*
              Mobile: 2-col simple grid (all same size)
              Desktop (md): Bento 4-col with the first image as a 2×2 hero
            */}
            <div className="
                grid gap-3
                grid-cols-2 auto-rows-[140px]
                md:grid-cols-4 md:auto-rows-[180px]
            ">
                {IMAGES.map((img, index) => (
                    <div
                        key={index}
                        className={`relative rounded-2xl overflow-hidden group border border-zinc-800/80 shadow-xl cursor-default ${
                            // Only apply the 2×2 span on md+ screens
                            index === 0 ? "md:col-span-2 md:row-span-2" : ""
                            }`}
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            loading="lazy"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        {/* Caption on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-4">
                            <span className="text-white text-xs font-bold uppercase tracking-wider translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                {img.alt}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
