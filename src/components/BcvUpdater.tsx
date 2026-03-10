"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

export function BcvUpdater() {
    const setBcvRate = useAppStore((state) => state.setBcvRate);

    useEffect(() => {
        const fetchBcv = async () => {
            try {
                const res = await fetch("https://ve.dolarapi.com/v1/dolares/oficial");
                const data = await res.json();
                if (data && data.promedio) {
                    // El BCV en Venezuela usualmente se maneja con 2 decimales para la tasa comercial.
                    setBcvRate(Number(data.promedio.toFixed(2)));
                }
            } catch (error) {
                console.error("Failed to fetch BCV rate:", error);
            }
        };

        fetchBcv();
        // Option to refresh every 30 minutes (1800000 ms) if left open
        const interval = setInterval(fetchBcv, 1800000);
        return () => clearInterval(interval);
    }, [setBcvRate]);

    return null;
}
