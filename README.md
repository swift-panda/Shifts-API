# Shifts API

## Dependencies

This application is built using node and posgres

For running in development mode create a database called shifts_dev
`createdb shifts_dev`

Also for running against test create a database called shifts_test
`createdb shifts_test`

Next migrate and seed the database
`npm run migrate:dev`
`npm run seed:dev`

## Run the Application

`npm start`

## Testing the Application

This will require running the application in one tab and the end to end test in another

To run the server in test mode
`npm run start:test`

Then while that is running
`npm run test`
