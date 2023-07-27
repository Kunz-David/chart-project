import {ChartData} from "./types.ts"
import {atom} from "jotai"

export const dataAtom = atom(async () => fetchChartData())
export async function fetchChartData(): Promise<ChartData[]> {
  await new Promise(resolve => {
    setTimeout(resolve, 1000)
  })

  return chartData
}

const chartData: (ChartData)[] = [
  {
    category: "Home Page",
    progress: 85,
    importance: 5,
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
    issues: [
      {
        id: 1002,
        title: "Fix image loading issues",
        status: "closed",
        creator: "Charlie",
        assignee: "David",
        labels: ["bug", "images"],
        createdAt: new Date(2023, 3, 20),
        updatedAt: new Date(2023, 5, 10),
        description: "Product images are not loading correctly in the listing."
      },
      {
        id: 1008,
        title: "Improve pagination",
        status: "open",
        creator: "Charlie",
        assignee: "Eve",
        labels: ["enhancement", "pagination"],
        createdAt: new Date(2023, 6, 1),
        updatedAt: new Date(2023, 6, 15),
        description: "Pagination on product listing can be more user-friendly."
      }
    ],
  },
  {
    category: "Product Detail",
    progress: 90,
    importance: 5,
    issues: [
      {
        id: 1003,
        title: "Add product reviews",
        status: "open",
        creator: "Eve",
        assignee: "Frank",
        labels: ["enhancement", "reviews"],
        createdAt: new Date(2023, 2, 10),
        updatedAt: new Date(2023, 4, 5),
        description: "Product reviews section is currently missing."
      }
    ],
  },
  {
    category: "Shopping Cart",
    progress: 60,
    importance: 4,
    issues: [
      {
        id: 1004,
        title: "Fix cart update bug",
        status: "closed",
        creator: "Grace",
        assignee: "Heidi",
        labels: ["bug", "cart"],
        createdAt: new Date(2023, 1, 15),
        updatedAt: new Date(2023, 1, 25),
        description: "Cart items are not updating properly when quantity changes."
      },
      {
        id: 1009,
        title: "Add 'Continue Shopping' button",
        status: "open",
        creator: "Ivan",
        assignee: "Julia",
        labels: ["enhancement", "UX"],
        createdAt: new Date(2023, 5, 5),
        updatedAt: new Date(2023, 6, 10),
        description: "Users are asking for a 'Continue Shopping' button in the cart."
      }
    ],
  },
  {
    category: "Checkout",
    progress: 75,
    importance: 5,
    issues: [
      {
        id: 1005,
        title: "Improve payment gateway integration",
        status: "open",
        creator: "Kyle",
        assignee: "Liam",
        labels: ["enhancement", "payment"],
        createdAt: new Date(2023, 2, 15),
        updatedAt: new Date(2023, 5, 5),
        description: "Customers have reported issues with payment gateway."
      }
    ],
  },
  {
    category: "User Profile",
    progress: 69,
    importance: 2,
    issues: [
      {
        id: 420,
        title: "Add profile picture feature",
        status: "open",
        creator: "Chuck",
        assignee: "Norris",
        labels: ["enhancement", "profile"],
        createdAt: new Date(2023, 3, 10),
        updatedAt: new Date(2023, 6, 20),
        description: "Users want to be able to add a profile picture (and divide by zero)."
      }
    ],
  },
  {
    category: "Navigation",
    progress: 95,
    importance: 3,
    issues: [
      {
        id: 1007,
        title: "Fix navigation menu for mobile devices",
        status: "open",
        creator: "Oliver",
        assignee: "Penelope",
        labels: ["bug", "navigation"],
        createdAt: new Date(2023, 4, 1),
        updatedAt: new Date(2023, 6, 24),
        description: "Navigation menu is not user-friendly on mobile devices."
      }
    ],
  },
]
