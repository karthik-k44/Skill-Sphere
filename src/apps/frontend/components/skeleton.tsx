interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export function Skeleton({ className = '', variant = 'rectangular' }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-primary-200 dark:bg-primary-950/50';

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-black rounded-xl p-6 shadow-lg border border-primary-100 dark:border-primary-900">
      <Skeleton variant="circular" className="w-12 h-12 mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton variant="text" className="h-4 w-full mb-2" />
      <Skeleton variant="text" className="h-4 w-5/6" />
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
      <Skeleton className="h-6 w-full mb-4" />
      <Skeleton className="h-6 w-5/6 mx-auto mb-8" />
      <div className="flex gap-4 justify-center">
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-12 w-32" />
      </div>
    </div>
  );
}
