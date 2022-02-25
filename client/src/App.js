// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Landing from "./components/Landing";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import React, { useState } from "react";
import Auth from './utils/auth';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

/*for log out kill session*/
const logout = event => {
  event.preventDefault();
  Auth.logout();
};

function App() {
  const pages = ["Home", "Login", "Signup"];
  const memberPages = ["Dashboard", "Logout", "Account"]

  const [currentPage, setCurrentPage] = useState(pages[0]);
  function displayPage() {
    if (currentPage === "Home") {
      return <Landing />;
    } else if (currentPage === "Login") {
      return <Login />;
    } else if (currentPage === "Signup") {
      return <Signup />;
    } else if (currentPage === "Dashboard" && Auth.loggedIn()) {
    return <Dashboard />;
  } else if (currentPage === "Logout") {
    /*don't forget to use Auth.logout as a function! use Auth.logout() with parentheses */
    return {logout} && Auth.logout()
  }else {
    return <Login></Login>
  }
  }
  return (
    <ApolloProvider client={client}>
    <div>
      <div className="hero">
      <Header>
        <Nav
          pages={Auth.loggedIn() ? memberPages : pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        ></Nav>
      </Header>
      <div className="content">
      {displayPage()}
      </div>
      

      </div>
      
    </div>
</ApolloProvider>
  );
}

export default App;
