module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0a1030",
          card: "#1d254d",
        },
        primary: {
          DEFAULT: "#b9a7ff",
          on: "#17142a",
        },
        text: {
          high: "#f7f4ff",
          muted: "#b8bde0",
        },
        stroke: {
          soft: "#2f3768",
        },
        feedback: {
          success: "#8fe3b0",
          warning: "#ffd66b",
          error: "#ff8a8a",
        },
        accent: {
          affective: "#ff8a70",
        },
      },
      fontFamily: {
        title: ["SpaceGrotesk_700Bold"],
        sans: ["Lexend_400Regular"],
        semibold: ["Lexend_600SemiBold"],
        mono: ["SpaceMono_400Regular"],
      },
    },
  },
  plugins: [],
}
