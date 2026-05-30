import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { Loader } from "lucide-react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;

  images: string[];

  category: {
    id: number;
    name: string;
    image: string;
  };
}

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useProducts();

  const [product, setProduct] = useState<Product | null>(null);
  const [productImage, setProductImage] = useState<string>("");

  const [loading, setLoading] = useState(true);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${id}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      const data: Product = await response.json();

      setProduct(data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    if (product?.images?.length) {
      setProductImage(product.images[0]);
    }
  }, [product]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        <Loader />
      </div>
    );
  }

  // Product Not Found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2] px-6 py-12 rounded-2xl">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition mb-6 cursor-pointer"
        >
          <IoMdArrowRoundBack size={22} />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-10">
         
          <div className="space-y-4">
            {/* Main Image */}
            <div className="h-[450px] rounded-3xl overflow-hidden bg-gray-200 hover:brightness-50">
              <img
                src={productImage}
                alt={product.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex flex-wrap gap-3">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  loading="lazy"
                  decoding="async"
                  alt={`thumbnail-${index}`}
                  className="w-24 h-24 object-cover rounded-xl border cursor-pointer hover:scale-105 transition"
                  onClick={() => setProductImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-5">
            <h1 className="text-3xl font-bold text-gray-800">
              {product.title}
            </h1>

            <p className="text-gray-500 leading-relaxed">
              {product.description}
            </p>

            <p className="text-sm text-gray-400">
              Category: {product.category?.name}
            </p>

            <h2 className="text-3xl font-bold text-[#1E293B]">
              ₹{product.price}
            </h2>

            <div className="flex gap-4 pt-4">
              <button
                className="px-6 py-3 bg-[#6366F1] text-white rounded-2xl hover:bg-[#4F46E5] transition"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>

            <div className="pt-6 text-sm text-gray-500 space-y-1">
              <p className="flex gap-2">
                <FaCheck />
                Free delivery available
              </p>
              <p className="flex gap-2">
                <FaCheck /> 7 days return policy
              </p>
              <p className="flex gap-2">
                <FaCheck /> Secure payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
