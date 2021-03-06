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