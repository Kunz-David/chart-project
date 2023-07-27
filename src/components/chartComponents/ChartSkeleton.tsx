export function ChartSkeleton() {
  return (
    <div className="w-full h-full bg-gray-200 dark:bg-gray-800 p-4 rounded-md">
      <div className="flex flex-col space-y-2 h-full w-full">
        <div className="w-3/4 h-1/4 bg-gray-300 animate-pulse dark:bg-gray-600 rounded-md"></div>
        <div className="w-1/3 h-1/4 bg-gray-300 animate-pulse dark:bg-gray-600 rounded-md"></div>
        <div className="w-4/5 h-1/4 bg-gray-300 animate-pulse dark:bg-gray-600 rounded-md"></div>
        <div className="w-1/6 h-1/4 bg-gray-300 animate-pulse dark:bg-gray-600 rounded-md"></div>
      </div>
    </div>
  )
}