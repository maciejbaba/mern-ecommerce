import { Outlet } from "react-router-dom";
import Header from "./Header"
import Nav from "./Nav";
import Footer from "./Footer"


const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
