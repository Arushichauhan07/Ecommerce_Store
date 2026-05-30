import { useEffect } from "react";

// ICONS 
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";

// CONTEXT 
import { useProducts } from "../context/ProductContext";

// PAGE 
import OrderSuccessPage from "./OrderSuccessPages";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const {
    cartItems,
    setCartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    setOpenOrderPage,
    openOrderPage,
  } = useProducts();

  // Prevent background scrolling
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const deliveryFee = subtotal > 0 ? 50 : 0;

  const total = subtotal + deliveryFee;

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 right-0 h-screen w-full sm:w-[520px] bg-[#0F172A] z-[100] shadow-2xl flex flex-col transform transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#334155]">
          <div>
            <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
            <p className="text-sm text-[#94A3B8] mt-1">
              {totalItems} item{totalItems !== 1 && "s"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-[#1E293B] rounded-full transition text-[#94A3B8] hover:text-white"
          >
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[#475569]">
              <ShoppingBag size={70} />
              <h3 className="text-2xl font-semibold mt-5 text-[#94A3B8]">
                Your cart is empty
              </h3>
              <p className="mt-2 text-sm text-[#475569]">
                Add products to continue shopping
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b border-[#334155] pb-5"
              >
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-2xl"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-white line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-[#94A3B8] text-sm mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <h4 className="font-bold text-lg text-[#22D3EE]">
                      ₹{item.price}
                    </h4>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-8 h-8 flex items-center justify-center border border-[#334155] text-[#94A3B8] rounded-lg hover:bg-[#1E293B] hover:text-white transition"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="font-medium min-w-[20px] text-center text-white">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-8 h-8 flex items-center justify-center border border-[#334155] text-[#94A3B8] rounded-lg hover:bg-[#1E293B] hover:text-white transition"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-2 text-[#F43F5E] text-sm mt-4 hover:text-[#F43F5E]/70 transition"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-[#334155] p-5 space-y-4 bg-[#1E293B]">
            <div className="flex justify-between text-[#94A3B8]">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-[#94A3B8]">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>

            <div className="flex justify-between text-2xl font-bold pt-2 border-t border-[#334155] text-white">
              <span>Total</span>
              <span className="text-[#22D3EE]">₹{total}</span>
            </div>

            <button
              onClick={() => {
                setOpenOrderPage(true);
                onClose();
              }}
              className="w-full py-4 bg-[#6366F1] text-white rounded-2xl hover:bg-[#22D3EE] hover:text-[#0F172A] transition-all duration-300 font-semibold"
            >
              Proceed To Checkout
            </button>
          </div>
        )}
      </div>

      {openOrderPage && (
        <div className="fixed inset-0 z-[999]">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

          {/* Success page */}
          <div className="flex justify-center items-center relative w-full h-full overflow-auto">
            <OrderSuccessPage
              onClose={() => {
                setOpenOrderPage(false);
                setCartItems([]);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CartDrawer;
