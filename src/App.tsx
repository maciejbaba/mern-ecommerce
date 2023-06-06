import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import ItemPage from "./features/items/ItemPage";
import Missing from "./components/Missing";
import Login from "./features/auth/Login";
import Prefetch from "./features/auth/Prefetch";
import UsersList from "./features/users/UsersList";
import NewUser from "./features/users/NewUser";
import UserPage from "./features/users/UserPage";
import NewItem from "./features/items/NewItem";
import ItemsList from "./features/items/ItemsList";
import EditUser from "./features/users/EditUser";
import Register from "./features/auth/Register";
import Cart from "./features/cart/Cart";
import Checkout from "./components/Checkout";
import ManageItemsList from "./features/items/ManageItemsList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<Prefetch />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="cart">
            <Route index element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path="newUser" element={<NewUser />} />
            <Route path=":id" element={<UserPage />} />
            <Route path="editUser/:id" element={<EditUser />} />
          </Route>
          <Route path="items">
            <Route index element={<ItemsList />} />
            <Route path="manage" element={<ManageItemsList />} />
            <Route path="item/:id" element={<ItemPage />} />
            <Route path="newItem" element={<NewItem />} />
          </Route>
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
