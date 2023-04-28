import Movie from '../Model/Movie';
import apiFetcher from '../Components/apiFetcher';
import { useEffect, useState } from 'react';

const HomePageView = () => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
  
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
                    <Movie key={index} props={movie} />
                ))}
            </div>
        );
    }
};

export default HomePageView;
