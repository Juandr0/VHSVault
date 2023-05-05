import { json, useLocation } from 'react-router-dom';
import Movie from '../Model/Movie';
import './CSS/MovieInformationView.css';
import apiFetcher from '../Components/apiFetcher';
import { useEffect, useState } from 'react';

const MovieInformationView = () => {
    const location = useLocation();
    const [movie, setMovie] = useState(location.state?.movie);

    useEffect(() => {
        if (!movie) {
            const providedMovieId = location.pathname.split('/')[2];
            const fetchMovieData = async () => {
                const movieData = await apiFetcher(null, null, providedMovieId);
                    setMovie(movieData);   
            }
            fetchMovieData();       
        }
    }, [location.pathname]);


    const posterWidth = 500;
    console.log('moviedata \n\n\n\n\n' + movie);
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
    }

 
}

export default MovieInformationView;
