// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#020816",
          secondary: "#3C82F6",
          accent: "#F8FAFC",
          neutral: "#2f2a3c",
          "base-100": "#020816",
          info: "#4f8dde",
          success: "#33e1c1",
          warning: "#f9b262",
          error: "#f07589",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
  theme: {
    extend: {
      fontFamily: {
        "fira-code": ["Fira Code", "monospace"],
      },
    },
  },
};
