import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
  config: {
    connectionString:
      "InstrumentationKey=8b4f377e-de4c-4689-8bd1-7a1895cc72a3;IngestionEndpoint=https://centralus-2.in.applicationinsights.azure.com/;LiveEndpoint=https://centralus.livediagnostics.monitor.azure.com/",
    extensions: [reactPlugin],
    extensionConfig: {},
    enableAutoRouteTracking: true,
    disableAjaxTracking: false,
    autoTrackPageVisitTime: true,
    enableCorsCorrelation: true,
    enableRequestHeaderTracking: true,
    enableResponseHeaderTracking: true,
  },
});
appInsights.loadAppInsights();

appInsights.addTelemetryInitializer((env) => {
  env.tags = env.tags || [];
  env.tags["ai.cloud.role"] = "testTag";
});

export { reactPlugin, appInsights };
