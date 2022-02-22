import React from 'react';

function Header(props) {
    return(
        <header className="d-flex justify-content-between align-items-center">
           <h1>Property Managers Help Desk</h1>
           {props.children}
        </header>
    )
}

export default Header;