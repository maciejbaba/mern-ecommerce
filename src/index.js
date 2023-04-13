import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import CartProvider from "./features/cart/CartProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
