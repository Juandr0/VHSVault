import { json, useLocation } from 'react-router-dom';
import Movie from '../Model/Movie';
import './CSS/MovieInformationView.css';
import apiFetcher from '../Components/apiFetcher';
import { useEffect, useRef, useState } from 'react';

const MovieInformationView = () => {
    const location = useLocation();
    const [currentUrl, setCurrentUrl] = useState(location.pathname)
    const [movie, setMovie] = useState(location.state?.movie);


    useEffect(() => {
        setMovie(undefined);
    }, [location.pathname]);

    useEffect(() => {
        if (!movie) {
            console.log('function running');
            const providedMovieId = location.pathname.split('/')[2];
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
    } else {
        return(
            <div>
                <h1>Loading... Does the url exist?</h1>
            </div>
        )
    }

 
}

export default MovieInformationView;
