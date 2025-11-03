/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-purple': '#9d4edd',
        'cyber-orange': '#ff6b35',
        'cyber-blue': '#4cc9f0',
        'dark-bg': '#0a0a0f',
        'glass': 'rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glitch': 'glitch 0.3s infinite',
        'scan': 'scan 2s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #9d4edd, 0 0 10px #9d4edd, 0 0 15px #9d4edd' },
          '100%': { boxShadow: '0 0 10px #9d4edd, 0 0 20px #9d4edd, 0 0 30px #9d4edd' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}



