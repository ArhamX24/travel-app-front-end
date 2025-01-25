/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins' : ['Poppins', 'sans-serif']
      },
      backgroundColor : {
        "white-bg": "#fafafa",
        "primary" : "#ff6525",
        "overlay" : "#0000004d"
      },
      textColor: {
        "primary" : "#ff6525",
        "icon" : "#71717a"
      },
      borderColor: {
        "primary" : "#ff6525",
      },
      height: {
        "60vh" : "60vh",
        "40vh": "40vh",
        "80vh" : "80vh",
        "50vh" : "45vh",
        "90vh" : "90vh"
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}