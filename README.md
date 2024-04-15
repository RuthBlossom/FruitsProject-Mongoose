# MongoDB Script for Fruits Database Operations

## Introduction
This repository contains a MongoDB script written in JavaScript for educational purposes. The script demonstrates basic database operations using the MongoDB Node.js driver. It connects to a MongoDB server, inserts multiple documents into a collection, retrieves all documents from the collection, and closes the database connection.

## Requirements
- Basic understanding of JavaScript and Node.js.
- A local MongoDB server running on the default port (27017).
- Installation of the MongoDB Node.js driver (`mongodb` package).

## Installation
1. Clone or download the repository to your local machine.
2. Install the required Node.js packages by running `npm install` in the project directory.

## Usage
1. Ensure that your local MongoDB server is running.
2. Open a terminal and navigate to the project directory.
3. Execute the script by running `node mongodb_script.js`.
4. The script will connect to the MongoDB server, perform database operations, and log the results to the console.
5. After execution, the script will close the database connection.

## Script Overview
- The script starts by importing necessary modules such as `MongoClient` from the `mongodb` package and `assert`.
- It defines the connection URL for MongoDB (`mongodb://127.0.0.1:27017`) and the name of the database (`fruitsDB`).
- The `insertDocuments` function inserts multiple documents into the "fruits" collection and retrieves all documents from the collection.
- Database operations are executed asynchronously using Promises, ensuring proper error handling and flow control.
- The script connects to the MongoDB server, executes database operations, and closes the connection afterward.

## Code Structure
- `mongodb_script.js`: Main JavaScript file containing the MongoDB script.
- `package.json`: Node.js package configuration file.
- `package-lock.json`: Auto-generated file for package version locking.

## Educational Benefits
- Learn how to perform basic CRUD (Create, Read, Update, Delete) operations in MongoDB using the Node.js driver.
- Understand the concept of asynchronous programming in JavaScript and how to handle asynchronous operations using Promises.
- Gain insight into working with MongoDB databases and collections programmatically.

## Author
This MongoDB script was written for educational purposes.
