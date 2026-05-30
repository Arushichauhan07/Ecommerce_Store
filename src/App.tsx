import { BrowserRouter, Routes, Route } from "react-router-dom";

// PAGES 
import Dashboard from "./pages/Dashboard";
import Layout from "./Layout";
import Products from "./pages/Products";
import ProductShow from "./pages/ProductShow";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/shop" element={<ProductShow />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
