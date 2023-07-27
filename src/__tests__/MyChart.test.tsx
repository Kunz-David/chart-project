import {atom, Provider} from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'
import MyChart, { MyChartProps } from '../components/chartComponents/MyChart.tsx'
import { ChartData } from "../types.ts"
import { ReactNode } from "react"
import { PrimitiveAtom } from "jotai"
import {fireEvent, render, screen} from "@testing-library/react"
import '@testing-library/jest-dom'
import {selectedDatumAtom} from "../atoms.ts"
import {expect} from "vitest"

type InitialValue<T> = [PrimitiveAtom<T[]>, T[]]
type InitialValues<T> = InitialValue<T>[]


// mock matchMedia
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () {
    },
    removeListener: function () {
    }
  }
}


// Create a mock atom
const mockDataAtom = atom([] as ChartData[])

const HydrateAtoms = ({initialValues, children}: { initialValues: InitialValues<ChartData>, children: ReactNode }) => {
  useHydrateAtoms(initialValues)
  return children
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const TestProvider = ({initialValues, children}: { initialValues: any, children: ReactNode }) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
)

describe('MyChart component faulty data', () => {
  it('throws an error when empty array is provided', () => {
    const props: MyChartProps = {
      width: 500,
      height: 500,
      dataActiveAtom: mockDataAtom,
    }
    expect(() => render(
      <TestProvider initialValues={[[mockDataAtom]]}>
        <MyChart {...props} />
      </TestProvider>
    )).toThrowError()
  })

  it('throws an error when null is provided', () => {
    const props: MyChartProps = {
      width: 500,
      height: 500,
      dataActiveAtom: mockDataAtom,
    }
    expect(() => render(
      <TestProvider initialValues={[[mockDataAtom, null]]}>
        <MyChart {...props} />
      </TestProvider>
    )).toThrowError()
  })

  it('throws an error when undefined is provided', () => {
    const props: MyChartProps = {
      width: 500,
      height: 500,
      dataActiveAtom: mockDataAtom,
    }
    expect(() => render(
      <TestProvider initialValues={[[mockDataAtom, undefined]]}>
        <MyChart {...props} />
      </TestProvider>
    )).toThrowError()
  })

  it("manages when importance goes out of bounds [1-5]", () => {
    const props: MyChartProps = {
      width: 500,
      height: 500,
      dataActiveAtom: mockDataAtom,
    }
    const chartData: ChartData[] = [
      {
        category: "Home Page",
        progress: 85,
        importance: 6,
        issues: [
          {
            id: 1001,
            title: "Improve responsiveness",
            status: "open",
            creator: "Alice",
            assignee: "Bob",
            labels: ["bug", "UI/UX"],
            createdAt: new Date(2023, 4, 15),
            updatedAt: new Date(2023, 6, 25),
            description: "The home page is not rendering correctly on mobile devices."
          }
        ],
      },
    ]
    expect(() => render(
      <TestProvider initialValues={[[mockDataAtom, chartData]]}>
        <MyChart {...props} />
      </TestProvider>
    )).not.toThrowError()
  })

  it('throws an error when bad width is provided', () => {
    const props: MyChartProps = {
      width: -500,
      height: 500,
      dataActiveAtom: mockDataAtom,
    }
    expect(() => render(
      <TestProvider initialValues={[[mockDataAtom, undefined]]}>
        <MyChart {...props} />
      </TestProvider>
    )).toThrowError()
  })

  it('throws an error when bad height is provided', () => {
    const props: MyChartProps = {
      width: 500,
      height: -500,
      dataActiveAtom: mockDataAtom,
    }
    expect(() => render(
      <TestProvider initialValues={[[mockDataAtom, undefined]]}>
        <MyChart {...props} />
      </TestProvider>
    )).toThrowError()
  })
})


describe('MyChart component with one datum', () => {
  let defaultProps: MyChartProps
  let defaultChartData: ChartData[]

  beforeEach(() => {
    defaultChartData = [
      {
        category: "Home Page",
        progress: 85,
        importance: 3,
        issues: [
          {
            id: 1001,
            title: "Improve responsiveness",
            status: "open",
            creator: "Alice",
            assignee: "Bob",
            labels: ["bug", "UI/UX"],
            createdAt: new Date(2023, 4, 15),
            updatedAt: new Date(2023, 6, 25),
            description: "The home page is not rendering correctly on mobile devices."
          }
        ],
      },
    ]
    defaultProps = {
      width: 500,
      height: 500,
      dataActiveAtom: mockDataAtom,
    }

    render(
      <TestProvider initialValues={[
        [mockDataAtom, defaultChartData],
        [selectedDatumAtom, null],
      ]}>
        <MyChart {...defaultProps} />
      </TestProvider>
    )
  })

  it('renders without crashing', () => {
    const svg = screen.getByTestId("MyChart-svg")
    expect(svg).toBeInTheDocument()
  })

  it('should contain one correct label', function () {
    const hoverBar = screen.getByText(defaultChartData[0].category)
    expect(hoverBar).toBeInTheDocument()
  })
})

describe('MyChart component with multiple data', () => {
  let defaultProps: MyChartProps
  let defaultChartData: ChartData[]
  let containerElement: HTMLElement

  beforeEach(() => {
    defaultChartData = [
      {
        category: "Home Page",
        progress: 85,
        importance: 3,
        issues: [
          {
            id: 1001,
            title: "Improve responsiveness",
            status: "open",
            creator: "Alice",
            assignee: "Bob",
            labels: ["bug", "UI/UX"],
            createdAt: new Date(2023, 4, 15),
            updatedAt: new Date(2023, 6, 25),
            description: "The home page is not rendering correctly on mobile devices."
          }
        ],
      },
      {
        category: "Product Listing",
        progress: 70,
        importance: 4,
        issues: [],
      },
    ]
    defaultProps = {
      width: 500,
      height: 500,
      dataActiveAtom: mockDataAtom,
    }

    const {container} = render(
      <TestProvider initialValues={[
        [mockDataAtom, defaultChartData],
      ]}>
        <MyChart {...defaultProps} />
      </TestProvider>
    )
    containerElement = container
  })

  it('renders without crashing', () => {
    const svg = screen.getByTestId("MyChart-svg")
    expect(svg).toBeInTheDocument()
  })
  
  it("displays 2 datums", () => {
    expect(screen.getByTestId('MyChart-svg')).toBeInTheDocument()
    expect(containerElement.querySelectorAll('path.visx-bar-rounded')).toHaveLength(defaultChartData.length)
    expect(screen.getByText(defaultChartData[0].category)).toBeInTheDocument()
    expect(screen.getByText(defaultChartData[1].category)).toBeInTheDocument()
  })


  it('on click, removes the "click on a bar" message', () => {
    expect(screen.queryByText("Click on any bar")).toBeInTheDocument()
    const clickBar = containerElement.querySelector('path.visx-bar-rounded')
    expect(clickBar).toBeInTheDocument()
    expect(clickBar).toBeVisible()

    if (!clickBar) {
      throw new Error("Click bar not found")
    }

    fireEvent.click(clickBar)

    expect(screen.queryByText("Click on any bar")).not.toBeInTheDocument()
  })

})