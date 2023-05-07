/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      kosugi: ['Kosugi', 'sans-serif'],
      noto: ['Noto Sans JP', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
      merriweather: ['Merriweather', 'serif'],
    },
    extend: {
      // https://getcssscan.com/css-box-shadow-examples
      boxShadow: {
        bebop: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      },
      // https://uicolors.app/create
      // https://tailwind.ink/code
      // https://tailwindcss.com/docs/theme#colors
      colors: {
        blue: {
          50: '#f3f8fc',
          100: '#e5f0f9',
          200: '#c5e0f2',
          300: '#93c8e6',
          400: '#59abd7',
          500: '#3391c4',
          600: '#277fb5',
          700: '#1e5d86',
          800: '#1d506f',
          900: '#1d435d',
          950: '#132b3e',
        },
        red: {
          50: '#fdf3f3',
          100: '#fbe5e5',
          200: '#f9cfcf',
          300: '#f4adad',
          400: '#eb7e7e',
          500: '#de5555',
          600: '#bd3232',
          700: '#aa2b2b',
          800: '#8d2727',
          900: '#752727',
          950: '#3f1010',
        },
        green: {
          50: '#effaf4',
          100: '#d8f3e2',
          200: '#b4e6c9',
          300: '#82d3aa',
          400: '#4fb886',
          500: '#288d60',
          600: '#1d7e55',
          700: '#186446',
          800: '#155038',
          900: '#124230',
          950: '#09251b',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
