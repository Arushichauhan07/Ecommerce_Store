import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// CONTEXT 
import { useProducts } from "../context/ProductContext";

// COMPONENTS 
import Loader from "../components/Loader";

const ProductShow = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const {
    products,
    loadMoreProducts,
    error,
    loading,
    fetchProducts,
    fetchCategories,
    addToCart,
    cartItems,
    hasFetched
  } = useProducts();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );

  const [minPrice, setMinPrice] = useState(searchParams.get("min") || "");

  const [maxPrice, setMaxPrice] = useState(searchParams.get("max") || "");

  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "");
  const [priceRange, setPriceRange] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setSelectedCategory(categoryId || "");
  }, [categoryId]);

  useEffect(() => {
    if (priceRange) {
      const [min, max] = priceRange.split("-");

      setMinPrice(min);
      setMaxPrice(max);
    }
  }, [priceRange]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const applyFilters = () => {
    const params: any = {};

    if (debouncedSearch) params.search = debouncedSearch;

    if (selectedCategory) params.category = selectedCategory;

    if (minPrice) params.min = minPrice;

    if (maxPrice) params.max = maxPrice;

    if (sortBy) params.sort = sortBy;

    setSearchParams(params);

    fetchProducts({
      offset: 0,
      limit: 10,
      title: debouncedSearch,
      categoryId: selectedCategory,
      price_min: minPrice,
      price_max: maxPrice,
      append: false,
    });
  };

  useEffect(() => {
    applyFilters();
  }, [debouncedSearch, selectedCategory, minPrice, maxPrice, sortBy]);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;

      case "price-desc":
        return b.price - a.price;

      case "title-asc":
        return a.title.localeCompare(b.title);

      case "title-desc":
        return b.title.localeCompare(a.title);

      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (hasFetched && products.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-800">
            No Products Found
          </h2>
          <p className="text-gray-500 mt-2">
            We couldn’t find anything matching your selection. Try adjusting
            filters or search again.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-5 py-2 rounded-lg bg-[#A47251] text-white hover:bg-[#8c5f43] transition"
          >
            Home
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-2xl">
        {error}
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F9FAFB] px-6 py-12 rounded-2xl">
      
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#6366F1]">
          Explore Products
        </h1>

        <p className="text-gray-500 mt-3 text-lg">
          Discover premium fashion collections curated for you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-4 gap-4">
       
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-3 rounded-2xl border border-gray-300 outline-none"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 rounded-2xl border border-gray-300 outline-none"
        >
          <option value="">Default Sorting</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title-asc">Name: A-Z</option>
          <option value="title-desc">Name: Z-A</option>
        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="px-4 py-3 rounded-2xl border border-gray-300 outline-none"
        >
          <option value="">All Prices</option>
          <option value="0-50">₹0 - ₹50</option>
          <option value="50-100">₹50 - ₹100</option>
          <option value="100-200">₹100 - ₹200</option>
          <option value="200-500">₹200 - ₹500</option>
          <option value="500-1000">₹500+</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sortedProducts.map((product) => (
          <div
            data-testid="product-cards"
            key={product.id}
            className="bg-[#F8FAFC] text-gray-800 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group hover:brightness-80"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="relative h-[300px] overflow-hidden">
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
              />
            </div>
            <div className="p-5">
              <p className="text-sm mb-2">{product.category?.name}</p>
              <h2 className="text-lg font-semibold line-clamp-1">
                {product.title}
              </h2>

              <p className="text-sm mt-2 line-clamp-2">{product.description}</p>

              <div className="flex items-center justify-between mt-5">
                <h3 className="text-2xl font-bold">₹{product.price}</h3>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className={`flex items-center justify-center gap-2 px-2 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 z-40 shadow-md active:scale-95 ${
                    cartItems.some((item) => item.id === product.id)
                      ? "bg-[#10B981] text-white hover:bg-[#059669] shadow-[#10B981]/30"
                      : "bg-[#6366F1] text-white hover:bg-[#4F46E5] shadow-[#6366F1]/30"
                  }`}
                >
                  {cartItems.some((item) => item.id === product.id) ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Added
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={() =>
            loadMoreProducts({
              title: debouncedSearch,
              price_min: minPrice,
              price_max: maxPrice,
            })
          }
          disabled={loading}
          className="px-8 py-4 bg-[#6366F1] text-white hover:bg-[#4F46E5] shadow-[#6366F1]/30 rounded-2xl transition-all duration-300"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </section>
  );
};

export default ProductShow;
