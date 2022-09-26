import React from 'react';
import Logo from './../../assets/images/house-key-outlined.png'
import menuClosed from './../../assets/images/mobile-menu-closed.png'
// import MobileMenu from './MobileMenu/';
// import Link from 'react-dom/'

function Header(props) {
    return(
        <header className="d-flex justify-content-between align-items-center">
           <a href="/">
           <h1><img src={Logo} alt="House on key chain logo" className='logo' height="60px"></img>Property Help Desk</h1>
           </a> 
           {props.children}
           <img src={menuClosed} className="mobile-menu" alt='click to open mobile menu' height='50px' /> 
        </header>
    )
}

export default Header;