import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./components/Login";
import Cart from "./components/Cart";
import ItemPage from "./components/ItemPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="cart" element={<Cart />} />
        <Route path=":id" element={<ItemPage />} />
      </Route>
    </Routes>
  );
}

export default App;
