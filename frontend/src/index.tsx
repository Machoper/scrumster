import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GlobalStyle } from "./style";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./client";

const apolloClient = client as any;

ReactDOM.render(
  <React.Fragment>
    <GlobalStyle />
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
