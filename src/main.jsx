import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator, ThemeProvider, createTheme } from "@aws-amplify/ui-react";
import logo from "./assets/logo.png";

const cognitiveKitchenTheme = createTheme({
  name: "cognitive-kitchen",
  tokens: {
    colors: {
      primary: {
        10: "#eef0f5",
        80: "#3c405b",
        90: "#2c2f45",
        100: "#2c2f45",
      },
    },
  },
});

const components = {
  Header() {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "2rem 0 1rem" }}>
        <img src={logo} alt="Cognitive Kitchen" style={{ height: "128px" }} />
      </div>
    );
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={cognitiveKitchenTheme}>
      <Authenticator components={components}>
        <App />
      </Authenticator>
    </ThemeProvider>
  </React.StrictMode>
);