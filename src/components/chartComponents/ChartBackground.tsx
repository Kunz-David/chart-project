import {PatternLines} from "@visx/pattern"
import {ChartInnerProps} from "../../types.ts"

const patternId = 'chart-pattern'
export function ChartBackground( {margin, innerWidth, innerHeight}: ChartInnerProps) {
  return (
    <>
      <PatternLines
        id={patternId}
        width={16}
        height={16}
        orientation={['diagonal']}
        stroke={"black"}
        strokeWidth={1}
        strokeDasharray={"1 1"}
      />
      <rect
        x={margin.left}
        y={margin.top}
        width={innerWidth}
        height={innerHeight}
        fill={`url(#${patternId})`}
        fillOpacity={0.3}
      />
    </>
  )
}
