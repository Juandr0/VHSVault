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
    items: [],
    cartCount: 0,
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
      state.cartCount++;
      state.total = state.items.reduce((acc, curr) => acc + curr.price * curr.count, 0);
    },
    increaseAmount: (state, action) => {
      const newState = state.items.map((cartItem) => {
        if (cartItem.title === action.payload.title) {
          return { ...cartItem, count: cartItem.count + 1 };
        } else {
          return cartItem;
        }
      });
      state.items = newState;
      state.cartCount++;
    },
    decreaseAmount: (state, action) => {
      const newState = state.items.map((cartItem) => {
        if (cartItem.title === action.payload.title) {
          return { ...cartItem, count: cartItem.count - 1 };
        } else {
          return cartItem;
        }
      });
      state.items = newState;
      state.cartCount--;
    },
    removeFromCart: (state, action) => {
      const currentItem = state.items.find((cartItem) => cartItem.title === action.payload);
      console.log('före ' + state.cartCount)
      state.cartCount = state.cartCount - currentItem.count;
      console.log('efter ' + state.cartCount)
      const newState = state.items.filter((cartItem) => cartItem.title !== action.payload);
      state.items = newState;
    },
    clearCart: (state) => {
      state.items = [];
      state.cartCount = 0;
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
export const selectCartCount = (state) => state.cart.cartCount;
export default cartSlice.reducer;

