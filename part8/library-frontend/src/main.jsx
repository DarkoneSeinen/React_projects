import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: "https://literate-space-trout-979xvx5x4xgwf7vp5-4000.app.github.dev" }) // asegúrate que esté corriendo el backend
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);
