import Movie from '../Model/Movie';
import apiFetcher from '../Components/apiFetcher';
import { useEffect, useState } from 'react';
import './CSS/HomePageView.css';
import {useNavigate} from 'react-router-dom';

const HomePageView = () => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();


    const navigationClick = (movie) => {
        const id = movie.id
        navigate(`/movie/${id}`, {state: {movie}}) ;
    };


    useEffect(() => {
        const fetchMoviesData = async () => {
            const moviesData = await apiFetcher();
            setMovies(moviesData.results);
            setLoading(false);
        };
        fetchMoviesData();
    }, []);

 

    if (loading) {
        return <div>Loading..</div>
    } else {
        return (
            <div className='home_movieGridContainer'>

                {movies.map((movie, index) => (
                        <Movie 
                            key={index} 
                            props={movie} 
                            withButton={true} 
                            withDescription={false} 
                            navigationClick={() => navigationClick(movie)}
                            posterWidth={200}
                            />
                ))}
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
