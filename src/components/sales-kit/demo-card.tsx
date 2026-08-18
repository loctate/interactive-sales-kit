import Link from "next/link";
import type { SalesKitDemo } from "@/types/sales-kit";

type DemoCardProps = {
  demo: SalesKitDemo;
};

export function DemoCard({ demo }: DemoCardProps) {
  const active = demo.status === "active";

  return (
    <article className="flex min-h-80 flex-col border border-white/10 bg-white/[0.025] p-7 transition hover:border-amber-300/30">
      <div className="mb-8 flex items-center justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
          {demo.sampleLabel}
        </span>
        <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
          {active ? "Active Demo" : "Coming Soon"}
        </span>
      </div>

      <p className="mb-3 text-sm text-zinc-500">{demo.category}</p>
      <h2 className="text-2xl font-semibold tracking-tight text-white">
        {demo.title}
      </h2>
      <p className="mt-4 flex-1 leading-7 text-zinc-400">{demo.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {demo.capabilities.map((capability) => (
          <span
            key={capability}
            className="border border-white/10 px-2.5 py-1 text-xs text-zinc-400"
          >
            {capability}
          </span>
        ))}
      </div>

      <Link
        href={demo.href}
        className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200"
      >
        {active ? "Explore Demo" : "View Concept"} →
      </Link>
    </article>
  );
}
