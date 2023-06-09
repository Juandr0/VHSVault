import { useSelector } from 'react-redux';
import { selectOrderDetails } from '../features/orderSlice';
import '../Views/CSS/OrderConfirmationView.css'
import ShoppingCartMovie from '../Model/ShoppingCartMovie';

const OrderConfirmationView = () => {
  const orderDetails = useSelector(selectOrderDetails);


  return (
    <div className="order-confirmation">
      <h2>Thank you for your order!</h2>
      <div className="order-details">
        <p>Here are your order details:</p>
        <p>Order number: {orderDetails.orderNumber}</p>
        <p>Name: {orderDetails.name}</p>
        <p>Email: {orderDetails.email}</p>
        <p>Address: {orderDetails.address}</p>
        <p>Phone: {orderDetails.phone}</p>
        <p>Total: ${orderDetails.total.toFixed(2)}</p>
      </div>
      <ul className="order-items">
        {orderDetails.items.map((item, index) => (
          <li key={index}>
            <ShoppingCartMovie props={item} showButtons={false} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderConfirmationView;