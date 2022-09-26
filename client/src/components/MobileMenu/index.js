import React from 'react';


function MobileMenu(props) {
    const {
        pages = [],
        currentPage,
        setCurrentPage
    } = props;

    return (
<nav> 
        <ul className="mobile-menu-list">
            {pages.map((page) => (
                <li
                    className={`mx-1 btn ${currentPage === page && 'text-danger'}`}
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

export default MobileMenu;