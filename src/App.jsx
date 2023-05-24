import { useEffect, useState } from "react";
import { AppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { reactPlugin } from "./ApplicationInsightsService";
import TestComponent from "./TestComponent";
import "./App.css";
import TestPage from "./TestPage";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    (async function () {
      const { text } = await (await fetch(`/api/message`)).json();
      setData(text);
    })();
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>Home</p>
      </header>
      <AppInsightsContext.Provider value={reactPlugin}>
        <TestComponent />
        <br />
        <TestPage></TestPage>
      </AppInsightsContext.Provider>
    </div>
  );
}

export default App;
