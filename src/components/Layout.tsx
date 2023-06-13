import { Outlet } from "react-router-dom";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      {/* very hacky, used marginTop in order to prevent hiding under header which has position fixed */}
      <div style={{ marginTop: "5rem" }}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
