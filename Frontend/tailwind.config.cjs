/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderWidth: {
        '10xl': '10px',
      },
      borderRadius: {
        '20xl': '20px',
      },
      width: {
        mc: 'max-content',
      },
      margin: {
        '5xl': '5px',
        '6xl': '6px',
        '7xl': '7px',
        '10xl': '10px',
        '31xl': '31px',
        '30xl': '30px',
        '29xl': '29px',
        '28xl': '28px',
      },
      padding: {
        19: '5rem',
        18: '74px',
        '1pt': '17.01px',
      },
      colors: {
        lsb: '#B0C4DE',
      },
      gridColumn: {
        '1/2': '1/2',
        '2/2': '2/2',
        '1': '1',
        '2': '2',
      },
      gridRow: {
        '1/2': '1/2',
        '2/2': '2/2',
        '1': '1',
        '2': '2',
      },
    },
  },
  plugins: ['prettier-plugin-tailwindcss'],
};
