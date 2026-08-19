"use client";

import type { FurnitureVariant } from "@/types/furniture";

export type ProductVisualMode =
  | "front"
  | "side"
  | "detail"
  | "workspace";

type ProductVisualProps = {
  model: string;
  activeVariant: FurnitureVariant;
  view: ProductVisualMode;
};

function ChairFront({ color }: { color: string }) {
  return (
    <div className="relative h-[360px] w-[300px]">
      <div
        className="absolute left-1/2 top-5 h-40 w-44 -translate-x-1/2 rounded-[48px_48px_28px_28px] border border-white/15 transition-colors duration-300"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute left-1/2 top-[154px] h-24 w-48 -translate-x-1/2 rounded-3xl border border-white/10 transition-colors duration-300"
        style={{ backgroundColor: color }}
      />
      <div className="absolute left-[45px] top-[185px] h-3 w-14 rounded-full bg-zinc-600" />
      <div className="absolute right-[45px] top-[185px] h-3 w-14 rounded-full bg-zinc-600" />
      <div className="absolute left-1/2 top-[238px] h-20 w-3 -translate-x-1/2 bg-zinc-500" />
      <div className="absolute left-1/2 top-[308px] h-3 w-44 -translate-x-1/2 rounded-full bg-zinc-600" />
      <div className="absolute bottom-4 left-[50px] h-5 w-5 rounded-full border-4 border-zinc-600" />
      <div className="absolute bottom-4 right-[50px] h-5 w-5 rounded-full border-4 border-zinc-600" />
      <div className="absolute bottom-4 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-zinc-600" />
    </div>
  );
}

function ChairSide({ color }: { color: string }) {
  return (
    <div className="relative h-[360px] w-[300px]">
      <div
        className="absolute left-[92px] top-8 h-40 w-24 rounded-[38px_28px_20px_30px] border border-white/15 transition-colors duration-300"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute left-[108px] top-[164px] h-20 w-36 -skew-x-6 rounded-2xl border border-white/10 transition-colors duration-300"
        style={{ backgroundColor: color }}
      />
      <div className="absolute left-[72px] top-[188px] h-3 w-16 rounded-full bg-zinc-600" />
      <div className="absolute left-[172px] top-[238px] h-20 w-3 bg-zinc-500" />
      <div className="absolute left-[116px] top-[308px] h-3 w-36 rounded-full bg-zinc-600" />
      <div className="absolute bottom-4 left-[100px] h-5 w-5 rounded-full border-4 border-zinc-600" />
      <div className="absolute bottom-4 left-[214px] h-5 w-5 rounded-full border-4 border-zinc-600" />
    </div>
  );
}

function ChairDetail({ color }: { color: string }) {
  return (
    <div className="relative flex h-[360px] w-[300px] items-center justify-center">
      <div className="relative h-56 w-56">
        <div
          className="absolute inset-0 rounded-[56px] border border-white/15 transition-colors duration-300"
          style={{ backgroundColor: color }}
        />
        <div className="absolute left-1/2 top-8 h-32 w-20 -translate-x-1/2 rounded-3xl border border-black/20 bg-black/10" />
        <div className="absolute left-1/2 top-1/2 h-20 w-2 -translate-x-1/2 -translate-y-1/2 bg-zinc-600" />
        <div className="absolute bottom-8 left-1/2 h-2 w-28 -translate-x-1/2 rounded-full bg-zinc-600" />
        <div className="absolute right-6 top-6 rounded-full border border-amber-300/30 bg-black/50 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-300">
          Detail
        </div>
      </div>
    </div>
  );
}

function ChairWorkspace({ color }: { color: string }) {
  return (
    <div className="relative h-[360px] w-[360px] max-w-full">
      <div className="absolute bottom-20 left-0 h-3 w-full bg-zinc-800" />
      <div className="absolute bottom-0 left-10 h-20 w-3 bg-zinc-800" />
      <div className="absolute bottom-0 right-10 h-20 w-3 bg-zinc-800" />
      <div className="absolute left-8 top-14 h-28 w-44 border border-white/10 bg-zinc-900">
        <div className="absolute left-5 top-5 h-3 w-28 bg-zinc-700" />
        <div className="absolute left-5 top-10 h-3 w-20 bg-zinc-800" />
      </div>
      <div className="absolute right-4 top-28 origin-bottom-right scale-[0.68]">
        <ChairFront color={color} />
      </div>
      <div className="absolute bottom-24 left-8 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
        Workspace context
      </div>
    </div>
  );
}

export function ProductVisual({
  model,
  activeVariant,
  view,
}: ProductVisualProps) {
  return (
    <div className="relative overflow-hidden bg-[#111318]">
      <div className="flex min-h-[480px] items-center justify-center p-6 sm:p-10">
        {view === "front" ? <ChairFront color={activeVariant.hex} /> : null}
        {view === "side" ? <ChairSide color={activeVariant.hex} /> : null}
        {view === "detail" ? <ChairDetail color={activeVariant.hex} /> : null}
        {view === "workspace" ? (
          <ChairWorkspace color={activeVariant.hex} />
        ) : null}

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
          {model} · {activeVariant.name}
        </div>
      </div>
    </div>
  );
}
