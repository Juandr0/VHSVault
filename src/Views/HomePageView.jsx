import Movie from '../Model/Movie';
import { useState, useEffect } from 'react';
import './CSS/HomePageView.css';
import { useNavigate } from 'react-router-dom';

const HomePageView = ({ movies, loading, fetchMoviesData }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();
  const posterWidth = 200;

  const navigationClick = (movie) => {
    const id = movie.id;
    navigate(`/movie/${id}`, { state: { movie } });
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

export default HomePageView;

