// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/flowbite-react/**/*.js',
    "./node_modules/flowbite/**/*.js", // Include Flowbite in content
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class', // Use 'class' strategy instead of 'media'
  plugins: [
    // require('flowbite/plugin')({
    //   charts : true,
    // }),
    require('flowbite/plugin'),
    
  ],
};
