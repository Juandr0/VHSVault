const apiFetcher = async (searchTerm , pageNumber, idFetch, category, bestRated) => {
 
  const apiKey = '4d05f47d22d396a78fc18c0d7c1be300';
  let url = ''
  
  if (searchTerm) {
    url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchTerm}&page=${pageNumber}&include_adult=false`;
  } else if (idFetch) {
    url = `https://api.themoviedb.org/3/movie/${idFetch}?api_key=${apiKey}&language=en-US`;
  } else if (category) {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&primary_release_date.lte=2005-12-31&vote_count.gte=1000&page=${pageNumber}&with_genres=${category}`;

  } else if (bestRated) {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&primary_release_date.lte=2005-12-31&vote_count.gte=1000&page=${pageNumber}`;

  } else  {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&primary_release_date.lte=2005-12-31&vote_count.gte=1000&page=${pageNumber}`;
  }

  try {
    const apiCall = await fetch(url);
    if (apiCall.status === 404) {
      return 404;
    }
    const data = await apiCall.json();
    console.log(  
      'searchterm: ' + searchTerm,
      'idFetch: ' + idFetch,
      'category: ' + category,
      'bestRated: ' + bestRated,
      'pageNumber: ' + pageNumber
    )
    return data;
  } catch (error) {
    console.log('error: ' +error);
  }


}


export default apiFetcher;
