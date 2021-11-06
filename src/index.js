import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAUcYE1-k0RQ-xtkEnWKHzgGpOOawwiwmg",
  authDomain: "fortune-cookie-26c0f.firebaseapp.com",
  projectId: "fortune-cookie-26c0f",
  storageBucket: "fortune-cookie-26c0f.appspot.com",
  messagingSenderId: "962309485012",
  appId: "1:962309485012:web:f72aa5a5d7c7b4392fa641",
  measurementId: "G-WME8GXR5XN",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
