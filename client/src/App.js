// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
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
//for log out kill session/
const logout = event => {
  // event.preventDefault(); break site
  Auth.logout();
};
function App() {
  // const pages = [{title:"Home",link: "/"}, {title:"Login", link: "/login"}, "Signup"];
  // const memberPages = ["NewTicket", "Dashboard", "Logout", "Account"]
  // const [currentPage, setCurrentPage] = useState(pages[0]);
function handleActive(e) {
  e.preventDefault()
  e.class = "btn active-page"
}
  // function displayNav() {
  //   if (Auth.loggedIn() && Auth.getInfo().unit === '000') {
  //     return <>
  //       <Link to="/new-ticket" className="btn" name="new-ticket">New Ticket</Link>
  //       <Link to="/dashboard" className="btn" name="dashboard">Dashboard</Link>
  //       <a href="/" onClick={logout} className="btn" alt='' name="logout">Logout</a>
  //       <Link to="/admin-account" className="btn" name="admin-account">Account</Link>
  //     </>
  //   } else if ( Auth.loggedIn() ) {
  //     return <>
  //       <Link to="/new-ticket" className="btn" name="new-ticket">New Ticket</Link>
  //       <Link to="/dashboard" className="btn" name="dashboard" >Dashboard</Link>
  //       <a href='/' onClick={logout()} className="btn" name="logout">Logout</a>
  //       <Link to="/account" className="btn" name="account">Account</Link>
  //       </>
  //   } else {
  //     return <>
  //       <Link to="/" className="btn" name="home">Home</Link>
  //       <Link to="/login" className="btn" name="login">Login</Link>
  //       <Link to="/signup" className="btn" name="signup">Sign Up</Link>
  //     </>
  //   }
  // }
  const pages = ["Home", "Login", "Signup"];
  const memberPages = ["NewTicket", "Dashboard", "Logout", "Account"]
  const [currentPage, setCurrentPage] = useState(pages[0]);
  function displayPage() {
    if (currentPage === "Home") {
      return <Landing />;
    } else if (currentPage === "Login") {
      return <Login />;
    } else if (currentPage === "Signup") {
      return <Signup />;
    } else if (currentPage === "NewTicket" && Auth.loggedIn()) {
        return <NewTicket />;
    } else if (currentPage === "Dashboard" && Auth.loggedIn()) {
    return <Dashboard />;
  }  else if (currentPage === "Account" && Auth.loggedIn()) {
    return Auth.getInfo().unit === '000'?<AdminAccount/>:<Account />;
  }else if (currentPage === "Logout") {
    /*don't forget to use Auth.logout as a function! use Auth.logout() with parentheses */
    return {logout} && Auth.logout()
  }else {
    return <Login></Login>
  }
}
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <div className="hero">
            <Header>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/new-ticket" component={NewTicket} />
              <Route exact path="/account" component={Account} />
              <Route exact path="/admin-account" component={AdminAccount} />
              <Route component={NoMatch} />
              </Switch>
            </Header>
            <div className="content">
            {displayPage()}

            </div>
          </div>
        </div>

      </div>
    </Router>
  </ApolloProvider>
);
}
export default App;