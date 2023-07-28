import {BarRounded} from "@visx/shape"
import {localPoint} from '@visx/event'
import {ChartData, Margin} from "../../types.ts"
import {ScaleBand, ScaleLinear} from "d3-scale"
import {PrimitiveAtom} from "jotai/vanilla/atom"
import {useAtom} from "jotai"
import {useMedia} from 'react-use'

interface HoverBarProps {
  data: ChartData,
  xScale: ScaleLinear<number, number>,
  yScale: ScaleBand<string>,
  margin: Margin,
  selectedDatumAtom: PrimitiveAtom<ChartData | null>,
  hoveredDatumAtom: PrimitiveAtom<ChartData | null>,
  hideTooltip: () => void,
  showTooltip: (args: { tooltipData: ChartData, tooltipLeft: number, tooltipTop: number }) => void,
  hoverGrowth?: number,
  colorScale: ScaleLinear<string, string>,
}

function HoverBar({
                    data,
                    xScale,
                    yScale,
                    margin,
                    selectedDatumAtom,
                    hoveredDatumAtom,
                    hideTooltip,
                    showTooltip,
                    hoverGrowth = 1.3,
                    colorScale
                  }: HoverBarProps) {
  const [hoveredDatum, setHoveredDatum] = useAtom(hoveredDatumAtom)
  const [selectedDatum, setSelectedDatum] = useAtom(selectedDatumAtom)

  const barWidth = xScale(data.progress) - margin.left
  const barHeight = yScale.bandwidth()!
  const isHovered = hoveredDatum?.category === data.category
  const scaledY = yScale(data.category)
  const isSelected = selectedDatum?.category === data.category
  const isNotSmallScreen = useMedia('(min-innerWidth: 640px)')

  if (scaledY === undefined || !data) {
    throw new Error("Malformed data")
  }

  const barY = (isHovered && isNotSmallScreen) ? scaledY - (barHeight * (hoverGrowth - 1)) / 2 : scaledY

  return (
    <BarRounded
      key={data.category}
      className={`sm:hover:stroke-tropical-blue-700 sm:hover:fill-tropical-blue-600 transition-colors duration-500 ease-in-out border cursor-pointer ${(!isNotSmallScreen && isSelected) && "fill-tropical-blue-600 stroke-tropical-blue-700"}`}
      radius={6}
      right
      y={barY}
      x={margin.left}
      fill={colorScale(data.importance)}
      width={barWidth}
      height={(isHovered && isNotSmallScreen) ? barHeight * hoverGrowth : barHeight}
      onMouseLeave={() => {
        setHoveredDatum(null)
        hideTooltip()
      }}
      onMouseEnter={() => {
        if (isNotSmallScreen) {
          setHoveredDatum(data)
        }
      }}
      onMouseMove={(event) => {
        const coords = localPoint(event) || {x: 0, y: 0}

        showTooltip({
          tooltipData: data,
          tooltipLeft: coords.x,
          tooltipTop: coords.y,
        })
      }}
      onClick={() => {
        setSelectedDatum(data)
      }}
    />
  )
}

export default HoverBar