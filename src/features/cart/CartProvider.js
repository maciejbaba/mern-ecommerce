import { createContext } from 'react';

export const CartContext = createContext([]);

const CartProvider = ({ children }) => {
  const cart = {
    items: [],
    addItem: (item) => {
      cart.items.push(item);
    },
    removeItem: (item) => {
      cart.items = cart.items.filter((cartItem) => cartItem.id !== item.id);
    },
    clear: () => {
      cart.items = [];
    },
  };
  return (
    <CartContext.Provider value={cart}>{children}</CartContext.Provider>
  );
}

export default CartProvider;