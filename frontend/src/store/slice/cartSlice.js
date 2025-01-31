import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalPrice: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase: (state, action) => {
      state.cartItems.forEach((item) => {
        if (item.id === action.payload.id) {
          item.quantity += 1;
        }
      });
    },
    decrease: (state, action) => {
      state.cartItems.forEach((item) => {
        if (item.id === action.payload.id && item.quantity > 0) {
          item.quantity -= 1;
        }
      });
    },
    totalCartValue: (state) => {
      state.totalPrice = 0; // 
      state.cartItems.forEach((item) => {
        state.totalPrice += item.price * item.quantity;
      });
    },
  },
});

export default cartSlice.reducer;
export const { decrease, increase, totalCartValue } = cartSlice.actions;
