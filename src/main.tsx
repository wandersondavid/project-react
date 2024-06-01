import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6E56CF",
    },
    secondary: {
      main: "#F5F6F6",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontSize: 16,
          fontWeight: 600,
          height: 48,
          backgroundColor: "#6E56CF",
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "secondary" },
          style: {
            backgroundColor: "#F5F6F6",
            color: "#6E56CF",
          },
        },

        {
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: "#6E56CF",
            color: "#F5F6F6",
          },
        },
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            color: "#F5F6F6",
            borderColor: "#6E56CF",
          },
        },

        {
          props: { variant: "outlined", color: "secondary" },
          style: {
            color: "#6E56CF",
            borderColor: "#6E56CF",
            backgroundColor: "#F5F6F6",
          },
        },
      ],
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
