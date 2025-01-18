import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Nav/Navbar";
import { useSelector } from "react-redux";

const Layout = () => {
  const location = useLocation();
  const hideNavbar = ["/signup", "/login"];
  const shouldHideNavbar = hideNavbar.includes(location.pathname);
  const { loading } = useSelector((state) => state.auth); // Centralized loading state

  return (
    <div>
      {!shouldHideNavbar  && <Navbar />}
      {loading ? (
        <div className="flex gap-3 flex-col justify-center items-center min-h-screen">
          <div className="spinner"></div>
          <p className="font-bold">Loading....</p>
        </div>
        
      ) : (
        <Outlet />
      )}
      {!loading && <Footer />}
    </div>
  );
};

export default Layout;
