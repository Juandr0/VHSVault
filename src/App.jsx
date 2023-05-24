import './App.css';
import HomePageView from './Views/HomePageView';
import MovieInformationView from './Views/MovieInformationView';
import OrderConfirmationView from './Views/OrderConfirmationView';
import ShoppingCartView from './Views/ShoppingCartView';
import Navbar from './Components/Navbar';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import apiFetcher from './Components/apiFetcher';
import { useEffect } from 'react';


function App() {
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryID, setCategoryID] = useState(null);

  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [apiFetchType, setApiFetchType] = useState('firstFetch');
  const [navbarClickedToggler, setNavbarClickedToggler] = useState(false);
  const [toggleReload, setToggleReload] = useState(false);



  useEffect(() => {

    console.log('switch sats körs')
    switch (apiFetchType) {
      case 'category':
        fetchCategoriesData(categoryID);
        break;

      case 'search':
        fetchMoviesData(searchTerm);
        break;

      case 'bestRated':
        fetchBestRatedData();
        break;

      default:
        fetchMoviesData();
        break;
    }
  }, [pageNumber])

  useEffect(() => {
    if (apiFetchType != 'firstFetch' ) {
      if (pageNumber === 1) {
        switch (apiFetchType) {
          case 'category':
            fetchCategoriesData(categoryID);
            break;
  
          case 'search':
            fetchMoviesData(searchTerm);
            break;
  
          case 'bestRated':
            fetchBestRatedData();
            break;
  
          default:
            fetchMoviesData();
            break;
        }
      }
    }
  }, [toggleReload]);



  //Reset useeffect
  useEffect(() => {
    console.log('reset useffect körs')
    if (pageNumber === 1) {
      setMovies([]);
      setToggleReload(!toggleReload);
    }

    window.scrollTo(0, 0); // Scroll to the top of the page
    setPageNumber(1);
  }, [navbarClickedToggler]);



  const fetchMoviesData = async (searchTerm) => {
    setLoading(true);

    if (apiFetchType != 'search' && apiFetchType != 'firstFetch') {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
    setApiFetchType('search');

    const moviesData = await apiFetcher(searchTerm, pageNumber, null, null, null);

    if (pageNumber > 1) {
      setMovies([...movies, ...moviesData.results])
    } else {
      setMovies(moviesData.results);
    }
    setLoading(false);
  };






  const fetchCategoriesData = async (category) => {
    setLoading(true);

    setApiFetchType('category');

    const moviesData = await apiFetcher(null, pageNumber, null, category, null);

    if (pageNumber > 1) {
      setMovies([...movies, ...moviesData.results])
    } else {
      setMovies(moviesData.results);
    }
    setLoading(false);
  };


  const fetchBestRatedData = async () => {
    setLoading(true);
    if (apiFetchType != 'bestRated') {
      window.scrollTo(0, 0); // Scroll to the top of the page
      setApiFetchType('bestRated');
    }




    const moviesData = await apiFetcher(null, pageNumber, null, null, true);

    if (pageNumber > 1) {
      setMovies([...movies, ...moviesData.results])
    } else {
      setMovies(moviesData.results);
    }
    setLoading(false);
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('\nHandler körs: Search')
    setNavbarClickedToggler(!navbarClickedToggler);
    setApiFetchType('search');
  };

  const handleLogoClick = async () => {
    console.log('\nHandler körs: Search')
    setNavbarClickedToggler(!navbarClickedToggler);
    setApiFetchType('search');
  }

  const handleBestRatedClick = async () => {
    console.log('\nHandler körs: best rated')
    setNavbarClickedToggler(!navbarClickedToggler);
    setApiFetchType('bestRated');
  }

  const handleCategory = async (e, category) => {
    e.preventDefault();
    console.log('\nHandler körs: category')
    const categoryId = category.value; // extract the category value
    const newCategoryId = (categoryId === categoryID);
    setCategoryID(categoryId);

    setNavbarClickedToggler(!navbarClickedToggler);
    setApiFetchType('category');

  };

  //Scroll event listener 
  useEffect(() => {
    const debounce = (func, delay) => {
      let timerId;
      return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => func.apply(this, args), delay);
      };
    };

    const handleScroll = debounce(() => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight * 0.9) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    }, 150);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageNumber]);


  return (
    <div>
      <Navbar
        handleCategory={handleCategory}
        handleSubmit={handleSubmit}
        setSearchTerm={setSearchTerm}
        apiFetcher={apiFetcher}
        fetchMoviesData={fetchMoviesData}
        fetchBestRatedData={fetchBestRatedData}
        handleLogoClick={handleLogoClick}
        handleBestRatedClick={handleBestRatedClick}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePageView
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              category={categoryID}
              movies={movies}
              loading={loading}
              fetchMoviesData={fetchMoviesData}
              apiFetcher={apiFetcher}
            />
          }
        />

        <Route
          path="/movie/:id"
          element={
            <MovieInformationView />
          }
        />

        <Route
          path="/confirmation"
          element={
            <OrderConfirmationView />
          }
        />

        <Route
          path="/cart"
          element={
            <ShoppingCartView />
          }
        />
      </Routes>
    </div>
  )
};

export default App;