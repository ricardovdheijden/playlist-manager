import React from 'react';

const NavBar = () => {
    return(
        <nav className="navbar navbar-expand navbar-dark bg-success">
            <div className="container pl-sm-3">
                <a className="navbar-brand" href="#/">
                    Playlist Manager
                </a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a href="#/find-duplicates-by-url" className="nav-link">URLs</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
