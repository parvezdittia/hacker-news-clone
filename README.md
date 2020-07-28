# Hacker News Clone

A Hacker News Clone made specifically to get all stories related to HTML, CSS and JS. [Check it out](https://hacker-news-clone-92f89.web.app/)

## Tech Stack

The ERN stack: Express, React and NodeJS. The site has been hosted using Firebase cloud hosting and application server using Firebase Cloud Functions. Why Firebase? Its quick, easy, well documented and have worked on it before.

## Major Packages Used for Production

1. ReactJS: For client and server side rendering
2. Axios: For making HTTP requests on server and client
3. ChartJS: For rendering the line chart for each page
4. ExpressJS: NodeJS library for the Server, used for handling and sending applications and running the server.
5. Firebase Admin and Functions: To run the Firebase serverless system and to deploy releases.

## Major Packages used as Development Tools

1. Babel: Transpiler used to transform code written with the latest features is converted to older JS, which is more compatible with browsers and servers running older versions of JS.
2. Webpack: The JS module Bundler and more. Used to transform our code written as modules, into well optimized packages containing all the dependencies that the application needs to run smoothly.
3. ESLint: Static code linter used for quality control the code.
4. Prettier: Code formatter (Enabled via VSCode Extension)

## Features

1. Implemented using minimum production dependencies: Only ReactJS used for View generation.
1. No React-router for routing between pages as all the pages had the same components. It would make more sense to use the router for large application with a lot of different pages.
1. No Redux, as on paper it is a fairly simple application, with only one kind of data. Implemented an in memory central store for data of all pages navigated in a session.
1. Used ReactDom Server for SSR and hydration for CSR.
1. Used Express as the server library for routing
1. Axios for isomorphic fetch, for HTTP request on the client and server.
1. User upvote and hide functionality is based localStorage. Other possible alternatives include Cache API and IndexedDB.
1. The user can upvote on a post an many times as they want. The value is stored in a LS key with the against the news ID.
1. Same functionality for hide.
1. The upvotes displayed is the total of the upvotes for a post received from the API and the user .
1. The same is reflected in real time on the line chart.
1. Appropriate caching headers set Static resources.
1. The Chart component is dynamically loaded on the client to keep the initial bundle size small and chunk the JS.
1. Above the fold CSS and JS has been preloaded for faster TTI.
1. Appropriate Meta description set for SEO.
1. Mobile First Designed application
1. Bookmarkable URL'S

### Notes

1. No unit test cases written: Still have to learn writing unit test cases for React using Jest.
2. No CI/CD pipeline setup. Have to figure out how to set one up for Firebase, if possible.
