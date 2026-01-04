import colors from 'tailwindcss/colors';

export default {
    darkMode: 'selector',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Map 'gray' to 'slate' for a premium blue-grey dark mode
                gray: colors.slate,
                // Map 'indigo' to a custom vibrant 'Tech Blue' palette
                // This replaces the default muted indigo with something more 'digital safety' aligned
                indigo: {
                    50: '#f0f9ff', // Sky 50
                    100: '#e0f2fe', // Sky 100
                    200: '#bae6fd', // Sky 200
                    300: '#7dd3fc', // Sky 300
                    400: '#38bdf8', // Sky 400 (Good for dark mode text)
                    500: '#0ea5e9', // Sky 500 (Primary buttons)
                    600: '#0284c7', // Sky 600 (Text in light mode)
                    700: '#0369a1', // Sky 700
                    800: '#075985', // Sky 800
                    900: '#0c4a6e', // Sky 900
                    950: '#082f49',
                },
                // Add a specific 'brand' color if needed, but overriding indigo covers most existing classes
            }
        },
    },
    plugins: [],
}
