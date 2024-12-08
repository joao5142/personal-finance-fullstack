import animate from 'tailwindcss-animate'
import { colors as themeColors } from './src/theme'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],

  content: [
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}',
  ],
  safelist: [
    {
      pattern: /bg-app-([\w-]+)/,
      variants: ['before'],
    },
  ],
  theme: {
    extend: {
      backgroundImage: {
        auth: "url('@/assets/images/illustration-authentication.svg')",
      },

      colors: {
        app: {
          ...themeColors,
        },
      },

      maxWidth: {
        auth: '560px',
        container: '1500px',
        'expanded-sidebar': '300px',
        'collapsed-sidebar': '88px',
        'sidebar-mobile-height': '72px',
      },

      padding: {
        'app-500': 'var(--spacing-500)', // 40px
        'app-400': 'var(--spacing-400)', // 32px
        'app-300': 'var(--spacing-300)', // 24px
        'app-250': 'var(--spacing-250)', // 20px
        'app-200': 'var(--spacing-200)', // 16px
        'app-150': 'var(--spacing-150)', // 12px
        'app-100': 'var(--spacing-100)', // 8px
        'app-50': 'var(--spacing-50)', // 4px
      },

      margin: {
        'app-500': 'var(--spacing-500)', // 40px
        'app-400': 'var(--spacing-400)', // 32px
        'app-300': 'var(--spacing-300)', // 24px
        'app-250': 'var(--spacing-250)', // 20px
        'app-200': 'var(--spacing-200)', // 16px
        'app-150': 'var(--spacing-150)', // 12px
        'app-100': 'var(--spacing-100)', // 8px
        'app-50': 'var(--spacing-50)', // 4px
      },

      gap: {
        'app-500': 'var(--spacing-500)', // 40px
        'app-400': 'var(--spacing-400)', // 32px
        'app-300': 'var(--spacing-300)', // 24px
        'app-250': 'var(--spacing-250)', // 20px
        'app-200': 'var(--spacing-200)', // 16px
        'app-150': 'var(--spacing-150)', // 12px
        'app-100': 'var(--spacing-100)', // 8px
        'app-50': 'var(--spacing-50)', // 4px
      },

      borderRadius: {
        'app-small': 'var(--border-radius-small)',
        'app-medium': 'var(--border-radius-medium)',
        'app-large': 'var(--border-radius-large)',
        'app-full': 'var(--border-radius-full)',
      },

      fontFamily: {
        app: ['var(--font-family)', 'sans-serif'],
      },

      fontSize: {
        'app-preset-1': 'var(--font-size-preset-1)',
        'app-preset-2': 'var(--font-size-preset-2)',
        'app-preset-3': 'var(--font-size-preset-3)',
        'app-preset-4': 'var(--font-size-preset-4)',
        'app-preset-5': 'var(--font-size-preset-5)',
      },

      lineHeight: {
        'app-120': 'var(--line-height-120)',
        'app-150': 'var(--line-height-150)',
      },

      letterSpacing: {
        'app-0': 'var(--letter-spacing-0)',
      },

      fontWeight: {
        'app-bold': 'var(--font-weight-bold)',
        'app-regular': 'var(--font-weight-regular)',
      },
    },
  },

  plugins: [animate],
}
