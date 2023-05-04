import Movie from '../Model/Movie';
import { useState, useEffect } from 'react';
import './CSS/HomePageView.css';
import { useNavigate } from 'react-router-dom';
import apiFetcher from '../Components/apiFetcher';

const HomePageView = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();
  const posterWidth = 200;


  const navigationClick = (movie) => {
    const id = movie.id;
    navigate(`/movie/${id}`, { state: { movie } });
  };

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

  const handleSubmit = async (e) => {
    setMovies([]);
    setPageNumber(1);
    e.preventDefault();
    fetchMoviesData(searchTerm);
  };


  //Scroll event listener 
  useEffect(() => {
    const handelScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight){
        setPageNumber(pageNumber +1);
      }
    }
    window.addEventListener('scroll', handelScroll);
  }, [pageNumber]); 


  return (
    <div>
      <form onSubmit={handleSubmit}  >
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleSubmit(e)}
          />
          <button type="submit">Search</button>
        </div>
      </form>
      {loading && <div>Loading...</div>}
      <div className="home_movieGridContainer">
        {movies.map((movie, index) => (
          <Movie
            key={index}
            props={movie}
            withAddButton={true}
            withDescription={false}
            navigationClick={() => navigationClick(movie)}
            posterWidth={posterWidth}
            runPriceAlgoritm={true}
            clickableImage={true}
          />
        ))}
      </div>
    </div>
  );
};

/*  <Link to={{
                        pathname: `/movie/${props.id}`,
                        state: { props }
                    }}>
                    */


export default HomePageView;




