import type {
  ProductInquiryRecord,
  ProductInquirySummary,
} from "@/types/inquiry";

export function createProductInquiryRecord(
  summary: ProductInquirySummary,
): ProductInquiryRecord {
  return {
    schemaVersion: "1.0",
    source: "interactive-sales-kit",
    demo: true,
    customer: {
      name: summary.name.trim(),
      company: summary.company.trim() || null,
    },
    product: {
      label: summary.productLabel,
      variant: summary.activeVariantLabel,
      priceLabel: summary.priceLabel,
      useCase: summary.useCase,
      quantity: summary.quantity,
    },
    notes: summary.notes.trim() || null,
  };
}

export function formatProductInquiryText(
  record: ProductInquiryRecord,
): string {
  const lines = [
    "NUSAKARYA — PRODUCT INQUIRY",
    "",
    `Produk       : ${record.product.label}`,
    `Varian       : ${record.product.variant}`,
    `Harga        : ${record.product.priceLabel}`,
    `Kebutuhan    : ${record.product.useCase}`,
    `Jumlah       : ${record.product.quantity} unit`,
    `Nama         : ${record.customer.name}`,
    `Perusahaan   : ${record.customer.company ?? "Tidak diisi"}`,
  ];

  if (record.notes) {
    lines.push("", "Catatan:", record.notes);
  }

  lines.push(
    "",
    "Referensi: Interactive Sales Kit — demo produk fiktif.",
  );

  return lines.join("\n");
}

export function serializeProductInquiryRecord(
  record: ProductInquiryRecord,
): string {
  return JSON.stringify(record, null, 2);
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

export function formatProductInquiryPrintHtml(
  record: ProductInquiryRecord,
): string {
  const company = record.customer.company ?? "Tidak diisi";
  const notes = record.notes ?? "Tidak ada catatan tambahan.";

  return `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>NUSAKARYA ERGO N1 — Sales Handoff</title>
  <style>
    :root {
      color-scheme: light;
      font-family: Arial, Helvetica, sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background: #f3f4f6;
      color: #111827;
    }

    .toolbar {
      position: sticky;
      top: 0;
      display: flex;
      justify-content: center;
      gap: 12px;
      padding: 16px;
      background: #111827;
    }

    .toolbar button {
      border: 0;
      background: #fbbf24;
      color: #111827;
      font: inherit;
      font-weight: 700;
      padding: 12px 18px;
      cursor: pointer;
    }

    .sheet {
      width: min(210mm, calc(100% - 32px));
      min-height: 297mm;
      margin: 24px auto;
      background: #ffffff;
      padding: 20mm 18mm;
      box-shadow: 0 10px 35px rgba(0, 0, 0, 0.12);
    }

    .eyebrow {
      margin: 0 0 10px;
      color: #9a6700;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    h1 {
      margin: 0;
      font-size: 34px;
      line-height: 1.08;
    }

    .subtitle {
      margin: 10px 0 0;
      color: #6b7280;
      font-size: 14px;
    }

    .rule {
      height: 2px;
      margin: 24px 0;
      background: #fbbf24;
    }

    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
    }

    .card {
      border: 1px solid #e5e7eb;
      padding: 16px;
    }

    .card.full {
      grid-column: 1 / -1;
    }

    .label {
      margin: 0 0 10px;
      color: #6b7280;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    dl {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 9px 14px;
      margin: 0;
      font-size: 13px;
      line-height: 1.55;
    }

    dt {
      color: #6b7280;
    }

    dd {
      margin: 0;
      font-weight: 600;
    }

    .note {
      margin: 0;
      white-space: pre-wrap;
      font-size: 13px;
      line-height: 1.7;
    }

    .footer {
      margin-top: 26px;
      padding-top: 14px;
      border-top: 1px solid #e5e7eb;
      color: #6b7280;
      font-size: 10px;
      line-height: 1.6;
    }

    @media (max-width: 720px) {
      .sheet {
        width: calc(100% - 20px);
        min-height: auto;
        margin: 10px auto;
        padding: 24px 18px;
      }

      .grid {
        grid-template-columns: 1fr;
      }

      .card.full {
        grid-column: auto;
      }

      dl {
        grid-template-columns: 1fr;
      }
    }

    @media print {
      @page {
        size: A4;
        margin: 0;
      }

      body {
        background: #ffffff;
      }

      .toolbar {
        display: none;
      }

      .sheet {
        width: 210mm;
        min-height: 297mm;
        margin: 0;
        padding: 20mm 18mm;
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <button type="button" onclick="window.print()">Print / Save as PDF</button>
  </div>

  <main class="sheet">
    <p class="eyebrow">NUSAKARYA · Interactive Sales Kit</p>
    <h1>Product Inquiry / Sales Handoff</h1>
    <p class="subtitle">Demo dokumen terstruktur untuk tindak lanjut sales.</p>

    <div class="rule"></div>

    <section class="grid">
      <article class="card">
        <p class="label">Customer</p>
        <dl>
          <dt>Nama</dt>
          <dd>${escapeHtml(record.customer.name)}</dd>
          <dt>Perusahaan</dt>
          <dd>${escapeHtml(company)}</dd>
        </dl>
      </article>

      <article class="card">
        <p class="label">Product</p>
        <dl>
          <dt>Produk</dt>
          <dd>${escapeHtml(record.product.label)}</dd>
          <dt>Varian</dt>
          <dd>${escapeHtml(record.product.variant)}</dd>
          <dt>Jumlah</dt>
          <dd>${record.product.quantity} unit</dd>
        </dl>
      </article>

      <article class="card">
        <p class="label">Sales Context</p>
        <dl>
          <dt>Kebutuhan</dt>
          <dd>${escapeHtml(record.product.useCase)}</dd>
          <dt>Referensi harga</dt>
          <dd>${escapeHtml(record.product.priceLabel)}</dd>
        </dl>
      </article>

      <article class="card">
        <p class="label">Record</p>
        <dl>
          <dt>Schema</dt>
          <dd>v${record.schemaVersion}</dd>
          <dt>Source</dt>
          <dd>${escapeHtml(record.source)}</dd>
          <dt>Mode</dt>
          <dd>Demo / fictional product</dd>
        </dl>
      </article>

      <article class="card full">
        <p class="label">Customer Note</p>
        <p class="note">${escapeHtml(notes)}</p>
      </article>
    </section>

    <p class="footer">
      Seluruh brand, produk, harga, spesifikasi, benefit, dan data pada dokumen
      ini merupakan konten fiktif untuk demonstrasi Interactive Sales Kit.
      Dokumen ini bukan quotation, invoice, atau penawaran komersial nyata.
    </p>
  </main>
</body>
</html>`;
}
