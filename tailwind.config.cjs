/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#14171A',
      blue: '#1DA1F2',
      white: '#fff',
      gray: {
        dark: '#657786',
        light: '#AAB8C2',
        ExtraLight: '#E1E8ED',
        ExtraExtraLight: '#F5F8FA',
      },
    },
    extend: {},
  },
  plugins: [],
};
