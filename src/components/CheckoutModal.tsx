"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { X, Send, Smartphone, DollarSign, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

export function CheckoutModal() {
    const { mode, cart, getCartTotal, selectedTable, isCheckoutOpen, setCheckoutOpen, clearCart, selectedDay, setSelectedDay, paymentMethod, setPaymentMethod, bcvRate } = useAppStore();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [time, setTime] = useState("8:00 PM");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const total = getCartTotal();

    // Parse "Hoy" o "Mañana" a YYYY-MM-DD
    const getDateFromDay = (dayStr: string) => {
        const d = new Date();
        if (dayStr === "Mañana") d.setDate(d.getDate() + 1);
        if (dayStr === "Otro Día") d.setDate(d.getDate() + 7);
        return d.toISOString().split('T')[0];
    };

    const handleWhatsAppOrder = async () => {
        if (!name.trim()) return alert("Por favor ingresa tu nombre.");

        if (mode === "reserva" && !selectedTable) {
            return alert("Debes seleccionar una mesa en el mapa antes de continuar.");
        }

        if (mode === "delivery" && !address.trim()) {
            return alert("Por favor ingresa tu dirección de entrega.");
        }

        const itemsText = cart.map((item) => `${item.quantity}x ${item.name}`).join("\n- ");
        let message = "";
        const formattedTotalBs = (total * bcvRate).toFixed(2);
        const paymentInfo = `\n\n*Método de Pago:* ${paymentMethod === "pago_movil" ? "📱 Pago Móvil" : paymentMethod === "zelle" ? "💵 Zelle" : "💰 Efectivo"}\n*Tasa BCV:* Bs. ${bcvRate.toFixed(2)}`;

        if (mode === "reserva") {
            setIsSubmitting(true);
            try {
                // Hacer POST a la DB
                const res = await fetch('/api/reservations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        clientName: name,
                        date: getDateFromDay(selectedDay),
                        time: time,
                        itemsText: itemsText,
                        tableId: selectedTable!.id
                    })
                });

                const data = await res.json();
                if (!res.ok) {
                    setIsSubmitting(false);
                    return alert(data.error || "No se pudo completar la reserva.");
                }
            } catch (error) {
                console.error("Booking error:", error);
                setIsSubmitting(false);
                return alert("Ocurrió un error en el servidor.");
            }

            message = `¡Hola! 🐴🥇 Quiero confirmar mi reserva registrada.\n\n*Nombre:* ${name}\n*Día:* ${selectedDay}\n*Hora:* ${time}\n*Mesa:* ${selectedTable?.number} (${selectedTable?.zone})\n\n*Consumo previo:*\n- ${itemsText}\n\n*Total:* $${total.toFixed(2)} (Bs. ${formattedTotalBs})${paymentInfo}`;
        } else {
            message = `¡Hola! 🛵 Quiero un delivery.\n\n*Nombre:* ${name}\n*Dirección:* ${address}\n\n*Pedido:*\n- ${itemsText}\n\n*Total:* $${total.toFixed(2)} (Bs. ${formattedTotalBs})${paymentInfo}`;
        }

        setIsSubmitting(false);
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/584126762060?text=${encodedMessage}`;

        window.open(whatsappUrl, "_blank");
        setCheckoutOpen(false);
        clearCart();
    };

    return (
        <>
            {/* Overlay Universal para ambas vistas (Mobile o Desktop Drawer) */}
            <div
                className={`fixed inset-0 z-[60] bg-zinc-950/80 backdrop-blur-sm transition-opacity duration-300 ${isCheckoutOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => setCheckoutOpen(false)}
            />

            <div
                className={`
                    fixed z-[70] flex flex-col items-center justify-end md:justify-start p-0
                    /* Mobile: Bottom Sheet */
                    inset-x-0 bottom-0
                    /* Desktop: Right Drawer */
                    md:inset-y-0 md:right-0 md:left-auto md:w-[450px]
                    transition-transform duration-300 ease-in-out
                    ${isCheckoutOpen ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-y-0 md:translate-x-full'}
                `}
            >
                <div className="bg-zinc-900 w-full md:h-full md:rounded-none rounded-t-3xl border-t md:border-t-0 md:border-l border-zinc-800 focus:outline-none flex flex-col max-h-[90vh] md:max-h-screen">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 md:p-6 border-b border-zinc-800 shrink-0">
                        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                            Tu Pedido {mode === "reserva" ? "🥂" : "🛵"}
                        </h2>
                        <button
                            onClick={() => setCheckoutOpen(false)}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
                        >
                            <X className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>

                    {/* Content Scrollable Area */}
                    <div className="p-4 md:p-6 overflow-y-auto flex-1 bg-zinc-950/50">
                        {/* Items List */}
                        <div className="space-y-3 mb-6">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-yellow-500">{item.quantity}x</span>
                                        <span className="text-white">{item.name}</span>
                                    </div>
                                    <span className="text-zinc-400">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-zinc-800 py-4 mb-4 flex justify-between items-center">
                            <span className="text-zinc-400 font-medium">Total a Pagar</span>
                            <div className="text-right">
                                <div className="text-2xl font-black text-yellow-500">${total.toFixed(2)}</div>
                                <div className="text-xs text-zinc-500 font-medium mt-1">Ref BCV: Bs. {(total * bcvRate).toFixed(2)}</div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="mb-6">
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                Método de Pago
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => setPaymentMethod("pago_movil")}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all",
                                        paymentMethod === "pago_movil" ? "bg-yellow-500/10 border-yellow-500 text-yellow-500" : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
                                    )}
                                >
                                    <Smartphone className="w-5 h-5 mb-1" />
                                    Pago Móvil
                                </button>
                                <button
                                    onClick={() => setPaymentMethod("zelle")}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all",
                                        paymentMethod === "zelle" ? "bg-yellow-500/10 border-yellow-500 text-yellow-500" : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
                                    )}
                                >
                                    <DollarSign className="w-5 h-5 mb-1" />
                                    Zelle
                                </button>
                                <button
                                    onClick={() => setPaymentMethod("efectivo")}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all",
                                        paymentMethod === "efectivo" ? "bg-yellow-500/10 border-yellow-500 text-yellow-500" : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
                                    )}
                                >
                                    <Wallet className="w-5 h-5 mb-1" />
                                    Efectivo
                                </button>
                            </div>

                            {paymentMethod === "pago_movil" && (
                                <div className="mt-3 p-3 bg-[#111827] border border-blue-500/20 rounded-xl">
                                    <div className="flex flex-col gap-1 text-xs text-blue-200">
                                        <p><span className="font-bold text-blue-400">Banco:</span> Venezuela (0102)</p>
                                        <p><span className="font-bold text-blue-400">CI:</span> V-12.345.678</p>
                                        <p><span className="font-bold text-blue-400">Telf:</span> 0412-1234567</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Form */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                    Tu Nombre
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ej. Juan Pérez"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all"
                                />
                            </div>

                            {mode === "delivery" ? (
                                <div>
                                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                        Dirección de Entrega
                                    </label>
                                    <textarea
                                        placeholder="Calle, Edificio, Apartamento..."
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all resize-none h-20"
                                    />
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                                ¿Qué día?
                                            </label>
                                            <select
                                                value={selectedDay}
                                                onChange={(e) => setSelectedDay(e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.2em_1.2em]"
                                            >
                                                <option value="Hoy">Hoy</option>
                                                <option value="Mañana">Mañana</option>
                                                <option value="Otro Día">Otra Fecha</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                                Llegada Aprox.
                                            </label>
                                            <select
                                                value={time}
                                                onChange={(e) => setTime(e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center] bg-[length:1.2em_1.2em]"
                                            >
                                                <option value="8:00 PM">8:00 PM</option>
                                                <option value="9:00 PM">9:00 PM</option>
                                                <option value="10:00 PM">10:00 PM</option>
                                                <option value="11:00 PM">11:00 PM</option>
                                                <option value="12:00 AM">12:00 AM</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                            Mesa Seleccionada
                                        </label>
                                        <div className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 flex items-center justify-between">
                                            {selectedTable ? (
                                                <>
                                                    <span className="text-white font-bold">Mesa {selectedTable.number}</span>
                                                    <span className="text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-md uppercase font-bold tracking-wider">
                                                        {selectedTable.zone}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-red-400 text-sm">Ninguna mesa seleccionada, por favor elige una.</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Bottom */}
                    <div className="bg-zinc-950 border-t border-zinc-800 shrink-0">
                        {/* Rules of the house inside Modal Footer */}
                        {mode === "reserva" && (
                            <div className="p-4 md:p-6 pb-0">
                                <div className="p-4 bg-[#1F2937] border border-red-500/30 rounded-xl shadow-inner">
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        <span className="text-yellow-500 font-bold">⚠️ Importante:</span> El local se reserva el derecho de admisión. Vestimenta Casual. La mesa se guardará con un máximo de <strong className="text-red-400">30 minutos de tolerancia</strong> de la hora pautada. Mayores de 18 años.
                                    </p>
                                </div>
                            </div>
                        )}
                        <div className="p-4 md:p-6">
                            <button
                                disabled={isSubmitting}
                                onClick={handleWhatsAppOrder}
                                className={cn(
                                    "w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-4 md:py-5 md:text-lg rounded-xl flex items-center justify-center gap-2 transition-all",
                                    isSubmitting && "opacity-75 cursor-wait"
                                )}
                            >
                                <Send className="w-5 h-5" />
                                {isSubmitting ? "Procesando Mesa..." : "Enviar Pedido por WhatsApp"}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
