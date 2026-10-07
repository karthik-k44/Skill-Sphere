import { Skeleton } from "@/frontend/components/ui/skeleton";

export const DashboardSkeleton = () => (
  <div className="space-y-6" aria-busy="true">
    <Skeleton className="h-40 w-full rounded-2xl" />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }, (_, index) => (
        <Skeleton key={index} className="h-24 rounded-xl" />
      ))}
    </div>
    <div className="grid gap-6 lg:grid-cols-3">
      <Skeleton className="h-80 rounded-xl lg:col-span-2" />
      <Skeleton className="h-80 rounded-xl" />
    </div>
  </div>
);
