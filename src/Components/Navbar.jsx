import React, { useState } from 'react';
import './Navbar.css';
import '../App.css';
import { Link, Route, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../features/cartSlice';
import logo from '../assets/images/logo.png';

const Navbar = ({
  handleSubmit,
  searchTerm,
  setSearchTerm,
  handleCategory,
  fetchBestRatedData,
  fetchMoviesData
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const cartCount = useSelector(selectCartCount);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    // Make the API fetch
    fetchMoviesData(searchTerm);

    setIsMenuOpen(false);

    // Navigate to the home page
    navigate('/');
  };

  const handleCategoryClick = (event, category) => {
    setIsMenuOpen(false);
    handleCategory(event, category);
    setShowOptions(false);
  };

  const handleBestRatedClick = () => {
    setIsMenuOpen(false);
    fetchBestRatedData(fetchBestRatedData);
  };

  const toggleOptions = () => {
    setShowOptions((prevShowOptions) => !prevShowOptions);
  };

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

      <ul className={`menuList ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={handleHomeClick} className={`menu-link ${isMenuOpen ? 'menu-link-hamburger' : ''}`}>
          {isMenuOpen ? 'Home' : <img src={logo} alt="VHS Vault" className="navbar-logo" />}
        </Link>

        <div className='best-rated' onClick={handleBestRatedClick}>
          Best Rated
        </div>

        <div className={`dropdown ${showOptions ? 'open' : ''}`}>
          <div className="dropdown-header" onClick={toggleOptions}>
            {selectedOption ? selectedOption.label : 'Categories'}
          </div>
          <div className="dropdown-options">
            <div
              className="dropdown-option"
              onClick={(event) => handleCategoryClick(event, { value: 28, label: 'Action' })}
            >
              Action
            </div>
            <div
              className="dropdown-option"
              onClick={(event) => handleCategoryClick(event, { value: 35, label: 'Comedy' })}
            >
              Comedy
            </div>
            <div
              className="dropdown-option"
              onClick={(event) => handleCategoryClick(event, { value: 27, label: 'Horror' })}
            >
              Horror
            </div>
          </div>
        </div>
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
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;












        
        
        






