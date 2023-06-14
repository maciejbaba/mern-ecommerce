import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../items/itemsApiSlice";

export type CartItem = Item & {
  quantity: number;
};

const saveItemsToLocalStorage = (items: CartItem[]) =>
  localStorage.setItem("cartItems", JSON.stringify(items));

const getItemsFromLocalStorage = (): CartItem[] | [] => {
  const items: string | null = localStorage.getItem("cartItems");
  return items ? JSON.parse(items) : [];
};

const removeItemsFromLocalStorage = () => localStorage.removeItem("cartItems");

type CartState = {
  items: CartItem[] | [];
  total: number;
};

const initialState: CartState = {
  items: getItemsFromLocalStorage(),
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>): void => {
      const item = action.payload;
      const itemExists = state.items.find((i) => i.id === item.id);
      if (itemExists) {
        state.items = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        state.items = [...state.items, { ...item, quantity: 1 }];
      }
      state.total = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      saveItemsToLocalStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<CartItem>): void => {
      const item = action.payload;
      state.items = state.items.map((cartItem) => {
        return cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem;
      });
      state.items = state.items.filter((cartItem) => cartItem.quantity > 0);
      state.total = state.items.reduce((acc, item) => acc + item.price, 0);
      saveItemsToLocalStorage(state.items);
    },
    emptyCart: (state): void => {
      removeItemsFromLocalStorage();
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectCartTotal = (state: { cart: CartState }) => state.cart.total;

export default cartSlice.reducer;
