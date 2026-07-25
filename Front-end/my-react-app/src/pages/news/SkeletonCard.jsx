export default function SkeletonCard() {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-4 animate-pulse">
            <div className="flex gap-4">
                <div className="w-24 h-20 bg-gray-200 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-4/5" />
                    <div className="h-3 bg-gray-200 rounded w-1/4 mt-2" />
                </div>
            </div>
        </div>
    );
}