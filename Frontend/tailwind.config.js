/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        softBlue: '#E3F2FD',
        mintGreen: '#E6F7F1',
        paleLavender: '#F3E5F5',
        lightPeach: '#FFF3E0',
        lightGray: '#F5F5F5',
        creamyWhite: '#FFFDE7',
        softPink: '#FDEEF2',
      },
    },
  },
  plugins: [],
}

