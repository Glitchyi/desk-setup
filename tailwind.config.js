/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0a0a09',
          surface: '#111110',
          raised: '#181817',
          border: '#252522',
          border2: '#333330',
        },
        text: {
          primary: '#e8e4d9',
          secondary: '#8a8780',
          muted: '#555450',
        },
        accent: {
          amber: '#c8a96e',
          teal: '#7fb5b0',
          red: '#bf616a',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        mono: ['DM Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
