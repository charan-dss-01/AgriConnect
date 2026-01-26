const ProductLoader = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      {/* Spinner */}
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-orange-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
      </div>

      {/* Text */}
      <p className="text-orange-600 text-lg font-semibold animate-pulse">
        {text}
      </p>
    </div>
  );
};

export default ProductLoader;
