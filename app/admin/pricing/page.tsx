import PricingEditor from '@/components/admin/PricingEditor'
import { getPricing } from '@/lib/content'

export default function PricingPage() {
  return <PricingEditor initialData={getPricing()} />
}
