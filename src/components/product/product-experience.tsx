"use client";

import { useState } from "react";
import { Product3DViewer } from "@/components/product/product-3d-viewer";
import { ProductGallery } from "@/components/product/product-gallery";
import type { FurnitureVariant } from "@/types/furniture";

type ProductExperienceProps = {
  model: string;
  activeVariant: FurnitureVariant;
  productLabel: string;
  modelSrc: string;
  assetLabel: string;
  assetNote: string;
  targetMaterialNames?: string[];
  preserveBaseColorTexture?: boolean;
};

type ExperienceMode = "gallery" | "3d";

export function ProductExperience({
  model,
  activeVariant,
  productLabel,
  modelSrc,
  assetLabel,
  assetNote,
  targetMaterialNames = [],
  preserveBaseColorTexture = false,
}: ProductExperienceProps) {
  const [mode, setMode] = useState<ExperienceMode>("gallery");

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
            Product Experience
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            Pilih cara mengeksplorasi produk.
          </p>
        </div>

        <div className="flex border border-white/10 bg-[#0d0f12] p-1">
          <button
            type="button"
            aria-pressed={mode === "gallery"}
            onClick={() => setMode("gallery")}
            className={[
              "px-4 py-2 text-xs font-medium transition",
              mode === "gallery"
                ? "bg-white text-black"
                : "text-zinc-500 hover:text-white",
            ].join(" ")}
          >
            Gallery Produk
          </button>

          <button
            type="button"
            aria-pressed={mode === "3d"}
            onClick={() => setMode("3d")}
            className={[
              "px-4 py-2 text-xs font-medium transition",
              mode === "3d"
                ? "bg-amber-300 text-black"
                : "text-zinc-500 hover:text-white",
            ].join(" ")}
          >
            Interactive 3D
          </button>
        </div>
      </div>

      {mode === "gallery" ? (
        <ProductGallery
          model={model}
          activeVariant={activeVariant}
        />
      ) : (
        <Product3DViewer
          src={modelSrc}
          productLabel={productLabel}
          activeVariant={activeVariant}
          assetLabel={assetLabel}
          assetNote={assetNote}
          targetMaterialNames={targetMaterialNames}
          preserveBaseColorTexture={preserveBaseColorTexture}
        />
      )}
    </div>
  );
}
