import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MenuItem, Category, Table } from "@/lib/data";

export type AppMode = "reserva" | "delivery";
export type PaymentMethod = "pago_movil" | "zelle" | "efectivo";

export interface CartItem extends MenuItem {
    quantity: number;
}

interface AppState {
    mode: AppMode;
    setMode: (mode: AppMode) => void;

    searchQuery: string;
    setSearchQuery: (query: string) => void;

    activeCategory: string;
    setActiveCategory: (category: string) => void;

    cart: CartItem[];
    addToCart: (item: MenuItem) => void;
    removeFromCart: (itemId: string) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;

    // V2: Reservations specific
    selectedTable: Table | null;
    setSelectedTable: (table: Table | null) => void;

    selectedDay: string;
    setSelectedDay: (day: string) => void;

    isCheckoutOpen: boolean;
    setCheckoutOpen: (isOpen: boolean) => void;

    // V5: Payment methods and BCV
    bcvRate: number;
    setBcvRate: (rate: number) => void;

    paymentMethod: PaymentMethod;
    setPaymentMethod: (method: PaymentMethod) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            mode: "reserva",
            setMode: (mode) => set({ mode, selectedTable: null, cart: [] }),

            searchQuery: "",
            setSearchQuery: (query) => set({ searchQuery: query }),

            activeCategory: "Todo",
            setActiveCategory: (category) => set({ activeCategory: category }),

            cart: [],
            addToCart: (item) => set((state) => {
                const existing = state.cart.find((c) => c.id === item.id);
                if (existing) {
                    return { cart: state.cart.map((c) => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c) };
                }
                return { cart: [...state.cart, { ...item, quantity: 1 }] };
            }),
            removeFromCart: (itemId) => set((state) => {
                const existing = state.cart.find((c) => c.id === itemId);
                if (existing && existing.quantity > 1) {
                    return { cart: state.cart.map((c) => c.id === itemId ? { ...c, quantity: c.quantity - 1 } : c) };
                }
                return { cart: state.cart.filter((c) => c.id !== itemId) };
            }),
            clearCart: () => set({ cart: [] }),
            getCartTotal: () => {
                return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
            },
            getCartCount: () => {
                return get().cart.reduce((count, item) => count + item.quantity, 0);
            },

            selectedTable: null,
            setSelectedTable: (table) => set({ selectedTable: table }),

            selectedDay: "Hoy",
            setSelectedDay: (day) => set({ selectedDay: day, selectedTable: null }),

            isCheckoutOpen: false,
            setCheckoutOpen: (isOpen) => set({ isCheckoutOpen: isOpen }),

            bcvRate: 75.50, // Default burned rate for MVP
            setBcvRate: (rate) => set({ bcvRate: rate }),

            paymentMethod: "pago_movil",
            setPaymentMethod: (method) => set({ paymentMethod: method }),
        }),
        {
            name: "casquillo-storage",
            partialize: (state) => ({ cart: state.cart, mode: state.mode, bcvRate: state.bcvRate }),
        }
    )
);
