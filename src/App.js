import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Cart from "./components/Cart";
import ItemPage from "./components/ItemPage";
import Missing from "./components/Missing";
import Login from "./features/auth/Login";
import Prefetch from "./features/auth/Prefetch";
import UsersList from "./features/users/UsersList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<Prefetch />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<Cart />} />
          <Route path="users" element={<UsersList />}></Route>
          <Route path="item/:id" element={<ItemPage />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
