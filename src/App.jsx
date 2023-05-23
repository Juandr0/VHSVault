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
  const [bestRated, setBestRated] = useState();

  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [apiFetchType, setApiFetchType] = useState('firstFetch');




  useEffect(() => {
    switch (apiFetchType) {
      case 'firstFetch':
        fetchMoviesData();
        break;

      case 'category':
        fetchCategoriesData(categoryID);
        break;

      case 'search':
        fetchMoviesData(searchTerm);
        break;

      case 'bestRated': 
        fetchBestRatedData(bestRated);
        break;

    }
  }, [pageNumber])

  const fetchMoviesData = async (searchTerm) => {
    setLoading(true);
    if (apiFetchType != 'search' && apiFetchType != 'firstFetch') {
      setPageNumber(1);
    }

 
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
    if (apiFetchType != 'category') {
      setPageNumber(1);
    }

    const moviesData = await apiFetcher(null, pageNumber, null, category, null, setApiFetchType);

    if (pageNumber > 1) {
      setMovies([...movies, ...moviesData.results])
    } else {
      setMovies(moviesData.results);
    }
    setLoading(false);
  };


  const fetchBestRatedData = async (bestRated) => {
    setLoading(true);
    if (apiFetchType != 'bestRated') {
      setPageNumber(1);
    }

    const moviesData = await apiFetcher(null, pageNumber, null, null, bestRated, setApiFetchType);

    if (pageNumber > 1) {
      setMovies([...movies, ...moviesData.results])
    } else {
      setMovies(moviesData.results);
    }
    setLoading(false);
  };




  const handleSubmit = async (e) => {
    setMovies([]);
    setPageNumber(1);
    e.preventDefault();
    fetchMoviesData(searchTerm);
  };

  const handleCategory = (e, category) => {
    setMovies([]);
    setPageNumber(1);
    e.preventDefault();
    const categoryId = category.value; // extract the category value
    setCategoryID(categoryId); 
    fetchCategoriesData(categoryID);
  };


  //Scroll event listener 
  useEffect(() => {
    const handelScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight * 0.9) {
        setPageNumber(pageNumber + 1);
      }
    }
    window.addEventListener('scroll', handelScroll);
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