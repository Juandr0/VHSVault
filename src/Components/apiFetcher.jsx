const apiFetcher = async (searchTerm , pageNumber, idFetch, category) => {
 
  const apiKey = '4d05f47d22d396a78fc18c0d7c1be300';
  let url = ''
  
  if (searchTerm) {
    url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchTerm}&page=${pageNumber}&include_adult=false`;
  } else if (idFetch) {
    url = `https://api.themoviedb.org/3/movie/${idFetch}?api_key=${apiKey}&language=en-US`;
  } else if (category) {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&vote_count.gte=1000&page=${pageNumber}&with_genres=${category}`;
  } else {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&primary_release_date.lte=2005-12-31&vote_count.gte=1000&page=${pageNumber}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  // const categoriesURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
  
  // fetch(categoriesURL)
  // .then(response => response.json())
  // .then(data => {
  //   const genres = data.genres;
  //   genres.forEach(genre => console.log(genre.name));
  // })
  // .catch(error => console.error(error));
  
  return data;
}


export default apiFetcher;
