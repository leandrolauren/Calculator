export default function Loading() {
  return (
    <div className="animate-pulse space-y-4 p-4 rounded-lg bg-gray-800">
      <div className="h-8 bg-gray-700 rounded w-1/4"></div>
      <div className="h-12 bg-gray-700 rounded w-full"></div>
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-700 rounded"></div>
        ))}
      </div>
    </div>
  );
}