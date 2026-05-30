import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ICONS 
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IoMdArrowForward } from "react-icons/io";

// CONTEXT 
import { useProducts } from "../context/ProductContext";


const categories = [
  {
    title: "Summer Collection",
    discount: "UP TO 50% OFF",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
  },
  {
    title: "Men's Fashion",
    discount: "40% OFF",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
  },
  {
    title: "Women's Style",
    discount: "35% OFF",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
  },
  {
    title: "Accessories",
    discount: "BUY 1 GET 1",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
  },
];

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

const HeroSection = () => {
  const navigate = useNavigate();
  const { products, fetchProducts } = useProducts();
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === visibleImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? visibleImages.length - 1 : prev - 1));
  };

  useEffect(() => {
    fetchProducts({ offset: 0, limit: 10 });
  }, []);

  const [visibleImages, setVisibleImages] = useState<Product[]>([]);

  // Initial 6 products
  useEffect(() => {
    if (products.length > 0) {
      setVisibleImages(products.slice(0, 6));
    }
  }, [products]);

  // Rotate products
  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      setVisibleImages((prev) => {
        if (prev.length === 0) return prev;

        const updated = [...prev];

        const randomIndex = Math.floor(Math.random() * updated.length);

        const remainingProducts = products.filter(
          (product) => !updated.some((item) => item.id === product.id),
        );

        if (remainingProducts.length === 0) return prev;

        const randomProduct =
          remainingProducts[
            Math.floor(Math.random() * remainingProducts.length)
          ];

        updated[randomIndex] = randomProduct;

        return updated;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [products]);

  return (
    <section className="min-h-screen items-center justify-center overflow-hidden">

      {/* Products Grid */}
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src={visibleImages[current]?.images?.[0]}
          alt={visibleImages[current]?.title}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Content */}
        <div className="relative z-20 flex h-full items-end px-8 pb-20">
          <div>
            <span className="rounded-full bg-[#0F172A] px-5 py-2 text-sm font-semibold text-white">
              Trending Collection
            </span>

            <h2 className="mt-5 text-5xl md:text-7xl font-extrabold text-white">
              {visibleImages[current]?.title}
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-gray-200">
              Discover premium styles and exclusive collections curated for
              modern fashion lovers.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-7 rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition hover:scale-105 hover:bg-[#22D3EE] hover:text-white"
            >
              Explore Now
            </button>
          </div>
        </div>

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 z-30 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:scale-110 hover:bg-black/50"
        >
          <ChevronLeft size={30} />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 z-30 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:scale-110 hover:bg-black/50"
        >
          <ChevronRight size={30} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
          {visibleImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                current === index ? "w-10 bg-white" : "w-3 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Offer Cards */}
      <div className="mt-20 px-4 md:px-8 pb-20">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block rounded-full bg-[#fff4e8] px-5 py-2 text-sm font-semibold text-[#F43F5E]">
            Trending Collections
          </span>

          <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight text-[#622B14] leading-tight">
            View Exciting Offers in
            <span className="text-[#DD9E59]"> Fashion</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-gray-500 text-base md:text-lg leading-7">
            Discover premium styles, exclusive collections, and limited-time
            deals curated just for you.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate("/products")}
              className="group relative overflow-hidden rounded-[32px] bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-[420px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-50"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Discount Badge */}
                <div className="absolute top-5 left-5">
                  <span className="rounded-full bg-[#F43F5E] px-4 py-2 text-xs font-bold tracking-wide text-white shadow-lg">
                    {item.discount}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="translate-y-4 transition-all duration-500 group-hover:translate-y-0">
                  <h3 className="text-3xl font-bold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-200 opacity-0 transition duration-500 group-hover:opacity-100">
                    Explore the newest arrivals and elevate your wardrobe with
                    premium fashion trends.
                  </p>

                  <button className="my-5 flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#DD9E59]">
                    Explore Collection
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      <IoMdArrowForward />
                    </span>
                  </button>
                </div>
              </div>

              <div className="absolute inset-0 rounded-[32px] border border-white/10 opacity-0 transition duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
