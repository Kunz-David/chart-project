import {BarRounded} from "@visx/shape"
import {localPoint} from '@visx/event'
import {ChartData, Margin} from "../../types.ts"
import {ScaleBand, ScaleLinear} from "d3-scale"
import {PrimitiveAtom} from "jotai/vanilla/atom"
import {useAtom, useSetAtom} from "jotai"

interface HoverBarProps {
  data: ChartData;
  xScale: ScaleLinear<number, number>;
  yScale: ScaleBand<string>;
  margin: Margin;
  selectedDatumAtom: PrimitiveAtom<ChartData | null>;
  hoveredDatumAtom: PrimitiveAtom<ChartData | null>;
  hideTooltip: () => void;
  showTooltip: (args: { tooltipData: ChartData, tooltipLeft: number, tooltipTop: number }) => void;
  hoverGrowth?: number;
}

function HoverBar({data, xScale, yScale, margin, selectedDatumAtom, hoveredDatumAtom, hideTooltip, showTooltip, hoverGrowth=1.3}: HoverBarProps) {
  const [hoveredDatum, setHoveredDatum] = useAtom(hoveredDatumAtom)
  const setSelectedDatum = useSetAtom(selectedDatumAtom)

  const barWidth = xScale(data.progress) - margin.left
  const barHeight = yScale.bandwidth()!
  const isHovered = hoveredDatum?.category === data.category
  const scaledY = yScale(data.category)

  if (scaledY === undefined) {
    throw new Error("Malformed data")
  }

  const barY = isHovered ? scaledY - (barHeight * (hoverGrowth - 1)) / 2 : scaledY

  return (
    <BarRounded
      key={data.category}
      className="fill-cotton-candy-500 stroke-cotton-candy-600 hover:stroke-tropical-blue-700 hover:fill-tropical-blue-600 transition-colors duration-500 ease-in-out border hover:z-20 cursor-pointer"
      radius={6}
      right
      y={barY}
      x={margin.left}
      width={barWidth}
      height={isHovered ? barHeight * hoverGrowth : barHeight}
      onMouseLeave={() => {
        setHoveredDatum(null)
        hideTooltip()
      }}
      onMouseEnter={() => {
        setHoveredDatum(data)
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