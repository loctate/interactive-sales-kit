"use client";

import { useState } from "react";
import type { FurnitureDemoProduct } from "@/types/furniture";

type SalesToolsPanelProps = {
  productLabel: string;
  sales: FurnitureDemoProduct["sales"];
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
  productLabel,
  sales,
}: SalesToolsPanelProps) {
  const [whatsappOpen, setWhatsappOpen] = useState(false);

  return (
    <>
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
              WhatsApp Sales
            </p>
            <span className="border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Demo Safe
            </span>
          </div>

          <h3 className="mt-7 text-2xl font-semibold">
            Lanjutkan percakapan dengan sales.
          </h3>
          <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-400">
            Alur ini menunjukkan bagaimana calon pelanggan dapat berpindah dari
            presentasi produk ke percakapan WhatsApp tanpa memasukkan nomor
            pribadi atau nomor fiktif ke dalam showcase.
          </p>

          <div className="mt-6 border border-white/10 bg-white/[0.02] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
              Contoh pesan
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              {sales.whatsappMessage}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setWhatsappOpen(true)}
            className="mt-7 w-fit border border-amber-300/40 px-5 py-3 text-sm font-semibold text-amber-300 transition hover:bg-amber-300 hover:text-black"
          >
            {sales.whatsappLabel}
          </button>
        </article>
      </div>

      {whatsappOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="WhatsApp demo mode"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setWhatsappOpen(false)}
        >
          <div
            className="w-full max-w-lg border border-white/10 bg-[#111318] p-7 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-300">
              Demo Mode
            </p>
            <h3 className="mt-4 text-2xl font-semibold text-white">
              WhatsApp belum dikonfigurasi.
            </h3>
            <p className="mt-4 leading-7 text-zinc-400">
              Showcase {productLabel} tidak menggunakan nomor WhatsApp nyata.
              Pada implementasi klien, tombol ini akan membuka nomor sales
              perusahaan beserta pesan awal yang sudah disiapkan.
            </p>

            <div className="mt-6 border border-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-600">
                Status konfigurasi
              </p>
              <div className="mt-3 grid gap-2 text-sm text-zinc-300">
                <p>
                  Nomor sales:{" "}
                  {sales.whatsappNumber ?? "Belum dikonfigurasi"}
                </p>
                <p>
                  WhatsApp aktif:{" "}
                  {sales.whatsappEnabled ? "Ya" : "Tidak — demo only"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setWhatsappOpen(false)}
              className="mt-7 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Tutup
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
