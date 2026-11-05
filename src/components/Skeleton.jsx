/**
 * Reusable skeleton / shimmer placeholder.
 * Pass className to control size and shape.
 */
export const Skeleton = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-surface rounded-xl ${className}`}
    aria-hidden="true"
  />
);

/** Full-width text line skeletons */
export const SkeletonText = ({ lines = 3, className = "" }) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        className={`h-4 ${i === lines - 1 ? "w-3/4" : "w-full"}`}
      />
    ))}
  </div>
);

/** Card-shaped skeleton */
export const SkeletonCard = ({ className = "" }) => (
  <div className={`glass rounded-2xl overflow-hidden ${className}`}>
    <Skeleton className="aspect-video w-full rounded-none" />
    <div className="p-6 space-y-4">
      <Skeleton className="h-5 w-2/3" />
      <SkeletonText lines={2} />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  </div>
);

/** Generic API error banner */
export const ApiError = ({ message }) => (
  <div className="glass rounded-xl p-4 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
    <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
    Failed to load content. {message && <span className="opacity-70">({message})</span>}
  </div>
);
