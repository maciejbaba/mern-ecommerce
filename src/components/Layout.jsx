import { Outlet } from "react-router-dom";
import Header from "./Header";
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
    </>
  );
};

export default Layout;
