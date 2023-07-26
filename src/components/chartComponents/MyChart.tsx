import {useMemo, useState} from "react"
import {BarRounded} from "@visx/shape"
import {Group} from "@visx/group"
import {AxisBottom, AxisLeft} from "@visx/axis"
import {scaleBand, scaleLinear} from "@visx/scale"
import {defaultStyles, TooltipWithBounds, useTooltip} from "@visx/tooltip"
import {localPoint} from '@visx/event'
import {ChartData} from "../../types.ts"
import {GridColumns} from "@visx/grid"
import {useAtomValue} from "jotai"
import {dataAtom} from "../../data.ts"
import ChartBackground from "./ChartBackground.tsx"
import {buildChartTheme} from "@visx/xychart"

const theme = buildChartTheme({
  backgroundColor: 'transparent',
  colors: ['#aeaeae', '#fff'],
  svgLabelBig: {
    fill: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  svgLabelSmall: {
    fill: '#333',
    fontSize: 12,
    fontFamily: 'Arial',
  },
  htmlLabel: {
    fontSize: 16,
    fontWeight: 700,
    fontFamily: 'Arial',
    color: '#333',
  },
  xAxisLineStyles: {
    stroke: '#333',
  },
  yAxisLineStyles: {
    stroke: '#333',
  },
  xTickLineStyles: {
    stroke: '#333',
  },
  yTickLineStyles: {
    stroke: '#333',
  },
  tickLength: 10,
  gridColor: '#ddd',
  gridColorDark: '#555',
  gridStyles: {
    strokeDasharray: '4,4',
  },
})

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
}

export default function MyChart({width, height}: MyChartInterface) {
  const margin = {top: 20, bottom: 50, left: 110, right: 20}
  const [selectedBar, setSelectedBar] = useState<string | null>(null)
  const chartData = useAtomValue(dataAtom)
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft,
    tooltipTop,
  } = useTooltip<ChartData>()

  if (chartData.length === 0) {
    throw new Error("No chart data")
  }

  const horizontalTickCount = width > 420 ? (width > 800 ? 10 : 5) : 3
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  const yScale = useMemo(() => scaleBand({
    domain: chartData.map((d) => d.category),
    range: [margin.top, height - margin.bottom],
    padding: 0.1,
  }), [chartData, margin.top, margin.bottom, height])

  const xScale = useMemo(() => scaleLinear({
    domain: [0, 100],
    range: [margin.left, width - margin.right],
    nice: true,
  }), [margin.left, margin.right, width])

  return (
    <div>
      <svg width={width} height={height}>
        <ChartBackground/>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e"/>
            <stop offset="50%" stopColor="#d946ef"/>
            <stop offset="100%" stopColor="#6366f1"/>
          </linearGradient>
        </defs>

        {chartData.map((d) => {
          const hoverGrowth = 1.3
          const barWidth = xScale(d.progress) - margin.left
          const barHeight = yScale.bandwidth()
          const isHovered = selectedBar === d.category
          const scaledY = yScale(d.category)
          if (scaledY === undefined) {
            console.error("Malformed data error, this should not happen as we are using TS for the data.")
            throw new Error("Malformed data error, this should not happen as we are using TS for the data.")
          }
          const barY = isHovered ? scaledY - (barHeight * (hoverGrowth - 1)) / 2 : scaledY
          return (
            <Group key={d.category}>
              <BarRounded
                className="fill-cotton-candy-500 stroke-cotton-candy-600 hover:stroke-tropical-blue-800 hover:fill-tropical-blue-700 transition-colors duration-500 ease-in-out border hover:z-20"
                radius={6}
                right
                y={barY}
                x={margin.left}
                width={barWidth}
                height={isHovered ? barHeight * hoverGrowth : barHeight}
                // fill={isHovered ? "url(#gradient)" : "#4287f5"}
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
        <GridColumns
          scale={xScale}
          top={margin.top}
          width={innerWidth}
          height={innerHeight}
          stroke="black"
          strokeOpacity={0.1}
          strokeDasharray="4,4"
          strokeWidth={2}
          numTicks={horizontalTickCount}
        />
        <AxisBottom
          scale={xScale}
          top={height - margin.bottom}
          tickFormat={value => `${value}%`}
          stroke={'#333'}
          tickStroke={'#333'}
          numTicks={horizontalTickCount}
          tickLabelProps={() => ({
            // dy: '0.25em',
            // dx: '-0.5em',
            // fill: '#333',
            fontFamily: 'Arial',
            fontSize: 14,
            textAnchor: "middle",
            verticalAnchor: "middle",
            fill: "gray",
          })}
          label={'PROGRESS'}
          labelOffset={12}
          labelProps={{
            fill: 'gray',
            fontFamily: 'Arial',
            textAnchor: "middle",
            fontSize: 14,
            fontWeight: 800,
          }}
        />
        <AxisLeft
          scale={yScale}
          hideTicks
          hideAxisLine
          left={margin.left}
          stroke={'#333'}
          tickStroke={'#333'}
          tickFormat={value => truncate(value, 15)}
          tickLabelProps={() => ({
            fontSize: 14,
            verticalAnchor: 'middle',
            textAnchor: 'end',
            fill: '#333',
            fontFamily: 'Arial',
          })}
        />
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
