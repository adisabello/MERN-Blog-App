import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import{
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const link = createHttpLink({
 uri: 'http://localhost:3001/graphql' 
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
