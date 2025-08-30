/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',
      'min-w-s-1200': '1200px',
      'min-w-s-1390': '1390px',
      'min-w-s-1030': '1030px',
      'min-w-s-640': '640px',
      'min-w-s-900': '900px',
      'min-w-s-520': '520px',

      'max-w-s-1535': { max: '1535px' },
      'max-w-s-1200': { max: '1200px' },
      'max-w-s-1030': { max: '1030px' },
      'max-w-s-960': { max: '960px' },
      'max-w-s-900': { max: '900px' },
      'max-w-s-840': { max: '840px' },
      'max-w-s-740': { max: '740px' },
      'max-w-s-640': { max: '640px' },
      'max-w-s-570': { max: '570px' },
      'max-w-s-520': { max: '520px' },
      'max-w-s-420': { max: '420px' },
      // => @media (max-width: 1535px) { ... }

      'min-w-768-max-w-s-1023': { min: '768px', max: '1023px' },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'min-h-800': { raw: '(min-height: 800px)' }
      // => @media (min-height: 800px) { ... }
    },
    extend: {
      colors: {
        baseText: '#601903',
        baseDark: '#000F21',
        baseTextWhite: '#ffffff',
        baseTextGray: 'rgb(209 213 219)',

        baseTxtLight: '#FFFFFF',
        baseTxtDark: '#111827',
        baseBgLight: '#F1F5F9',
        baseBgDark: '#1A222C',
        light: '#FFFFFF',
        dark: '#24303F',

        secondary: {
          200: '#601903'
        },
        primary: {
          50: '#fbe3de',
          100: '#f6c4ba',
          200: '#e24222',
          300: '#cb3b1f',
          400: '#b5351b',
          500: '#aa321a',
          600: '#882814',
          700: '#661e0f',
          800: '#4f170c',
          900: '#330C00'
        },
        accent: '#F13024'
      },
      boxShadow: {
        '3xl': '0 10px 40px -15px rgba(0, 0, 0, 0.1)',
        '4xl': '0 10px 40px -15px rgba(0, 0, 0, 0.2)'
      },
      backgroundImage: {
        // login: 'url("/background/login-bg.jpg")',
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite'
      }
    },
    fontFamily: {
      poppins: ['Poppins'],
      damion: ['Damion'],
      dancingScript: ['Dancing Script']
    }
  },
  plugins: [require('flowbite/plugin')]
}
