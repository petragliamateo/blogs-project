/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        dark: {
          0: '#4C0033',
          1: '#790252',
          2: '#AF0171',
          3: '#E80F88',
        }
      }
    },
  },
  plugins: [],
}
