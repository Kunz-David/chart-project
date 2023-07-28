# Assignment

## Chart Project

### Objective:

Develop a minimalistic application that displays a static chart based on hardcoded data.

### Description:

The application should consist of:

1) Chart Display: The chart will showcase the implementation progress of various categories (like Home Page, Navigation,
   etc.) for a hypothetical e-commerce website. Each category's progress should be represented as a percentage. The data
   for the chart will be hardcoded into the application.
2) UI/UX Design: Create a simple user-friendly interface.
3) Responsiveness: The application should provide a seamless experience on both desktop and mobile devices.
4) Error Handling: The application should robustly handle errors, especially potential issues with displaying the chart.
5) Testing: Write basic tests for the main functionalities of the application.

### Deliverables:

1) The source code for the application, along with instructions for building, testing, and running it.
2) A report on any challenges you encountered during the project and how you solved them.

---

## Instructions on working with the project

1) Get the source code:

   **clone the project**:
    ```
    git clone https://github.com/Kunz-David/chart-project.git
    ```
   navigate to the project directory:
    ```
    cd chart-project
    ```

   **install dependencies**:
    ```
    yarn install
    ```

2) Running, building, testing:

    - **Run development server**:
        ```
       yarn run dev
       ```
      Then open the localhost url in your browser.

    - **Build the project**:
        ```
       yarn run build
        ```
      Then open the index.html file in the dist folder in your browser.

    - **Run the tests**:
        ```
        yarn run test
        ```
      (This runs all vite unit tests.)

## Developer decisions

### Basic technologies

I chose to use _React_ as I am most familiar with it.

I also chose to use _TypeScript_ as it is a very useful tool for catching errors and making the code more readable.

I chose to use _Vite_ as the **build tool** - I heard it is getting a lot more love than CRA lately, and I wanted to try
it
out.

_Tailwind_ was used for **styling**. I am well familiar with it, and it is very useful for quickly creating a nice
looking UI. I also used a few [Tabler Icons](https://tabler.io/icons) and got some styling from [Flowbite](https://flowbite.com/) (buttons and badges). 

For **state management** I chose to use _Jotai_. First I thought it wouldn't be necessary, but later I decided to more
closely emulate how a real app would work. So, I simulated a fetch request for the data, and I used Jotai to store it.

```ts
// atoms.ts
export const dataAtom = atom(async () => fetchChartData())

// data.ts
export async function fetchChartData(): Promise<ChartData[]> {
  await new Promise(resolve => {
    setTimeout(resolve, 1000)
  })

  return chartData
}

// usage:
const data = useAtomValue(dataAtom)
```

### Brainstorming crude design

I created a very simple model of how the desktop and mobile sites should look.
It is something that can keep me productive and focused when coding the design as I don't have as many choices.
Here is a simple mockup of the sites: [link](https://chart-project.my.canva.site/).

(I ended up using slightly different data, so the mockup is not super accurate.)

### Deciding on what data to use and the chart type

_Disclaimer:
_The data has been generated using GPT.__

The simplest chart that would fulfill the assignment would be a bar chart. The data could look like this:

```js
const chartData = [
    {category: "Home Page", progress: 85},
    {category: "Product Listing", progress: 70},
    {category: "Product Detail", progress: 90},
    {category: "Shopping Cart", progress: 60},
    {category: "Checkout", progress: 75},
    {category: "User Profile", progress: 80},
    {category: "Navigation", progress: 95},
]
```

It got me thinking about what data I would use. For the chart to be more useful, the data could include some other
datums such as importance.
Data:

```js
const chartData = [
    {category: "Home Page", progress: 85, importance: 3},
    {category: "Product Listing", progress: 70, importance: 4},
    {category: "Product Detail", progress: 90, importance: 5},
    {category: "Shopping Cart", progress: 60, importance: 4},
    {category: "Checkout", progress: 75, importance: 5},
    {category: "User Profile", progress: 80, importance: 2},
    {category: "Navigation", progress: 95, importance: 3},
]
```

I chose to go with a bar chart with color coded importance. The importance is represented by the color of the bar. The
more important the category, the darker the color.

**Later I decided to use some extra data to show an extra details component.**

One datum now looks like this:

```js
const datum = {
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
}
```

### Chart library

I did some searching and was deciding to use either [visx](https://airbnb.io/visx/)
or [Recharts](https://recharts.org/en-US/).
I decided to go with visx as I wanted to try to learn something new, and it seemed like a good opportunity to do so.
Visx in my opinion also has a higher ceiling than Recharts, but it is also more difficult to use.

### Browser support

The app has been manually tested in the latest versions of Chrome, Firefox, and Safari. On mobile devices, it has been
tested on IOS on safari.

### Testing

I used Vitest to run unit test and the React testing library (@testing-library/react) to query my DOM. I covered the main
feature of the app, which is displaying the chart and the category details, with some basic tests. This was a new thing for me and if I had more time 
I would create some End-to-End tests with Cypress.
