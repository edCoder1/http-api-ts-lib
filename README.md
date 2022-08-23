 I decided to create an http api to deliver a working application. That being said, I know I can simply create a NewDriver class that implements a common interface for services doing CRUD operations on any entity (evetns, cards, books, users.. etc) and describe that lib usage here

 Things to add:
  1. DTO classes to implement schema validation when receiving the request in the corresponding route.
  1. I still need to add the imlementation to handle returning up tp 300 event elements
  1. `GET /events/:id` route implementation (I would basically add schema validation, error handling, etc... just like `/events/all`)
  1. `POST /events` route implementation (I would basically add schema validation, error handling, etc... just like `/events/all`)
      1. I woul need `@Body` decorator (instead of `@Query`) and the DTO class to validate the proper body


##### Local Development

1. clone repository
1. install dependencies oin the rrot dir `npm i` or `npm ci`
1. run `npm start` or `npm run statr: prod`
1. To run UT `npm test`
1. Documentation (after running locally) `http:localhots:3000/api`

##### Usage
1. After running locally the server
1. Hit `http://localhost:3000` + `/route`, check documentation for supported routes info

##### Supported Routes Examples
1. `http:localhost/events/all?count=1&orderBy=status`
