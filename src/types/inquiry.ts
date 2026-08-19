export type ProductInquiryDraft = {
  name: string;
  company: string;
  useCase: string;
  quantity: number;
  notes: string;
};

export type ProductInquiryContext = {
  productLabel: string;
  activeVariantLabel: string;
  priceLabel: string;
};

export type ProductInquirySummary = ProductInquiryContext &
  ProductInquiryDraft;
