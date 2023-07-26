import {useMemo, useState} from "react"
import {scaleBand, scaleLinear} from "@visx/scale"
import {useTooltip} from "@visx/tooltip"
import {ChartData} from "../../types.ts"
import {useAtomValue} from "jotai"
import {dataAtom} from "../../data.ts"
import {buildChartTheme, BarSeries, Axis, Tooltip, XYChart} from "@visx/xychart"

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

const defaultAccessors = {
  yAccessor: (d: ChartData) => d.progress,
  xAccessor: (d: ChartData) => d.category,
}

interface MyChartInterface {
  width: number
  height: number
}

export default function MyChartXY({width, height}: MyChartInterface) {
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

  const yScaleConfig = useMemo(() => scaleBand({
    domain: chartData.map((d) => d.category),
    range: [margin.top, height - margin.bottom],
    padding: 0.1,
  }), [chartData, margin.top, margin.bottom, height])

  const xScaleConfig = useMemo(() => scaleLinear({
    domain: [0, 100],
    range: [margin.left, width - margin.right],
    nice: true,
  }), [margin.left, margin.right, width])

  return (
    <div>
      <XYChart
        xScale={{ type: 'band' }}
        yScale={{ type: 'linear' }}
        width={width}
        height={height}
        margin={margin}
        theme={theme}
      >
        <Axis orientation="bottom"/>
        <Axis orientation="left"/>
        <BarSeries
          dataKey="progress"
          data={chartData}
          {...defaultAccessors}

        />
        <Tooltip<ChartData>
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showSeriesGlyphs
          renderTooltip={({tooltipData, colorScale}) => (
            <>
              <div>
                {tooltipData?.nearestDatum?.datum.category}
              </div>
            </>
          )}
        />
      </XYChart>
    </div>
  )
}
