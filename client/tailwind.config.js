/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // https://github.com/tailwindlabs/tailwindcss/issues/6602#issuecomment-1023595588
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
