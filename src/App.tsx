import {AppLayout} from "./components/AppLayout.tsx"
import ChartSuspenseWrapper from "./components/ChartSuspenseWrapper.tsx"

function App() {

  return (
    <>
      <AppLayout>
        <div className="w-full p-5 h-80">
          <ChartSuspenseWrapper/>
        </div>
      </AppLayout>
    </>
  )
}

export default App
