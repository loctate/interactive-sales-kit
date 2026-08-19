"use client";

import { useEffect, useState } from "react";
import { ProductVisual } from "@/components/product/product-visual";
import type {
  FurnitureDemoProduct,
  FurnitureVariant,
} from "@/types/furniture";

type FurniturePresentationProps = {
  product: FurnitureDemoProduct;
  activeVariant: FurnitureVariant;
  open: boolean;
  onClose: () => void;
};

const slideLabels = [
  "Overview",
  "Fitur Utama",
  "Varian & Penggunaan",
  "Spesifikasi",
  "Sales Follow-up",
];

export function FurniturePresentation({
  product,
  activeVariant,
  open,
  onClose,
}: FurniturePresentationProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSlideIndex(0);
        onClose();
      }
      if (event.key === "ArrowRight") {
        setSlideIndex((current) =>
          Math.min(current + 1, slideLabels.length - 1),
        );
      }
      if (event.key === "ArrowLeft") {
        setSlideIndex((current) => Math.max(current - 1, 0));
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const previousDisabled = slideIndex === 0;
  const nextDisabled = slideIndex === slideLabels.length - 1;

  function closePresentation() {
    setSlideIndex(0);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#08090b] text-white">
      <div className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-5 lg:px-10">
          <div className="flex items-center gap-4">
            <p className="text-sm font-semibold tracking-[0.22em]">
              {product.brand}
            </p>
            <span className="text-zinc-700">/</span>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              {product.model} Sales Presentation
            </p>
          </div>

          <div className="flex items-center gap-5">
            <span className="hidden text-xs uppercase tracking-[0.18em] text-zinc-600 sm:block">
              {String(slideIndex + 1).padStart(2, "0")} / {String(slideLabels.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={closePresentation}
              className="border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300 transition hover:border-white/30 hover:text-white"
            >
              Exit Presentation
            </button>
          </div>
        </header>

        <main className="flex flex-1 items-center px-6 py-10 lg:px-10 lg:py-14">
          <div className="mx-auto w-full max-w-7xl">
            {slideIndex === 0 ? (
              <section className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                    01 / Overview
                  </p>
                  <h1 className="mt-6 text-6xl font-semibold tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                    {product.model}
                  </h1>
                  <p className="mt-4 text-xl text-zinc-300">
                    {product.category} / {activeVariant.colorLabel}
                  </p>
                  <h2 className="mt-8 max-w-2xl text-3xl font-medium leading-tight">
                    {product.tagline}
                  </h2>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
                    {product.description}
                  </p>
                  <p className="mt-7 text-sm font-semibold text-amber-300">
                    {product.priceLabel}
                  </p>
                </div>

                <div className="overflow-hidden border border-white/10 bg-[#111318]">
                  <ProductVisual
                    model={product.model}
                    activeVariant={activeVariant}
                    view="front"
                  />
                </div>
              </section>
            ) : null}

            {slideIndex === 1 ? (
              <section>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                  02 / Fitur Utama
                </p>
                <h2 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.05em]">
                  Enam poin yang membantu sales menjelaskan produk.
                </h2>
                <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
                  {product.features.map((feature, index) => (
                    <article key={feature.id} className="bg-[#0d0f12] p-7 lg:min-h-48">
                      <span className="text-xs font-semibold text-amber-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-5 text-xl font-semibold">
                        {feature.title}
                      </h3>
                      <p className="mt-4 text-sm leading-6 text-zinc-400">
                        {feature.description}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            {slideIndex === 2 ? (
              <section className="grid gap-12 lg:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                    03 / Varian
                  </p>
                  <h2 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">
                    Pilihan tampilan produk.
                  </h2>
                  <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    {product.variants.map((variant) => {
                      const selected = variant.id === activeVariant.id;
                      return (
                        <div
                          key={variant.id}
                          className={[
                            "border p-4",
                            selected
                              ? "border-amber-300 bg-amber-300/[0.06]"
                              : "border-white/10",
                          ].join(" ")}
                        >
                          <div
                            className="h-32 border border-white/10"
                            style={{ backgroundColor: variant.hex }}
                          />
                          <p className={selected ? "mt-4 font-semibold text-amber-300" : "mt-4 font-semibold"}>
                            {variant.name}
                          </p>
                          <p className="mt-1 text-xs text-zinc-500">
                            {variant.colorLabel}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                    Penggunaan
                  </p>
                  <h2 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">
                    Untuk berbagai ruang kerja.
                  </h2>
                  <div className="mt-10 grid grid-cols-2 gap-4">
                    {product.useCases.map((useCase, index) => (
                      <div key={useCase} className="border border-white/10 p-6">
                        <span className="text-xs text-amber-300">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="mt-8 text-lg font-medium">{useCase}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            {slideIndex === 3 ? (
              <section>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                  04 / Spesifikasi
                </p>
                <h2 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">
                  Informasi teknis yang ringkas dan terstruktur.
                </h2>

                <div className="mt-10 grid gap-10 lg:grid-cols-2">
                  <div className="divide-y divide-white/10 border-y border-white/10">
                    {product.specifications.map((item) => (
                      <div key={item.label} className="flex justify-between gap-8 py-4 text-sm">
                        <span className="text-zinc-500">{item.label}</span>
                        <span className="text-right text-zinc-200">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="divide-y divide-white/10 border-y border-white/10">
                    {product.dimensions.map((item) => (
                      <div key={item.label} className="flex justify-between gap-8 py-4 text-sm">
                        <span className="text-zinc-500">{item.label}</span>
                        <span className="text-right text-zinc-200">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            {slideIndex === 4 ? (
              <section className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                    05 / Sales Follow-up
                  </p>
                  <h2 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.05em]">
                    Presentasi selesai. Percakapan sales dapat dilanjutkan.
                  </h2>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
                    Brosur, QR, WhatsApp, 3D, dan AR adalah modul yang dapat
                    digunakan sesuai kebutuhan bisnis dan kesiapan asset klien.
                  </p>

                  <a
                    href={product.sales.brochureHref}
                    download
                    className="mt-8 inline-flex bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
                  >
                    {product.sales.brochureLabel}
                  </a>
                </div>

                <div className="border border-white/10 bg-[#111318] p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
                    Demo Status
                  </p>
                  <div className="mt-6 space-y-4 text-sm">
                    <div className="flex justify-between gap-5 border-b border-white/10 pb-4">
                      <span className="text-zinc-500">QR Production</span>
                      <span className="text-right text-zinc-300">Belum dikonfigurasi</span>
                    </div>
                    <div className="flex justify-between gap-5 border-b border-white/10 pb-4">
                      <span className="text-zinc-500">WhatsApp Sales</span>
                      <span className="text-right text-zinc-300">Demo safe mode</span>
                    </div>
                    <div className="flex justify-between gap-5 border-b border-white/10 pb-4">
                      <span className="text-zinc-500">Brochure PDF</span>
                      <span className="text-right text-amber-300">Available</span>
                    </div>
                    <div className="flex justify-between gap-5">
                      <span className="text-zinc-500">3D / AR</span>
                      <span className="text-right text-zinc-300">Upgrade berikutnya</span>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        </main>

        <footer className="border-t border-white/10 px-6 py-5 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {slideLabels.map((label, index) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setSlideIndex(index)}
                  className={[
                    "h-2 w-8 transition",
                    index === slideIndex ? "bg-amber-300" : "bg-white/10 hover:bg-white/25",
                  ].join(" ")}
                  aria-label={`Buka slide ${index + 1}: ${label}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden text-xs text-zinc-600 lg:block">
                Keyboard: ← → &nbsp; | &nbsp; ESC keluar
              </span>
              <button
                type="button"
                disabled={previousDisabled}
                onClick={() => setSlideIndex((current) => Math.max(current - 1, 0))}
                className="border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Sebelumnya
              </button>
              <button
                type="button"
                disabled={nextDisabled}
                onClick={() =>
                  setSlideIndex((current) =>
                    Math.min(current + 1, slideLabels.length - 1),
                  )
                }
                className="border border-amber-300/40 px-4 py-2 text-sm font-semibold text-amber-300 transition hover:bg-amber-300 hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
              >
                Berikutnya
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
