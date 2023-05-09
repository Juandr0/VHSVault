import { json, useLocation } from 'react-router-dom';
import Movie from '../Model/Movie';
import './CSS/MovieInformationView.css';
import apiFetcher from '../Components/apiFetcher';
import { useEffect, useRef, useState } from 'react';
import Error404Message from '../Components/Error404Message';

const MovieInformationView = () => {
    const location = useLocation();
    const [currentUrl, setCurrentUrl] = useState(location.pathname)
    const [movie, setMovie] = useState(location.state?.movie);
    const providedMovieId = location.pathname.split('/')[2];


    useEffect(() => {
        setMovie(undefined);
    }, [location.pathname]);

    useEffect(() => {
        if (!movie) {
            const fetchMovieData = async () => {
                const movieData = await apiFetcher(null, null, providedMovieId);
                    setMovie(movieData);   
            }
            fetchMovieData();       
        }
    }, [location.pathname, movie]);


    const posterWidth = 500;
    if (movie?.title) {
        return (
            <div>
                <Movie 
                    props = {movie}
                    withAddButton={true}
                    withDescription={true}
                    posterWidth={posterWidth}
                    runPriceAlgoritm={true}
                />
            </div>
        )
    } else if (movie === 404){
        return(
            <Error404Message movieId = {providedMovieId}/>
        )
    } else {
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

 
}

export default MovieInformationView;
