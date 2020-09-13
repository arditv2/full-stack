# trial-full-stack

Full Stack trial for pairings (remote or in person)

The Frontend was setup with [create-react-app](https://github.com/facebook/create-react-app) and already includes a setup for react with redux and thunk.

There are two options for backend included: A simple node setup in either Javascript or Typescript.

Its run instructions are included in its respective readmes.

You are totally free in deciding how you build this, including for a choice of frontend and backend structures.

Please add tests that you believe can add value to the consistency of your application.

If you are missing any requirements or further information, please just make assumptions and document them for us.

## Task

- Build a responsive form. The form should includes a Search field for places (businesses, landmarks, locations, etc).

- While sending a loading indicator should be shown and all inputs must not be accessible.

- After receiving the data from the backend, the frontend should display the dataset as either a list of items, cards, a table, or any chosen manner.

- For the backend, we would like you to implement a small service which exposes a RESTful API for different clients (Web, Mobile, and more). The choice of programming language is yours.
  ​
- As a consumer of the service, I want to list places matching a query I provided from multiple providers on the internet (e.g. Google Places, Yelp, and/or Foursquare). As a first step we will only expect an integration with Google Places but the service should be extendable.
  ​
- The service should accept query parameter(s) and search for places with the Google Places API (https://developers.google.com/places/web-service/intro).

- The service should also accept location parameters (latitude, longitude) in the query and take these into consideration when querying providers.

- The response must contain following information:
  - ID
  - Provider
  - Name
  - Location (lat, lng) (if applicable)
  - Address (if applicable)
  - URI of the place where more details are available
- The code should be ready for production use
  ​
