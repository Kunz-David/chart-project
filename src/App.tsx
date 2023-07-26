import {AppLayout} from "./components/AppLayout.tsx"
import ChartSuspenseWrapper from "./components/ChartSuspenseWrapper.tsx"

function App() {

  return (
    <>
      <AppLayout>
        <div className="grid-cols-2 space-y-5 space-x-3 md:space-x-6 gap-3">
          <div className="m-5 w-1/2 p-5 h-80 rounded-xl shadow-lg bg-gray-200">
            <ChartSuspenseWrapper/>
          </div>
        </div>
      </AppLayout>
    </>
  )
}

export default App
