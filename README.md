# out2win challenge

## Demo
[https://out2win-challenge.vercel.app/](https://out2win-challenge.vercel.app/)

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed Node.js and npm.
- You have a code editor, uch as Visual Studio Code.

## Setup

To set up the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/paulrrdiaz/out2win-challenge.git
    cd out2win-challenge
    ```
2. Rename `.env.example` to `.env.local`

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## Dev Notes

### Biome (https://biomejs.dev/)
Improve performance for formatting during dev stage

### nuqs (https://nuqs.47ng.com/)
nuqs is used for managing query parameters in the URL.

### TanStack Query (https://tanstack.com/query/latest)
Data fetching tool, helps for speed up the critical rendering path because caching

### TanStack Table (https://tanstack.com/table/latest)
For building flexible and customizable tables.

### Zustand (https://zustand.docs.pmnd.rs/)
Zustand is a small, fast, and scalable state management library.

### shadcn (https://ui.shadcn.com/)
shadcn is a component library that provides a set of reusable and customizable UI components.

### react-scan (https://react-scan.com/)
for detecting bottleneck and unnecessary re-renders

## Product Notes

### Server-Side Pagination
Server-side pagination is used for the table to handle large datasets efficiently. By fetching only the required data for the current page from the server, we reduce the amount of data transferred and improve the performance of the application. This approach also ensures that the data displayed is always up-to-date, as it is fetched directly from the server.

### Zustand vs. Context API
Zustand is chosen over the Context API for state management due to its simplicity and performance. Zustand provides a more intuitive API for managing global state and avoids the boilerplate code required by the Context API. It also offers better performance by minimizing re-renders and providing a more efficient way to manage state updates.

### Server-Side Rendering (SSR) vs. Static Generation (SSG)
Server-Side Rendering (SSR) is used for product pages instead of Static Generation (SSG) because the product data is dynamic and can change frequently. SSR ensures that the latest data is always displayed to the user by fetching it at request time. This approach is more suitable for applications with a large number of products that can change frequently, as it avoids the need to regenerate static pages whenever the data changes.
Another solution for managing dynamic product data is to integrate a headless CMS like Sanity. A headless CMS provides a flexible and scalable way to manage content, allowing for easy updates and content management. By using a headless CMS, we can create hooks to fetch product data and generate product pages dynamically. This approach combines the benefits of SSR with the flexibility of a CMS, making it easier to manage and update product data.

### Schemas
We can use Zod for schema validation to ensures that the data conforms to the expected structure, reducing the likelihood of runtime errors and improving the overall robustness of the application.

### lib/error
The `lib/error` module can be improved by integrating error logging services like Sentry or Datadog.

### services/http
This module using an Axios instance for making HTTP requests. In the future, we can add interceptors to manage authentication tokens, handle errors, or log request and response data. This approach centralizes the logic for handling HTTP requests, making the codebase cleaner and more maintainable.

## TODOs

### Vitest / Storybook
Unit and functional tests using Vitest, also visual tests and documentation using Storybook

### Cypress
Fastest way to tests main functionalities

### Husky and lint-staged
For adding constrains to commits

### GitHub Actions
We need to set up GitHub Actions to automate the process of running tests and building the application.