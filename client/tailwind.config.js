/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["bg-gray-50", "px-4", "py-2", "rounded-md", "font-medium", "transition-colors", "duration-200", "bg-primary-600", "text-white", "hover:bg-primary-700", "bg-gray-200", "text-gray-800", "hover:bg-gray-300", "w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "shadow-sm", "focus:outline-none", "focus:ring-2", "focus:ring-primary-500", "focus:border-primary-500", "block", "text-sm", "font-medium", "text-gray-700", "mb-1", "bg-white", "rounded-lg", "shadow-md", "p-6"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
    },
  },
  plugins: [],
}
