/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        bigShoulder:["Big Shoulders Text", "serif"],
        stix:["STIX Two Text", "serif"]
      },
      backgroundImage:{
        'navbar':"url('/navbar.jpg')",
        'login':"url('/login.jpg')",
        'main':"url('/main.jpg')",
        'about':"url('/about.jpg')",
        'grass':"url('/grass.jpg')",
        'store':"url('/store.jpg')"
      },
    },
  },
  plugins: [],
}