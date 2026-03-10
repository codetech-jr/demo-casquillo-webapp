"use client";

import { useAppStore } from "@/store/useAppStore";
import { Motorbike, GlassWater, Bike, Martini } from "lucide-react";
import { cn } from "@/lib/utils";

export function ModeSelector() {
    const { mode, setMode } = useAppStore();

    return (
        <div className="px-4 mb-6">
            <div className="flex bg-zinc-900 rounded-full p-1.5 border border-zinc-800">
                <button
                    onClick={() => setMode("delivery")}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all duration-300",
                        mode === "delivery"
                            ? "bg-yellow-500 text-zinc-950 shadow-md"
                            : "text-zinc-400 hover:text-white"
                    )}
                >
                    <Bike className="w-5 h-5" />
                    <span>Pedir Delivery</span>
                </button>
                <button
                    onClick={() => setMode("reserva")}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all duration-300",
                        mode === "reserva"
                            ? "bg-yellow-500 text-zinc-950 shadow-md"
                            : "text-zinc-400 hover:text-white"
                    )}
                >
                    <Martini className="w-5 h-5" />
                    <span>Reservar Local</span>
                </button>
            </div>
        </div>
    );
}
