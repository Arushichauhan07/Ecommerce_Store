import { Outlet } from "react-router-dom";

// COMPONENTS 
import Slider from "./components/Slider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div className="app-layout">
      <Slider />
      <div className="top-0">
        <Navbar />
      </div>

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
