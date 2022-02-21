import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav'
import Landing from './components/Landing'
import Login from './components/Login'

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
      <Nav
      pages={pages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}>
      </Nav>

     {displayPage()}

    </div>
  );
}

export default App;
