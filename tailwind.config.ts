import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F4F4F4',
        ink: '#0E0E0E',
        black: '#000000',
        white: '#FFFFFF',
        muted: 'rgba(14,14,14,0.6)',
        subtle: 'rgba(14,14,14,0.05)',
        card: '#FFFFFF',
        darkCard: '#0E0E0E',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '24px',
        pill: '999px',
        xl2: '32px',
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
}
export default config
