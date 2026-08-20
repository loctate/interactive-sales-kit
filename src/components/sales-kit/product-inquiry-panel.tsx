"use client";

import { type FormEvent, useMemo, useState } from "react";
import {
  createProductInquiryRecord,
  formatProductInquiryPrintHtml,
  formatProductInquiryText,
  serializeProductInquiryRecord,
} from "@/lib/sales/inquiry";
import {
  createProductInquiryIntegrationEvent,
  PRODUCT_INQUIRY_EVENT_NAME,
  PRODUCT_INQUIRY_TARGETS,
  serializeProductInquiryIntegrationEvent,
} from "@/lib/sales/integration";
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

function downloadBrowserFile(
  filename: string,
  content: string,
  mimeType: string,
) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  window.setTimeout(() => URL.revokeObjectURL(url), 0);
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

  const inquiryRecord = useMemo(
    () => createProductInquiryRecord(summary),
    [summary],
  );

  const integrationEvent = useMemo(
    () => createProductInquiryIntegrationEvent(inquiryRecord),
    [inquiryRecord],
  );

  const salesSummary = useMemo(
    () => formatProductInquiryText(inquiryRecord),
    [inquiryRecord],
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

  function downloadTextSummary() {
    downloadBrowserFile(
      "nusakarya-ergo-n1-inquiry.txt",
      salesSummary,
      "text/plain;charset=utf-8",
    );
  }

  function downloadJsonRecord() {
    downloadBrowserFile(
      "nusakarya-ergo-n1-inquiry.json",
      serializeProductInquiryRecord(inquiryRecord),
      "application/json;charset=utf-8",
    );
  }

  function downloadIntegrationPayload() {
    downloadBrowserFile(
      "nusakarya-ergo-n1-integration-event.json",
      serializeProductInquiryIntegrationEvent(integrationEvent),
      "application/json;charset=utf-8",
    );
  }

  function openPrintableHandoff() {
    const html = formatProductInquiryPrintHtml(inquiryRecord);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const previewWindow = window.open(url, "_blank");

    if (!previewWindow) {
      URL.revokeObjectURL(url);
      window.alert(
        "Preview diblokir browser. Izinkan pop-up untuk membuka Sales Handoff.",
      );
      return;
    }

    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
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
                  Schema v{inquiryRecord.schemaVersion}
                </span>
              </div>

              <div className="mt-5 border border-white/10 bg-[#0b0d10] p-4">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-zinc-300">
                  {salesSummary}
                </pre>
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
                <div className="border border-white/10 bg-white/[0.015] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300">
                        Human Handoff
                      </p>
                      <p className="mt-1 text-xs text-zinc-600">
                        Untuk sales, customer, email, dan follow-up langsung.
                      </p>
                    </div>

                    <span className="border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                      Sales Ready
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={copySummary}
                      className="border border-amber-300/40 px-4 py-3 text-sm font-semibold text-amber-300 transition hover:bg-amber-300 hover:text-black"
                    >
                      {copyState === "copied"
                        ? "Ringkasan Tersalin"
                        : "Salin Ringkasan"}
                    </button>

                    <button
                      type="button"
                      onClick={downloadTextSummary}
                      className="border border-white/15 px-4 py-3 text-sm font-semibold text-zinc-300 transition hover:border-white/30 hover:text-white"
                    >
                      Download TXT
                    </button>

                    <button
                      type="button"
                      onClick={openPrintableHandoff}
                      className="border border-white/15 px-4 py-3 text-sm font-semibold text-zinc-300 transition hover:border-white/30 hover:text-white"
                    >
                      Preview / Print PDF
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-amber-300 px-4 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
                    >
                      Lanjutkan via WhatsApp
                    </a>
                  </div>
                </div>

                <div className="border border-white/10 bg-[#0b0d10] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                        System Handoff
                      </p>
                      <p className="mt-1 text-xs text-zinc-600">
                        Contract siap untuk CRM, database, API, webhook, atau automation.
                      </p>
                    </div>

                    <span className="border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                      Contract v{integrationEvent.contractVersion}
                    </span>
                  </div>

                  <dl className="mt-4 grid gap-2 border border-white/10 bg-black/20 p-3 text-xs">
                    <div className="flex justify-between gap-4">
                      <dt className="text-zinc-600">Event</dt>
                      <dd className="text-right font-mono text-zinc-300">
                        {PRODUCT_INQUIRY_EVENT_NAME}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-zinc-600">Transport</dt>
                      <dd className="text-right text-zinc-400">
                        Not configured — demo
                      </dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-zinc-600">Targets</dt>
                      <dd className="text-right text-zinc-400">
                        {PRODUCT_INQUIRY_TARGETS.join(" · ")}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-4 grid gap-3">
                    <button
                      type="button"
                      onClick={downloadJsonRecord}
                      className="w-full border border-white/15 px-4 py-3 text-sm font-semibold text-zinc-300 transition hover:border-white/30 hover:text-white"
                    >
                      Download Structured JSON
                    </button>

                    <button
                      type="button"
                      onClick={downloadIntegrationPayload}
                      className="w-full border border-amber-300/30 px-4 py-3 text-sm font-semibold text-amber-300 transition hover:bg-amber-300 hover:text-black"
                    >
                      Download Integration Payload
                    </button>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-zinc-700">
                    Payload integration membungkus structured inquiry ke event contract
                    stabil tanpa mengirim data ke service eksternal.
                  </p>
                </div>
              </div>

              <div className="mt-4 border-l border-amber-300/30 pl-4">
                <p className="text-xs leading-6 text-zinc-500">
                  Human handoff dan system handoff berasal dari structured
                  inquiry record yang sama. Integration contract hanya menyiapkan
                  format event; demo belum mengirim data ke backend atau service eksternal.
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
