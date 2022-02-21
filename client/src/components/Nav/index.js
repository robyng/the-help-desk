import React from 'react';
import {Menu} from 'antd'; 

function Nav(props) {
    const {
        pages = [],
        currentPage,
        setCurrentPage
    } = props;

    return (
<nav> <Menu mode="horizontal">
    <Menu.Item key="home">
        Home
    </Menu.Item>
    <Menu.Item key="login">
        Login
    </Menu.Item>
</Menu>
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