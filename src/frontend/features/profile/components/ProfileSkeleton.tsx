import { Skeleton } from "@/frontend/components/ui/skeleton";

export const ProfileSkeleton = () => (
  <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]" aria-busy="true">
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-[480px] w-full rounded-xl" />
    </div>
    <div className="space-y-4">
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-72 w-full rounded-xl" />
    </div>
  </div>
);
