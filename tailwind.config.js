/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'],
  content: ['./components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}'],
  plugins: [require('tailwindcss-animate')],
  corePlugins: {
    preflight: false,
  },
};
