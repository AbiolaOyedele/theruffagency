import Hero from '@/components/sections/Hero'
import WorkCarousel from '@/components/sections/WorkCarousel'
import Services from '@/components/sections/Services'
import Features from '@/components/sections/Features'
import Workflow from '@/components/sections/Workflow'
import About from '@/components/sections/About'
import Testimonials from '@/components/sections/Testimonials'
import Pricing from '@/components/sections/Pricing'
import Faq from '@/components/sections/Faq'
import Blog from '@/components/sections/Blog'
import FooterCta from '@/components/sections/FooterCta'
import {
  getSettings, getServices, getWorkflow,
  getTestimonials, getFAQs, getPricing, getBlogPosts, getProjects,
} from '@/lib/content'

export default async function HomePage() {
  const [settings, services, workflow, testimonials, faqs, pricing, posts, projects] =
    await Promise.all([
      getSettings(),
      getServices(),
      getWorkflow(),
      getTestimonials(),
      getFAQs(),
      getPricing(),
      getBlogPosts(),
      getProjects(),
    ])

  return (
    <main>
      <Hero settings={settings} />
      <WorkCarousel projects={projects} />
      <Services services={services} />
      <Features />
      <Workflow steps={workflow} />
      <About />
      <Testimonials testimonials={testimonials} />
      <Pricing pricing={pricing} />
      <Faq faqs={faqs} />
      <Blog posts={posts} />
      <FooterCta />
    </main>
  )
}
