// color design tokens export
export const colorTokens = {
  grey: {
    0: "#F8F9FA", // Very light gray for backgrounds
    10: "#F1F3F5", 
    50: "#DEE2E6", 
    100: "#CED4DA", 
    200: "#ADB5BD", 
    300: "#868E96", 
    400: "#495057", // Darker grey for neutral text
    500: "#343A40", 
    600: "#212529", 
    700: "#121416", 
    800: "#0A0B0D", 
    900: "#050506", // Almost black for text contrast
    1000: "#000000", 
  },
  primary: {
    50: "#E3F2FD", // Soft blue for light backgrounds
    100: "#BBDEFB", 
    200: "#90CAF9", 
    300: "#64B5F6", 
    400: "#42A5F5", 
    500: "#2196F3", // Bold blue for primary action buttons
    600: "#1E88E5", 
    700: "#1976D2", 
    800: "#1565C0", 
    900: "#0D47A1", // Deep blue for focus elements
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
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
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 36,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 28,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 22,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 18,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
