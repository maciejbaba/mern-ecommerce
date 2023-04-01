import { Outlet } from "react-router-dom";
import Header from "./Header"
import Footer from "./Footer"


const Layout = () => {
  return (
    <>
      <Header />
      {/* very hacky */}
      <div style={{"margin-top": "5rem"}}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
