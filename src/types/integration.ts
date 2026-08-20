import type { ProductInquiryRecord } from "@/types/inquiry";

export type ProductInquiryIntegrationEvent = {
  contractVersion: "1.0";
  eventName: "product_inquiry.created";
  source: "interactive-sales-kit";
  mode: "demo";
  payload: ProductInquiryRecord;
};

export type ProductInquiryIntegrationTarget =
  | "crm"
  | "database"
  | "webhook"
  | "api"
  | "automation";
