import { ModeSelector } from "@/components/ModeSelector";
import { StickyNav } from "@/components/StickyNav";
import { MenuItemList } from "@/components/MenuItemList";
import { TableMap } from "@/components/TableMap";
import { FloatingCheckout } from "@/components/FloatingCheckout";
import { CheckoutModal } from "@/components/CheckoutModal";
import { EventSection } from "@/components/EventSection";
import { BcvUpdater } from "@/components/BcvUpdater";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import { GallerySection } from "@/components/GallerySection";

export default function Home() {
  return (
    <main className="bg-[#0B0B0B] min-h-screen">
      {/* Invisible rate syncer */}
      <BcvUpdater />

      {/* Sticky Navbar — centered logo, symmetric links */}
      <Navbar />

      {/* App container — centered, full desktop layout */}
      <div className="max-w-7xl mx-auto relative bg-[#0B0B0B] xl:shadow-[0_0_50px_rgba(0,0,0,0.8)] xl:border-x border-zinc-900 pb-28 xl:pb-0">

        {/* [1] Hero — full bleed, blurred dark background */}
        <HeroSection />

        {/* [2] Gallery — "Nuestras Noches" Bento */}
        <GallerySection />

        {/* Editorial bridge — transitions from inspiration to action */}
        <div className="text-center px-4 pt-10 pb-2 max-w-2xl mx-auto">
          <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-2">Reserva y Pedidos</p>
          <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
            Haz tu pedido o <span className="text-yellow-500">asegura tu mesa</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base mt-3 max-w-md mx-auto">
            Selecciona cómo quieres vivir la noche — y nos encargamos del resto.
          </p>
        </div>

        {/* [3] Cartelera Semanal */}
        <div className="relative z-10 w-full px-0 lg:px-4">
          <EventSection />
        </div>

        {/* Mode toggle */}
        <div id="vip" className="w-full px-4 lg:px-8 mt-4">
          <ModeSelector />
        </div>

        {/* [4] Sticky category nav + App core */}
        <StickyNav />
        <div className="relative z-10 w-full px-0 lg:px-4">
          <TableMap />
          <MenuItemList />
        </div>

        {/* [6] Footer */}
        <Footer />
      </div>

      {/* Checkout modal — right drawer on desktop, bottom sheet on mobile */}
      <CheckoutModal />

      {/* Mobile FAB */}
      <div className="xl:hidden">
        <FloatingCheckout />
      </div>
    </main>
  );
}
