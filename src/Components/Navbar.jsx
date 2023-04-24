import React, { useState } from 'react';
import './Navbar.css';
import '../App.css';
import { Route, Routes } from 'react-router-dom';



const Navbar = (props) => {
    return (

        /*Implementera routes*/

        <nav className='navBar'>
        
            <ul className='navBarList'>
                <li>
                 Home


                </li>
                <li>Movie Info</li>
                <li>Order Confirmation</li>
                <li>Shopping Cart</li>
            </ul>
        </nav>
    );



}

export default Navbar;


