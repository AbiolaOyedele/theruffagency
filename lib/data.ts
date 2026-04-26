export type Project = {
  slug: string
  title: string
  description: string
  liveUrl?: string
  categories: string[]
  cover: string
  gallery: { src: string; alt: string; aspect: '4/3' | '16/9' | '3/4' | '1/1' }[]
}

export const services = [
  {
    id: '01',
    name: 'Brand Strategy & Identity',
    description:
      'We craft cohesive brand identities that resonate with your audience — from logo and color systems to tone of voice and brand guidelines that scale across every touchpoint.',
  },
  {
    id: '02',
    name: 'Website Development',
    description:
      'High-performance websites built for conversion. We design and develop with precision — combining cutting-edge tech with pixel-perfect execution to create digital experiences that captivate.',
  },
  {
    id: '03',
    name: 'SEO Marketing',
    description:
      'Data-driven SEO strategies that move the needle. We optimize your digital presence to rank higher, drive qualified traffic, and turn visitors into loyal customers.',
  },
  {
    id: '04',
    name: 'Packaging Design',
    description:
      'Packaging that sells before the customer even opens the box. We create tactile, shelf-stopping designs that communicate quality and reinforce your brand story.',
  },
]

export const workflowSteps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We start by deeply understanding your business, goals, and target audience. Through workshops, research, and competitor analysis, we uncover the insights that drive everything forward.',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'With strategy in hand, our designers craft visuals that are both beautiful and purposeful. Every element is considered — from typography to colour, motion to layout.',
  },
  {
    number: '03',
    title: 'Development',
    description:
      'Our engineers bring designs to life with clean, scalable code. We build fast, accessible, and responsive digital products that perform as well as they look.',
  },
  {
    number: '04',
    title: 'Launch',
    description:
      'We handle the full launch process — QA, deployment, and post-launch monitoring. You go live with confidence, and we stay close to ensure everything runs perfectly.',
  },
]

export const testimonials = [
  {
    id: 1,
    name: 'Steve R.',
    role: 'CEO, Bloom',
    avatar: '/images/avatar-1.jpg',
    rating: 5,
    body: "Working with Ruff was a game-changer for Bloom. They rebuilt our entire brand identity and website in under six weeks, and the results were immediate — we saw a 40% increase in demo requests within the first month. The team's attention to detail and strategic thinking set them apart from any agency we've worked with before.",
  },
  {
    id: 2,
    name: 'Sarah M.',
    role: 'Founder, NovaSkin',
    avatar: '/images/avatar-2.jpg',
    rating: 5,
    body: "I came to Ruff with a rough concept and left with a fully realised brand that feels premium, approachable, and uniquely ours. They didn't just execute — they challenged our thinking and pushed us toward something far better than we'd imagined. Our packaging alone has become a talking point.",
  },
  {
    id: 3,
    name: 'Max T.',
    role: 'Director, Craft & Code',
    avatar: '/images/avatar-3.jpg',
    rating: 5,
    body: "Ruff delivered our new site on time, on budget, and beyond expectation. The performance scores are exceptional — 98 on Lighthouse — and the design is the best we've ever had. Our clients regularly comment on it. I can't recommend them highly enough.",
  },
  {
    id: 4,
    name: 'Elena V.',
    role: 'CMO, Streamly',
    avatar: '/images/avatar-4.jpg',
    rating: 5,
    body: "From the first call to the final handoff, Ruff made the whole process feel effortless. They understood our SaaS product deeply, translated it into clear and compelling messaging, and designed an onboarding flow that reduced our churn by 18%. Truly a partner, not just a vendor.",
  },
  {
    id: 5,
    name: 'James K.',
    role: 'Head of Marketing, Axiom',
    avatar: '/images/avatar-5.jpg',
    rating: 5,
    body: "We've worked with several agencies over the years, but Ruff stands out for one reason: they actually care about results. Not vanity metrics — real business outcomes. Our conversion rate is up 32% since the rebrand, and our sales team finally has materials they're proud to share.",
  },
  {
    id: 6,
    name: 'Priya N.',
    role: 'Product Lead, Loopline',
    avatar: '/images/avatar-6.jpg',
    rating: 5,
    body: "The Ruff team brought a level of craft and intention to our project that I rarely see. They asked hard questions, pushed back when needed, and delivered something genuinely extraordinary. The site has become our best sales tool.",
  },
]

export const faqs = [
  {
    id: 1,
    question: 'What types of businesses do you work with?',
    answer:
      "We work with startups, scale-ups, and established brands across industries — from SaaS and e-commerce to hospitality, fashion, and professional services. If you're serious about growth and care about quality, we're the right fit.",
  },
  {
    id: 2,
    question: 'How long does a typical project take?',
    answer:
      'A full brand identity project typically takes 3–5 weeks. Website builds range from 4–8 weeks depending on scope and complexity. We also offer accelerated timelines for time-sensitive projects — just ask.',
  },
  {
    id: 3,
    question: 'Do you offer ongoing support after launch?',
    answer:
      'Yes. All projects include a 30-day post-launch support window. Beyond that, we offer monthly retainer packages for clients who want continuous design, development, and strategy support.',
  },
  {
    id: 4,
    question: 'What does the subscription plan include?',
    answer:
      'The subscription plan gives you a dedicated design and development team on a monthly basis. This includes unlimited design requests, two active tasks at a time, weekly strategy calls, and full access to our suite of services — from brand to code.',
  },
  {
    id: 5,
    question: 'How do I get started?',
    answer:
      "Hit the 'Get in Touch' button, tell us a bit about your project, and we'll set up a free 30-minute discovery call. From there, we'll scope the work, send you a proposal, and — if it's a fit — kick things off within the week.",
  },
]

export const pricingSubscription = {
  name: 'Subscription',
  price: '$3,999',
  period: '/month',
  features: [
    'Unlimited design requests',
    'Two active tasks at a time',
    'Dedicated design & dev team',
    'Weekly strategy calls',
    'Brand + web + SEO included',
    'Pause or cancel anytime',
    'Priority turnaround',
    '30-day satisfaction guarantee',
  ],
}

export const pricingProject = {
  name: 'Per Project',
  price: 'From $1,299',
  period: '',
  popular: true,
  features: [
    'Fixed scope, fixed price',
    'Dedicated project manager',
    'Brand identity or website',
    'Revisions included',
    'Full ownership of all assets',
    'Delivery in 3–8 weeks',
    '30-day post-launch support',
    'Transparent milestone billing',
  ],
  popularServices: [
    { name: 'Brand Identity', price: '$1,999' },
    { name: 'Website Design & Dev', price: '$4,999' },
    { name: 'SEO Campaign', price: '$2,999' },
    { name: 'Packaging Design', price: '$1,499' },
  ],
}

export const blogPosts = [
  {
    slug: 'why-brand-consistency-drives-revenue',
    title: 'Why Brand Consistency Drives Revenue More Than Any Ad Campaign',
    category: 'Branding',
    date: 'March 12, 2025',
    image: '/images/blog-1.jpg',
    excerpt:
      "Most brands focus on acquisition. The ones that win focus on recognition. Here's why consistency compounds.",
  },
  {
    slug: 'website-performance-conversion',
    title: 'The 200ms Rule: How Site Speed Silently Kills Your Conversion Rate',
    category: 'Development',
    date: 'February 28, 2025',
    image: '/images/blog-2.jpg',
    excerpt:
      'Every 100ms of load time costs you 1% in conversions. We broke down 50 client sites to find the real culprits.',
  },
  {
    slug: 'seo-strategy-2025',
    title: 'SEO in 2025: The Strategies That Actually Move Rankings',
    category: 'Marketing',
    date: 'February 14, 2025',
    image: '/images/blog-3.jpg',
    excerpt:
      "Google's algorithm has changed. Your SEO strategy should too. Here's what's working right now.",
  },
]

export const projects: Project[] = [
  {
    slug: 'x-asvii',
    title: 'X-ASVII',
    description:
      'A bold 3D identity and motion system for an emerging streetwear label — built to dominate digital and physical spaces.',
    liveUrl: 'https://example.com',
    categories: ['3D', 'Motion'],
    cover: '/images/project-x-asvii.jpg',
    gallery: [
      { src: '/images/project-x-asvii.jpg', alt: 'X-ASVII hero', aspect: '16/9' },
      { src: '/images/project-x-asvii-2.jpg', alt: 'X-ASVII detail', aspect: '4/3' },
      { src: '/images/project-x-asvii-3.jpg', alt: 'X-ASVII mobile', aspect: '3/4' },
    ],
  },
  {
    slug: 'viuso-lui',
    title: 'Viuso Lui',
    description:
      'A refined brand identity for a luxury Italian eyewear brand — minimal, editorial, and unmistakably European.',
    liveUrl: 'https://example.com',
    categories: ['Branding'],
    cover: '/images/project-viuso.jpg',
    gallery: [
      { src: '/images/project-viuso.jpg', alt: 'Viuso Lui brand', aspect: '16/9' },
      { src: '/images/project-viuso-2.jpg', alt: 'Viuso Lui packaging', aspect: '4/3' },
    ],
  },
  {
    slug: 'glasso',
    title: 'Glasso',
    description:
      'Motion-first digital experience for a premium glassware company — fluid, tactile, and conversion-optimised.',
    liveUrl: 'https://example.com',
    categories: ['Motion', '3D'],
    cover: '/images/project-glasso.jpg',
    gallery: [
      { src: '/images/project-glasso.jpg', alt: 'Glasso hero', aspect: '16/9' },
      { src: '/images/project-glasso-2.jpg', alt: 'Glasso detail', aspect: '3/4' },
    ],
  },
  {
    slug: 'caligraphyst',
    title: 'Caligraphyst',
    description:
      'A type-driven brand identity for a bespoke calligraphy studio — balancing heritage craft with modern digital presence.',
    liveUrl: 'https://example.com',
    categories: ['Type', 'Branding'],
    cover: '/images/project-cali.jpg',
    gallery: [
      { src: '/images/project-cali.jpg', alt: 'Caligraphyst brand', aspect: '16/9' },
      { src: '/images/project-cali-2.jpg', alt: 'Caligraphyst stationery', aspect: '4/3' },
    ],
  },
  {
    slug: 'int-rio',
    title: 'Int Rio',
    description:
      'Interior architecture branding and digital platform for a high-end residential design firm based in Rio de Janeiro.',
    liveUrl: 'https://example.com',
    categories: ['Interior'],
    cover: '/images/project-intrio.jpg',
    gallery: [
      { src: '/images/project-intrio.jpg', alt: 'Int Rio hero', aspect: '16/9' },
      { src: '/images/project-intrio-2.jpg', alt: 'Int Rio detail', aspect: '4/3' },
    ],
  },
  {
    slug: 'ilustro',
    title: 'Ilustro',
    description:
      'A vibrant illustration-led brand system for a creative agency — bold, characterful, and built to stand out.',
    liveUrl: 'https://example.com',
    categories: ['Illustration', 'Type'],
    cover: '/images/project-ilustro.jpg',
    gallery: [
      { src: '/images/project-ilustro.jpg', alt: 'Ilustro brand', aspect: '16/9' },
      { src: '/images/project-ilustro-2.jpg', alt: 'Ilustro detail', aspect: '4/3' },
    ],
  },
]
