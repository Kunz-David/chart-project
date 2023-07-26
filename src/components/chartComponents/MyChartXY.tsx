import {useEffect, useState} from "react"
// import {TooltipWithBounds, useTooltip} from "@visx/tooltip"
import {ChartData} from "../../types.ts"
import {useAtomValue} from "jotai"
import {dataAtom} from "../../data.ts"
import {AnimatedBarSeries, AnimatedGrid, Axis, buildChartTheme, Tooltip, XYChart} from "@visx/xychart"
import {defaultStyles} from "@visx/tooltip"

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

function getTickCount(width: number) {
  if (width > 800) return 10
  if (width > 420) return 5
  return 3
}

export default function MyChartXY({width, height}: MyChartInterface) {
  const margin = {top: 20, bottom: 50, left: 110, right: 20}
  const [selectedBar, setSelectedBar] = useState<string | null>(null)
  const chartData = useAtomValue(dataAtom)

  if (chartData.length === 0) {
    throw new Error("No chart data")
  }

  const horizontalTickCount = getTickCount(width)

  useEffect(() => {
    console.log(selectedBar)
  }, [selectedBar])

  return (
    <div>
      <XYChart
        yScale={{type: 'band', domain: chartData.map((d) => d.category), padding: 0.2}}
        xScale={{type: 'linear', domain: [0, 100]}}
        width={width}
        height={height}
        margin={margin}
        theme={theme}
      >
        <Axis
          orientation="bottom"
          numTicks={horizontalTickCount}
        />
        <Axis
          orientation="left"
          hideTicks
        />
        <AnimatedBarSeries
          dataKey="progress"
          data={chartData}
          radiusRight={true}
          radius={7}
          onPointerDown={(datum) => {
            setSelectedBar(datum.datum.category)
          }}
          xAccessor={(d) => d.progress}
          yAccessor={(d) => d.category}
        />
        <AnimatedGrid numTicks={12} rows={false}/>
        <Tooltip<ChartData>
          // snapTooltipToDatumX
          snapTooltipToDatumY
          style={{
            ...defaultStyles,
            // minWidth: 60,
            // backgroundColor: 'rgba(0,0,0,0.9)',
            // color: 'white',
          }}
          // showSeriesGlyphs
          renderTooltip={({tooltipData}) => (
            <>
              <div>
                <strong>{tooltipData?.nearestDatum?.datum.category}</strong>
              </div>
              <div>Progress: {tooltipData?.nearestDatum?.datum.progress}%</div>
              <div>Complexity: {tooltipData?.nearestDatum?.datum.complexity}</div>
            </>
          )}
        />
      </XYChart>
    </div>
  )
}

