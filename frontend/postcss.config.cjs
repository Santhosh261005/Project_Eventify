const tailwindcss = require('tailwindcss'); // ✅ Correct

const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
