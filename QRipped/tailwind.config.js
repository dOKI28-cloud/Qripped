/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      keyframes: {
        energy: {
          '0%, 100%': { height: '20%' },
          '50%': { height: '100%' },
        },
      },
      animation: {
        energy: 'energy 1s infinite',
      },
    },
  },
}