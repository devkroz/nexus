/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0 0% 0%)',
        foreground: 'hsl(0 0% 95%)',
        card: 'hsl(0 0% 6%)',
        'card-foreground': 'hsl(0 0% 95%)',
        popover: 'hsl(0 0% 4%)',
        'popover-foreground': 'hsl(0 0% 95%)',
        primary: 'hsl(265 89% 60%)',
        'primary-foreground': 'hsl(0 0% 95%)',
        secondary: 'hsl(0 0% 12%)',
        'secondary-foreground': 'hsl(0 0% 95%)',
        muted: 'hsl(0 0% 12%)',
        'muted-foreground': 'hsl(0 0% 60%)',
        accent: 'hsl(265 89% 60%)',
        'accent-foreground': 'hsl(0 0% 95%)',
        destructive: 'hsl(0 72% 51%)',
        'destructive-foreground': 'hsl(0 0% 95%)',
        border: 'hsl(0 0% 14%)',
        input: 'hsl(0 0% 14%)',
        ring: 'hsl(265 89% 60%)',
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.25rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.8)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        shimmer: 'shimmer 2s linear infinite',
        float: 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
