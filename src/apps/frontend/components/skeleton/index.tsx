interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton = ({ className = '', variant = 'rectangular' }: SkeletonProps) => {
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

export const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-black rounded-xl p-6 shadow-lg border border-primary-100 dark:border-primary-900">
      <Skeleton variant="circular" className="w-12 h-12 mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton variant="text" className="h-4 w-full mb-2" />
      <Skeleton variant="text" className="h-4 w-5/6" />
    </div>
  );
}

export const SkeletonHero = () => {
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

export const SkeletonProfile = () => {
  return (
    <div className="bg-white dark:bg-black rounded-xl p-6 shadow-lg border border-primary-100 dark:border-primary-900 flex items-center gap-4">
      <Skeleton className="h-12 w-12" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-32" /> 
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
}

export const SkeletonCareerProfile = () => {
  return (
    <div>
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-gradient-to-r from-primary via-primary-900 to-primary-900 p-6 text-white shadow-xl shadow-slate-200/80 sm:p-8">
        <div className="relative grid gap-6 xl:grid-cols-[1.2fr_0.85fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2">
              <div className="h-4 w-4 rounded-full bg-white/30 animate-pulse" />
              <Skeleton variant="text" className="h-4 w-24" />
            </div>
            
            <div className="space-y-3">
              <Skeleton variant="text" className="h-12 w-[500px] sm:h-[3.25rem]" />
              <Skeleton variant="text" className="h-5 w-[450px]" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <Skeleton variant="text" className="h-4 w-20" />
                <Skeleton className="h-10 w-16 mt-3" />
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <Skeleton variant="text" className="h-4 w-20" />
                <Skeleton className="h-10 w-20 mt-3" />
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <Skeleton variant="text" className="h-4 w-20" />
                <Skeleton className="h-10 w-16 mt-3" />
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <Skeleton variant="text" className="h-4 w-20" />
                <Skeleton className="h-10 w-20 mt-3" />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2">
                <div className="h-4 w-4 rounded-full bg-white/30 animate-pulse" />
                <Skeleton variant="text" className="h-4 w-32" />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2">
                <div className="h-4 w-4 rounded-full bg-white/30 animate-pulse" />
                <Skeleton variant="text" className="h-4 w-40" />
              </div>
            </div>

            <div className="space-y-3">
              <Skeleton variant="text" className="h-4 w-28 uppercase tracking-widest" />
              <div className="flex flex-wrap gap-2">
                <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2">
                  <Skeleton variant="text" className="h-4 w-24" />
                </div>
                <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2">
                  <Skeleton variant="text" className="h-4 w-20" />
                </div>
                <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2">
                  <Skeleton variant="text" className="h-4 w-28" />
                </div>
                <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2">
                  <Skeleton variant="text" className="h-4 w-16" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton variant="text" className="h-4 w-32" />
                <Skeleton variant="text" className="h-6 w-40" />
              </div>
              <div className="rounded-full bg-white/20 px-3 py-1 animate-pulse">
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
              <div className="relative h-36 w-36">
                <div className="absolute inset-0 h-36 w-36 rounded-full bg-gradient-to-r from-blue-400/30 via-emerald-400/30 to-blue-400/30 animate-pulse border-4 border-white/20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton variant="text" className="h-3.5 w-12 mt-1 uppercase tracking-widest" />
                </div>
              </div>

              <div className="w-full space-y-3 sm:max-w-[210px]">
                <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/10 px-3 py-2">
                  <Skeleton variant="text" className="h-4 w-20" />
                  <div className="h-4 w-4 rounded-full bg-white/30 animate-pulse" />
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/10 px-3 py-2">
                  <Skeleton variant="text" className="h-4 w-20" />
                  <div className="h-4 w-4 rounded-full bg-white/30 animate-pulse" />
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/10 px-3 py-2">
                  <Skeleton variant="text" className="h-4 w-20" />
                  <div className="h-4 w-4 rounded-full bg-white/30 animate-pulse" />
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/10 px-3 py-2">
                  <Skeleton variant="text" className="h-4 w-20" />
                  <Skeleton variant="text" className="h-3.5 w-16" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


