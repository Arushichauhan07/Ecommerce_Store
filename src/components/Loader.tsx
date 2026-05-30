const Loader = () => {
  return (
    <div className="min-h-screen bg-[#f8f5f2] px-6 py-12">
      
      <div className="mx-auto mb-12 animate-pulse">
        <div className="h-12 w-72 bg-gray-300 rounded-xl mb-4" />

        <div className="h-5 w-96 bg-gray-200 rounded-lg" />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl overflow-hidden shadow-md"
          >
            {/* Image Skeleton */}
            <div className="h-[300px] bg-gray-300 animate-pulse" />

            {/* Content Skeleton */}
            <div className="p-5">
              <div className="h-4 w-24 bg-gray-200 rounded mb-3 animate-pulse" />

              <div className="h-6 w-full bg-gray-300 rounded mb-4 animate-pulse" />

              <div className="space-y-2 mb-6">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />

                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
              </div>

              <div className="flex items-center justify-end">
                <div className="h-10 w-32 bg-gray-300 rounded-xl animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
