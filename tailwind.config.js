/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            // https://coolors.co/cdb4db-ffc8dd-ffafcc-bde0fe-a2d2ff
            // https://javisperez.github.io/tailwindcolorshades/?malibu=A2D2FF&tropical-blue=BDE0FE&cotton-candy=ffafcc&azalea=FFC8DD&prelude=CDB4DB
            'malibu': {
                '50': '#FAFEFF',
                '100': '#F5FCFF',
                '200': '#E8F8FF',
                '300': '#DBF3FF',
                '400': '#BFE4FF',
                '500': '#A2D2FF',
                '600': '#85B4E6',
                '700': '#5C89BF',
                '800': '#3A6299',
                '900': '#213F73',
                '950': '#0E224A'
            },'tropical-blue': {
                '50': '#FCFEFF',
                '100': '#F7FDFF',
                '200': '#F0FAFF',
                '300': '#E6F7FF',
                '400': '#D1EDFF',
                '500': '#BDE0FE',
                '600': '#9AC0E6',
                '700': '#6991BF',
                '800': '#436899',
                '900': '#264373',
                '950': '#10244A'
            },'cotton-candy': {
                '50': '#FFFAFD',
                '100': '#FFF7FC',
                '200': '#FFEBF7',
                '300': '#FFE0F1',
                '400': '#FFC7E1',
                '500': '#ffafcc',
                '600': '#E68EAD',
                '700': '#BF6381',
                '800': '#993F5A',
                '900': '#732439',
                '950': '#4A0F1D'
            },'azalea': {
                '50': '#FFFCFE',
                '100': '#FFFAFD',
                '200': '#FFF2FA',
                '300': '#FFE8F5',
                '400': '#FFD9EB',
                '500': '#FFC8DD',
                '600': '#E6A1BA',
                '700': '#BF6F8A',
                '800': '#994860',
                '900': '#73283D',
                '950': '#4A111F'
            },'prelude': {
                '50': '#FCFAFC',
                '100': '#FBF7FC',
                '200': '#F5EDF7',
                '300': '#ECDFF0',
                '400': '#DCC8E6',
                '500': '#CDB4DB',
                '600': '#B091C4',
                '700': '#8764A3',
                '800': '#634185',
                '900': '#422563',
                '950': '#230F40'
            }
        }
    },
  },
  plugins: [],
}