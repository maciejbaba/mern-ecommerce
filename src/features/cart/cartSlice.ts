import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../items/itemsApiSlice";

const saveItemsToLocalStorage = (items: Item[]) =>
  localStorage.setItem("cartItems", JSON.stringify(items));

const getItemsFromLocalStorage = (): Item[] | [] => {
  const items: string | null = localStorage.getItem("cartItems");
  return items ? JSON.parse(items) : [];
};

const removeItemsFromLocalStorage = () => localStorage.removeItem("cartItems");

type CartState = {
  items: Item[] | [];
  total: number;
  quantity: number;
};

const initialState: CartState = {
  items: getItemsFromLocalStorage(),
  total: 0,
  quantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action): void => {
      const item = action.payload;
      state.items = [...state.items, item];
      state.quantity = state.items.length;
      state.total = state.items.reduce((acc, item) => acc + item.price, 0);
      saveItemsToLocalStorage(state.items);
    },
    removeFromCart: (state, action): void => {
      const item = action.payload;
      state.items = state.items.filter(cartItem => cartItem.id !== item.id);
      state.quantity = state.items.length;
      state.total = state.items.reduce((acc, item) => acc + item.price, 0);
      saveItemsToLocalStorage(state.items);
    },
    emptyCart: (state): void => {
      state = { ...initialState };
      removeItemsFromLocalStorage();
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export default cartSlice.reducer;
