import { createSlice } from "@reduxjs/toolkit";

export const cart = createSlice({
  name: "cart",
  initialState: {
    cartList: []
  },
  reducers: {
    setCart: (state, action) => {
      state.cartList = action.payload;
    }
  }
});

export const { setCart } = cart.actions;
export default cart.reducer;
