// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Landing from "./components/Landing";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import React, { useState } from "react";

function App() {
  const pages = ["Home", "Login", "Signup", "Dashboard"];

  const [currentPage, setCurrentPage] = useState(pages[0]);
  function displayPage() {
    if (currentPage === "Home") {
      return <Landing />;
    } else if (currentPage === "Login") {
      return <Login />;
    } else if (currentPage === "Signup") {
      return <Signup />;
    } else if (currentPage === "Dashboard") {
    return <Dashboard />;
  }
  }
  return (
    <div>
      <div className="hero">
      <Header>
        <Nav
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        ></Nav>
      </Header>
      <div className="content">
      {displayPage()}
      </div>
      

      </div>
      
    </div>
  );
}

export default App;
