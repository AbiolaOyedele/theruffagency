import { getSettings } from '@/lib/content'
import FooterCtaClient from './FooterCtaClient'
import Footer from '@/components/layout/Footer'

export default async function FooterCta() {
  const settings = await getSettings()
  return (
    <>
      <FooterCtaClient />
      <Footer settings={settings} />
    </>
  )
}
