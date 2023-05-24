import { useEffect } from "react";
import { AppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { reactPlugin } from "./ApplicationInsightsService";
import TestComponent from "./TestComponent";
import "./App.css";

function App() {
  useEffect(() => {
    (async function () {
      const { text } = await (await fetch(`/api/message`)).json();
    })();
  });
  return (
    <div className="App">
      <header className="App-header">
        <p>Home</p>
      </header>
      <AppInsightsContext.Provider value={reactPlugin}>
        <TestComponent />
      </AppInsightsContext.Provider>
    </div>
  );
}

export default App;
