import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const Cartslice = createSlice({
  name: "cart",
  initialState: savedCart,
  reducers: {

    add: (state, action) => {
      const item = state.find(i => i._id === action.payload._id);

      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    remove: (state, action) => {
      const updatedCart = state.filter(
        item => item._id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    },

    incrementQty: (state, action) => {
      const item = state.find(i => i._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    decrementQty: (state, action) => {
      const item = state.find(i => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    }

  }
});

export const { add, remove, incrementQty, decrementQty } = Cartslice.actions;
export default Cartslice.reducer;