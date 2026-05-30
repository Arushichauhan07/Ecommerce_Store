import { useNavigate } from "react-router-dom";

// COMPONENTS 
import { useProducts } from "../context/ProductContext";

const Products = () => {
  const navigate = useNavigate();
  const { categories } = useProducts();

  return (
    <section className="w-full bg-[#FAF7F2]">
      <div className="mx-auto">
        {/* Banner Section */}
        <div className="relative overflow-hidden bg-black">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
            alt="Fashion Banner"
            className="h-[500px] w-full object-cover opacity-60"
          />

          <div className="absolute inset-0 flex flex-col items-start justify-center px-8 lg:px-20">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[4px] text-[#F43F5E]">
              New Trend 2026
            </p>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white lg:text-6xl">
              Discover Your Perfect Fashion Style
            </h1>

            <p className="mt-5 max-w-xl text-base text-gray-200 lg:text-lg">
              Explore premium fashion collections crafted for modern elegance
              and everyday comfort.
            </p>

            <button
              className="mt-8 rounded-full bg-[#0F172A] px-8 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:bg-[#22D3EE] cursor-pointer"
              onClick={() => navigate("/shop")}
            >
              Shop Now
            </button>
          </div>
        </div>
        <div className="my-10 mx-10">
          <h2 className="my-4 text-5xl font-semibold text-gray-800">
            Explore Categories
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <div
                data-testid="categories-card"
                key={category.id}
                onClick={() => navigate(`/shop?category=${category.id}`)}
                className="group relative overflow-hidden rounded-[32px] bg-white shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl cursor-pointer"
              >
                <div className="relative h-[320px] overflow-hidden">
                  <img
                    src={category.image}
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-50"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-5 left-5">
                    <span className="rounded-full bg-white/20 backdrop-blur-md px-4 py-2 text-xs font-bold tracking-wide text-white border border-white/20">
                      Category #{category.id}
                    </span>
                  </div>


                  <div className="absolute top-0 -left-full h-full w-1/2 rotate-12 bg-white/20 blur-2xl transition-all duration-1000 group-hover:left-[150%]" />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 my-5">
                  <div className="translate-y-6 transition-all duration-500 group-hover:translate-y-0">

                    <h2 className="text-2xl font-extrabold text-white line-clamp-2">
                      {category.name}
                    </h2>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-[32px] border border-white/10 opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="absolute bottom-0 left-1/2 h-20 w-40 -translate-x-1/2 rounded-full bg-[#DD9E59]/30 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
