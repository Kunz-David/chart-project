# Chart Project

### Objective:
Develop a minimalistic application that displays a static chart based on hardcoded data.

### Description:
The application should consist of:

1) Chart Display: The chart will showcase the implementation progress of various categories (like Home Page, Navigation, etc.) for a hypothetical e-commerce website. Each category's progress should be represented as a percentage. The data for the chart will be hardcoded into the application.
2) UI/UX Design: Create a simple user-friendly interface.
3) Responsiveness: The application should provide a seamless experience on both desktop and mobile devices.
4) Error Handling: The application should robustly handle errors, especially potential issues with displaying the chart.
5) Testing: Write basic tests for the main functionalities of the application.

### Deliverables:
1) The source code for the application, along with instructions for building, testing, and running it.
2) A report on any challenges you encountered during the project and how you solved them.

---

## Instructions on running the project

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
    
2) Run the project:
    **run the project**:
    ```
    yarn run dev
    ```

## Testing the project
Install the project as described above - in step 1, then: 

**run the tests**:
```
yarn run test
```

## Building the project
Install the project as described above - in step 1, then:

**build the project**:
```
yarn run build
```

## Report on challenges encountered during the project and how they were solved

### Challenges

### Choosing technologies
I chose to use React as I am most familiar with it, and it is a very popular framework.
I also chose to use TypeScript as it is a very useful tool for catching errors and making the code more readable.
I chose to use Vite as the build tool - I heard it is getting a lot more love lately than CRA and I wanted to try it out. 

#### Brainstorming basic design
I created a very simple model of how the desktop and mobile sites should look.
It is something that can keep me productive and focused when coding the design as I don't have as many choices.
Here is a simple mockup of the sites: [link](https://chart-project.my.canva.site/).

#### Deciding on what chart I will do and what data to use
The simplest chart that would fulfill the assignment would be a bar chart. The data could look like this:

```js
const chartData = [
  { category: "Home Page", progress: 85 },
  { category: "Product Listing", progress: 70 },
  { category: "Product Detail", progress: 90 },
  { category: "Shopping Cart", progress: 60 },
  { category: "Checkout", progress: 75 },
  { category: "User Profile", progress: 80 },
  { category: "Navigation", progress: 95 },
]
```

It got me thinking about what data I would use. For the chart to be more useful, the data could include some other datums such a complexity (how hard it is to implement).
Data:
```js
const chartData = [
   { category: "Home Page", progress: 85, complexity: 3 },
   { category: "Product Listing", progress: 70, complexity: 4 },
   { category: "Product Detail", progress: 90, complexity: 5 },
   { category: "Shopping Cart", progress: 60, complexity: 4 },
   { category: "Checkout", progress: 75, complexity: 5 },
   { category: "User Profile", progress: 80, complexity: 2 },
   { category: "Navigation", progress: 95, complexity: 3 },
]
```

That would be easily implemented with a bubble chart where the size of the bubble would represent the complexity.

I chose to go with a bar chart as it is simpler to implement and then if I have time I will implement the bubble chart.

#### Deciding on the chart library
I did some searching decided to use Recharts as it has good documentation and is easy to use.

#### Deciding on the UI library
To style the application I decided to use TailwindCSS as it keeps things simple, creates easy to understand code and is fast for prototyping.
