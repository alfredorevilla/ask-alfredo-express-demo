# Quote API  demo #

<h1 style="border:none">This is work in progress</h1>


## Coding goals ##
1. Keep presentation/service/model layers well defined and decoupled.
1. Keep codebase as simple (and small) as possible using as much stateless objects and pure functions as possible and as few classes as possible.
1. Keep low count of dependencies.

## Pre-requisites ##
1. Create a quote-db database in postgres.
1. Update knexfile.js accordingly.


## Build ##
From console or terminal run:<br/>
``npm i``

## Scripts ##

|Script|Description|
|-|-|
|npm start|Starts the application at http://localhost:3000|
|npm run startmon|Starts the application at http://localhost:3000 and monitors changes in app source code|
|npm test|Run tests using mocha|
|npm run testmon|Run tests using mocha and watches for changes in test source code|
|npm run testdebug|Run tests using mocha, watches for changes in test code code and starts node debugging|
|npm run testcc|Displays code coverage using nyc and mocha|

## Todo ##
1. Solve quote model items collection not setting quoteId FK on save.
1. Refactor models into classes to keep control of connection pool size.
1. Remove consumer and contractor controllers and services.
1. Move user creation confirmation mail sending to auth controller and service.
1. Rework consumer and contractor "user" models.
1. Document code!
1. Add more tests.

## Nice to have ##
1. Auth enforced rules for quote update (E.G. Who can update/accept/reject a quote).
1. Auto-linting, formatting, prettifying, test running on commit.
1. DI container.
1. Build enviroments.


