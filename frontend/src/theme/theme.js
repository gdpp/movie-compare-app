import { createTheme } from "@mui/material/styles";

const lightPalette = {
  mode: "light",
  primary: {
    main: "#2563eb",
    light: "#60a5fa",
    dark: "#1d4ed8",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#0f766e",
    light: "#2dd4bf",
    dark: "#0d9488",
    contrastText: "#ffffff",
  },
  background: {
    default: "#f8fafc",
    paper: "#ffffff",
  },
  text: {
    primary: "#1e293b",
    secondary: "#64748b",
  },
};

const darkPalette = {
  mode: "dark",
  primary: {
    main: "#f59e0b",
    light: "#fbbf24",
    dark: "#d97706",
    contrastText: "#1c1917",
  },
  secondary: {
    main: "#ea580c",
    light: "#fb923c",
    dark: "#c2410c",
    contrastText: "#ffffff",
  },
  background: {
    default: "#1c1917",
    paper: "#292524",
  },
  text: {
    primary: "#fafaf9",
    secondary: "#a8a29e",
  },
};

export const getTheme = (mode = "light") =>
  createTheme({
    palette: mode === "dark" ? darkPalette : lightPalette,
    shape: {
      borderRadius: 8,
    },
  });
