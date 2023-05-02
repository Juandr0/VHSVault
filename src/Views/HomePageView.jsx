import Movie from '../Model/Movie';
import apiFetcher from '../Components/apiFetcher';
import { useEffect, useState } from 'react';
import './CSS/HomePageView.css';
import { useNavigate } from 'react-router-dom';

const HomePageView = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const posterWidth = 200;

  const navigationClick = (movie) => {
    const id = movie.id;
    navigate(`/movie/${id}`, { state: { movie } });
  };

  useEffect(() => {
    const fetchMoviesData = async () => {
      const moviesData = await apiFetcher();
      setMovies(moviesData.results);
      setLoading(false);
    };
    fetchMoviesData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(filteredMovies);
    } else {
      setFilteredMovies(movies);
    }
  }, [searchTerm, movies]);

  if (loading) {
    return <div>Loading..</div>;
  } else {
    return (
            <div>
              <div className="search-container">
                <input 
                  type="text"
                  placeholder="Search movies"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>  
              <div className="home_movieGridContainer">
                {filteredMovies.map((movie, index) => (
                  <Movie
                    key={index}
                    props={movie}
                    withAddButton={true}
                    withDescription={false}
                    navigationClick={() => navigationClick(movie)}
                    posterWidth={posterWidth}
                    runPriceAlgoritm={true}
                  />
                ))}
              </div>
            </div>
          );
  }
};

/*  <Link to={{
                        pathname: `/movie/${props.id}`,
                        state: { props }
                    }}>
                    */
export default HomePageView;
