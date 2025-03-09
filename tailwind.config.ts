import type { Config } from 'tailwindcss'

const config = {
  theme: {
    extend: {
      keyframes: {
        floatAndFade: {
          '0%': {
            transform: 'translateY(0) translateX(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(-50px) translateX(var(--random-x))',
            opacity: '0',
          },
        },
      },
      animation: {
        floatAndFade: 'floatAndFade 1.5s ease-out forwards',
      },
    },
  },
} satisfies Config

export default config
