import Link from "next/link";
import { DemoDisclaimer } from "@/components/sales-kit/demo-disclaimer";
import type { SalesKitDemo } from "@/types/sales-kit";

type SamplePlaceholderProps = {
  demo: SalesKitDemo;
};

export function SamplePlaceholder({ demo }: SamplePlaceholderProps) {
  return (
    <main className="min-h-screen bg-[#090a0c] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <Link href="/" className="text-sm text-zinc-500 hover:text-amber-300">
          ← Interactive Sales Kit
        </Link>

        <section className="py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            {demo.sampleLabel} · {demo.category}
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
            {demo.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
            {demo.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {demo.capabilities.map((item) => (
              <span key={item} className="border border-white/10 px-3 py-2 text-sm text-zinc-400">
                {item}
              </span>
            ))}
          </div>
        </section>

        <DemoDisclaimer />
      </div>
    </main>
  );
}
