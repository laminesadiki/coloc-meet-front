import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import reducers from "./reducers/index";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import api from "./apis/serverApi";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));

const user = JSON.parse(localStorage.getItem("userData"));

if (user !== null) {
  api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
