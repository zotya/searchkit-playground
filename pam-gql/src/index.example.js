import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CustomApp from './CustomApp';


import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { SearchkitProvider, SearchkitClient } from '@searchkit/client'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const defaultOptions: DefaultOptions = {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    }

console.log(process.env.SK_GQL_SERVER)
const client = new ApolloClient({
  uri: '<http://graphql_host:4000/graphql>',
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

const skClient = new SearchkitClient({
  itemsPerPage: 20
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client} >
      <SearchkitProvider client={skClient}>
        <Router>
          <Switch>
            <Route path="/custom">
              <CustomApp />
            </Route>
            <Route path="/">
              <App />
            </Route>
          </Switch>
        </Router>
      </SearchkitProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
