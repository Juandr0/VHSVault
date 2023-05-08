import { createSlice } from '@reduxjs/toolkit';
import './cartSlice.css';


const showNotification = async (message) => {
  const notificationContainer = document.createElement('div');
  notificationContainer.classList.add('notificationContainer');

  const notificationDiv = document.createElement('div');
  notificationDiv.classList.add('notificationWindow');
  notificationDiv.textContent = message;
  notificationContainer.appendChild(notificationDiv);
  document.body.appendChild(notificationContainer);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  notificationDiv.classList.add('hide');
  await new Promise((resolve) => setTimeout(resolve, 300));
  document.body.removeChild(notificationContainer);
};



const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      items: [

      ]
    },
  reducers: {
    addToCart: (state, action) => {
      const found = state.items.find((cartItem) => cartItem.title === action.payload.title);
      if (found) {
        const newState = state.items.map((cartItem) => {
          if (cartItem.title === action.payload.title) {
            return { ...cartItem, count: cartItem.count + 1 };
          } else {
            return cartItem;
          }
        });
        state.items = newState;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      showNotification(`Added ${action.payload.title} to the cart`);
    },
    increaseAmount: (state, action) => {
      const newState = state.items.map((cartItem) => {
        if (cartItem.product.title === action.payload.title) {
          return { ...cartItem, count: cartItem.count + 1 };
        } else {
          return cartItem;
        }
      });
      state.items = newState;
    },
    decreaseAmount: (state, action) => {
      const newState = state.items.map((cartItem) => {
        if (cartItem.product.title === action.payload.title) {
          return { ...cartItem, count: cartItem.count - 1 };
        } else {
          return cartItem;
        }
      });
      state.items = newState;
    },
    removeFromCart: (state, action) => {
        const newState = state.items.filter(
          (cartItem) => cartItem.title !== action.payload
        );
        state.items = newState;
      },        
    clearCart: (state) => {
      state.items = [];
    },
  },
});



export const {
  addToCart,
  clearCart,
  increaseAmount,
  decreaseAmount,
  removeFromCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export default cartSlice.reducer;

