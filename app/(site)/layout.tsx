import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider'
import Preloader from '@/components/layout/Preloader'
import Navbar from '@/components/layout/Navbar'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
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
