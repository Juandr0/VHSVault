import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, selectCartItems, clearCart } from "../features/cartSlice";
import { setOrderDetails } from "../features/orderSlice";
import './CSS/ShoppingCartView.css';
import ShoppingCartMovie from '../Model/ShoppingCartMovie';

const MovieCard = ({ movie, index }) => {
  const dispatch = useDispatch();
  const removeFromCartHandler = () => dispatch(removeFromCart(movie.title));
  const posterWidth = 200;

  // return (
  //   <div className="movie-card" key={`${movie.title}-${index}`}>
  //     <img src={movie.imageURL} alt={movie.title} className="movie-cover" />
  //     <div className="movie-info">
  //       <h3 className="movie-title">{movie.title}</h3>
  //       <p className="movie-price">${movie.price}</p>
  //       <div className="trash-icon" onClick={removeFromCartHandler}>
  //         🗑️
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <ShoppingCartMovie props={movie} />
  )

}

const ShoppingCartView = () => {
  const cartItems = useSelector(selectCartItems);
  const total = cartItems.reduce((acc, curr) => acc + curr.price, 0);
  const dispatch = useDispatch();
  const clearCartHandler = () => dispatch(clearCart());
  const placeOrderHandler = () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    dispatch(setOrderDetails({ name, email, address, phone, items: cartItems, total }));
  };

  return (
    <div>
    <h2 id="shoppingCartCheckout">Checkout</h2>
    <div className="shopping-cart">
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        
        <div className="checkoutContainer">
          <div>
            {cartItems.map((item, index) => (
              <MovieCard key={index} movie={item} index={index} />
            ))}
          </div>
          <div className="checkoutInputField">
          <p className="item-count">{cartItems.length} items in the cart</p>
            <p className="total">Total: ${total.toFixed(2)}</p>
        
            <h3>Shipping information</h3>
            <form className="checkoutForm">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" required />
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required />
              <label htmlFor="address">Address</label>
              <input type="text" id="address" required />
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" required />
            </form>
            <Link to="/confirmation" className="confirmation-button" onClick={placeOrderHandler}>
              Place Order
            </Link>
            <button className="clear-cart-button" onClick={clearCartHandler}>Clear Cart</button>
          </div>

        </div>
      )}
    </div>
    </div>
    
  );
}

export default ShoppingCartView;









