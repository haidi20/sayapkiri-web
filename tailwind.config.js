const colors = require('tailwindcss/colors')

module.exports = {
    // purge: [],
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                completed: "#83B919",
                success: "#587e0e",
                green: {
                    '50': '#EFF9F3',
                    '100': '#DDF2E6',
                    '200': '#B8E4CA',
                    '300': '#92D7AF',
                    '400': '#6DC993',
                    '500': '#48BB78',
                    '600': '#389860',
                    '700': '#2B7249',
                    '800': '#1D4D31',
                    '900': '#0F2819'
                },
                gray: {
                    '50': '#FFFFFF',
                    '100': '#FFFFFF',
                    '200': '#FCFCFD',
                    '300': '#DDE2E9',
                    '400': '#BFC8D4',
                    '500': '#A0AEC0',
                    '600': '#8194AC',
                    '700': '#647A96',
                    '800': '#4F6178',
                    '900': '#3B4859'
                },
                blue: {
                    '50': '#FFFFFF',
                    '100': '#F2F8FD',
                    '200': '#C6E0F6',
                    '300': '#9AC9EF',
                    '400': '#6EB1E8',
                    '450': "#4680FE", // add color blue
                    '500': '#4299E1',
                    '600': '#2180CF',
                    '700': '#1A65A3',
                    '800': '#134A77',
                    '900': '#0C2E4B'
                },
                red: {
                    '50': '#FFFFFF',
                    '100': '#FFFFFF',
                    '200': '#FEF5F5',
                    '300': '#FBC5C5',
                    '400': '#F89595',
                    '500': '#F56565',
                    '600': '#F23535',
                    '700': '#E50F0F',
                    '800': '#B50C0C',
                    '900': '#850909'
                },
                yellow: {
                    '50': '#FFFFFF',
                    '100': '#FFFFFF',
                    '200': '#FBF3D5',
                    '300': '#F6E5A7',
                    '400': '#F1D779',
                    '500': '#ECC94B',
                    '600': '#E7BB1D',
                    '700': '#BD9814',
                    '800': '#8F730F',
                    '900': '#614E0A'
                }
            }
        }
    },
    variants: {},
}