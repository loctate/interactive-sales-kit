import { DemoCard } from "@/components/sales-kit/demo-card";
import { DemoDisclaimer } from "@/components/sales-kit/demo-disclaimer";
import { salesKitDemos } from "@/data/demo-registry";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090a0c] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="text-sm font-semibold tracking-[0.18em]">INTERACTIVE SALES KIT</div>
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">Indonesia Demo</div>
        </header>

        <section className="py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Business Presentation Showcase
          </p>
          <h1 className="mt-6 max-w-5xl text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">
            Presentasi produk dan layanan yang lebih mudah dipahami.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-400">
            Kumpulan contoh bagaimana bisnis Indonesia dapat menggunakan presentasi digital,
            interaksi, QR, dokumen, 3D, dan AR sesuai kebutuhan produk atau layanannya.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {salesKitDemos.map((demo) => (
            <DemoCard key={demo.slug} demo={demo} />
          ))}
        </section>

        <div className="py-16">
          <DemoDisclaimer />
        </div>
      </div>
    </main>
  );
}
