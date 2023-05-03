import { useSelector } from 'react-redux';
import { selectOrderDetails } from '../features/orderSlice';

const OrderConfirmationView = () => {
  const orderDetails = useSelector(selectOrderDetails);

  return (
    <div className="order-confirmation">
      <h2>Thank you for your order!</h2>
      <p>Here are your order details:</p>
      <p>Name: {orderDetails.name}</p>
      <p>Email: {orderDetails.email}</p>
      <p>Address: {orderDetails.address}</p>
      <p>Phone: {orderDetails.phone}</p>
      <p>Total: ${orderDetails.total.toFixed(2)}</p>
      <p>Items:</p>
      <ul>
        {orderDetails.items.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderConfirmationView;