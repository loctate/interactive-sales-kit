"use client";

import { useState } from "react";
import {
  ProductVisual,
  type ProductVisualMode,
} from "@/components/product/product-visual";
import type { FurnitureVariant } from "@/types/furniture";

type ProductGalleryProps = {
  model: string;
  activeVariant: FurnitureVariant;
};

const galleryViews: Array<{
  id: ProductVisualMode;
  label: string;
  caption: string;
}> = [
  {
    id: "front",
    label: "Tampak Depan",
    caption: "Visual utama untuk memperkenalkan bentuk dan karakter produk.",
  },
  {
    id: "side",
    label: "Tampak Samping",
    caption: "Membantu calon pelanggan memahami profil dan proporsi produk.",
  },
  {
    id: "detail",
    label: "Detail",
    caption: "Menyorot bagian produk yang perlu dijelaskan lebih dekat.",
  },
  {
    id: "workspace",
    label: "Ruang Kerja",
    caption: "Memberikan konteks penggunaan produk di lingkungan sebenarnya.",
  },
];

export function ProductGallery({
  model,
  activeVariant,
}: ProductGalleryProps) {
  const [activeView, setActiveView] =
    useState<ProductVisualMode>("front");

  const selected =
    galleryViews.find((view) => view.id === activeView) ??
    galleryViews[0];

  return (
    <div className="overflow-hidden border border-white/10 bg-[#111318]">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 p-7 sm:p-8">
        <div>
          <span className="text-xs uppercase tracking-[0.22em] text-zinc-500">
            Product Gallery
          </span>
          <p className="mt-2 text-sm text-zinc-300">
            {model} · {activeVariant.name}
          </p>
        </div>

        <span className="border border-amber-300/20 bg-amber-300/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-amber-300">
          3D Upgrade Ready
        </span>
      </div>

      <ProductVisual
        model={model}
        activeVariant={activeVariant}
        view={activeView}
      />

      <div className="border-t border-white/10 p-6 sm:p-7">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {galleryViews.map((view) => {
            const active = view.id === activeView;

            return (
              <button
                key={view.id}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveView(view.id)}
                className={[
                  "border px-3 py-3 text-left text-xs transition",
                  active
                    ? "border-amber-300 bg-amber-300/[0.06] text-amber-300"
                    : "border-white/10 text-zinc-500 hover:border-white/25 hover:text-zinc-300",
                ].join(" ")}
              >
                {view.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 min-h-12 border-l border-amber-300/40 pl-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">
            {selected.label}
          </p>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            {selected.caption}
          </p>
        </div>

        <p className="mt-5 text-xs leading-5 text-zinc-600">
          Demo ini memakai visual simulasi. Pada implementasi klien, setiap
          tampilan dapat menggunakan foto atau render produk yang sebenarnya.
        </p>
      </div>
    </div>
  );
}
