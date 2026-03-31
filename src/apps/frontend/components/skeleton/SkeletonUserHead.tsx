import { type FC } from 'react';
import { Skeleton } from './index.tsx';

export const SkeletonUserHead: FC = () => {
  return (
    <section className="relative mb-8 overflow-hidden rounded-[2rem] bg-gradient-to-r from-primary via-primary-900 to-primary-900 shadow-[0_30px_90px_-44px_rgba(37,99,235,0.45)]">
      <div className="relative grid gap-8 p-6 sm:p-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          {/* Profile Identity Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton variant="text" className="h-4 w-24" />
          </div>

          {/* Name, Role, Description */}
          <div className="space-y-3">
            <Skeleton variant="text" className="h-12 w-4/5 max-w-4xl sm:h-[3rem] lg:h-[3.25rem]" />
            <Skeleton variant="text" className="h-6 w-3/4 sm:h-7" />
            <Skeleton variant="text" className="h-5 w-full max-w-2xl sm:h-6" />
          </div>

          {/* Contact Badges */}
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur">
              <Skeleton className="h-4 w-4" />
              <Skeleton variant="text" className="h-4 w-32" />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur">
              <Skeleton className="h-4 w-4" />
              <Skeleton variant="text" className="h-4 w-28" />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur">
              <Skeleton className="h-4 w-4" />
              <Skeleton variant="text" className="h-4 w-36" />
            </div>
          </div>
        </div>

        {/* Right Sidebar - Identity Card */}
        <div className="grid gap-4">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
            {/* Card Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <Skeleton variant="text" className="h-4 w-28" />
                <Skeleton className="h-8 w-16 mt-1" />
              </div>
              <Skeleton className="h-20 w-20 rounded-[1.5rem]" />
            </div>

            {/* Status Rows */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                <Skeleton variant="text" className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                <Skeleton variant="text" className="h-4 w-20" />
                <Skeleton variant="text" className="h-3.5 w-16 uppercase tracking-[0.18em]" />
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/10 px-4 py-3">
                <Skeleton variant="text" className="h-4 w-28" />
                <Skeleton variant="text" className="h-3.5 w-20 uppercase tracking-[0.18em]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

