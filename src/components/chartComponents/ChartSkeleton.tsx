export function ChartSkeleton() {
  return (
    // dark:bg-gray-800
    <div className="w-full h-full bg-gray-200 p-4 rounded-md">
      <div className="flex flex-col space-y-2 h-full w-full">
        {/*dark:bg-gray-600*/}
        <div className="w-3/4 h-1/4 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="w-1/3 h-1/4 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="w-4/5 h-1/4 bg-gray-300 animate-pulse rounded-md"></div>
        <div className="w-1/6 h-1/4 bg-gray-300 animate-pulse rounded-md"></div>
      </div>
    </div>
  )
}