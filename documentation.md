# Running the User CRUD App

This guide explains how to set up and run this User CRUD app, which allows you to perform Create, Read, Update, and Delete operations on user records.

## Tech Stack and Pre-requisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MySQL](https://dev.mysql.com/downloads/mysql/) installed and running on your local machine

## Database Configuration and Setup

1. Open the `db-config.js` file in your project to configure the database connection settings:

   ```javascript
   module.exports = {
     HOST: "localhost",
     USER: "root",
     PASSWORD: "root",
     DATABASE: "user_record_db",
     DIALECT: "mysql"
   }

CREATE DATABASE IF NOT EXISTS user_record_db;

1. Clone the repository.
2. Install all dependencies with: ```npm i```
3. Start with: ```npm start```
4. Contact: [Here](k.romann413@gmail.com) for errors.


<br><br>
# Documentation for API endpoints

## Create a New User Record

**Endpoint:** `POST: /api/users`

**Description:** Create a new user record with provided data.

**Request:**
- Method: `POST`
- Body:
  ```json
  {
    "username": "rxman",
    "email": "rxman@gmail.com",
    "contacts": "9876787871"
  }
  ```


## Update a User Record

**Endpoint:** `PATCH: /api/users/:usersId`

**Description:** Update an existing user record with new data. Selected fields only can be updated. 

**Request:**
- Method: `PATCH`
- Body: 
  ```json
  {
    "username": "rxman", // or/and
    "email": "rxman@gmail.com", // or/and
    "contacts": "9876787871" 
  }
  ```



## Delete a User Record

**Endpoint:** `DELETE: /api/users/:usersId`

**Description:** Delete an existing user record.

**Request:**
- Method: `DELETE`



## Get a User Record

**Endpoint:** `GET: /api/users/:usersId`

**Description:** Get an existing user record as an object.

**Request:**
- Method: `GET`


## Get a list of User Records

**Endpoint:** `GET: /api/users`

**Description:** Get a list of records existing users..

**Request:**
- Method: `GET`


<br><br><br>

# Running test cases

**Note: The server and the app must be up and running**

**Detailed usecases can be found in the comments in respective test cases**

## Library used
- Sinon: `^15.2.0`
- Mocha: `^10.2.0`
- Chai: `^4.3.8`