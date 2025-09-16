import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// فقط این یکی رو نگه دار:
import "./index.scss";

// leaflet css (برای ظاهر نقشه)
import "leaflet/dist/leaflet.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
