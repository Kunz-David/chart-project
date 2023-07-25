import {useState} from 'react'
import MyChart from "./components/MyChart.tsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MyChart/>
    </>
  )
}

export default App
