import React, { useState } from 'react';
import './Navbar.css';
import '../App.css';
import { Link, Route, NavLink } from 'react-router-dom';



const Navbar = (props) => {


    return (
        <nav className='navBar'>
            <ul className='navBarList'>
                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>

                <li>
                    <Link to="/movie/id">
                        Movie Info
                    </Link>
                </li>

                <li>
                    <Link to="/confirmation">
                        Order confirmation
                    </Link>
                </li>

                <li>
                    <Link to="/cart">
                        Shopping Cart
                    </Link> 
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;


