"use client";

import { useAppStore } from "@/store/useAppStore";
import { MENU_ITEMS } from "@/lib/data";
import { Plus, Minus, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function MenuItemList() {
    const { activeCategory, searchQuery, cart, addToCart, removeFromCart } = useAppStore();

    const filteredItems = MENU_ITEMS.filter((item) => {
        const matchesCategory = activeCategory === "Todo" || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filteredItems.length === 0) {
        return (
            <div className="py-12 text-center text-zinc-500">
                <p>No se encontraron productos.</p>
            </div>
        );
    }

    return (
        <div className="px-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-24 xl:mb-6">
            {filteredItems.map((item) => {
                const cartItem = cart.find((c) => c.id === item.id);
                const quantity = cartItem?.quantity || 0;

                return (
                    <div
                        key={item.id}
                        className={cn(
                            "flex gap-4 p-3 bg-zinc-900 rounded-2xl border transition-all",
                            !item.isAvailable
                                ? "opacity-60 border-red-500/30"
                                : "border-zinc-800"
                        )}
                    >
                        {/* Image Placeholder */}
                        <div className="relative w-24 h-24 shrink-0 bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-700/50 overflow-hidden">
                            <ImageIcon className="w-8 h-8 text-zinc-600" />
                            {!item.isAvailable && (
                                <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center backdrop-blur-[1px]">
                                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm rotate-[-12deg] shadow-lg">
                                        AGOTADO
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex flex-col flex-1 justify-between">
                            <div>
                                <h3 className="text-white font-bold leading-tight">{item.name}</h3>
                                <p className="text-zinc-400 text-xs mt-1 line-clamp-2 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            <div className="flex items-end justify-between mt-2">
                                <span className="text-yellow-500 font-bold tracking-tight">
                                    ${item.price.toFixed(2)}
                                </span>

                                {item.isAvailable && (
                                    <div className="flex items-center bg-zinc-950 rounded-full border border-zinc-800 p-1">
                                        {quantity > 0 ? (
                                            <>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center text-sm font-bold text-white">
                                                    {quantity}
                                                </span>
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-full bg-yellow-500 text-zinc-950 hover:bg-yellow-400 transition"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-zinc-950 hover:bg-yellow-400 transition"
                                            >
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
