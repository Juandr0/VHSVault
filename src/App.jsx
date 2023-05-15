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
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    //If statement stops the code from running at entering the site
    if (pageNumber != 1) {
      fetchMoviesData(searchTerm)
    }
  },[pageNumber])

  const fetchMoviesData = async (searchTerm) => {
    setLoading(true);
    const moviesData = await apiFetcher(searchTerm, pageNumber);

    if (pageNumber > 1) {
      setMovies([...movies, ...moviesData.results])
    } else {
      setMovies(moviesData.results);
    }
    setLoading(false);
  };  

  useEffect(() => {
    fetchMoviesData();
  }, []);

  const fetchCategoriesData = async (category) => {
    setLoading(true);
    const moviesData = await apiFetcher(null, pageNumber, null, category);

    if (pageNumber > 1) {
      setMovies([...movies, ...moviesData.results])
    } else {
      setMovies(moviesData.results);
    }
    setLoading(false);
  };  

  useEffect(() => {
    fetchMoviesData();
  }, []);

  const fetchBestRatedData = async (bestRated) => {
    setLoading(true);
    const moviesData = await apiFetcher(null, pageNumber, null, null, bestRated);

    if (pageNumber > 1) {
      setMovies([...movies, ...moviesData.results])
    } else {
      setMovies(moviesData.results);
    }
    setLoading(false);
  };  

  useEffect(() => {
    fetchMoviesData();
  }, []);
  

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
    fetchCategoriesData(categoryId);
  };
  
  
  //Scroll event listener 
  useEffect(() => {
    const handelScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight * 0.9){
        setPageNumber(pageNumber +1);
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
      fetchBestRatedData={fetchBestRatedData} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePageView
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              category={category}
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