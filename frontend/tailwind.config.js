<<<<<<< HEAD
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
=======
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {backdropBlur: {
        xs: '2px',
        sm: '4px',
      },},
  },
  plugins: [require('@tailwindcss/forms'),
    require('tailwindcss-filters'),
],
}
>>>>>>> organizer
