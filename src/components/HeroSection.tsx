"use client";

import { useAppStore } from "@/store/useAppStore";

export function HeroSection() {
    const { setMode } = useAppStore();

    return (
        <section className="relative w-full h-[75vh] md:h-screen flex flex-col items-center justify-end overflow-hidden">
            {/* Background image — blurred and darkened for drama */}
            <div
                className="absolute inset-0 bg-cover bg-center scale-105"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2000&auto=format&fit=crop')",
                    filter: "blur(2px) brightness(0.5)",
                }}
            />
            {/* Multi-layer gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/50 via-transparent to-transparent z-10" />

            {/* Content */}
            <div className="relative z-20 w-full text-center px-6 pb-16 md:pb-24">
                <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse inline-block" />
                    Charallave, Los Valles del Tuy · 5PM – 2AM
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] drop-shadow-2xl mb-5 tracking-tight">
                    El Casquillo de Oro:<br />
                    <span className="text-yellow-500">La Experiencia VIP</span><br />
                    de Charallave
                </h1>

                <p className="text-zinc-300 text-base md:text-xl mb-10 max-w-lg mx-auto leading-relaxed font-light">
                    Reserva tu mesa, pide delivery o pasa a conocernos.
                    La noche más exclusiva de los Valles te espera.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="#vip"
                        className="bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-black py-4 px-10 rounded-full text-sm uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:shadow-[0_0_45px_rgba(234,179,8,0.7)] hover:-translate-y-0.5 active:scale-95"
                    >
                        🥂 Reservar Mesa VIP
                    </a>
                    <a
                        href="#menu"
                        className="bg-zinc-900/80 backdrop-blur-sm hover:bg-zinc-800 text-white font-bold py-4 px-10 rounded-full text-sm uppercase tracking-wider border border-zinc-700 transition-all hover:-translate-y-0.5 active:scale-95"
                        onClick={() => setMode("delivery")}
                    >
                        🛵 Pedir Delivery
                    </a>
                </div>
            </div>

            {/* Bottom fade to content */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0B] to-transparent z-20" />
        </section>
    );
}
