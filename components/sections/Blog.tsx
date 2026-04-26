'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealText from '@/components/ui/RevealText'
import { EASE_OUT_EXPO } from '@/lib/utils'
import type { BlogPost } from '@/lib/content'

export default function Blog({ posts }: { posts: BlogPost[] }) {
  return (
    <section id="blog" className="py-24 md:py-40 px-6 md:px-10">
      <div className="max-w-container mx-auto">
        <div className="flex items-start justify-between mb-6">
          <SectionLabel label="08 Blog" />
          <Link href="/blog" className="text-sm font-medium text-muted hover:text-ink transition-colors flex items-center gap-1">
            All Blogs <ArrowRight size={14} />
          </Link>
        </div>
        <RevealText text="Stories, strategies, and creative perspectives from the team." className="font-semibold tracking-tight leading-[1.05] mb-12" style={{ fontSize: 'clamp(26px, 6vw, 88px)' }} as="h2" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article key={post.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, ease: EASE_OUT_EXPO as never, delay: i * 0.1 }} className="group">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-[4/3] rounded-card overflow-hidden bg-ink/5 mb-4">
                  <Image src={post.image} alt={post.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.05] transition-all duration-700 ease-out" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-medium text-muted">{post.category}</span>
                  <span className="text-xs text-muted/50">·</span>
                  <span className="text-xs text-muted">{post.date}</span>
                </div>
                <h3 className="font-semibold text-ink text-lg leading-snug group-hover:opacity-70 transition-opacity">{post.title}</h3>
                <p className="text-muted text-sm mt-2 leading-relaxed">{post.excerpt}</p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
