"use client";

import { useAppStore } from "@/store/useAppStore";
import { ShoppingBag } from "lucide-react";

export function FloatingCheckout() {
    const { getCartCount, getCartTotal, setCheckoutOpen, bcvRate } = useAppStore();

    const count = getCartCount();
    const total = getCartTotal();

    if (count === 0) return null;

    return (
        <div className="md:hidden fixed bottom-4 left-0 right-0 px-4 z-40 max-w-xl mx-auto pointer-events-none">
            <div className="pointer-events-auto">
                <button
                    onClick={() => setCheckoutOpen(true)}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-zinc-950 font-black py-4 px-5 rounded-2xl flex items-center justify-between transition-all shadow-[0_4px_30px_rgba(234,179,8,0.5)] hover:shadow-[0_4px_40px_rgba(234,179,8,0.7)] active:scale-95"
                >
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <ShoppingBag className="w-6 h-6" />
                            <span className="absolute -top-2 -right-2 w-4 h-4 bg-zinc-950 text-yellow-500 text-[10px] font-black flex items-center justify-center rounded-full">
                                {count}
                            </span>
                        </div>
                        <span className="text-base">Ver Pedido</span>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-black">${total.toFixed(2)}</div>
                        <div className="text-[10px] font-semibold opacity-70">Ref Bs. {(total * bcvRate).toFixed(2)}</div>
                    </div>
                </button>
            </div>
        </div>
    );
}
