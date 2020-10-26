import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import Wines from "./components/Wines";
import "./index.css";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://mighty-boar-31.hasura.app/v1/graphql',
  }),
});

const App = () => (
  <ApolloProvider client={client}>
    <Wines />
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));