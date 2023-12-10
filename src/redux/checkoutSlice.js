import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shippingAddress: {},
}

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    SAVE_SHIPPING_ADDRESS: (state, action) => {
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
      state.shippingAddress = action.payload;
    },
    CLEAR_SHIPPING_ADDRESS: (state) => {
      window.localStorage.removeItem("shippingAddress")
      state.shippingAddress = []
    }
  }
});

export const { CLEAR_SHIPPING_ADDRESS, SAVE_SHIPPING_ADDRESS } = checkoutSlice.actions

export default checkoutSlice.reducer
