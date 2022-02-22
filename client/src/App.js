import './App.css';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav';
import Landing from './components/Landing';
import Header from './components/Header';
import React, { useState } from 'react';

function App() {

  const pages = [
    "Home",
    "Login"
  ]

  const [currentPage, setCurrentPage] = useState(pages[0]);
  function displayPage() {
    if (currentPage === "Home") {
      return <Landing />
    } else if (currentPage === "Login") {
      return <Login />
    }
  }
  return (
    <div>
      <Header>
      <Nav
      pages={pages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}>
      </Nav>


      </Header>

     {displayPage()}

    </div>
  );
}


export default App;
