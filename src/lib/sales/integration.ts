import type { ProductInquiryRecord } from "@/types/inquiry";
import type {
  ProductInquiryIntegrationEvent,
  ProductInquiryIntegrationTarget,
} from "@/types/integration";

export const PRODUCT_INQUIRY_EVENT_NAME = "product_inquiry.created" as const;
export const PRODUCT_INQUIRY_CONTRACT_VERSION = "1.0" as const;

export const PRODUCT_INQUIRY_TARGETS: ProductInquiryIntegrationTarget[] = [
  "crm",
  "database",
  "webhook",
  "api",
  "automation",
];

export function createProductInquiryIntegrationEvent(
  record: ProductInquiryRecord,
): ProductInquiryIntegrationEvent {
  return {
    contractVersion: PRODUCT_INQUIRY_CONTRACT_VERSION,
    eventName: PRODUCT_INQUIRY_EVENT_NAME,
    source: "interactive-sales-kit",
    mode: "demo",
    payload: record,
  };
}

export function serializeProductInquiryIntegrationEvent(
  event: ProductInquiryIntegrationEvent,
): string {
  return JSON.stringify(event, null, 2);
}
