import React, { useState } from "react"
import { Bar } from "@visx/shape"
import { Group } from "@visx/group"
import { AxisBottom, AxisLeft } from "@visx/axis"
import { scaleBand, scaleLinear } from "@visx/scale"
import { useTooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip"
import { localPoint } from '@visx/event'

// Define your chart data type
type ChartData = {
  category: string;
  progress: number;
  complexity: number;
};

const chartData: ChartData[] = [
  { category: "Home Page", progress: 85, complexity: 3 },
  { category: "Product Listing", progress: 70, complexity: 4 },
  { category: "Product Detail", progress: 90, complexity: 5 },
  { category: "Shopping Cart", progress: 60, complexity: 4 },
  { category: "Checkout", progress: 75, complexity: 5 },
  { category: "User Profile", progress: 80, complexity: 2 },
  { category: "Navigation", progress: 95, complexity: 3 },
]

const width = 500
const height = 500
const margin = { top: 20, bottom: 40, left: 90, right: 20 }

// Create scales
const yScale = scaleBand({
  domain: chartData.map((d) => d.category),
  range: [margin.top, height - margin.bottom],
  padding: 0.1,
})

const xScale = scaleLinear({
  domain: [0, 100], // Adjusting the maximum value to 100
  range: [margin.left, width - margin.right],
})

const truncate = (str: string, length: number) => {
  if (str.length > length) {
    return str.substring(0, length) + '...'
  } else {
    return str
  }
}

export default function MyChart() {
  const [selectedBar, setSelectedBar] = useState<string | null>(null)
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft,
    tooltipTop,
  } = useTooltip<ChartData>()

  return (
    <div>
      <svg width={width} height={height}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="50%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#6366f1" />
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
                  const coords = localPoint(event) || { x: 0, y: 0 }
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
          tickLabelProps={()=> ({
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
          tickValues={[0, 25, 50, 75, 100]}
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
