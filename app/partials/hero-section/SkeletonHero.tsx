export default function SkeletonHero() {
  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center text-white font-sans overflow-hidden bg-gray-900 animate-pulse">
      {/* Overlay dummy */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10"></div>

      {/* Konten skeleton */}
      <div className="relative z-20 text-center px-4">
        <div className="h-6 w-48 bg-gray-700 rounded mb-4 mx-auto" />
        <div className="h-10 w-72 bg-gray-700 rounded mb-6 mx-auto" />

        <div className="flex justify-center items-center flex-col mt-4 gap-4">
          <div className="h-8 w-40 bg-gray-700 rounded" />
          <div className="h-12 w-44 bg-gray-600 rounded-full" />
        </div>

        <div className="mt-4 h-4 w-64 bg-gray-600 rounded mx-auto" />
      </div>

      <div className="absolute h-24 left-0 bottom-0 w-full bg-black/45 mask-t-from-2 z-10" />
    </div>
  );
}
