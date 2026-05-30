import { useState } from "react";
import { useNavigate } from "react-router-dom";

// COMPONENTS 
import CartDrawer from "../components/CartDrawer";

// ICONS
import { ChevronDown } from "lucide-react";
import { Menu, X, ShoppingCart} from "lucide-react";

// CONTEXT
import { useProducts } from "../context/ProductContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<String>("home");
  const [openCart, setOpenCart] = useState(false);
  const { categories, cartItems } = useProducts();

  const navigate = useNavigate();
  return (
    <>
      <nav data-testid="navbar" className="sticky top-0 z-50 w-full shadow-sm bg-[#0F172A] border-b border-[#E5E7EB]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-lg font-bold text-[#EAE0CF]">EcommMart</h1>

              <p className="text-xs font-bold text-gray-500">Ecommerce Store</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            <button
              onClick={() => {
                navigate("/");
                setActiveTab("home");
              }}
              className={`text-lg font-semibold transition hover:text-[#94A3B8] ${
                activeTab === "home" ? "text-[#94A3B8]" : "text-[#F8FAFC]"
              }`}
            >
              Home
            </button>

            <div className="relative group">
              <button
                className={`text-lg flex items-center font-semibold transition hover:text-[#94A3B8] ${
                  activeTab === "shop" ? "text-[#94A3B8]" : "text-[#F8FAFC]"
                }`}
                onClick={() => {
                  navigate("/products");
                  setActiveTab("shop");
                }}
              >
                Shop
                <ChevronDown size={16} />
              </button>

              <div className="absolute left-0 top-8 invisible z-50 w-64 rounded-2xl border border-gray-100 bg-white p-5 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:opacity-100">
                <div className="grid grid-cols-2 gap-4 cursor-pointer">
                  {categories.map((item) => (
                    <p
                      onClick={() => navigate(`/shop?category=${item.id}`)}
                      className=" hover:text-[#22D3EE]"
                    >
                      {item?.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group">
              <button
                className={`text-lg font-semibold transition hover:text-[#94A3B8] ${
                  activeTab === "clothes" ? "text-[#94A3B8]" : "text-[#F8FAFC]"
                }`}
                onClick={() => {
                  navigate("/shop?category=1");
                  setActiveTab("clothes");
                }}
              >
                Clothes
              </button>
            </div>

            <div className="relative group">
              <button
                className={`text-lg font-semibold transition hover:text-[#94A3B8] ${
                  activeTab === "shoes" ? "text-[#94A3B8]" : "text-[#F8FAFC]"
                }`}
                onClick={() => {
                  navigate("/shop?category=4");
                  setActiveTab("shoes");
                }}
              >
                Shoes
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="hidden items-center gap-3 lg:flex">
            <button
              className="relative rounded-full bg-gray-100 p-3 transition hover:bg-gray-200"
              onClick={() => setOpenCart(true)}
            >
              <ShoppingCart className="h-5 w-5 text-gray-700" />

              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                {cartItems.length}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl bg-gray-100 p-2 lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            mobileMenuOpen ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <div className="space-y-4 border-t border-gray-200 bg-white px-4 py-5">
            {/* Mobile Links */}
            <div className="flex flex-col gap-4">
              <div
                onClick={() => navigate("/")}
                className="text-sm font-medium text-blue-600"
              >
                Home
              </div>

              <div
                onClick={() => navigate("/products")}
                className="text-sm font-medium text-gray-600"
              >
                Shop
              </div>

              <div
                onClick={() => navigate("/shop?category=1")}
                className="text-sm font-medium text-gray-600"
              >
                Clothes
              </div>

              <div
                onClick={() => navigate("/shop?category=4")}
                className="text-sm font-medium text-gray-600"
              >
                Shoes
              </div>
            </div>

            {/* Mobile Icons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                className="relative rounded-2xl bg-gray-100 p-3 cursor-pointer"
                onClick={() => setOpenCart(true)}
              >
                <ShoppingCart className="h-5 w-5 text-gray-700" />

                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                  {cartItems.length}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />
    </>
  );
};

export default Navbar;
