"use client";

import { useAppStore } from "@/store/useAppStore";
import { CATEGORIES } from "@/lib/data";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function StickyNav() {
    const { searchQuery, setSearchQuery, activeCategory, setActiveCategory } = useAppStore();

    return (
        <div id="menu" className="sticky top-14 z-30 bg-zinc-950/95 backdrop-blur-md pt-2 pb-4 px-4 border-b border-zinc-900 shadow-sm">
            <div className="max-w-7xl mx-auto">
                {/* Search Bar */}
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                        type="search"
                        placeholder="Buscar platos, promos, licores..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
                    />
                </div>

                {/* Category Slider */}
                <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide flex gap-2">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={cn(
                                "whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 border",
                                activeCategory === category
                                    ? "bg-yellow-500 text-zinc-950 border-yellow-500"
                                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
