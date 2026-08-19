"use client";

import type { FurnitureDemoProduct } from "@/types/furniture";

type SalesToolsPanelProps = {
  sales: FurnitureDemoProduct["sales"];
  inquiryHref?: string;
};

const qrPattern = [
  "1111111001011111111",
  "1000001010010000001",
  "1011101001110111011",
  "1011101010010111011",
  "1011101001010111011",
  "1000001011110000001",
  "1111111010101111111",
  "0000000011100000000",
  "1010111110011010101",
  "0101100011100111010",
  "1110011010111001111",
  "0011100101001110001",
  "1010111111010010111",
  "0000000010111010100",
  "1111111011101110111",
  "1000001000111000100",
  "1011101011011110101",
  "1000001010100011100",
  "1111111011111010111",
];

function QrPreview() {
  return (
    <div
      aria-label="QR demo preview, not scannable"
      className="grid aspect-square w-44 grid-cols-[repeat(19,minmax(0,1fr))] overflow-hidden border-8 border-white bg-white"
    >
      {qrPattern.flatMap((row, rowIndex) =>
        row.split("").map((cell, columnIndex) => (
          <span
            key={`${rowIndex}-${columnIndex}`}
            className={cell === "1" ? "bg-black" : "bg-white"}
          />
        )),
      )}
    </div>
  );
}

export function SalesToolsPanel({
  sales,
  inquiryHref = "#product-inquiry",
}: SalesToolsPanelProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <article className="border border-white/10 bg-[#0d0f12] p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
            QR Share
          </p>
          <span className="border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
            Demo Preview
          </span>
        </div>

        <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-center">
          <QrPreview />

          <div>
            <h3 className="text-xl font-semibold text-white">
              {sales.qrLabel}
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">
              Pada implementasi klien, QR akan membuka halaman produk yang
              dapat dibagikan kepada calon pelanggan.
            </p>

            <div className="mt-5 border-l border-amber-300/40 pl-4">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
                Status
              </p>
              <p className="mt-1 text-sm text-zinc-300">
                {sales.qrTarget
                  ? "Production target configured"
                  : "Menunggu URL production showcase"}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs leading-5 text-zinc-600">
          QR di atas hanya visual demo dan sengaja tidak dapat dipindai agar
          tidak mengarah ke URL localhost atau alamat yang belum aktif.
        </p>
      </article>

      <article className="flex flex-col border border-white/10 bg-[#0d0f12] p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
            Sales Inquiry
          </p>
          <span className="border border-amber-300/20 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-amber-300">
            Contextual Flow
          </span>
        </div>

        <h3 className="mt-7 max-w-lg text-2xl font-semibold text-white">
          Siapkan kebutuhan sebelum menghubungi sales.
        </h3>

        <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-400">
          Gunakan Product Inquiry agar varian produk, kebutuhan, jumlah, dan
          catatan calon pelanggan ikut terbawa ke ringkasan sales.
        </p>

        <div className="mt-6 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {[
            ["01", "Pilih varian"],
            ["02", "Isi kebutuhan"],
            ["03", "Summary & WhatsApp"],
          ].map(([number, label]) => (
            <div key={number} className="bg-[#0b0d10] p-4">
              <span className="text-[10px] font-semibold text-amber-300">
                {number}
              </span>
              <p className="mt-2 text-sm text-zinc-300">{label}</p>
            </div>
          ))}
        </div>

        <a
          href={inquiryHref}
          className="mt-7 w-fit bg-amber-300 px-5 py-3 text-sm font-semibold text-black transition hover:bg-amber-200"
        >
          Mulai Product Inquiry ↓
        </a>

        <p className="mt-4 text-xs leading-5 text-zinc-600">
          WhatsApp contextual tersedia setelah inquiry disiapkan. Demo tidak
          menyimpan data dan tidak menanamkan nomor sales tertentu.
        </p>
      </article>
    </div>
  );
}
