import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        primary: { DEFAULT: '#16a34a', foreground: '#ffffff' },
        secondary: { DEFAULT: '#f97316', foreground: '#ffffff' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: { xl: '0.75rem', '2xl': '1.25rem', '3xl': '1.75rem' },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-manrope)', 'Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 60px -24px rgba(22, 163, 74, 0.25)',
        lift: '0 18px 40px -20px rgba(25, 28, 29, 0.18)',
      },
      backgroundImage: {
        grain: 'radial-gradient(circle at 1px 1px, rgba(22,163,74,0.08) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};

export default config;