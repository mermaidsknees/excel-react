import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux'
import store from "./store";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    {/* Disabled Strict Mode to avoid unreasonable console warning about Material UI */}
    {/* https://stackoverflow.com/questions/61220424/material-ui-drawer-finddomnode-is-deprecated-in-strictmode */}
      <App />
    {/* </React.StrictMode> */}
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
