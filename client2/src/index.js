import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import{
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";

const link = createHttpLink({
  uri: 'http://localhost:3001/graphql'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);


