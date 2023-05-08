import React, { useState } from 'react';
import './Navbar.css';
import '../App.css';
import { Link, Route, NavLink } from 'react-router-dom';

const Navbar = ({ handleSubmit, searchTerm, setSearchTerm }) => {
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
        <li>
          <Link to="/cart">
            <i className="fa fa-shopping-cart"></i>
          </Link> 
        </li>
      </ul>
      <form onSubmit={handleSubmit} onKeyUp={handleKeyPress}>
        <div className="search-container">
          <input type="text" placeholder="Search movies" value={searchTerm} onChange={handleChange} />
          <button type="submit">Search</button>
        </div>
      </form>

      <ul className={`menuList ${isMenuOpen ? 'open' : ''}`}>
        <li>
          <Link to="/best-rated" onClick={handleMenuToggle}>Best rated</Link>
        </li>
        <li>
          <Link to="/drama" onClick={handleMenuToggle}>Drama</Link>
        </li>
        <li>
          <Link to="/thriller" onClick={handleMenuToggle}>Thriller</Link>
        </li>
        <li>
          <Link to="/comedy" onClick={handleMenuToggle}>Comedy</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;








        
        
        






