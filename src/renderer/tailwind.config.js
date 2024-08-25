const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', '../../@/**/*.tsx'],
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: 'Satoshi, sans-serif'
      },
      colors: {
        backgroundgrey: {
          500: '#F8F5F1'
        },
        blackfont: {
          500: '#333333'
        },
        grey: {
          50: '#FEFEFE',
          100: '#FDFCFB',
          200: '#FCFAF9',
          300: '#FAF8F6',
          400: '#F9F7F4',
          500: '#F8F5F1',
          600: '#E2DFDB',
          700: '#B0AEAB',
          800: '#888785',
          900: '#686765'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },

      keyframes: {
        slideIn: {
          from: { width: 0 },
          to: { width: 'var(--radix-collapsible-content-width)' }
        },

        slideOut: {
          from: { width: 'var(--radix-collapsible-content-width)' },
          to: { width: 0 }
        },

        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },

      animation: {
        slideIn: 'slideIn 0.25s',
        slideOut: 'slideOut 0.25s',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  borderRadius: {
    lg: 'var(--radius)',
    md: 'calc(var(--radius) - 2px)',
    sm: 'calc(var(--radius) - 4px)'
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'),
    require('tailwindcss-animate'),
    plugin(({ addUtilities }) => {
      addUtilities({
        '.region-drag': {
          '-webkit-app-region': 'drag'
        },

        '.region-no-drag': {
          '-webkit-app-region': 'no-drag'
        }
      })
    })
  ]
}
