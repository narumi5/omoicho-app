/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF9999',
          dark: '#FF8888',
          light: '#FFAAAA',
          pale: '#FFCCCC',
          softest: '#FFE6E6',
        },
        surface: {
          DEFAULT: '#F5F5F5',
          pink: '#FFF5F7',
          'pink-light': '#FFFBFC',
        },
        accent: {
          pink: '#FFE4E1',
          'pink-soft': '#FF80AB',
        },
      },
      backgroundImage: {
        'gradient-pink': 'linear-gradient(to bottom right, #FFF5F7, #FFFFFF, #FFE4E1)',
        'gradient-primary': 'linear-gradient(to right, #FF9999, #FFAAAA, #FF9999)',
        'gradient-icon': 'linear-gradient(to bottom right, #FF9999, #FFAAAA)',
      },
    },
  },
  plugins: [],
}
