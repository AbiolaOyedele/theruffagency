import PricingEditor from '@/components/admin/PricingEditor'
import { getPricing } from '@/lib/content'

export default async function PricingPage() {
  return <PricingEditor initialData={await getPricing()} />
}
