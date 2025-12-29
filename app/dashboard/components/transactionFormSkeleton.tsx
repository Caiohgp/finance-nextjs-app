import Skeleton from "@/components/skeletonLoading";

export function TransactionFormItemSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 space-x-4">

        <div className="min-h-[120px]"><Skeleton /></div>
        <div className="min-h-[120px]"><Skeleton /></div>
        <div className="min-h-[120px]"><Skeleton /></div>
        <div className="min-h-[120px]"><Skeleton /></div>
        
        <div className="min-h-[120px] col-span-1 md:col-span-2"><Skeleton /></div>

    </div>
  )
}