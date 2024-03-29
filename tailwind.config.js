const plugin = require("tailwindcss/plugin");
const buttons = require("./theme/buttons.json");

const content = [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
];
const theme = {
  screens: {
    sm: "480px",
    md: "768px",
    lg: "976px",
    lg2: "1280px",
    xl: "1440px",
  },
  container: {
    center: true,
    padding: "15px",
  },
  borderRadius: {
    4: "4px",
  },
  extend: {
    fontFamily: {
      satoshi: ["satoshi", "sans-serif"],
    },
    textColor: {
      skin: {
        base: "rgb(var(--color-text-base))",
        muted: "rgb(var(--color-text-base)/0.6)",
        green: "rgb(var(--color-text-green))",
      },
    },
    backgroundColor: {
      skin: {
        fill: "rgb(var(--color-fill))",
        "button-accent": "rgb(var(--color-button-accent))",
        "button-accent-hover": "rgb(var(--color-button-accent-hover))",
        "button-muted": "rgb(var(--color-button-muted))",
      },
    },
    gradientColorStops: {
      skin: {
        hue: "rgb(var(--color-fill))",
      },
    },
  },
};

const plugins = [
  plugin(function ({ addComponents }) {
    addComponents(buttons);
  }),
];

/** @type {import('tailwindcss').Config} */
module.exports = {
  content,
  theme,
  plugins,
};
