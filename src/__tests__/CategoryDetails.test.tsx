import {render, screen} from '@testing-library/react'
import {CategoryDetails, CategoryDetailsProps} from "../components/CategoryDetails.tsx"
import {ChartData} from "../types.ts"
import "@testing-library/jest-dom"

describe('CategoryDetails', () => {
  let containerElement: HTMLElement
  let defaultProps: CategoryDetailsProps
  let datum: ChartData

  beforeEach(() => {
    datum = {
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
    }

    defaultProps = {
      datum: datum,
    }

    const {container} = render(
      <CategoryDetails {...defaultProps} />
    )
    containerElement = container
  })

  it('renders the category title', () => {
    expect(containerElement.querySelector('h2')?.textContent).toContain(datum.category)
  })

  it('renders the importance', () => {
    expect(containerElement.querySelector('p:nth-child(2)')?.textContent).toContain(`Importance: ${datum.importance}`)
  })

  it('renders the progress', () => {
    expect(containerElement.querySelector('p:nth-child(3)')?.textContent).toContain(`Progress: ${datum.progress}%`)
  })

  it('renders the issues', () => {
    const issueElements = screen.getAllByTestId('issue-details')
    expect(issueElements).toHaveLength(datum.issues.length)
  })
})