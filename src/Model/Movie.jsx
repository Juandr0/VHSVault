

const Movie = ({props}) => {
    const posterPath = props.poster_path;
    const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
    return (
        <div className="MovieContainer">
            <h3>{props.original_title}</h3>
            <img src={posterUrl} alt={'The cover of the movie ' + props.original_title} width={150}/>
            <div>
                <p>{'20'}:-</p>
                <button>+</button>
            </div>
         
        </div>
    )
}

export default Movie;