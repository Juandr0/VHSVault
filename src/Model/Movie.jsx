import './Movie.css';
import React from 'react';
import { addToCart, removeFromCart} from "../features/cartSlice";
import { useDispatch } from "react-redux";


const Movie = ({ props, 
                 withAddButton, 
                 withRemoveButton,
                 withDescription,   
                 navigationClick, 
                 posterWidth, 
                 runPriceAlgoritm
                }) => {

    const dispatch = useDispatch();

    // Add this function to handle the addToCart action
    const addToCartHandler = () => {
        dispatch(addToCart({
            title: props.title,
            price: finalPrice,
            poster_path: posterUrl
        }));
    };

    const removeFromCartHandler = () => {
        dispatch(removeFromCart(props.title));
    }

    const moviePriceMakerAlgoritm = (props.vote_average * 7) + (props.popularity / 2);
    let finalPrice;

    const largeImage = posterWidth > 200;
    const imageSizeInPixels = posterWidth + 'px';


    switch (runPriceAlgoritm) {
        //Low price
        case (moviePriceMakerAlgoritm <= 49): {
            finalPrice = 4.9;
            break;
        }

        //Low/medium price
        case (moviePriceMakerAlgoritm <= 79): {
            finalPrice = 7.9;
            break;
        }

        //medium price
        case (moviePriceMakerAlgoritm <= 99):
            finalPrice = 9.9;
            break;

        //medium/high price
        case (moviePriceMakerAlgoritm <= 129):
            finalPrice = 12.9;
            break;


        //high price
        case (moviePriceMakerAlgoritm <= 149):
            finalPrice = 14.9;
            break;

        //high/premium price
        case (moviePriceMakerAlgoritm <= 179):
            finalPrice = 17.9;
            break;

        //Premium price
        case (moviePriceMakerAlgoritm <= 199):
            finalPrice = 19.9;
            break;

        //Premium/platinum price
        case (moviePriceMakerAlgoritm <= 129):
            finalPrice = 12.9;
            break;

        //Platinum price
        default:
            finalPrice = 24.9;
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
            <img onClick={navigationClick} src={posterUrl} alt={'The cover of: ' + props.title} />
            {
                //Displays button depending on if argument withButton is true
                withAddButton ? (
                    <div className='addButton'>
                        <button onClick={addToCartHandler}>+ Add to cart</button>
                    </div>
                ) : null
            }
                 {
                //Displays button depending on if argument withButton is true
                withRemoveButton ? (
                    <div className='removeButton'>
                        <button onClick={removeFromCartHandler}>- Remove</button>
                    </div>
                ) : null
            }

            <div className='movieInfoContainer'>
                <p className='title'>{props.title}</p>
                {
                    //Runs price algoritm if true and displays result, otherwise
                    //it displays the value of props.price
                    runPriceAlgoritm ? (
                        <p className='price'>${finalPrice}</p>
                    ) : <p className='price'>${props.price}</p>
                }
            </div>
            {
                    //If withDescription argument is true the paragraphs beneath will
                    //be displayed.
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