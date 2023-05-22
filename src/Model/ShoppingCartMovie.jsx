import React from 'react';
import { addToCart, removeFromCart, increaseAmount, decreaseAmount } from "../features/cartSlice";
import { useDispatch } from "react-redux";
import CalculateMoviePrice from '../Components/CalculateMoviePrice';
import './ShoppingCartMovie.css';

const ShoppingCartMovie = ({ props, showButtons }) => {
  const dispatch = useDispatch();

  const incrementMovieAmount = () => {
    dispatch(increaseAmount(props));
  };

  const decreaseMovieAmount = () => {
    dispatch(decreaseAmount(props));
    if (props.count <= 1) {
      removeFromCartHandler();
    }
  };

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(props.title));
  };

  const posterUrl = props.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.poster_path}`
    : `https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png`;

  // Add a CSS class conditionally based on showButtons value
  const cartAmountContainerClass = showButtons ? 'cartAmountContainer' : 'cartAmountContainerNoBorder';

  return (
    <div>
      <div className="shoppingCart">
        <div className="shoppingCartMovieContainer">
          <img src={posterUrl} alt={"The cover of: " + props.title} />
          <div className="cartMovieContainer">
            <p className="cartMovieTitle">{props.title}</p>
            <div className="cartItemProperties">
              <div className={cartAmountContainerClass}>
                {showButtons && (
                  <>
                    <button onClick={decreaseMovieAmount} className="cartButtonMinus">-</button>
                    <label htmlFor="amount">
                      <input
                        type="number"
                        value={props.count}
                        id="amount"
                        className="cartMovieAmount"
                        min="1"
                        max="999"
                        minLength="0"
                        maxLength="3"
                        onInput={(e) => {
                          e.target.value = e.target.value.slice(0, 3);
                        }}
                      />
                    </label>
                    <button onClick={incrementMovieAmount} className="cartButtonPlus">+</button>
                  </>
                )}
              </div>
              {showButtons && <i className="fa fa-trash-o cartTrash" onClick={removeFromCartHandler} />}
              <p className="cartMoviePrice">${(props.price * props.count).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartMovie;
