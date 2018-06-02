# Quote API  demo #


## Highlights ##
1. Three well separated layers: api (controllers), service and demol (data stores): controllers talk to services, services to services and stores and stores to undelying db (postgre).
1. Manual dependency injection, also default dependencies for added intellisense and ease of setup. Any approach has its pros and cons.
1. Validation across all the layers.
1. App response returns status 404 on vaidation error, 400 no resource or data not found and 500 on application errors.
1. Code comments to explain the rationale behind them.
1. Some not good code left with comments in order to show recon and suggestions in such cases.
1. json and env based configuration. See sendEmailMessage.js.


## Coding premises ##
1. Use as much stateless objects and pure functions as possible and as few classes as possible to keep code as simple and small as possible
1. Use as few dependencies as possible to keep project simple and showcase vanilla javascript expertise.
1. Use as much validation as possible.


## Pre-requisites ##
1. Install node and npm from https://nodejs.org/en/.
1. Install postgres from https://www.postgresql.org/.
1. Create a quote-db database in postgres.
1. Update knexfile.js accordingly.


## Build ##
From the console or terminal run:<br/>
``npm i``


## Scripts ##

|Script|Description|
|-|-|
|npm run updatedb|Updates the database schema using knex migrations|
|npm start|Starts the application at http://localhost:3000
|npm run startmon|Starts the application at http://localhost:3000 and monitors changes in app source code
|npm test|Run tests using mocha|
|npm run testmon|Run tests using mocha and watches for changes in test source code|
|npm run testdebug|Run tests using mocha, watches for changes in test code code and starts node debugging|
|npm run testcc|Displays code coverage using nyc and mocha|

## Todo ##
1. Solve quote model items collection not setting quoteId FK on save.
1. Review and ensure correct async unit test assertion.
1. Seed database.
1. Refactor models into classes to keep control of connection pool size.
1. Choose controller testing methodology and create tests.
1. Add more integration tests.
1. Add manual tests (e.g. postman collections).
1. Fix npm code coverage script.

## Nice to have ##
1. Jwt based auth.
1. Auth enforced rules for quote update (E.G. Who can update/accept/reject a quote).
1. Auto-linting, formatting, prettifying, test running on commit.
1. DI container.
1. Build and deploy enviroments.


