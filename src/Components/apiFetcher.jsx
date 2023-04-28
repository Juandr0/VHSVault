import { useState, useEffect } from 'react';

const apiFetcher = async (props) => {
  const apiKey = '4d05f47d22d396a78fc18c0d7c1be300';
  const baseURL = `https://api.themoviedb.org/3/?api_key=${apiKey}`;
  const randomMovies = 'https://api.themoviedb.org/3/discover/movie?api_key=4d05f47d22d396a78fc18c0d7c1be300&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&primary_release_date.lte=2005-12-31&with_genres=28,53,27&vote_count.gte=1000&page=1';


    const response = await fetch(randomMovies);
    const data = await response.json();
    const parsedData = (JSON.parse(JSON.stringify(data)));


  return parsedData;
};

export default apiFetcher;
