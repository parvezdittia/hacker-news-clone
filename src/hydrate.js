import App from "./components/App";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.hydrate(
  <App news={window.SSR_DUMP} />,
  document.getElementById("app")
);
