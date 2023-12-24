import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import OpenSideContext from "./Context/OpenSideContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <OpenSideContext>
      <Router>
        <App />
      </Router>
    </OpenSideContext>
  </React.StrictMode>
);
