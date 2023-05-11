
import React from 'react';
import { addToCart, removeFromCart} from "../features/cartSlice";
import { useDispatch } from "react-redux";
import CalculateMoviePrice from '../Components/CalculateMoviePrice';




const ShoppingCartMovie = ({ props, 
                 withRemoveButton,
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


    const finalPrice = CalculateMoviePrice(props);



    const posterUrl = props.poster_path 
    ? `https://image.tmdb.org/t/p/w500${props.poster_path}`
    : `https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png`;


    return (
        <div>
            <img src={posterUrl} alt={'The cover of: ' + props.title} />
                <div className=''>
                    <p className=''>{props.title}</p>
                    <p className=''>${props.price}</p>
            </div>
        </div>
    )

}

export default ShoppingCartMovie;