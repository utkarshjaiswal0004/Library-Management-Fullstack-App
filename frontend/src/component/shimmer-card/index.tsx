import "../../styles/shimmer.css";

const ShimmerCard: React.FC = () => {
  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden"
      role="presentation"
    >
      <div className="w-full h-48 shimmer"></div>
      <div className="p-4">
        <div className="bg-gray-200 h-6 mb-2 shimmer"></div>
        <div className="bg-gray-200 h-4 shimmer"></div>
      </div>
    </div>
  );
};

export default ShimmerCard;
