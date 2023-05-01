import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      items: [
        {
          title: 'Snatch',
          price: 9.99,
          image: 'https://picsum.photos/id/237/200/300'
        },
        {
          title: 'Fight Club',
          price: 12.99,
          image: 'https://picsum.photos/id/238/200/300'
        },
        {
          title: 'Seven',
          price: 14.99,
          image: 'https://picsum.photos/id/239/200/300'
        }
      ]
    },
  reducers: {
    addToCart: (state, action) => {
      const found = state.items.find(
        (cartItem) => cartItem.product.title === action.payload.title
      );
      if (found) {
        const newState = state.items.map((cartItem) => {
          if (cartItem.product.title === action.payload.title) {
            return { ...cartItem, count: cartItem.count + 1 };
          } else {
            return cartItem;
          }
        });
        state.items = newState;
      } else {
        state.items.push({ product: action.payload, count: 1 });
      }
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

