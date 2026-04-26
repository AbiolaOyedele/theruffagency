import { getSettings } from '@/lib/content'
import FooterCtaClient from './FooterCtaClient'
import Footer from '@/components/layout/Footer'

export default function FooterCta() {
  const settings = getSettings()
  return (
    <>
      <FooterCtaClient />
      <Footer settings={settings} />
    </>
  )
}
