import {ChartInnerProps} from "./MyChart.tsx"

export function ChartBorder( {margin, innerWidth, innerHeight}: ChartInnerProps) {
  return (
    <>
      <rect x={margin.left} y={margin.top} width={innerWidth} height={innerHeight} stroke='gray' strokeWidth='1' fill="none"/>
    </>
  )
}