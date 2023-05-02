import './Movie.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";


const Movie = ({ props, withButton, withDescription, navigationClick, posterWidth}) => {

    const dispatch = useDispatch();
  
    // Add this function to handle the addToCart action
    const addToCartHandler = () => {
      dispatch(addToCart({
        title: props.title,
        price: finalPrice,
        imageURL: posterUrl
      }));
    };

    const moviePriceMakerAlgoritm = (props.vote_average * 7) + (props.popularity / 2);
    let finalPrice;

    const largeImage = posterWidth > 200;
    const imageSizeInPixels = posterWidth + 'px';


    switch (true) {
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
        default:
            finalPrice = 249;
            break;
    }

    const posterPath = props.poster_path;
    const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;


    return (

            //Sets max-width or regular width depending on the image size
            //so that flex box does not break due to a fixed width on a larger image.
            
            <div className="movieContainer" style={{
            width: largeImage ? '' : imageSizeInPixels,
            maxWidth: largeImage ? imageSizeInPixels : 'none'
            }}>

            <img onClick={navigationClick} src={posterUrl} alt={'The cover of: ' + props.original_title} />
            {
                withButton ? (
                    <div className='addButton'>
                        <button onClick={addToCartHandler}>+ Add to cart</button>
                    </div>
                ) : null
            }
            <div className='movieInfoContainer'>
                <p className='title'>{props.original_title}</p>
                <p className='price'>{finalPrice}:-</p>
            </div>
            {
                withDescription ? (
                    <div>
                        <p>{props.overview}</p>
                        <p>Original language: {props.original_language}</p>
                        <p>Average rating: {props.vote_average}</p>
                    </div>

                ) : null

            }

        </div>

    )
}

export default Movie;