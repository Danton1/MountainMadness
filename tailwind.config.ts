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
      scale: {
        '102': '1.02',
      },
      colors: {
        'base-color': 'rgb(var(--base-color))',
        'base-color-dark': 'rgb(var(--base-color-dark))',
        'base-color-shadow': 'rgb(var(--base-color-shadow))',
      },
    },
  },
} satisfies Config

export default config
