import { Skeleton } from '@/components/ui/skeleton';

// ---------------------------------

export function LoadingStructure() {
  return (
    <div className="grid gap-2">
      {Array(7)
        .fill(null)
        .map((_, index) => (
          <Skeleton key={index} className="h-12 rounded-lg" />
        ))}
    </div>
  );
}
