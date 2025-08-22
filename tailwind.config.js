 /** @type {import('tailwindcss').Config} */
export default {
   content: ["./dist/*.{html,js}"],
   theme: {
      extend: {
      fontFamily: {
        orbitron: ["'Orbitron'", "sans-serif"],
        inter: ["'Inter'", "sans-serif"],
         sharemono: ["'Share Tech Mono'", "monospace"],
          poppins: ["Poppins", "sans-serif"],
      },
    },
   },
   plugins: [],
 }