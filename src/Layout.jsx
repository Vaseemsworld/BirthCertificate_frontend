import { Outlet, useLocation } from "react-router-dom";
import { Topbar, Navbar, Footer } from "./components";

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <Topbar />

      {location.pathname === "/" && <Navbar />}

      <Outlet />

      <Footer />
    </>
  );
}
