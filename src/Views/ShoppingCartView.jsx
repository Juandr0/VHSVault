import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, clearCart } from "../features/cartSlice";
import {
  setOrderDetails,
  selectOrderDetails,
  setName,
  setEmail,
  setAddress,
  setPhone,
} from "../features/orderSlice";
import "./CSS/ShoppingCartView.css";
import ShoppingCartMovie from "../Model/ShoppingCartMovie";
import { useEffect, useState } from "react";
import FirebaseConfig from "../Components/FireBaseConfig";
import { setDoc, doc, getDoc } from "firebase/firestore";

const MovieCard = ({ movie, index }) => {
  return <ShoppingCartMovie props={movie} showButtons={true} />;
};

const ShoppingCartView = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const cartItems = useSelector(selectCartItems);
  const total = cartItems.reduce((acc, curr) => acc + curr.price * curr.count, 0);
  const dispatch = useDispatch();
  const clearCartHandler = () => dispatch(clearCart());
  const db = FirebaseConfig.getFirestoreInstance();
  const navigate = useNavigate();

  const [name, setNameValue] = useState("");
  const [email, setEmailValue] = useState("");
  const [address, setAddressValue] = useState("");
  const [phone, setPhoneValue] = useState("");

  useEffect(() => {
    if (name != "") {
      dispatch(setName(name));
      console.log("updated name " + name)
    }

  }, [name]);

  useEffect(() => {
    if (email != "") {
      dispatch(setEmail(email));
    }
  }, [email]);

  useEffect(() => {
    if (address != ""){
      dispatch(setAddress(address));
    }
  }, [address]);

  useEffect(() => {
   if (phone != ""){
    dispatch(setPhone(phone));
   }
  }, [phone]);

  useEffect(() => {
    if (orderNumber !== "") {
      incrementDBOrderNumber();

      dispatch(setOrderDetails({ orderNumber, items: cartItems, total }));
      clearCartHandler();
      navigate("/confirmation");
    }
  }, [orderNumber]);

  const fetchOrderNumber = async () => {
    const docRef = doc(db, "orders", "orderNumber");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const dataAsString = JSON.stringify(docSnap.data().nextNumber);
      setOrderNumber(dataAsString);
      return dataAsString;
    }
  };

  const incrementDBOrderNumber = () => {
    const docRef = doc(db, "orders", "orderNumber");
    const newOrderNumber = parseInt(orderNumber) + 1;
    setDoc(docRef, { nextNumber: newOrderNumber });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchOrderNumber();
  };

  return (
    <div>
      <h2 id="shoppingCartCheckout">Checkout</h2>
      <div className={cartItems.length === 0 ? "" : "shopping-cart"}>
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
              <p className="item-count">
                {cartItems.reduce((acc, curr) => acc + curr.count, 0)}{" "}
                {cartItems.reduce((acc, curr) => acc + curr.count, 0) > 1 ? "items" : "item"} in the cart
              </p>
              <p className="total">Total: ${(total).toFixed(2)}</p>
              <h3>Shipping information</h3>
              <form className="checkoutForm" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setNameValue(e.target.value)}
                  required
                />
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmailValue(e.target.value)}
                  required
                />
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddressValue(e.target.value)}
                  required
                />
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhoneValue(e.target.value)}
                  required
                />
                <button type="submit" className="confirmation-button">
                  Place Order
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartView;
