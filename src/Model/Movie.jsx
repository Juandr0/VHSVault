import './Movie.css';
import React from 'react';

const Movie = ({props}) => {
    const moviePriceMakerAlgoritm =  (props.vote_average * 7) + (props.popularity/2);
    let finalPrice;

    switch (true){
        //Low price
        case (moviePriceMakerAlgoritm <= 49): {
            finalPrice = 49;
            break;
        }

        //Low/medium price
        case (moviePriceMakerAlgoritm <= 79): {
            finalPrice = 79;
            break;
        }

        //medium price
        case (moviePriceMakerAlgoritm <= 99):
            finalPrice = 99;
        break;

        //medium/high price
        case (moviePriceMakerAlgoritm <= 129):
            finalPrice = 129;
        break;
        
        
        //high price
        case (moviePriceMakerAlgoritm <= 149):
            finalPrice = 149;
            break;

        //high/premium price
        case (moviePriceMakerAlgoritm <= 179):
        finalPrice = 179;
        break;

        //Premium price
        case (moviePriceMakerAlgoritm <= 199):
            finalPrice = 199;
            break;

         //Premium/platinum price
         case (moviePriceMakerAlgoritm <= 129):
            finalPrice = 129;
            break;

        //Platinum price
        default : 
            finalPrice = 249;
            break;
        

    }

    const posterPath = props.poster_path;
    const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
    return (
        <div className="movieContainer">
            
            <img src={posterUrl} alt={'The cover of: ' + props.original_title}/>
            <div className='price'> 
                <p>{finalPrice}:-</p>
                <button>+</button>
            </div>
         
        </div>
    )
}

export default Movie;