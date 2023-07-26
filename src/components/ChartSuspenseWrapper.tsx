import MyChart from "./chartComponents/MyChart.tsx"
import ParentSize from "@visx/responsive/lib/components/ParentSize"
import {Suspense} from "react"
import {ErrorBoundary} from "react-error-boundary"

function ChartSkeleton() {
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

function ChartErrorFallback({error, resetErrorBoundary}: { error: Error, resetErrorBoundary: () => void }) {

  return (
    <div className="w-full h-full bg-gray-200 dark:bg-gray-800 p-4 rounded-md">
      <div className="flex flex-col space-y-2 h-full w-full justify-between">
        <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 overflow-auto"
             role="alert">
          <span className="font-medium">Something went wrong!</span>
          <details className="whitespace-pre">
            <summary>Show details</summary>
            {error.message}
            {`
            
            
            
            
            
            
            
            asdf
            
            asdf
            
            asdf`}
          </details>
        </div>

        <div className="flex self-end">
          <button
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={resetErrorBoundary}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ChartSuspenseWrapper() {

  return (
    <>
      <ParentSize>
        {({width, height}) =>
          <ErrorBoundary FallbackComponent={ChartErrorFallback}>
            <Suspense fallback={<ChartSkeleton/>}>
              <MyChart width={width}
                       height={height}
              />
            </Suspense>
          </ErrorBoundary>
        }
      </ParentSize>
    </>
  )
}