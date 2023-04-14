import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
  quantity: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      state.items = [...state.items, item];
      state.quantity = state.items.length;
      state.total = state.items.reduce((acc, item) => acc + item.price, 0);
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      state.items = state.items.filter(cartItem => cartItem.id !== item);
      state.quantity = state.items.length;
      state.total = state.items.reduce((acc, item) => acc + item.price, 0);
    },
    emptyCart: (state) => {
      state = initialState;
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export const selectCartItems = state => state.cart.items;

export default cartSlice.reducer;