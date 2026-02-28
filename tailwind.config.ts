import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ── Couleurs Primaires Al-Mizan ─────────────────── */
        navy: {
          50:  '#E8EBF0',
          100: '#C5CCD8',
          200: '#9EABBE',
          300: '#7789A4',
          400: '#596F91',
          500: '#3B567E',
          600: '#2E4468',
          700: '#1E3352',
          800: '#14253F',
          900: '#0F1B2D',    /* Navy Sovereign */
          950: '#080F1A',
        },
        royal: {
          50:  '#EBF0F7',
          100: '#CDDAEC',
          200: '#ABC1DF',
          300: '#89A8D2',
          400: '#6F95C8',
          500: '#5682BE',
          600: '#4A71A8',
          700: '#3A5D8E',
          800: '#2E4A72',
          900: '#1E3A5F',    /* Blue Royal */
          950: '#122644',
        },
        gold: {
          50:  '#FBF6EC',
          100: '#F5E8CE',
          200: '#EDD9AD',
          300: '#E5C98B',
          400: '#DFBB71',
          500: '#D4A84B',    /* Or Al-Mizan */
          600: '#C4962C',
          700: '#A57C22',
          800: '#86631B',
          900: '#6B4F15',
          950: '#4A3610',
        },
        bronze: {
          50:  '#F5F0E6',
          100: '#E8DCC4',
          200: '#D9C59E',
          300: '#CAAE78',
          400: '#BF9C5B',
          500: '#B48B3E',
          600: '#9A7633',
          700: '#7D6028',
          800: '#614B1E',
          900: '#4A3816',    /* Bronze Justice */
          950: '#2E2310',
        },
        /* ── Couleurs Neutres ────────────────────────────── */
        ivory:     '#FAF8F0',
        offwhite:  '#F5F3ED',
        /* ── Couleurs Sémantiques ────────────────────────── */
        success:   { DEFAULT: '#2D6A4F', light: '#D4EDDA' },
        danger:    { DEFAULT: '#C03744', light: '#F8D7DA' },
        warning:   { DEFAULT: '#D4A84B', light: '#FFF3CD' },
        info:      { DEFAULT: '#1E3A5F', light: '#D1ECF1' },
      },
      fontFamily: {
        sans:   ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['IBM Plex Sans Arabic', 'Tahoma', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-navy': 'linear-gradient(135deg, #0F1B2D 0%, #1E3A5F 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C4962C 0%, #D4A84B 50%, #E5C98B 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0F1B2D 0%, #1E3A5F 50%, #14253F 100%)',
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(212, 168, 75, 0.39)',
        'navy': '0 4px 14px 0 rgba(15, 27, 45, 0.25)',
        'card': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 40px -15px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

export default config;
