import Image from "next/image";

export function Header() {
    return (
        <header className="flex flex-col items-center justify-center pt-8 pb-6 px-4">
            <div className="w-24 h-24 rounded-full border-2 border-yellow-500 bg-zinc-900 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(234,179,8,0.3)] overflow-hidden relative">
                <Image
                    src="/logo.png"
                    alt="Logo El Casquillo de Oro"
                    fill
                    className="object-cover"
                />
            </div>
            <h1 className="text-3xl font-black text-white tracking-wider text-center drop-shadow-md">
                EL CASQUILLO
                <span className="block text-yellow-500">DE ORO</span>
            </h1>
            <p className="text-zinc-400 text-sm mt-2 font-medium tracking-widest uppercase">
                Tasca & VIP Nightclub
            </p>
        </header>
    );
}
