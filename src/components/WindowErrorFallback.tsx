export function WindowErrorFallback({error, resetErrorBoundary}: { error: Error, resetErrorBoundary: () => void }) {

  return (
    // dark:bg-gray-800
    <div className="w-full h-full bg-gray-200 p-4 rounded-md">
      <div className="flex flex-col space-y-2 h-full w-full justify-between">
        {/*dark:bg-gray-800 dark:text-red-400*/}
        <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50 overflow-auto"
             role="alert">
          <span className="font-medium">Something went wrong!</span>
          <details className="whitespace-pre">
            <summary>Show details</summary>
            {error.message}
          </details>
        </div>

        <div className="flex self-end">
          <button
            // dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border
                border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
            onClick={resetErrorBoundary}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}