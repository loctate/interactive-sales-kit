"use client";

import { ProductInquiryPanel } from "@/components/sales-kit/product-inquiry-panel";

import Link from "next/link";
import { useState } from "react";
import { DemoDisclaimer } from "@/components/sales-kit/demo-disclaimer";
import { SalesToolsPanel } from "@/components/sales-kit/sales-tools-panel";
import { ProductExperience } from "@/components/product/product-experience";
import { FurniturePresentation } from "@/components/product/furniture-presentation";
import type {
  FurnitureDemoProduct,
  FurnitureVariant,
} from "@/types/furniture";

type FurnitureSalesPageProps = {
  product: FurnitureDemoProduct;
};

export function FurnitureSalesPage({ product }: FurnitureSalesPageProps) {
  const [activeVariantId, setActiveVariantId] = useState(
    product.variants[0]?.id ?? "",
  );
  const [presentationOpen, setPresentationOpen] = useState(false);

  const activeVariant: FurnitureVariant =
    product.variants.find((variant) => variant.id === activeVariantId) ??
    product.variants[0];

  if (!activeVariant) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#090a0c] text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <header className="flex items-center justify-between border-b border-white/10 py-6">
          <div>
            <p className="text-sm font-semibold tracking-[0.22em]">
              {product.brand}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-600">
              Furniture Concept Demo
            </p>
          </div>
          <Link
            href="/"
            className="text-sm text-zinc-500 transition hover:text-amber-300"
          >
            ← Semua Sample
          </Link>
        </header>

        <section className="grid min-h-[760px] items-center gap-14 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-300">
              Sample 01 · Produk Fisik
            </p>

            <h1 className="mt-7 text-6xl font-semibold tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              {product.model}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="text-xl text-zinc-300">{product.category}</p>
              <span className="text-zinc-700">/</span>
              <p className="text-sm font-medium text-amber-300">
                {activeVariant.colorLabel}
              </p>
            </div>

            <h2 className="mt-9 max-w-xl text-2xl font-medium leading-snug text-white">
              {product.tagline}
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-zinc-400">
              {product.description}
            </p>

            <div className="mt-8 text-sm font-medium text-amber-300">
              {product.priceLabel}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#product-details"
                className="bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                Lihat Produk
              </a>
              <button
                type="button"
                onClick={() => setPresentationOpen(true)}
                className="border border-white/15 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-amber-300/50 hover:text-amber-300"
              >
                {product.sales.presentationLabel}
              </button>
            </div>

            <p className="mt-5 text-xs uppercase tracking-[0.18em] text-zinc-600">
              Gunakan Mode Presentasi untuk meeting sales fullscreen.
            </p>
          </div>

          <ProductExperience
            model={product.model}
            activeVariant={activeVariant}
            productLabel={`${product.brand} ${product.model}`}
            modelSrc="/models/furniture/ergo-n1.glb"
            assetLabel="Interactive 3D"
            assetNote="ERGO N1 demo presentation asset"
            targetMaterialNames={["Mesh"]}
          />
        </section>

        <section
          id="product-details"
          className="border-t border-white/10 py-20"
        >
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                Fitur Utama
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">
                Produk yang lebih mudah dijelaskan.
              </h2>
              <p className="mt-5 max-w-md leading-7 text-zinc-400">
                Setiap fitur disusun seperti materi sales sehingga pelanggan
                dapat memahami nilai produk tanpa membaca katalog panjang.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
              {product.features.map((feature, index) => (
                <article
                  key={feature.id}
                  className="bg-[#0d0f12] p-7"
                >
                  <span className="text-xs font-semibold text-amber-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                Pilihan Warna
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                Pilih tampilan produk.
              </h2>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {product.variants.map((variant) => {
                  const selected = variant.id === activeVariant.id;

                  return (
                    <button
                      key={variant.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setActiveVariantId(variant.id)}
                      className={[
                        "border p-4 text-left transition",
                        selected
                          ? "border-amber-300 bg-amber-300/[0.06]"
                          : "border-white/10 bg-white/[0.02] hover:border-white/25",
                      ].join(" ")}
                    >
                      <div
                        className="h-20 border border-white/10"
                        style={{ backgroundColor: variant.hex }}
                      />
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <p
                          className={
                            selected
                              ? "font-medium text-amber-300"
                              : "font-medium text-white"
                          }
                        >
                          {variant.name}
                        </p>

                        {selected ? (
                          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300">
                            Aktif
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-xs text-zinc-500">
                        {variant.colorLabel}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 border-l border-amber-300/40 pl-4">
                <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
                  Varian aktif
                </p>
                <p className="mt-1 text-sm text-zinc-300">
                  {activeVariant.colorLabel}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                Penggunaan
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                Untuk berbagai ruang kerja.
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {product.useCases.map((useCase, index) => (
                  <div
                    key={useCase}
                    className="border border-white/10 p-5"
                  >
                    <span className="text-xs text-amber-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-5 font-medium text-zinc-200">
                      {useCase}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                Spesifikasi
              </p>
              <div className="mt-7 divide-y divide-white/10 border-y border-white/10">
                {product.specifications.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-8 py-4 text-sm"
                  >
                    <span className="text-zinc-500">{item.label}</span>
                    <span className="text-right text-zinc-200">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                Dimensi
              </p>
              <div className="mt-7 divide-y divide-white/10 border-y border-white/10">
                {product.dimensions.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-8 py-4 text-sm"
                  >
                    <span className="text-zinc-500">{item.label}</span>
                    <span className="text-right text-zinc-200">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-20">
          <div className="mb-9">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
              Sales Tools
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em]">
              Dari presentasi produk ke tindak lanjut sales.
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-zinc-400">
              Brosur, QR, dan Product Inquiry menunjukkan bagaimana calon pelanggan dapat
              melanjutkan interaksi setelah memahami produk. Seluruh kontak
              pada showcase tetap dalam mode demo yang aman.
            </p>
          </div>

          <div className="mb-4 flex flex-col gap-5 border border-white/10 bg-[#101216] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">
                Digital Brochure
              </p>
              <h3 className="mt-3 text-xl font-semibold">
                Brosur ERGO N1 siap dibagikan.
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                PDF demo berisi overview, fitur, spesifikasi, dimensi, varian,
                serta placeholder QR yang akan diganti saat URL production aktif.
              </p>
            </div>

            <a
              href={product.sales.brochureHref}
              download
              className="shrink-0 bg-white px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              {product.sales.brochureLabel}
            </a>
          </div>

          <SalesToolsPanel sales={product.sales} />

          <ProductInquiryPanel
            productLabel={`${product.brand} ${product.model}`}
            activeVariantLabel={activeVariant.colorLabel}
            priceLabel={product.priceLabel}
            useCases={product.useCases}
          />
        </section>

        <div className="pb-16">
          <DemoDisclaimer />
        </div>
      </div>

      <FurniturePresentation
        product={product}
        activeVariant={activeVariant}
        open={presentationOpen}
        onClose={() => setPresentationOpen(false)}
      />
    </main>
  );
}
