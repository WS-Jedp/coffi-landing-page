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
        // La rampa iba de 50 a 400 y luego saltaba al DEFAULT: toda la escala
        // vivía por ENCIMA del morado de marca y no había nada por debajo. El
        // 900 es ese extremo que faltaba — conserva el tono exacto de la marca
        // (246°) y baja luminosidad soltando algo de saturación, que es lo que
        // evita que un morado oscuro vire a berenjena.
        //
        // Sólo lo usa la sombra del botón del footer: un morado de la familia
        // proyecta mejor sobre morado que un negro, que ahí se ve sucio.
        'coffi-purple': {
          DEFAULT: "#533FFF",
          '50': "#E9E9FF",
          '100': "#E1E1FF",
          '200': "#BBBBFF",
          '300': "#9494FF",
          '400': "#6D66FF",
          '900': "#1B1458",
        },
      },
      fontFamily: {
        sf: ['var(--font-sf-pro)', 'SF Pro', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-left': 'float-left 6s ease-in-out infinite',
        'float-center': 'float-center 5s ease-in-out infinite',
        'float-right': 'float-right 7s ease-in-out infinite',
        'subtle-pulse': 'subtle-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        'float-left': {
          '0%, 100%': { transform: 'translateY(0) rotate(-6deg)' },
          '50%': { transform: 'translateY(-8px) rotate(-5deg)' },
        },
        'float-center': {
          '0%, 100%': { transform: 'translateY(4px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'float-right': {
          '0%, 100%': { transform: 'translateY(0) rotate(6deg)' },
          '50%': { transform: 'translateY(-8px) rotate(5deg)' },
        },
        'subtle-pulse': {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '0.1' },
        },
      },
    },
  },
  plugins: [],
}

