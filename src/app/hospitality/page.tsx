import { SamplePlaceholder } from "@/components/sales-kit/sample-placeholder";
import { getDemo } from "@/data/demo-registry";

export default function HospitalityPage() {
  const demo = getDemo("hospitality");
  if (!demo) return null;
  return <SamplePlaceholder demo={demo} />;
}
