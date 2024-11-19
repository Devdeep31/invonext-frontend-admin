/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';

export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/flowbite/**/*.js", // Include Flowbite in content
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    flowbitePlugin,
  ],
};
