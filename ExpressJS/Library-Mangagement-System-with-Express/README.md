# Library-Mangagement-System

    This is a library management API Backend for the management of users and the books

# Routes and the Endpoints

## /users

GET: Get all the list of users in the system <br />
POST: Create / Register a new user

## /users/{id}

GET: Get a user by their ID <br />
PUT: Updating a user by their ID <br />
DELETE: Delating a user by their ID (Check if the user still has an issued book) && {is there any fine / penalty to be collected}

## /users/subscription-details/{id}

GET: Get a user subscription details >> Date of subscription >> Valid till ? >> Fine if any ?

## /books

GET: Get all the books in the system <br />
POST: Add a new book to the system

## /books/{id}

GET: Get a book by its ID <br />
PUT: Update a book by its ID <br />
DELETE: Delete a book by its ID

## /books/issued/for-users

GET: Get all the issued books

## /books/issued/withFine

GET: Get all issued books with their fine amount

### Subscription Types

    >> Basic (3 months)
    >> Standard (6 months)
    >> Premium (12 months)

> > If a user missed the enewal date, then user should be collected with &#8377;100 <br />
> > If a user misses his subscription, then user is expected to pay &#8377;100 <br />
> > If a user misses both renewal & subscription, then the collected amount should be &#8377;200

## Commands:

    npm init
    npm i express
    npm i nodemon --save-dev

    npm run dev -> To start the application

To restore node_modules and package-lock.json --> npm i / npm install
