import './Movie.css';
import React from 'react';
import { addToCart, removeFromCart} from "../features/cartSlice";
import { useDispatch } from "react-redux";
import CalculateMoviePrice from '../Components/CalculateMoviePrice';

const Movie = ({ props,
                withAddButton,
                withRemoveButton,
                withDescription,  
                navigationClick,
                posterWidth,
                runPriceAlgoritm,
                clickableImage,
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


   const finalPrice = CalculateMoviePrice(props);
   const largeImage = posterWidth > 200;
   const imageSizeInPixels = posterWidth + 'px';
   const oneDecimalRating = Math.round(props.vote_average * 10) / 10;


  
   const posterUrl = props.poster_path
   ? `https://image.tmdb.org/t/p/w500${props.poster_path}`
   : `https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png`;




   return (


       //Sets max-width or regular width depending on the image size
       //so that flex box does not break due to a fixed width on a larger image.


       <div className={clickableImage ? 'hoverableImage movieContainer' : 'movieContainer'}  style={{
           width: largeImage ? largeImage : imageSizeInPixels,
           maxWidth: largeImage ? imageSizeInPixels : ''
       }}>
           <img  onClick={clickableImage ? navigationClick : null} src={posterUrl} alt={'The cover of: ' + props.title} />
           {
               //Displays button depending on if withButton is true
               withAddButton ? (
                   <div className='addButton'>
                       <button onClick={addToCartHandler}>+ Add to cart</button>
                   </div>
               ) : null
           }
                {
               //Displays button depending on if withButton is true
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
                       <p>Rating: {oneDecimalRating} / 10</p>
                   </div>


               ) : null
           }
       </div>
   )


}


export default Movie;

