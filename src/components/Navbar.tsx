"use client";

import Image from "next/image";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";

const leftLinks = [
    { label: "Eventos", href: "#eventos" },
    { label: "Galería", href: "#galeria" },
];
const rightLinks = [
    { label: "VIP", href: "#vip" },
    { label: "Menú", href: "#menu" },
];
const allLinks = [...leftLinks, ...rightLinks];

export function Navbar() {
    const [open, setOpen] = useState(false);
    const { getCartCount, setCheckoutOpen } = useAppStore();
    const count = getCartCount();

    return (
        <nav className="sticky top-0 z-50 w-full bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900 shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between relative">

                {/* Left links — desktop only */}
                <div className="hidden md:flex items-center gap-8 flex-1">
                    {leftLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-zinc-400 hover:text-yellow-500 text-sm font-semibold tracking-wider uppercase transition-colors duration-200"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Center Logo — always centered */}
                <a href="#" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full overflow-hidden relative border border-yellow-500/60 shrink-0">
                        <Image src="/logo.png" alt="El Casquillo de Oro" fill className="object-cover" />
                    </div>
                    <span className="text-white font-black text-sm tracking-widest uppercase leading-tight hidden md:block">
                        El Casquillo <span className="text-yellow-500">de Oro</span>
                    </span>
                </a>

                {/* Right links + Cart Button on desktop; Cart + Burger on mobile */}
                <div className="flex items-center gap-6 flex-1 justify-end">
                    {/* Right links — desktop only */}
                    <div className="hidden md:flex items-center gap-8">
                        {rightLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-zinc-400 hover:text-yellow-500 text-sm font-semibold tracking-wider uppercase transition-colors duration-200"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Cart Button */}
                    <button
                        onClick={() => setCheckoutOpen(true)}
                        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-yellow-500 hover:bg-zinc-800 transition-colors"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        {count > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-zinc-950 text-[11px] font-black flex items-center justify-center rounded-full shadow-md">
                                {count}
                            </span>
                        )}
                    </button>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    >
                        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {open && (
                <div className="md:hidden border-t border-zinc-900 bg-zinc-950 px-6 py-5 flex flex-col gap-5">
                    {allLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="text-zinc-300 hover:text-yellow-500 text-base font-bold tracking-wider uppercase transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
}
