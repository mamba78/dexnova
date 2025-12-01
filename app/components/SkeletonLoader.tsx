'use client';

export default function SkeletonLoader() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-pulse">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gray-800 rounded-full" />
            <div>
              <div className="h-5 bg-gray-800 rounded w-32 mb-2" />
              <div className="h-4 bg-gray-800 rounded w-20" />
            </div>
          </div>
          <div className="h-8 bg-gray-800 rounded mb-4" />
          <div className="h-6 bg-gray-800 rounded mb-6" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded" />
            <div className="h-4 bg-gray-800 rounded w-24" />
          </div>
          <div className="mt-6 h-12 bg-gray-800 rounded-xl" />
        </div>
      ))}
    </div>
  );
}
