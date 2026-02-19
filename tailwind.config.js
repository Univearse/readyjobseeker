/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          aqua: '#36D0D8',
          orange: '#EF522E',
          yellow: '#FDD140',
          black: '#021126',
        },
        primary: {
          50: '#E6F9FA',
          100: '#CCF3F5',
          200: '#99E7EB',
          300: '#66DBE1',
          400: '#33CFD7',
          500: '#36D0D8',
          600: '#2BA6AD',
          700: '#207D82',
          800: '#165356',
          900: '#0B2A2B',
        },
        secondary: {
          50: '#FEF2EE',
          100: '#FDE5DD',
          200: '#FBCBBB',
          300: '#F9B199',
          400: '#F79777',
          500: '#EF522E',
          600: '#BF4225',
          700: '#8F311C',
          800: '#602113',
          900: '#301009',
        },
        accent: {
          50: '#FFFAEC',
          100: '#FEF5D9',
          200: '#FDEBB3',
          300: '#FCE18D',
          400: '#FBD767',
          500: '#FDD140',
          600: '#CAA733',
          700: '#987D26',
          800: '#65541A',
          900: '#332A0D',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat-alternates)', 'system-ui', 'sans-serif'], // Montserrat Alternates for body text and UI elements
        display: ['Monument Extended', 'var(--font-montserrat-alternates)', 'system-ui', 'sans-serif'], // Monument Extended for headers with fallback
      },
    },
  },
  plugins: [],
};
