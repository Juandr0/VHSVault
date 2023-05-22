import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    name: '',
    email: '',
    address: '',
    phone: '',
    items: [],
    total: 0,
    orderDetails: {},
    //image: null,
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },

    setOrderDetails: (state, action) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.orderDetails = action.payload;
      //state.image = action.payload.image;
    },
  },
});

export const {
  setName,
  setEmail,
  setAddress,
  setPhone,
  setOrderDetails,
} = orderSlice.actions;
export const selectOrderDetails = (state) => {
  const { name, email, address, phone, orderDetails } = state.order;
  return { name, email, address, phone, ...orderDetails };
};

export default orderSlice.reducer;
