import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Layout } from "./components";

const App = () => {
  return <Layout />;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
