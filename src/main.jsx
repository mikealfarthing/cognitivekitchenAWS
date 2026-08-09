import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Authenticator, ThemeProvider, createTheme } from "@aws-amplify/ui-react";

const cognitiveKitchenTheme = createTheme({
  name: "cognitive-kitchen",
  tokens: {
    colors: {
      brand: {
        primary: {
          10: "#eef0f5",
          80: "#3c405b",
          90: "#2c2f45", 
          100: "#2c2f45",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={cognitiveKitchenTheme}>
      <Authenticator>
        <App />
      </Authenticator>
    </ThemeProvider>
  </React.StrictMode>
);