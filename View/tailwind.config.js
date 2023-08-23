/** @type {import('tailwindcss').Config} */
// const plugin = require('tailwindcss/plugin');

const { url } = require('inspector');

module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // screens: {
    // 'sm': '640px',
    // 'md': '768px',
    // 'lg': '1024px',
    // 'xl': '1280px',
    // '2xl': '1536px',
    // '3xl': '1792px',
    // '4xl': '2048px',
    // '5xl': '2304px',
    // '6xl': '2560px',
    // '7xl': '2700px',
    // },
    extend: {
      aspectRatio: {
        '3': '3',
      },
      backgroundImage: {
        'glass': "url('/glassback.png')",
        'body-background': "url('/background.jpeg')",
        'girl': "url('/girl.png')",
        'OneVsOne': "url('/OneVsOne.png')",
        'OneVsBot': "url('/OneVsBot.png')",
        'Spactate': "url('/Spactate.png')"
      },
      // fontFamily: {
      //   'glitch' : ['"Glitch Inside"'],
      //   'heading': ['"Heading Pro Trial"'],
      //   'manrope': ["Manrope"],
      //   'bomb': ['"The Bomb Sound"'],
      // },
      colors: {
        "primary-purple-100": "#411742",
        "primary-purple-200": "#450746",
        "primary-purple-300": "#4F2150",
        "primary-purple-400": "#532051",
        "primary-purple-500": "#642258",
        "primary-purple-600": "#673E6A",
        "primary-purple-700": "#6E4778",
        "primary-purple-800": "#734475",

        "primary-pink-100": "#670647",
        "primary-pink-200": "#A1216C",
        "primary-pink-300": "#FF1382",
        "primary-pink-400": "#EBA3EA",

        "primary-dark-100": "#1C0D16",
        "primary-dark-200": "#1B071C",
        "primary-dark-300": "#2D0130",
        "primary-dark-400": "#321B38",
        "primary-dark-500": "#472B4E",
        "primary-dark-600": "#4A3A61",

        "primary-white-100": "#FFFFFF",
        "primary-white-200": "#837F7F",
        "primary-white-300": "#EAEAEA"
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("daisyui"),
    require('tailwindcss-animated'),
  ],
  
}
