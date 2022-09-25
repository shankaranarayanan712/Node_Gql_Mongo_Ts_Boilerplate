# Booking Service (Boilerplate)

Node.js , Typescript, GraphQl, Mongo, Mongoose

## Requirements to run using npm

For development, you will need Node.js installed in your system a node global package, npm , installed in your environment.

- #### Install Node.js in your system
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    ex: v14.18.1

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

---

## Application Set up and test steps

## Install

    $ cd YOUR_PATH/src
    $ npm install

## Build

    $ npm run build

## Running the project using npm

    $ npm run start:dev

## Testing the project

    $ npm run test

## Service Overview

1. The Application is built with Node.js and Typescript.

2. GraphQL is used for API's.

3. It uses three tier Architecture with a clear separation of concerns divisions.

4. The application serves the purpose of a basic booking system , that serves booking for cars and offices and to filter them.

5. Seed Data is inserted for cars and offices as soon as the application is created.

6. An Admin is user is created as a seed with the credentials of (Admin@mail.com and admin). This can be used to obtain token.

7. Any user can see list of cars and offices.

8. But to book a car or office the user must be loggedin.

9. As mentioned in the step 6, you could use the credentials to get a test token to book car or office or to filter those.

10. Validations are in place, for example you cannot request with invalid request and an error is thrown for the same for correspondind endpoints.

11. Error handling is in place for services(ex: you cannot book a car or office for an unknown user that is not existing in system).

12. GraphQl protocols are followed to design the API's with route based mechanism which can be extended.

13. Test cases are written using Chai.

14. The Code is formatted using Prettier.

15. To perform test cases, run --> npm run test.
