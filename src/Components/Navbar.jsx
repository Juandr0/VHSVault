import React, { useState } from 'react';
import './Navbar.css';
import '../App.css';
import { Link, Route, NavLink, useNavigate } from 'react-router-dom';

const Navbar = ({ handleSubmit, searchTerm, setSearchTerm, handleCategory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='navBar'>
      <div className='menuToggle' onClick={handleMenuToggle}>
        <i className='fa fa-bars'></i>
      </div>

      <ul className='navBarList'>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>

      <select onChange={(e) => handleCategory(e, e.target.value)}>
          <option value="">Select a category</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          <option value="27">Horror</option>
      </select>


      <ul className={`menuList ${isMenuOpen ? 'open' : ''}`}>
        <li>
          <Link to="/best-rated" onClick={handleMenuToggle} className="navLink">Best rated</Link>
        </li>
        <Link to="/" onClick={handleMenuToggle} className="navLink">Categories</Link>
      </ul>

      <ul className='navBarList'>
      <i className="fa fa-search fa-lg"></i>
      <form onSubmit={handleSubmit} onKeyUp={handleKeyPress}>
        <div className="search-container">
          <input type="text" placeholder="Search movies" value={searchTerm} onChange={handleChange} />
        </div>
      </form>
        <li>
          <Link to="/cart">
            <i className="fa fa-shopping-cart"></i>
          </Link> 
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;










        
        
        






