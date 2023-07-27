import {AppLayout} from "./components/AppLayout.tsx"
import {CategoryDetails} from "./components/CategoryDetails.tsx"
import {ErrorBoundary} from "react-error-boundary"
import {Suspense} from "react"
import MyChart from "./components/chartComponents/MyChart.tsx"
import {ChartSkeleton} from "./components/chartComponents/ChartSkeleton.tsx"
import {WindowErrorFallback} from "./components/WindowErrorFallback.tsx"
import {ResponsiveWrapper} from "./components/ResponsiveWrapper.tsx"
import {HandleComponent, Resizable} from "re-resizable"
import {useAtomValue} from "jotai"
import {selectedDatumAtom} from "./atoms.ts"
import {useWindowSize} from "react-use"
import {IconArrowsDiagonal2, IconArrowsMoveHorizontal, IconArrowsMoveVertical} from "@tabler/icons-react"

const handleComponent: HandleComponent = {
  bottomRight: (
    <div
      className="group-hover:visible ease-in-out transition-all duration-300 invisible flex justify-center items-center w-5 h-5 rounded-full bg-gray-300 shadow-lg">
      <IconArrowsDiagonal2 size={16} className="text-gray-700"/>
    </div>
  ),
  bottom: (
    <div
      className="group-hover:visible ease-in-out transition-all duration-300 invisible flex justify-center items-center w-5 h-5 rounded-full bg-gray-300 shadow-lg">
      <IconArrowsMoveVertical size={16} className="text-gray-700"/>
    </div>
  ),
  right: (
    <div
      className="group-hover:visible ease-in-out transition-all duration-300 invisible flex justify-center items-center w-5 h-5 rounded-full bg-gray-300 shadow-lg">
      <IconArrowsMoveHorizontal size={16} className="text-gray-700"/>
    </div>
  ),
}

function App() {
  const datum = useAtomValue(selectedDatumAtom)
  const {width} = useWindowSize()

  const isNotSmallScreen = width > 640
  const chartWidth = (isNotSmallScreen ? width / 2 : width) - 25

  return (
    <>
      <AppLayout>
        <div className="flex md:flex-row flex-col justify-start md:space-x-5 space-y-3 md:space-y-0">
          <div className="flex">
            <Resizable
              className={"w-full h-full max-w-full max-h-full p-3 rounded-xl shadow-lg bg-gray-200 group"}
              defaultSize={{
                width: chartWidth,
                height: 500,
              }}
              handleComponent={handleComponent}
            >
              <ResponsiveWrapper>
                {({width, height}) => (
                  <ErrorBoundary FallbackComponent={WindowErrorFallback}>
                    <Suspense fallback={<ChartSkeleton/>}>
                      <MyChart width={width} height={height}/>
                    </Suspense>
                  </ErrorBoundary>
                )}
              </ResponsiveWrapper>
            </Resizable>
          </div>
          {datum &&
              <div className="flex-grow">
                  <Resizable
                      className={"w-full h-full max-w-full max-h-full p-3 rounded-xl shadow-lg bg-gray-200 group"}
                      handleComponent={handleComponent}
                  >
                      <CategoryDetails datum={datum}/>
                  </Resizable>
              </div>
          }
        </div>
      </AppLayout>
    </>
  )
}


export default App
