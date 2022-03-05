import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth'

//for holding styles on active page
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
                        key={page.title} >

                        <span
                            onClick={() => {
                                setCurrentPage(page);
                                if (page.title === 'Logout') {
                                    return Auth.logout() // for log out kill session
                                } else {
                                    <Link to={page.link}>{page.title}</Link>
                                }
                            }}
                        >

                            <Link to={page.link}>{page.title}</Link>

                        </span>

                    </li>

                ))
                }

            </ul>

        </nav>



    )
}

export default Nav;