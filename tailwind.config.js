/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'coffi-black': '#312F3D',
        'coffi-white': '#EFEFF9',
        'coffi-blue': {
          DEFAULT: '#6E91FF',
          '50': '#E9EFFF',
          '100': '#E1EAFF',
          '200': '#D9E4FF',
          '300': '#C2D3FF',
          '400': '#94B3FF',
        },
        'coffi-purple': {
          DEFAULT: "#533FFF",
          '50': "#E9E9FF",
          '100': "#E1E1FF",
          '200': "#BBBBFF",
          '300': "#9494FF",
          '400': "#6D66FF",
        },
      },
      fontFamily: {
        sf: [
          '"SF Pro"',
        ],
      },
    },
  },
  plugins: [],
}

