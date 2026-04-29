import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider'
import Preloader from '@/components/layout/Preloader'
import Navbar from '@/components/layout/Navbar'
import UnderConstruction from '@/components/sections/UnderConstruction'
import { getSettings } from '@/lib/content'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()

  if (settings.maintenanceMode) {
    return <UnderConstruction />
  }

  return (
    <>
      <Preloader />
      <SmoothScrollProvider>
        <Navbar />
        {children}
      </SmoothScrollProvider>
    </>
  )
}
