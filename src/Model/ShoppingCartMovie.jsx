
import React from 'react';
import { addToCart, removeFromCart} from "../features/cartSlice";
import { useDispatch } from "react-redux";
import CalculateMoviePrice from '../Components/CalculateMoviePrice';
import './ShoppingCartMovie.css';




const ShoppingCartMovie = ({ props, 
                 withRemoveButton,
                }) => {

    const dispatch = useDispatch();

    //Skapa en + & - dispatcher

    const finalPrice = CalculateMoviePrice(props);


    const posterUrl = props.poster_path 
    ? `https://image.tmdb.org/t/p/w500${props.poster_path}`
    : `https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png`;

    return (
        <div className="shoppingCart">
          <div className="shoppingCartMovieContainer">
            <img src={posterUrl} alt={"The cover of: " + props.title} />
            <div className="cartMovieContainer">
              <p className="cartMovieTitle">{props.title}</p>
              <div className="cartItemProperties">
                <div className="cartAmountContainer">
                  <button>-</button>
                  <label htmlFor="amount">
                    <input
                      type="number"
                      id="amount"
                      className="cartMovieAmount"
                      pattern="[0-9]"
                      min="1"
                      max="999"
                    />
                  </label>
                  <button>+</button>
                </div>
                <p className="cartMoviePrice">${props.price}</p>
              </div>
            </div>
            <br />
          </div>
        </div>
      );
      
      

}

export default ShoppingCartMovie;