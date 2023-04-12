import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      {/* very hacky */}
      <div style={{ marginTop: "5rem" }}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
