/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        sidenav: '#12344d',
        sidenavIcons: '#9fadb7',
        sidenavMain: '#e44a19'
      },
      fontSize: {
        global: '12px'
      },
      fontFamily: {
        global: 'Inter, Sans-serif'
      },
      width: {
        listingTable: '110%'
      }
    },
  },
  plugins: [],
}

