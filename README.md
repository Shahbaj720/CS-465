# Travlr Getaways

A full stack travel booking web application built with the MEAN stack (MongoDB, Express, Angular, and Node.js). The project consists of a public customer-facing website and a secure Angular admin single-page application for managing trip listings.

## Project Reflection

### Architecture

The full stack project used three different types of frontend development, each serving a different purpose. The Express HTML side of the application is server-rendered using Handlebars templates. Every time a customer visits a page like the travel listing, the Node.js server queries MongoDB, injects the data into the Handlebars template, and sends back a complete HTML document. This approach is straightforward and works well for a public-facing site where SEO and simple page loads matter more than rich interactivity.

The plain JavaScript pieces of the project handled smaller client-side behaviors on the static pages, things like form interactions and simple DOM updates, without needing a full framework. The Angular single-page application is a completely different model. Once the admin SPA loads in the browser, it never requests a new full page from the server again. Instead, Angular components talk to the Express REST API directly through HTTP calls and update the DOM in place. This made the admin interface feel much faster and more like a desktop application, since navigating between the trip listing, add trip form, and edit trip form happens instantly.

The backend uses MongoDB because the data being stored, individual trip packages with varying fields like length, price, and description, fits naturally into a flexible document model rather than a rigid relational schema. MongoDB also paired well with Mongoose, which let me define schemas in JavaScript and get validation and query methods without writing raw database queries by hand. Since this was a learning project rather than a system with strict relational requirements, the document-based approach reduced a lot of overhead compared to setting up a SQL database with migrations and joins.

### Functionality

JSON is the data format both the frontend and backend speak, while JavaScript is the programming language that processes it. JSON is just structured text, essentially a snapshot of an object's data, while JavaScript is what actually builds, parses, and manipulates that data. The REST API returns trip data as JSON, the Angular services parse that JSON into TypeScript objects, and the components render it. Without JSON as the shared format, the Angular frontend and the Express backend wouldn't have a common language to exchange data in, even though both happen to be written in JavaScript and TypeScript.

I refactored code in a few key places to improve functionality and maintainability. The trip card was originally written as inline HTML repeated inside the trip listing component, and I pulled it out into its own reusable TripCardComponent. This meant any change to how a trip is displayed only needs to happen in one place, and the same component could be reused anywhere trips need to be shown. I also refactored the authentication logic into a dedicated AuthService and an HTTP interceptor rather than manually attaching tokens to every request. This meant every API call automatically included the JWT without each component needing to know anything about authentication. Reusable components like these cut down on duplicated code, made bugs easier to fix in one place instead of several, and made the codebase easier to read since each piece has a clear, single responsibility.

### Testing

Testing a full stack application with multiple API endpoints and an added security layer required testing in stages rather than all at once. I started by testing the plain REST endpoints with curl and Postman before any security was added, confirming that GET requests returned the correct trip data and that POST and PUT requests correctly created and updated documents in MongoDB. Once JWT authentication was layered on top, the testing process became more involved. I had to verify three different cases for each protected endpoint: a request with no token, which should return a 401 Unauthorized; a request with an invalid or expired token, which should return a 403 Forbidden; and a request with a valid token, which should succeed normally.

The main difficulty with testing a secured API is that you can no longer test endpoints in isolation. Every protected request first depends on a successful login generating a valid token, so a bug in the login flow can make it look like the trip endpoints are broken when the real problem is upstream in authentication. I also ran into an issue where Express was returning cached 304 responses instead of fresh data, which made it look like the Angular frontend had a bug when the real issue was a missing Cache-Control header on the server. Working through these issues reinforced the importance of testing each layer of the stack independently using the browser DevTools Network tab and console logging before assuming the problem is in any one specific layer.

### Reflection

This course gave me hands-on experience with the entire lifecycle of a full stack web application, from setting up a Node.js server and Express routes, to designing a MongoDB schema, to building a dynamic Angular frontend, to securing the application with JWT authentication. Before this course, my experience was mostly limited to working on isolated pieces of an application. Building Travlr Getaways from the ground up forced me to understand how the frontend, backend, and database all depend on and communicate with each other, which is something that is hard to fully appreciate until you have built and debugged that connection yourself.

The most valuable skill I developed was probably debugging across the stack. Many of the issues I ran into during this project, like data not rendering even though the API call succeeded, or protected routes returning unexpected errors, required tracing a problem through the browser console, the network tab, the Angular component, the Express controller, and sometimes the database query itself. That kind of systematic debugging is something I expect to use constantly in any future development role. I also feel much more confident now describing and defending architectural decisions, like why a NoSQL database fit this project, or why JWT was an appropriate authentication strategy for a stateless API, which is the kind of explanation that comes up in technical interviews and in real engineering discussions with a team.

## Live Demo

The Express server runs on `http://localhost:3000` and serves the public customer-facing website. The Angular admin SPA runs separately on `http://localhost:4200` and requires login authentication to access trip management features.

## Tech Stack

MongoDB, Express.js, Angular, Node.js, Mongoose, Passport.js, JWT, bcrypt, Bootstrap CSS
