import {useMemo, useState} from "react"
import {Bar} from "@visx/shape"
import {Group} from "@visx/group"
import {AxisBottom, AxisLeft} from "@visx/axis"
import {scaleBand, scaleLinear} from "@visx/scale"
import {defaultStyles, TooltipWithBounds, useTooltip} from "@visx/tooltip"
import {localPoint} from '@visx/event'
import {ChartData, Margins} from "../types.ts"
import {useAtomValue} from "jotai"
import {dataAtom} from "./ChartSuspenseWrapper.tsx"

const truncate = (str: string, length: number) => {
  if (str.length > length) {
    return str.substring(0, length) + '...'
  } else {
    return str
  }
}

interface MyChartInterface {
  width: number
  height: number
  margin: Margins
}

export default function MyChart({width, height, margin}: MyChartInterface) {
  const [selectedBar, setSelectedBar] = useState<string | null>(null)
  const chartData = useAtomValue(dataAtom)
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft,
    tooltipTop,
  } = useTooltip<ChartData>()

  const yScale = useMemo(() => scaleBand({
    domain: chartData.map((d) => d.category),
    range: [margin.top, height - margin.bottom],
    padding: 0.1,
  }), [chartData, margin.top, margin.bottom, height])

  const xScale = useMemo(() => scaleLinear({
    domain: [0, 100],
    range: [margin.left, width - margin.right],
  }), [margin.left, margin.right, width])

  return (
    <div>
      <svg width={width} height={height}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e"/>
            <stop offset="50%" stopColor="#d946ef"/>
            <stop offset="100%" stopColor="#6366f1"/>
          </linearGradient>
        </defs>
        {chartData.map((d) => {
          const barWidth = xScale(d.progress) - margin.left
          const barHeight = yScale.bandwidth()
          const isHovered = selectedBar === d.category
          const scaledY = yScale(d.category)
          if (scaledY === undefined) {
            console.error("Malformed data error, this should not happen as we are using TS for the data.")
            return null
          }
          const barY = isHovered ? scaledY - (barHeight * 0.1) / 2 : yScale(d.category)
          return (
            <Group key={d.category}>
              <Bar
                y={barY}
                x={margin.left}
                width={barWidth}
                height={isHovered ? barHeight * 1.1 : barHeight}
                fill={isHovered ? "url(#gradient)" : "#4287f5"}
                onMouseLeave={() => {
                  setSelectedBar(null)
                  hideTooltip()
                }}
                onMouseMove={(event) => {
                  const coords = localPoint(event) || {x: 0, y: 0}
                  setSelectedBar(d.category)
                  showTooltip({
                    tooltipData: d,
                    tooltipLeft: coords.x,
                    tooltipTop: coords.y,
                  })
                }}
              />
            </Group>
          )
        })}
        <AxisLeft
          scale={yScale}
          left={margin.left}
          stroke={'#333'}
          tickStroke={'#333'}
          tickFormat={value => truncate(value, 20)}
          tickLabelProps={() => ({
            dx: '-0.25em',
            dy: '0.25em',
            fontSize: 14,
            textAnchor: 'end',
            fill: '#333',
            fontFamily: 'Arial',
          })}
        />
        <AxisBottom
          scale={xScale}
          top={height - margin.bottom}
          tickFormat={value => `${value}%`}
          stroke={'#333'}
          tickStroke={'#333'}
          tickValues={[0, 20, 40, 60, 80, 100]}
          tickLabelProps={() => ({
            dy: '0.25em',
            dx: '-0.5em',
            fill: '#333',
            fontFamily: 'Arial',
          })}
        />
        <text
          x="50%"
          y={height - 5}
          textAnchor="middle"
          className="text-sm font-bold text-gray-500"
        >
          Progress
        </text>
        <text
          transform="rotate(-90)"
          x={-height / 2}
          y={15}
          textAnchor="middle"
          className="text-sm font-bold text-gray-500"
        >
          Category
        </text>
      </svg>
      {tooltipData && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          style={defaultStyles}
        >
          <div>
            <strong>{tooltipData.category}</strong>
          </div>
          <div>Progress: {tooltipData.progress}%</div>
          <div>Complexity: {tooltipData.complexity}</div>
        </TooltipWithBounds>
      )}
    </div>
  )
}
