// tailwind.config.js
module.exports = {
  purge: [
    './resources/**/*.blade.php',
    './resources/**/*.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}