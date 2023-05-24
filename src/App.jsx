import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TelemetryProvider from "./telemetry-provider";
import { getAppInsights } from "./TelemetryService";
import {
  SeverityLevel,
  ApplicationInsights,
} from "@microsoft/applicationinsights-web";
// let appInsights = null;

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState("");
  // let appInsights = getAppInsights();
  let appInsights = null;
  // const appInsights = new ApplicationInsights({
  //   config: {
  //     instrumentationKey: "8b4f377e-de4c-4689-8bd1-7a1895cc72a3",
  //   },
  // });
  // appInsights.loadAppInsights();
  function trackExceptionHandler() {
    console.log("trackException");
    appInsights.trackException({
      exception: new Error("Simulated error from react app"),
      severityLevel: SeverityLevel.Error,
    });
  }

  function trackTraceHandler() {
    console.log("trackTrace");
    appInsights.trackTrace({
      message: "Simulated trace from react app",
      severityLevel: SeverityLevel.Information,
    });
  }

  function trackEventHandler() {
    console.log("trackEvent");
    appInsights.trackEvent({ name: "Simulated event from react app" });
  }

  function ajaxRequestHandler() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://httpbin.org/status/200");
    xhr.send();
  }

  function fetchRequestHandler() {
    fetch("https://httpbin.org/status/200");
  }

  useEffect(() => {
    (async function () {
      const { text } = await (await fetch(`/api/message`)).json();
      setData(text);
    })();
  });

  return (
    <TelemetryProvider
      instrumentationKey="8b4f377e-de4c-4689-8bd1-7a1895cc72a3"
      after={() => {
        appInsights = getAppInsights();
        if (appInsights) {
          console.log("appInsights is now initialized");
        }
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
      <button onClick={trackExceptionHandler}>Track Exception</button>
      <button onClick={trackEventHandler}>Track Event</button>
      <button onClick={trackTraceHandler}>Track Trace</button>
      {/* <button onClick={throwError}>Autocollect an Error</button> */}
      <button onClick={ajaxRequestHandler}>
        Autocollect a Dependency (XMLHttpRequest)
      </button>
      <button onClick={fetchRequestHandler}>
        Autocollect a dependency (Fetch)
      </button>
      {/* <div>{data}</div> */}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </TelemetryProvider>
  );
}

export default App;
