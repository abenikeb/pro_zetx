module.exports = {
  theme: {
    extend: {
      screens: {
        'xsm': { 'raw': '(max-height: 670px, min-width: 640px)'},
      }
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#2a9d8f',
          'primary-focus': '#264653',
          'primary-content': '#ffffff',
          secondary: '#F2B200',
          'secondary-focus': '#c28e00',
          'secondary-content': '#ffffff',
          accent: '#009169',
          'accent-focus': '#005542',
          'accent-content': '#ffffff',
        },
      },
    ],
  },
}
