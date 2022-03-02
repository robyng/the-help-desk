// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import Login from "./components/Login";
import Nav from "./components/Nav";
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

/*for log out kill session*/
const logout = event => {
  event.preventDefault();
  Auth.logout();
};

function App() {
  // const pages = [{title:"Home",link: "/"}, {title:"Login", link: "/login"}, "Signup"];
  // const memberPages = ["NewTicket", "Dashboard", "Logout", "Account"]

  // const [currentPage, setCurrentPage] = useState(pages[0]);


  function displayNav() {
    if (Auth.loggedIn()) {
      
      <>
        <Link to="/new-ticket">New Ticket</Link>
        <Link to="/dashboard">Dashboard</Link>
        {/* <Link to="/logout">Logout</Link> */}
        <Link to="/account">Account</Link>
        
      </>


    } else {
      return <> 
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </>
    }
  }
  // function displayPage() {
  //   if (currentPage === pages.title) {
  //     return <Landing /> ;
  //   } else if (currentPage === pages.title) {
  //     return <Login />;
  //   } else if (currentPage === "Signup") {
  //     return <Signup />;
  //   } else if (currentPage === "NewTicket" && Auth.loggedIn()) {
  //       return <NewTicket />;
  //   } else if (currentPage === "Dashboard" && Auth.loggedIn()) {
  //   return <Dashboard />;
  // }  else if (currentPage === "Account" && Auth.loggedIn()) {
  //   return Auth.getInfo().unit === '000'?<AdminAccount/>:<Account />;
  // }else if (currentPage === "Logout") {
  //   /*don't forget to use Auth.logout as a function! use Auth.logout() with parentheses */
  //   return {logout} && Auth.logout()
  // }else {
  //   return <Login></Login>
  // } 


  // }
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <div className="hero">
            <Header>

              {/* <Nav
        
          pages={Auth.loggedIn() ? memberPages : pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        >
        </Nav> */}
{displayNav()}

            </Header>

            <div className="content">

              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/new-ticket" component={NewTicket} />
              <Route exact path="/account" component={Account} />





              {/* {displayPage(          )}    */}
            </div>


          </div>

        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;