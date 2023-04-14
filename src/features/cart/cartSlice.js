import { createSlice } from "@reduxjs/toolkit";

const saveItemsToLocalStorage = items => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const getItemsFromLocalStorage = () => {
  const items = localStorage.getItem("cartItems");
  return items ? JSON.parse(items) : [];
};

const removeItemsFromLocalStorage = () => {
  localStorage.removeItem("cartItems");
};

const initialState = {
  items: getItemsFromLocalStorage(),
  total: 0,
  quantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      state.items = [...state.items, item];
      state.quantity = state.items.length;
      state.total = state.items.reduce((acc, item) => acc + item.price, 0);
      saveItemsToLocalStorage(state.items);
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      state.items = state.items.filter(cartItem => cartItem.id !== item);
      state.quantity = state.items.length;
      state.total = state.items.reduce((acc, item) => acc + item.price, 0);
      saveItemsToLocalStorage(state.items);
    },
    emptyCart: state => {
      state = initialState;
      removeItemsFromLocalStorage();
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export const selectCartItems = state => state.cart.items;

export default cartSlice.reducer;
