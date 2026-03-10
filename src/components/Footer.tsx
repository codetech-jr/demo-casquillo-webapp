import { Instagram, MapPin, Clock, ShieldCheck, Heart } from "lucide-react";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-zinc-950 border-t border-zinc-900 px-4 pt-12 pb-6 mt-12">
            <div className="max-w-7xl mx-auto">

                {/* 3-column desktop layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

                    {/* Col 1 — Brand */}
                    <div className="flex flex-col items-start gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full overflow-hidden relative border-2 border-yellow-500/60 shrink-0">
                                <Image src="/logo.png" alt="Logo" fill className="object-cover" />
                            </div>
                            <div>
                                <p className="text-white font-black text-base tracking-wider uppercase leading-tight">
                                    El Casquillo de Oro
                                </p>
                                <p className="text-yellow-500 text-xs font-semibold uppercase tracking-widest">
                                    Tasca &amp; VIP Nightclub
                                </p>
                            </div>
                        </div>
                        <p className="text-zinc-500 text-sm leading-relaxed mt-1 max-w-xs">
                            Tu destino nocturno en los Valles del Tuy. Buena música, coctelería de autor y la mejor gente.
                        </p>
                    </div>

                    {/* Col 2 — Info */}
                    <div className="flex flex-col gap-5">
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-white font-semibold text-xs uppercase tracking-wider mb-1">Ubicación</p>
                                <p className="text-zinc-400 text-sm">E/S Río Tuy, Charallave,</p>
                                <p className="text-zinc-400 text-sm">Edo. Miranda, Venezuela.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-white font-semibold text-xs uppercase tracking-wider mb-1">Horario</p>
                                <p className="text-zinc-400 text-sm">Martes a Domingo</p>
                                <p className="text-yellow-500 font-bold text-sm">5:00 PM – 2:00 AM</p>
                            </div>
                        </div>
                    </div>

                    {/* Col 3 — Social & Legal */}
                    <div className="flex flex-col gap-5">
                        <div>
                            <p className="text-white font-semibold text-xs uppercase tracking-wider mb-3">Síguenos</p>
                            <a
                                href="https://www.instagram.com/restaurantelcasquillodeoro"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-pink-700/30 text-pink-400 hover:text-pink-300 text-sm font-semibold px-4 py-2 rounded-full transition-all hover:scale-105"
                            >
                                <Instagram className="w-4 h-4" />
                                @restaurantelcasquillodeoro
                            </a>
                        </div>

                        <div className="flex items-start gap-2 bg-zinc-900 border border-zinc-800 rounded-xl p-3">
                            <ShieldCheck className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                            <p className="text-zinc-500 text-xs leading-relaxed">
                                <span className="text-zinc-400 font-semibold">Derecho de Admisión Reservado.</span>{" "}
                                Prohibida la venta de alcohol a menores de 18 años. Vestimenta casual elegante requerida.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-zinc-900 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-zinc-700 text-xs">
                        © {new Date().getFullYear()} El Casquillo de Oro. Todos los derechos reservados.
                    </p>
                    <p className="text-zinc-500 text-xs flex items-center gap-1">
                        Hecho con <Heart className="w-3 h-3 text-red-500 fill-red-500" /> en Venezuela 🇻🇪
                    </p>
                </div>

            </div>
        </footer>
    );
}
