import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./components/Login";
import Nav from "./components/Nav";
import NoMatch from "./components/NoMatch";
import Landing from "./components/Landing";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import NewTicket from "./components/NewTicket";
import Account from "./components/Account"
import AdminAccount from "./components/AdminAccount"
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


function App() {
  
  const pages = [{ title: "Home", link: "/" }, { title: "Login", link: "/login" }, { title: "Signup", link: "/signup" }];
  
  const memberPages = [{ title: "NewTicket", link: "/new-ticket" }, { title: "Dashboard", link: "/dashboard" }, { title: "Account", link: "/account" }, { title: 'Logout', link: '/' }]
  
  const [currentPage, setCurrentPage] = useState(pages[0]);

  return (
    <ApolloProvider client={client}>

      <div>
        <Router>
          <div className="hero">
            <Header>
              <Nav
                pages={Auth.loggedIn() ? memberPages : pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}></Nav>

            </Header>
            <div className="content">
              <Switch>
                <Route exact path="/">
                  <Landing />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/signup">
                  <Signup />
                </Route>
                <Route exact path="/dashboard">
                  <Dashboard />
                </Route>
                <Route exact path="/account">
                  {Auth.getInfo()?.unit === '000' ? <AdminAccount /> : <Account />}
                </Route>
                <Route exact path="/new-ticket">
                  <NewTicket />
                </Route>
                <Route path="*">
                  <NoMatch />
                </Route>

              </Switch>

            </div>
          </div>
        </Router>
      </div>

    </ApolloProvider>
  );
}
export default App;