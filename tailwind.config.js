/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/Components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-react/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        // Los breakpoints de Tailwind saltan de 1280 a 1536: `wide` es el corte
        // propio para monitores de 1440, donde el diseño necesita más aire.
        wide: '1440px',
      },
      colors: {
        // Los colores de la marca. `tinta` es texto, botones y logo;
        // `crema` es el fondo de página.
        crema: '#FBF7F3',
        tinta: '#301E11',
        // Único gris del diseño: el borde de los campos.
        borde: '#B7B0AB',
        // El fondo de la cajita del aviso, en la pantalla de la carta.
        arena: '#ECE4DC',
      },
      fontFamily: {
        // Solo para el titular. Ver el @font-face en globals.css: hay un único
        // corte, medium italic.
        ivy: ['IvyBodoni', 'Georgia', 'serif'],
      },
    },
    fontFamily: {
      // Gotham para todo lo que no sea el titular. Ver el @font-face en
      // globals.css: un solo corte, Book, cubriendo 300-500.
      sans: [
        'Gotham',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
      ],
    },
  },
  plugins: [require('flowbite/plugin')],
}
