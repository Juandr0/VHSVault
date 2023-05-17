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
    setOrderDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.phone = action.payload.phone;
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.orderDetails = action.payload;
      //state.image = action.payload.image;
    },
  },
});

export const { setOrderDetails } = orderSlice.actions;
export const selectOrderDetails = state => state.order.orderDetails;

export default orderSlice.reducer;
