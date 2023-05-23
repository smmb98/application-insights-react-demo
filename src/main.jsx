import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Link, Route } from "react-router-dom";
import TelemetryProvider from "./telemetry-provider";
import { getAppInsights } from "./TelemetryService";
import { SeverityLevel } from "@microsoft/applicationinsights-web";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
