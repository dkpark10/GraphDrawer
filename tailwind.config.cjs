import { MAIN_COLOR } from './src/constants';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        'main-color': MAIN_COLOR,
      },
    },
  },
  plugins: [],
};
