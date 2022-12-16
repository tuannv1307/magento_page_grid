import React from "react";
import ReactDOM from "react-dom";
// import { RouterProvider } from "react-router-dom";
// import App from "./App";
import RoutePage from "./router";

ReactDOM.render(
  <React.StrictMode>
    <RoutePage />
  </React.StrictMode>,
  document.body.appendChild(document.createElement("div"))
);
