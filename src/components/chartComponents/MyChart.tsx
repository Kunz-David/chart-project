import {useEffect, useMemo} from "react"
import {AxisBottom, AxisLeft} from "@visx/axis"
import {scaleBand, scaleLinear} from "@visx/scale"
import {TooltipWithBounds, useTooltip} from "@visx/tooltip"
import {ChartData, Margin} from "../../types.ts"
import {GridColumns} from "@visx/grid"
import {atom, useAtomValue} from "jotai"
import {dataAtom} from "../../data.ts"
import ChartBackground from "./ChartBackground.tsx"
import HoverBar from "./HoverBar.tsx"
import {ChartBorder} from "./ChartBorder.tsx"

export interface ChartInnerProps {
  margin: Margin
  innerWidth: number
  innerHeight: number
}

const truncate = (str: string, length: number) => {
  if (str.length > length) {
    return str.substring(0, length) + '...'
  } else {
    return str
  }
}

function getTickCount(width: number) {
  if (width > 800) return 10
  if (width > 420) return 5
  return 3
}

interface MyChartInterface {
  width: number
  height: number
}

const colors = {
  gray: {
    100: '#f7fafc',
    300: '#d2d6dc',
    500: '#718096',
    700: '#4a5568',
    900: '#1a202c',
  },
}


const selectedDatumAtom = atom<ChartData | null>(null)
const hoveredDatumAtom = atom<ChartData | null>(null)

export default function MyChart({width, height}: MyChartInterface) {
  const margin = {top: 20, bottom: 50, left: 110, right: 20}
  const chartData = useAtomValue(dataAtom)
  const hoveredDatum = useAtomValue(hoveredDatumAtom)
  const selectedDatum = useAtomValue(selectedDatumAtom)
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
    nice: true,
  }), [margin.left, margin.right, width])

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  const horizontalTickCount = getTickCount(innerWidth)

  if (chartData.length === 0) {
    throw new Error("No chart data")
  }

  useEffect(() => {
    console.log("hoveredDatum", hoveredDatum)
  }, [hoveredDatum])

  useEffect(() => {
    console.log("selectedDatum", selectedDatum)
  }, [selectedDatum])

  return (
    <div style={{position: "relative"}}>
      <svg width={width} height={height}>
        <ChartBackground margin={margin} innerWidth={innerWidth} innerHeight={innerHeight}/>
        {chartData.map((d) =>
          <HoverBar
            key={d.category}
            data={d}
            margin={margin}
            xScale={xScale}
            yScale={yScale}
            hoveredDatumAtom={hoveredDatumAtom}
            selectedDatumAtom={selectedDatumAtom}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
          />
        )}
        <AxisBottom
          scale={xScale}
          top={height - margin.bottom}
          stroke={'#333'}
          tickStroke="gray"
          numTicks={horizontalTickCount}
          tickLabelProps={() => ({
            fontFamily: 'Arial',
            fontSize: 14,
            textAnchor: "middle",
            verticalAnchor: "middle",
            fill: colors.gray[700],
          })}
          label={'PROGRESS [%]'}
          labelOffset={12}
          labelProps={{
            fill: colors.gray[700],
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
            fill: colors.gray[700],
            fontFamily: 'Arial',
          })}
        />
        <ChartBorder margin={margin} innerWidth={innerWidth} innerHeight={innerHeight}/>
        {hoveredDatum && (
          <HoverBar
            data={hoveredDatum}
            margin={margin}
            xScale={xScale}
            yScale={yScale}
            hoveredDatumAtom={hoveredDatumAtom}
            selectedDatumAtom={selectedDatumAtom}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
          />
        )}
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
      </svg>
      {tooltipData && (
        <TooltipWithBounds
          top={tooltipTop}
          left={tooltipLeft}
          // style={defaultStyles}
        >
          <div className="bg-gray-50">
            <strong>{tooltipData.category}</strong>
          </div>
          <div>Progress: {tooltipData.progress}%</div>
          <div>Complexity: {tooltipData.complexity}</div>
        </TooltipWithBounds>
      )}
    </div>
  )
}