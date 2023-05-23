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
  let appInsights = getAppInsights();
  // let appInsights = getAppInsights();
  // const appInsights = new ApplicationInsights({
  //   config: {
  //     instrumentationKey: "8b4f377e-de4c-4689-8bd1-7a1895cc72a3",
  //   },
  // });
  // appInsights.loadAppInsights();
  function trackException() {
    // appInsights.trackException({
    //   error: new Error("some error"),
    //   severityLevel: SeverityLevel.Error,
    // });

    // appInsights.trackException({
    //   exception: new Error("some error"),
    //   // severityLevel: SeverityLevel.Error,
    // });

    try {
      console.log("trackException");
      throw new Error("This is a simulated error.");
    } catch (error) {
      // Log the error
      appInsights.trackException({ exception: error });
    }
  }

  function trackTrace() {
    console.log("trackTrace");
    appInsights.trackTrace({
      message: "some trace",
      // severityLevel: SeverityLevel.Information,
    });
    // appInsights.trackTrace({
    //   message: "some trace",
    //   severityLevel: SeverityLevel.Information,
    // });
  }

  function trackEvent() {
    console.log("trackEvent");
    appInsights.trackEvent({ name: "some event" });
  }

  // function throwError() {
  //   try {
  //     throw new Error("This is a simulated error.");
  //   } catch (error) {
  //     // Log the error
  //     appInsights.trackException({ exception: error });
  //   }

  //   // console.log("throwError");
  //   // throw Error("some error");
  //   let foo = {
  //     field: { bar: "value" },
  //   };

  //   // This will crash the app; the error will show up in the Azure Portal
  //   return foo.field.bar;
  // }

  // function ajaxRequest() {
  //   let xhr = new XMLHttpRequest();
  //   xhr.open("GET", "https://httpbin.org/status/200");
  //   xhr.send();
  // }

  // function fetchRequest() {
  //   fetch("https://httpbin.org/status/200");
  // }

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
      <button onClick={trackException}>Track Exception</button>
      <button onClick={trackEvent}>Track Event</button>
      <button onClick={trackTrace}>Track Trace</button>
      {/* <button onClick={throwError}>Autocollect an Error</button> */}
      {/* <button onClick={ajaxRequest}>
        Autocollect a Dependency (XMLHttpRequest)
      </button>
      <button onClick={fetchRequest}>Autocollect a dependency (Fetch)</button> */}
      {/* <div>{data}</div> */}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </TelemetryProvider>
  );
}

export default App;
