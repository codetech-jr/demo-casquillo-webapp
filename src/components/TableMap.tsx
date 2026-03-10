"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Mic2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Table } from "@/lib/data";

export function TableMap() {
    const { mode, selectedTable, setSelectedTable, selectedDay } = useAppStore();
    const [dynamicTables, setDynamicTables] = useState<Table[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Parse "Hoy" o "Mañana" a YYYY-MM-DD (simplificado para el Demo)
    const getDateFromDay = (dayStr: string) => {
        const d = new Date();
        if (dayStr === "Mañana") d.setDate(d.getDate() + 1);
        if (dayStr === "Otro Día") d.setDate(d.getDate() + 7); // Demo fallback
        return d.toISOString().split('T')[0];
    };

    useEffect(() => {
        if (mode !== "reserva") return;

        const fetchTables = async () => {
            setIsLoading(true);
            try {
                const dateParam = getDateFromDay(selectedDay);
                const res = await fetch(`/api/tables?date=${dateParam}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    // Ordenar por número para evitar desórdenes de la BD
                    setDynamicTables(data.sort((a, b) => a.number - b.number));
                }
            } catch (error) {
                console.error("Failed to fetch tables", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTables();
    }, [selectedDay, mode]);

    const tarimaTables = dynamicTables.filter((t) => t.zone === "Tarima");
    const terrazaTables = dynamicTables.filter((t) => t.zone === "Terraza VIP");

    return (
        <AnimatePresence>
            {mode === "reserva" && (
                <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="px-4 py-8 overflow-hidden"
                >
                    <div className="bg-zinc-900 border border-zinc-800 w-full rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-yellow-500" />
                                Mapa del Local
                            </span>
                            {isLoading && <span className="text-xs text-yellow-500 animate-pulse">Actualizando...</span>}
                        </h2>

                        {/* Tarima Zone */}
                        <div className="mb-8">
                            <div className="w-full bg-zinc-950 border-2 border-dashed border-zinc-800 text-zinc-500 uppercase tracking-widest text-xs font-bold py-3 rounded-xl text-center flex items-center justify-center gap-2 mb-6">
                                <Mic2 className="w-4 h-4" />
                                Escenario / Tarima
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                {tarimaTables.map((table) => {
                                    const isOccupied = table.status === "occupied";
                                    const isSelected = selectedTable?.id === table.id;

                                    return (
                                        <button
                                            key={table.id}
                                            disabled={isOccupied}
                                            onClick={() => setSelectedTable(table)}
                                            className={cn(
                                                "relative aspect-square rounded-full flex flex-col items-center justify-center text-sm font-bold transition-all border-4 duration-300",
                                                isOccupied
                                                    ? "bg-red-500/10 border-red-500/50 text-red-500 opacity-60 cursor-not-allowed"
                                                    : isSelected
                                                        ? "bg-orange-500 border-orange-400 text-white shadow-[0_0_30px_rgba(249,115,22,0.6)] animate-pulse scale-105 z-10"
                                                        : "bg-emerald-500/10 border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/20"
                                            )}
                                        >
                                            <span className="text-xs uppercase tracking-wider opacity-80 mb-0.5">Mesa</span>
                                            <span className="text-lg">{table.number}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Separator */}
                        <div className="w-full h-px bg-gradient-to-r from-zinc-800/0 via-zinc-800 to-zinc-800/0 my-8"></div>

                        {/* VIP Zone */}
                        <div>
                            <h3 className="text-center text-zinc-400 text-xs font-bold uppercase tracking-widest mb-6">
                                Terraza VIP
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                {terrazaTables.map((table) => {
                                    const isOccupied = table.status === "occupied";
                                    const isSelected = selectedTable?.id === table.id;

                                    return (
                                        <button
                                            key={table.id}
                                            disabled={isOccupied}
                                            onClick={() => setSelectedTable(table)}
                                            className={cn(
                                                "relative aspect-square rounded-2xl flex flex-col items-center justify-center text-sm font-bold transition-all border-2 duration-300",
                                                isOccupied
                                                    ? "bg-red-500/10 border-red-500/50 text-red-500 opacity-60 cursor-not-allowed"
                                                    : isSelected
                                                        ? "bg-orange-500 border-orange-400 text-white shadow-[0_0_30px_rgba(249,115,22,0.6)] animate-pulse scale-105 z-10"
                                                        : "bg-emerald-500/10 border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/20"
                                            )}
                                        >
                                            <span className="text-xs uppercase tracking-wider opacity-80 mb-0.5">VIP</span>
                                            <span className="text-lg">{table.number}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
