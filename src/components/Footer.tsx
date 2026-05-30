// ICONS 
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-[#9CA3AF] px-6 py-14">
      <div className="max-w-7xl mx-auto">
      
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-zinc-800 pb-10">
          
          <div>
            <h2 className="text-3xl font-bold text-blue-500">EcommMart</h2>

            <p className="text-gray-400 mt-4 text-sm leading-6">
              Discover premium fashion, accessories, and lifestyle products at
              the best prices.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer">Men</li>
              <li className="hover:text-white cursor-pointer">Women</li>
              <li className="hover:text-white cursor-pointer">Accessories</li>
              <li className="hover:text-white cursor-pointer">New Arrivals</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer">Contact Us</li>

              <li className="hover:text-white cursor-pointer">FAQs</li>

              <li className="hover:text-white cursor-pointer">Shipping</li>

              <li className="hover:text-white cursor-pointer">Returns</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-blue-500 transition cursor-pointer">
                <FaFacebook size={18} />
              </div>

              <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-pink-500 transition cursor-pointer">
                <FaInstagram size={18} />
              </div>

              <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-sky-500 transition cursor-pointer">
                <FaTwitter size={18} />
              </div>

              <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-red-500 transition cursor-pointer">
                <IoLogoYoutube size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 ShopEase. All rights reserved.</p>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>

            <span className="hover:text-white cursor-pointer">
              Terms & Conditions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
