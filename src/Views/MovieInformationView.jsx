import { useLocation } from 'react-router-dom';
import Movie from '../Model/Movie';
import './CSS/MovieInformationView.css';

const MovieInformationView = () => {
    const location = useLocation();
    const movie = location.state.movie;
    const posterWidth = 500;

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

export default MovieInformationView;
