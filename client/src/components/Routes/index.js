import React from 'react'
import { Route,Switch, BrowserRouter as Router } from 'react-router-dom'
import Login from './../Login'
// import Login from "./Login";
// import Nav from "./Nav";
import NoMatch from "./../NoMatch";
import Landing from "./../Landing";
// import Header from "./Header";
import Signup from "./../Signup";
import Dashboard from "./../Dashboard";
import NewTicket from "./../NewTicket";
import Account from "./../Account"
import AdminAccount from "./../AdminAccount"

// import { Landing, Login, Signup, Dashboard, Account, AdminAccount, NewTicket, NoMatch } from './App';
import Auth from '../../utils/auth';

const Routes = () => { 
    return (
     <Router>
       
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
		 </Router>
		);
};

export default Routes;