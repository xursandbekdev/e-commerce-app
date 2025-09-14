/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 🌙 Dark mode’ni yoqish
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        error: "var(--color-error)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",

        title: "var(--color-title-active)",
        body: "var(--color-text-body)",
        label: "var(--color-label)",
        placeholder: "var(--color-placeholder)",
        line: "var(--color-line)",
        input: "var(--color-input-bg)",
        bg: "var(--color-bg)",
        offwhite: "var(--color-off-white)",

        text: "var(--color-text)",
        text1: "var(--color-text1)",
        btn: "var(--color-btn)",
      },
      backgroundImage: {
        "linear-primary": "var(--color-linear-primary)",
        "linear-secondary": "var(--color-linear-secondary)",
        "linear-accent": "var(--color-linear-accent)",
      },
    },
  },
  plugins: [],
};
