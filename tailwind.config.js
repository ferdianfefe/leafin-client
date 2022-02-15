module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F8734',
        'gray-primary': '#8D8D8D',
        'gray-light': '#B8B8B8',
        'gray-light2': '#C4C4C4',
      },
      fontFamily: {
        main: 'Open Sans,  ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial,Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji,Segoe UI Symbol, Noto Color Emoji',
        prompt: 'Prompt, sans-serif',
      },
    },
  },
  plugins: [],
};
