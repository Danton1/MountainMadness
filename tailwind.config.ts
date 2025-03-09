import type { Config } from 'tailwindcss'

const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        floatAndFade: {
          '0%': {
            transform: 'translateY(0) translateX(-50%)',
            opacity: '1',
          },
          '100%': {
            transform:
              'translateY(-100px) translateX(calc(-50% + var(--random-x)))',
            opacity: '0',
          },
        },
      },
      animation: {
        floatAndFade: 'floatAndFade 1.5s ease-out forwards',
      },
      scale: {
        '102': '1.02',
      },
      boxShadow: {
        button: '1px 1px 4px rgba(0, 0, 0, 1)',
      },
    },
  },
} satisfies Config

export default config
