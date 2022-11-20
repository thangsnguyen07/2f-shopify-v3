/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{js,jsx,ts,tsx}', './index.html'],
  safelist: ['rdg-row-even'],

  theme: {
    extend: {
      colors: {
        rose: colors.rose,
      },
      inset: {
        '528px': '528px',
      },
      width: {
        100: '400px',
        '2/15': '13.3%',
      },
    },
    screen: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/aspect-ratio'),
  ],
}
