import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TelemetryProvider from "./telemetry-provider";
import { getAppInsights } from "./TelemetryService";
import { SeverityLevel } from "@microsoft/applicationinsights-web";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState("");
  let appInsights = null;
  useEffect(() => {
    (async function () {
      const { text } = await (await fetch(`/api/message`)).json();
      setData(text);
    })();
  });

  return (
    <TelemetryProvider
      instrumentationKey="a036c503-8665-4269-a2f2-fec55fa6533e"
      after={() => {
        appInsights = getAppInsights();
      }}
    >
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div>{data}</div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </TelemetryProvider>
  );
}

export default App;
