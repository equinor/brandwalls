/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import typography from '@tailwindcss/typography'
import colors from './colorConfig'

const round = (num: number) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rem = (px: number) => `${round(px / 16)}rem`
const em = (px: number, base: number) => `${round(px / base)}em`

export default {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './sanity/**/*.{ts,tsx}',
    './icons/**/*.{ts,tsx}',
  ],
  /*
  Now instead of dark:{class} classes being applied based on prefers-color-scheme, 
  they will be applied whenever the dark class is present earlier in the HTML tree.
  inverted -> dark
  NB: TwMerge configuration must be extended to properly merge custom theme utilities. 
  Less pain to use Tailwind eqvivalent. 
  */
  darkMode: 'selector',
  theme: {
    extend: {
      screens: {
        lg: '3400px',
        xl: '5500px',
        '2xl': '6500px',
        '3xl': '8000px',
      },
      fontFamily: {
        sans: ['Equinor', 'Open Sans', 'sans-serif'],
      },
      colors: {
        current: 'currentColor',
        'moss-green': {
          110: '#023f44', // colorpicked from moss-green-100 with dark overlay from Figma
          100: 'hsl(184, 100%, 17%)',
          95: 'hsl(184, 100%, 24%)',
          90: 'hsl(184, 31%, 58%)',
          80: 'hsl(184, 31%, 74%)',
          70: 'hsl(184, 30%, 84%)',
          60: 'hsl(184, 31%, 89%)',
          50: colors['moss-green'][50],
        },
        'energy-red': {
          100: colors['energy-red'][100],
          90: 'hsl(348, 100%, 67%)',
          80: 'hsl(347, 100%, 77%)',
          70: 'hsl(347, 100%, 86%)',
          60: 'hsl(349, 100%, 91%)',
          50: 'hsl(347, 100%, 96%)',
        },
        black: {
          100: 'hsl(0, 0%, 0%)',
          80: 'hsl(0, 0%, 20%)',
        },
        white: {
          100: colors.white[100],
        },
        'slate-blue': {
          //--bg-slate-blue
          100: 'hsl(206, 34%, 14%)',
          //--bg-slate-blue-95
          95: 'hsl(206, 32%, 21%)',
          90: 'hsl(207, 14%, 37%)',
          80: 'hsl(207, 8%, 53%)',
          70: 'hsl(206, 9%, 68%)',
          60: 'hsl(206, 9%, 84%)',
          50: 'hsl(210, 8%, 90%)',
        },
        'mist-blue': {
          100: colors['mist-blue'][100],
          60: 'hsl(200, 56%, 94%)',
        },
        'lichen-green': {
          100: 'hsl(138, 67%, 94%)',
        },
        'spruce-wood': {
          100: 'hsl(25, 100%, 92%)',
          90: colors['spruce-wood'][90],
          70: 'hsl(26, 100%, 97%)',
        },
        'heritage-red': {
          100: 'hsl(343, 100%, 25%)',
          90: 'hsl(343, 42%, 43%)',
          80: 'hsl(344, 32%, 62%)',
          70: 'hsl(344, 32%, 77%)',
          60: 'hsl(340, 32%, 91%)',
        },
        'clear-red': {
          100: 'hsl(0, 100%, 46%)',
          90: 'hsl(0, 85%, 68%)',
          80: 'hsl(0, 85%, 78%)',
          70: 'hsl(0, 86%, 86%)',
          60: 'hsl(0, 88%, 94%)',
        },
        slate: {
          //--default-text
          80: 'rgba(61, 61, 61, 1)',
        },
        green: {
          100: 'hsl(118, 44%, 35%)',
          90: 'hsl(118, 44%, 50%)',
          //--mid-green
          //--bg-moss-green
          //--bg-mid-green
          50: colors.green[50],
        },
        //midnight-sun
        yellow: {
          60: '#FDE88C',
          //--mid-yellow
          //--bg-mid-yellow
          50: colors.yellow[50],
        },
        blue: {
          //--mid-blue
          //--bg-mid-blue
          //north-sea-70
          50: colors.blue[50],
        },
        orange: {
          100: 'hsl(34, 100%, 34%)',
          90: 'hsl(34, 100%, 50%)',
          //--mid-orange
          //--bg-mid-orange
          50: colors.orange[50],
        },
        grey: {
          100: 'hsl(0, 0%, 9%)',
          90: 'hsl(0, 0%, 24%)',
          80: 'hsl(0, 0%, 34%)',
          70: 'hsl(0, 0%, 40%)',
          60: 'hsl(0, 0%, 44%)',
          50: 'hsl(0, 0%, 55%)',
          40: 'hsl(0, 0%, 75%)',
          30: 'hsl(0, 0%, 86%)',
          20: 'hsl(0, 0%, 92%)',
          10: 'hsl(0, 0%, 97%)',
        },
        'transparent-black': {
          20: 'theme(colors.black.100)/20',
        },
        'transparent-white': {
          20: 'theme(colors.white.100)/20',
          10: 'theme(colors.white.100)/10',
        },
        'north-sea': {
          100: '#243746',
          90: '#051b33',
          80: '#2A4D74',
          70: '#49709C',
          60: '#7294BB',
          50: '#A8C3DB',
          40: '#DFF5FF',
        },
        'norwegian-woods': {
          100: '#007079',
          90: '#458C83',
          80: '#85B7A5',
          70: '#AAD5BB',
          60: '#C3E4CE',
          50: '#D6F0DE',
          40: '#E6FAEC',
        },
        'sand-and-summer': {
          100: '#7D0023',
          90: '#DF6D62',
          80: '#E9947C',
          70: '#EEA990',
          60: '#F8D1AF',
          50: '#FFE7D6',
        },
        'autumn-storm': {
          60: '#86A7AC',
          50: '#B5C7C9',
          40: '#C2D4D6',
          30: '#D3DFDE',
          20: '#E3EDEA',
        },

        'modal-background': {
          100: 'hsla(212, 82%, 11%, 1)',
        },
      },
      spacing: ({ theme }) => ({
        //--space-xSmall -> spacing.2
        //--space-small -> spacing.4
        //--space-medium -> spacing.6
        //--space-large -> spacing.8
        //--space-xLarge -> spacing.10
        //--space-xxLarge -> spacing.12
        //--space-3xLarge -> spacing.16
        //--space-4xLarge -> spacing.28
        xs: 'calc((4 / 16) * theme(fontSize.base))',
        sm: 'calc((8 / 16) * theme(fontSize.base))',
        'xs+sm': 'calc((12 / 16) * theme(fontSize.base))',
        md: 'calc((16 / 16) * theme(fontSize.base))',
        lg: 'calc((24 / 16) * theme(fontSize.base))',
        xl: 'calc((32 / 16) * theme(fontSize.base))',
        '2xl': 'calc((40 / 16) * theme(fontSize.base))',
        '3xl': 'calc((56 / 16) * theme(fontSize.base))',
        '4xl': 'calc((96 / 16) * theme(fontSize.base))',
        'card-minWidth': '220px',
        'card-maxWidth': '400px',
      }),
      fontSize: {
        base: 'clamp(calc(16.00 / 16 * 1rem), 0.39vw + 0.91rem, calc(22.00 / 16 * 1rem))',
        //--typeScale-2
        md: 'clamp(calc(19.20 / 16 * 1rem), 0.54vw + 1.07rem, calc(27.50 / 16 * 1rem))',
        //--typeScale-3
        lg: 'clamp(calc(23.04 / 16 * 1rem), 0.73vw + 1.27rem, calc(34.38 / 16 * 1rem))',
        //--typeScale-4
        xl: 'clamp(calc(27.65 / 16 * 1rem), 0.99vw + 1.5rem, calc(42.97 / 16 * 1rem))',
        //--typeScale-4_5
        '2xl': 'clamp(calc(33.73 / 16 * 1rem), 1.38vw + 1.785rem, calc(55.055 / 16 * 1rem))',
        //--typeScale-5
        '3xl': 'clamp(calc(39.81 / 16 * 1rem), 1.77vw + 2.07rem, calc(67.14 / 16 * 1rem))',
        //--typeScale-6
        '4xl': 'clamp(calc(45.89 / 16 * 1rem), 2.16vw + 2.355rem, calc(79.225 / 16 * 1rem))',
        //--typeScale-7
        '5xl': 'clamp(calc(51.97 / 16 * 1rem), 2.55vw + 2.64rem, calc(91.31 / 16 * 1rem))',
        '6xl': 'clamp(calc(58.05 / 16 * 1rem), 2.94vw + 2.925rem, calc(103.39 / 16 * 1rem))',
        '10xl': '13rem',
        '12xl': '15rem',
      },
      size: {
        'arrow-right': '1.58rem',
      },
      fontWeight: {
        semibolder: '650',
        //--fontWeight-bold: tw -> semibold
        //--fontWeight-medium: tw -> medium
        //--fontWeight-regular: tw -> normal
      },
      lineHeight: {
        text: '2.3rem',
        //--lineHeight-1
        inherit: 'inherit',
        //--lineHeight-2
        earthy: '1.2',
        //--lineHeight-2_5
        misty: '1.25',
        cloudy: '1.35',
        //-lineHeight-3
        planetary: '1.5',
      },
      scale: {
        99: '0.99',
      },
      maxWidth: {
        viewport: '1920px',
        //When large font, prose(65ch) might not be the best
        text: '760px',
        menuText: 'calc(35 * var(--space-medium))',
      },
      minWidth: {
        viewport: '375',
      },
      borderRadius: {
        xs: '0.1rem',
      },
      padding: {
        'layout-sm': 'clamp(16px, calc(-38.3689px + 14.4984vw), 250px)',
        'layout-md': 'clamp(16px, calc(-69.4369px + 22.7832vw), 368px)',
        'layout-lg': 'clamp(16px, calc(-101.4757px + 31.3269vw), 500px)',
        'page-content': 'theme(spacing.20)',
      },
      boxShadow: {
        card: 'rgba(0, 0, 0, 0.08) 0px 1px 3px,1px -1px 2px 0px rgba(0, 0, 0, 0.07), rgba(0, 0, 0, 0.20) 0px 1px 2px',
        'card-interact': 'rgba(0, 0, 0, 0.14) 0px 1px 3px, rgba(0, 0, 0, 0.36) 0px 1px 2px',
      },
      aspectRatio: {
        '4/5': '0.8',
        '5/4': '1.25',
        '9/16': '0.56',
      },
      margin: {
        'layout-sm': 'clamp(16px, calc(-38.3689px + 14.4984vw), 250px)',
        'layout-md': 'clamp(16px, calc(-69.4369px + 22.7832vw), 368px)',
        'layout-lg': 'clamp(16px, calc(-101.4757px + 31.3269vw), 500px)',
        'page-content': 'theme(spacing.20)',
      },
      transitionTimingFunction: {
        scroll: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      },
      transitionDuration: {
        400: '400ms',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        zoom: {
          '0%': { transform: 'scale(1.0)' },
          '100%': { transform: 'scale(1.4)' },
        },
        fade: {
          '0%, 100%': { opacity: '0' },
          '20%, 80%': { opacity: '1' },
        },
        move: {
          to: {
            transform: 'translateX(calc(-100%+100vw))',
          },
        },
        slideUp: {
          '0%': { height: '0' },
          '100%': { height: 'var(--radix-accordion-content-height)' },
        },
        slideDown: {
          '0%': { height: 'var(--radix-accordion-content-height)' },
          '100%': { height: '0' },
        },
      },
      animation: {
        fadeInOut: 'fade linear both',
        fadeIn: 'auto linear fadeIn both',
        fadeOut: 'auto linear fadeOut both',
        zoomIn: 'zoom 60s linear',
        move: 'auto linear move forwards',
        'spin-slow': 'spin 3s linear infinite',
        slideUp: 'slideUp 0.2s ease-out',
        slideDown: 'slideDown 0.2s ease-out',
      },
      data: {
        open: 'state~="open"',
        closed: 'state~="closed"',
      },
      flex: {
        fr: '1 1 1',
      },
      aria: {
        current: 'current="page"',
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: [
            {
              fontSize: theme('fontSize.2xl'),
              lineHeight: theme('lineHeight.tight'),
              h1: {
                fontSize: theme('fontSize.5xl'),
                lineHeight: theme('lineHeight.tight'),
                fontWeight: theme('fontWeight.normal'),
                marginBottom: theme('spacing.6'),
                marginTop: theme('spacing.0'),
              },
              h2: {
                fontSize: theme('fontSize.4xl'),
                lineHeight: theme('lineHeight.tight'),
                fontWeight: theme('fontWeight.normal'),
                marginBottom: theme('spacing.6'),
                marginTop: theme('spacing.0'),
              },
              h3: {
                fontSize: theme('fontSize.3xl'),
                lineHeight: theme('lineHeight.tight'),
                fontWeight: theme('fontWeight.normal'),
                marginBottom: theme('spacing.6'),
                marginTop: theme('spacing.0'),
              },
              h4: {
                fontSize: theme('fontSize.2xl'),
                lineHeight: theme('lineHeight.tight'),
                fontWeight: theme('fontWeight.normal'),
                marginBottom: theme('spacing.0'),
                marginTop: theme('spacing.0'),
              },
              h5: {
                fontSize: theme('fontSize.xl'),
                lineHeight: theme('lineHeight.tight'),
                fontWeight: theme('fontWeight.semibold'),
              },
              h6: {
                fontSize: theme('fontSize.lg'),
                lineHeight: theme('lineHeight.tight'),
                fontWeight: theme('fontWeight.semibold'),
              },
              'ul ul, ul ol, ol ul, ol ol': {
                paddingLeft: em(38, 24),
              },
              'ol ol': {
                listStyleType: 'lower-alpha',
              },
              'ol ol ol': {
                listStyleType: 'lower-roman',
              },
              'ol > li': {
                marginLeft: em(8, 14),
              },
              'ul > li': {
                marginLeft: em(8, 14),
              },
              '> ul > li > *:first-child': {
                marginTop: '0px',
              },
              '> ul > li > *:last-child': {
                marginBottom: '0px',
              },
              '> ol > li > *:first-child': {
                marginTop: '0px',
              },
              '> ol > li > *:last-child': {
                marginBottom: '0px',
              },
              p: {
                textWrap: 'pretty',
                marginTop: '0.25em',
                marginBottom: '0.25em',
              },
            },
            {
              '--tw-prose-body': theme('colors.slate.80'),
              '--tw-prose-bullets': theme('colors.slate.80'),
              '--tw-prose-counters': theme('colors.slate.80'),
              //inverted
              '--tw-prose-invert-headings': theme('colors.white.100'),
              '--tw-prose-invert-body': theme('colors.white.100'),
              '--tw-prose-invert-bullets': theme('colors.white.100'),
              '--tw-prose-invert-counters': theme('colors.white.100'),
            },
          ],
        },
      }),
      transitionProperty: {
        'motion-safe': 'motion-safe',
      },
      gridTemplateColumns: {
        'auto-fill-fr': `repeat(auto-fill, minmax(80px,1fr))`,
        card: `repeat(auto-fill, minmax(min(100%, theme(spacing.card-minWidth)), theme(spacing.card-maxWidth)))`,
      },
    },
  },
  plugins: [
    typography,
    plugin(function ({ addVariant, matchVariant, addUtilities, theme }) {
      matchVariant(
        'nth',
        (value: string) => {
          return `&:nth-child(${value})`
        },
        {
          values: {
            1: '1',
            2: '2',
            3: '3',
          },
        },
      ),
        addUtilities({
          '.envis-outline': {
            'outline-style': 'dashed',
            'outline-width': '2px',
            'outline-offset': '3px',
            'outline-color': theme('colors.norwegian-woods.100'),
          },
          '.envis-outline-invert': {
            'outline-style': 'dashed',
            'outline-width': '2px',
            'outline-offset': '3px',
            'outline-color': theme('colors.white.100'),
          },
          '.break-word': {
            wordBreak: 'break-word',
          },
        })
    }),
  ],
} satisfies Config
