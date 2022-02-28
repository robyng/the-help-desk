import React from 'react';
import Logo from './../../assets/images/house-key-outlined.png'

function Header(props) {
    return(
        <header className="d-flex justify-content-between align-items-center">
           <a href="/">
           <h1><img src={Logo} alt="House on key chain logo" className='logo' height="100px"></img>Property Managers Help Desk</h1>
           </a> 
           {props.children}
        </header>
    )
}

export default Header;

/*




 <>
            <Link to="/"><h1>The Help Desk</h1></Link>
            <nav>
            {Auth.loggedIn() ? (
            <>
              <Link to="/Dashboard">Dashboard</Link>
              <a href="/" onClick={logout}>Logout</a>
              <Link to="/NewTicket">NewTicket</Link>
            </>
            ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
            
            </nav>

        </>
*/