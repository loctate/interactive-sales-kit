"use client";

import { type FormEvent, useMemo, useState } from "react";
import type {
  ProductInquiryContext,
  ProductInquiryDraft,
  ProductInquirySummary,
} from "@/types/inquiry";

type ProductInquiryPanelProps = ProductInquiryContext & {
  useCases: string[];
};

type CopyState = "idle" | "copied" | "failed";

const EMPTY_DRAFT: ProductInquiryDraft = {
  name: "",
  company: "",
  useCase: "",
  quantity: 1,
  notes: "",
};

function buildSalesSummary(summary: ProductInquirySummary) {
  const lines = [
    "NUSAKARYA — PRODUCT INQUIRY",
    "",
    `Produk       : ${summary.productLabel}`,
    `Varian       : ${summary.activeVariantLabel}`,
    `Harga        : ${summary.priceLabel}`,
    `Kebutuhan    : ${summary.useCase}`,
    `Jumlah       : ${summary.quantity} unit`,
    `Nama         : ${summary.name}`,
    `Perusahaan   : ${summary.company || "Tidak diisi"}`,
  ];

  if (summary.notes.trim()) {
    lines.push("", "Catatan:", summary.notes.trim());
  }

  lines.push(
    "",
    "Referensi: Interactive Sales Kit — demo produk fiktif.",
  );

  return lines.join("\n");
}

export function ProductInquiryPanel({
  productLabel,
  activeVariantLabel,
  priceLabel,
  useCases,
}: ProductInquiryPanelProps) {
  const [draft, setDraft] = useState<ProductInquiryDraft>(() => ({
    ...EMPTY_DRAFT,
    useCase: useCases[0] ?? "",
  }));
  const [submitted, setSubmitted] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>("idle");

  const summary = useMemo<ProductInquirySummary>(
    () => ({
      ...draft,
      productLabel,
      activeVariantLabel,
      priceLabel,
    }),
    [activeVariantLabel, draft, priceLabel, productLabel],
  );

  const salesSummary = useMemo(
    () => buildSalesSummary(summary),
    [summary],
  );

  const whatsappUrl = useMemo(
    () => `https://wa.me/?text=${encodeURIComponent(salesSummary)}`,
    [salesSummary],
  );

  function updateDraft<K extends keyof ProductInquiryDraft>(
    key: K,
    value: ProductInquiryDraft[K],
  ) {
    setSubmitted(false);
    setCopyState("idle");
    setDraft((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCopyState("idle");
    setSubmitted(true);
  }

  function resetForm() {
    setDraft({
      ...EMPTY_DRAFT,
      useCase: useCases[0] ?? "",
    });
    setSubmitted(false);
    setCopyState("idle");
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(salesSummary);
      setCopyState("copied");
    } catch (error) {
      console.error("[COPY SALES SUMMARY]", error);
      setCopyState("failed");
    }
  }

  return (
    <section id="product-inquiry" className="scroll-mt-8 border-t border-white/10 py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
            Product Inquiry
          </p>

          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ubah ketertarikan produk menjadi kebutuhan yang siap ditindaklanjuti.
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
            Calon pelanggan dapat menyusun kebutuhan dasar setelah melihat produk,
            memilih varian, dan mengeksplorasi presentasi 3D. Pada demo ini data
            hanya diproses di browser dan tidak dikirim atau disimpan.
          </p>

          <div className="mt-8 border border-amber-300/20 bg-amber-300/[0.04] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300">
              Current Product Context
            </p>

            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-5 border-b border-white/10 pb-3">
                <dt className="text-zinc-500">Produk</dt>
                <dd className="text-right font-medium text-white">
                  {productLabel}
                </dd>
              </div>

              <div className="flex justify-between gap-5 border-b border-white/10 pb-3">
                <dt className="text-zinc-500">Varian aktif</dt>
                <dd className="text-right font-medium text-white">
                  {activeVariantLabel}
                </dd>
              </div>

              <div className="flex justify-between gap-5">
                <dt className="text-zinc-500">Referensi harga</dt>
                <dd className="text-right font-medium text-amber-300">
                  {priceLabel}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="border border-white/10 bg-[#111318] p-5 sm:p-7">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Nama
                </span>
                <input
                  required
                  type="text"
                  value={draft.name}
                  onChange={(event) => updateDraft("name", event.target.value)}
                  placeholder="Contoh: Budi"
                  className="mt-2 w-full border border-white/10 bg-[#0b0d10] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-amber-300/60"
                />
              </label>

              <label className="block">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Perusahaan / Usaha
                </span>
                <input
                  type="text"
                  value={draft.company}
                  onChange={(event) => updateDraft("company", event.target.value)}
                  placeholder="Opsional"
                  className="mt-2 w-full border border-white/10 bg-[#0b0d10] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-amber-300/60"
                />
              </label>

              <label className="block">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Kebutuhan
                </span>
                <select
                  required
                  value={draft.useCase}
                  onChange={(event) => updateDraft("useCase", event.target.value)}
                  className="mt-2 w-full border border-white/10 bg-[#0b0d10] px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60"
                >
                  {useCases.map((useCase) => (
                    <option key={useCase} value={useCase}>
                      {useCase}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                  Jumlah
                </span>
                <input
                  required
                  min={1}
                  max={999}
                  type="number"
                  value={draft.quantity}
                  onChange={(event) =>
                    updateDraft(
                      "quantity",
                      Math.max(1, Number(event.target.value) || 1),
                    )
                  }
                  className="mt-2 w-full border border-white/10 bg-[#0b0d10] px-4 py-3 text-sm text-white outline-none transition focus:border-amber-300/60"
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                Catatan kebutuhan
              </span>
              <textarea
                rows={4}
                value={draft.notes}
                onChange={(event) => updateDraft("notes", event.target.value)}
                placeholder="Contoh: kebutuhan untuk ruang kerja tim baru."
                className="mt-2 w-full resize-y border border-white/10 bg-[#0b0d10] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-zinc-700 focus:border-amber-300/60"
              />
            </label>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                className="bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
              >
                Siapkan Inquiry
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="border border-white/10 px-5 py-3 text-sm text-zinc-400 transition hover:border-white/25 hover:text-white"
              >
                Reset
              </button>
            </div>
          </form>

          {submitted ? (
            <div className="mt-7 border border-amber-300/25 bg-black/30 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300">
                    Sales Summary Ready
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Ringkasan kebutuhan siap dibagikan.
                  </p>
                </div>

                <span className="border border-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  Demo Local Only
                </span>
              </div>

              <div className="mt-5 border border-white/10 bg-[#0b0d10] p-4">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-zinc-300">
                  {salesSummary}
                </pre>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={copySummary}
                  className="border border-amber-300/40 px-5 py-3 text-sm font-semibold text-amber-300 transition hover:bg-amber-300 hover:text-black"
                >
                  {copyState === "copied"
                    ? "Ringkasan Tersalin"
                    : "Salin Ringkasan"}
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
                >
                  Lanjutkan via WhatsApp
                </a>
              </div>

              <div className="mt-4 border-l border-amber-300/30 pl-4">
                <p className="text-xs leading-6 text-zinc-500">
                  Tombol WhatsApp membawa ringkasan inquiry sebagai pesan awal.
                  Demo ini tidak menanamkan nomor sales tertentu; pengguna memilih
                  tujuan percakapan pada WhatsApp.
                </p>
              </div>

              <p
                className={[
                  "mt-4 text-xs",
                  copyState === "failed"
                    ? "text-red-300"
                    : "text-zinc-600",
                ].join(" ")}
              >
                {copyState === "copied"
                  ? "Ringkasan siap ditempel ke email atau catatan sales."
                  : copyState === "failed"
                    ? "Clipboard tidak tersedia. Salin teks secara manual."
                    : "Belum ada data yang dikirim atau disimpan oleh demo."}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
