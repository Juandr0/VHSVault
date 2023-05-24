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




  useEffect(() => {
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
    window.scrollTo(0, 0); // Scroll to the top of the page
    setPageNumber(1);
    setMovies([]);
  }, [apiFetchType]);

  const fetchMoviesData = async (searchTerm) => {
    setLoading(true);
   
    if (apiFetchType != 'search' && apiFetchType != 'firstFetch') {
      setPageNumber(1);
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
    setApiFetchType('search');

    const moviesData = await apiFetcher(searchTerm, pageNumber, null, null, null, setApiFetchType);

    if (pageNumber > 1) {
      setMovies([...movies, ...moviesData.results])
    } else {
      setMovies(moviesData.results);
    }
    setLoading(false);
  };



  const fetchCategoriesData = async (category) => {
    setLoading(true);
    

    if (apiFetchType != 'category' ||  categoryID != category) {
      setPageNumber(1);
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
    setCategoryID(category); 
    setApiFetchType('category');

    const moviesData = await apiFetcher(null, pageNumber, null, category, null, setApiFetchType);

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
      setPageNumber(1);
      window.scrollTo(0, 0); // Scroll to the top of the page
    }
    setApiFetchType('bestRated');
    const moviesData = await apiFetcher(null, pageNumber, null, null, true, setApiFetchType);

    if (pageNumber > 1) {
      setMovies([...movies, ...moviesData.results])
    } else {
      setMovies(moviesData.results);
    }
    setLoading(false);
  };




  const handleSubmit = async (e) => {
    e.preventDefault();


    await fetchMoviesData(searchTerm);
  };

  const handleLogoClick = async () =>{
    await fetchMoviesData(null);
  }

  const handleBestRatedClick = async () => {
    await fetchBestRatedData()
  }

  const handleCategory = (e, category) => {
    e.preventDefault();
    const categoryId = category.value; // extract the category value
    setCategoryID(categoryId);
    fetchCategoriesData(categoryId);
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