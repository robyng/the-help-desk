import React from 'react';

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

export default Nav;