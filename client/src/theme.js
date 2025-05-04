// theme.js
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F9FAFB",
    50: "#F0F2F5",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#EAF0FF",
    100: "#C4D9FF",
    200: "#9EC2FF",
    300: "#78ABFF",
    400: "#5294FF",
    500: "#2C7DFF",
    600: "#225FCC",
    700: "#194299",
    800: "#0F2466",
    900: "#061733",
  },
  accent: {
    100: "#D3F6CF",
    200: "#A7ED9F",
    300: "#7BE36F",
    400: "#4FDA3F",
    500: "#23D10F",
    600: "#1BA60C",
    700: "#137A09",
    800: "#0C4F06",
    900: "#042303",
  },
};

export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // Dark mode palette
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[600],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
            accent: {
              main: colorTokens.accent[400],
            },
          }
        : {
            // Light mode palette with stronger contrast
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[100],
            },
            neutral: {
              dark: colorTokens.grey[800],
              main: colorTokens.grey[700],
              mediumMain: colorTokens.grey[600],
              medium: colorTokens.grey[500],
              light: colorTokens.grey[300],
            },
            background: {
              default: colorTokens.grey[200], // very light gray instead of pure white
              alt: colorTokens.grey[0],
            },
            accent: {
              main: colorTokens.accent[500],
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 13,
      h1: { fontFamily: "Inter", fontSize: 42 },
      h2: { fontFamily: "Inter", fontSize: 34 },
      h3: { fontFamily: "Inter", fontSize: 26 },
      h4: { fontFamily: "Inter", fontSize: 22 },
      h5: { fontFamily: "Inter", fontSize: 18 },
      h6: { fontFamily: "Inter", fontSize: 15 },
    },
  };
};
