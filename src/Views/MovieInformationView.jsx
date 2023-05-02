import { useLocation } from 'react-router-dom';
import Movie from '../Model/Movie';

const MovieInformationView = () => {
    const location = useLocation();
    const movie = location.state.movie;
    const posterWidth = "500px"

    return (
        <div>
            <Movie 
                props = {movie}
                withButton={true}
                withDescription={true}
                posterWidth={posterWidth}
            />
        </div>
    )
}

export default MovieInformationView;
