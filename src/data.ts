import {ChartData} from "./types.ts"

export async function fetchChartData(): Promise<ChartData[]> {
  await new Promise(resolve => {
    setTimeout(resolve, 1000)
  })

  return chartData
}

const chartData: ChartData[] = [
  { category: "Home Page", progress: 85, complexity: 3 },
  { category: "Product Listing", progress: 70, complexity: 4 },
  { category: "Product Detail", progress: 90, complexity: 5 },
  { category: "Shopping Cart", progress: 60, complexity: 4 },
  { category: "Checkout", progress: 75, complexity: 5 },
  { category: "User Profile", progress: 80, complexity: 2 },
  { category: "Navigation", progress: 95, complexity: 3 },
]