"use client";

import { PartyPopper, Flame, Music, Calendar } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import Image from "next/image";

const WEEKLY_EVENTS = [
    {
        id: "ev1",
        day: "Jueves",
        date: "24 OCT",
        title: "Karaoke Night",
        desc: "Premios sorpresa + Tragos 2x1",
        image: "https://images.unsplash.com/photo-1516280440504-6c3f32f3c0ce?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: "ev2",
        day: "Viernes",
        date: "25 OCT",
        title: "Noche Vallenatera",
        desc: "Show en Vivo + DJ Invitado",
        image: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop",
        isFeatured: true,
    },
    {
        id: "ev3",
        day: "Sábado",
        date: "26 OCT",
        title: "Sábado de Rumba VIP",
        desc: "Bottecchia & Crossover",
        image: "https://images.unsplash.com/photo-1555523177-3e81fcb616a2?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: "ev4",
        day: "Domingo",
        date: "27 OCT",
        title: "Domingo Familiar",
        desc: "Música en Vivo + Promos en Comida",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    }
];

export function EventSection() {
    const { setMode } = useAppStore();
    const featuredEvent = WEEKLY_EVENTS.find(e => e.isFeatured) || WEEKLY_EVENTS[1];
    const otherEvents = WEEKLY_EVENTS.filter(e => !e.isFeatured);

    return (
        <div id="eventos" className="px-4 py-8 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-yellow-500" />
                <h2 className="text-xl font-black text-white uppercase tracking-wider">Cartelera Semanal</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr">
                {/* Hero event card (Featured) */}
                <div
                    className="relative w-full h-64 md:h-80 lg:h-auto min-h-[300px] lg:min-h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-yellow-500/30 group cursor-pointer lg:col-span-2"
                    onClick={() => setMode("reserva")}
                >
                    <Image
                        src={featuredEvent.image}
                        alt={featuredEvent.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent z-10" />

                    {/* Glowing effect */}
                    <div className="absolute inset-0 bg-yellow-500/10 mix-blend-overlay z-10 group-hover:bg-yellow-500/20 transition-colors duration-500" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                        <div className="inline-flex items-center gap-2 mb-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-yellow-500/50">
                            <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                            <span className="text-yellow-500 font-black tracking-widest uppercase text-[10px] md:text-xs">
                                ESTE {featuredEvent.day.toUpperCase()} {featuredEvent.date}
                            </span>
                        </div>
                        <h3 className="text-white font-black text-2xl md:text-4xl leading-tight mb-2 drop-shadow-md group-hover:text-yellow-400 transition-colors">
                            {featuredEvent.title}
                        </h3>
                        <p className="text-zinc-300 text-sm md:text-base font-medium flex items-center gap-2">
                            <Music className="w-4 h-4 text-yellow-500" />
                            {featuredEvent.desc}
                        </p>
                    </div>
                </div>

                {/* Secondary events list / grid */}
                <div className="w-full flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide snap-x lg:col-span-1">
                    {otherEvents.map(event => (
                        <div
                            key={event.id}
                            className="w-[280px] sm:w-[320px] lg:w-full shrink-0 lg:flex-1 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 flex gap-4 items-center cursor-pointer transition-all hover:bg-zinc-800/50 snap-center lg:snap-align-none"
                            onClick={() => setMode("reserva")}
                        >
                            {/* Date Box */}
                            <div className="bg-zinc-950 rounded-xl w-16 h-16 flex flex-col items-center justify-center shrink-0 border border-zinc-800">
                                <span className="text-yellow-500 text-[10px] font-bold uppercase tracking-widest">{event.day.substring(0, 3)}</span>
                                <span className="text-white font-black text-lg leading-none">{event.date.split(' ')[0]}</span>
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h4 className="text-white font-bold text-sm md:text-base truncate group-hover:text-yellow-500 transition-colors">
                                    {event.title}
                                </h4>
                                <p className="text-zinc-400 text-xs md:text-sm truncate mt-0.5">
                                    {event.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

