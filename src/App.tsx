import {useState} from 'react'
import MyChart from "./components/MyChart.tsx"
import {AppLayout} from "./components/AppLayout.tsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppLayout>
        <MyChart/>
      </AppLayout>
    </>
  )
}

export default App
