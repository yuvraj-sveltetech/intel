/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'border': 'hsl(var(--border))',
        'cyber-blue': '#00D9FF',
        'cyber-green': '#00FF88',
        'cyber-purple': '#8A2BE2',
        'cyber-bg': '#0A0A0F',
        'cyber-surface': '#1A1A24',
        'cyber-text': '#E8E8FF',
        'cyber-muted': '#6B7280',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'orbitron': ['Orbitron', 'sans-serif'],
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #00D9FF 0%, #8A2BE2 100%)',
        'cyber-grid': 'radial-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '20px 20px',
      },
      boxShadow: {
        'cyber-glow': '0 0 20px rgba(0, 217, 255, 0.3)',
        'cyber-purple-glow': '0 0 20px rgba(138, 43, 226, 0.3)',
        'cyber-green-glow': '0 0 20px rgba(0, 255, 136, 0.3)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
        'matrix-rain': 'matrix-rain 10s linear infinite',
        'slide-in': 'slide-in-cyber 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 217, 255, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.8)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        'slide-in-cyber': {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}