import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    // {
    //   pizzaId: 12,
    //   name: "Mediterranean",
    //   quantity: 0,
    //   totalPrice: 32,
    //   unitPrice: 32,
    // },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart = [...state.cart, action.payload];
    },
    increaseItem(state, action) {
      const item = state.cart.find((el) => el.pizzaId === action.payload);
      if (item.quantity >= 10) return;

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((el) => el.pizzaId !== action.payload);
    },
    decreaseItem(state, action) {
      const item = state.cart.find((el) => el.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) {
        // ** use reducer function inside another reducer function
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addItem, deleteItem, increaseItem, decreaseItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const getTotalQuantity = (state) => {
  return state.cart.cart.reduce((acc, cur) => acc + cur.quantity, 0);
};
export const getTotalPrice = (state) => {
  return state.cart.cart.reduce((acc, cur) => acc + cur.totalPrice, 0);
};
export const getCurrentQuantityById = (id) => (state) => {
  return state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
};
