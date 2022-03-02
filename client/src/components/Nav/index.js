import React from 'react';
import {Link, Router} from 'react-router-dom';


function Nav(props) {
    const {
        pages = [],
        currentPage,
        setCurrentPage
    } = props;

    return (
<nav> 
        <ul className="flex-row">
            {pages.map((page) => (
                <li
                    className={`mx-1 btn ${currentPage === page && 'active-page'}`}
                    key={page} >
                         
                    <span
                        onClick={() => {
                            setCurrentPage(page);
                          
                        }}
                    >
                        
                    
                        {page}
                    </span>

                </li>
            ))}
        </ul>
        </nav>



    )
}

export default Nav;