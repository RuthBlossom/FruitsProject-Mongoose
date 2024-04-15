// jshint esversion:6

// This line sets the version of ECMAScript (JavaScript) the code is written in.
// It tells the JSHint tool to expect ES6 syntax.
// JSHint is a tool for detecting errors & potential problems in JavaScript code.
// Note: ES6 is an abbreviation for ECMAScript 2015, a significant update to JavaScript.
// It introduced new features like arrow functions, classes, & more.
// However, the provided code doesn't actually use any ES6 features.
// So, this comment might not be necessary in this context.

//console.log("Script is running...");


const MongoClient = require('mongodb').MongoClient;
// This line imports the MongoClient class from the 'mongodb' package.
// The MongoClient class allows you to interact with a MongoDB database.
// MongoDB is a popular NoSQL database.
// The ".MongoClient" part of the require statement is used to access the MongoClient class.
// The "require" function is a Node.js feature used to import modules from external packages.

const assert = require('assert');
// This line imports the "assert" module.
// The "assert" module is a built-in Node.js module used for writing tests & assertions.

// Connection URL
const url = "mongodb://0.0.0.0:27017";
// This is the URL used to connect to the MongoDB server.
// It specifies the server's address (localhost) & the port (27017) to connect to.

// Database Name
const dbName = 'fruitsDB';
// This variable stores the name of the database we will be working with.

// Create a new MongoClient
const client = new MongoClient(url, {useNewUrlParser: true});
// Here, a new instance of the MongoClient class is created.
// It is instantiated with the URL to the MongoDB server.

// Use connect method to connect to the server
client.connect(function (err) {
	// This function is called when the connection attempt is complete.
	// It takes an error object as an argument, which will be null if there's no error.
	// The purpose of this function is to establish a connection to the MongoDB server.

	assert.equal(null, err);
	// This line uses the "assert" module to check if the "err" object is null.
	// In other words, it checks if there was no error during the connection attempt.
	// If there was an error, this assertion will fail & an error message will be displayed.

	console.log("connected successfully to server");
	// If the connection was successful (no error), this message will be printed to the console.

	const db = client.db(dbName);
	// This line accesses the specified database ("fruitsDB") using the connected client.
	// The "db" variable now holds a reference to the database.

	insertDocuments(db, function() {
		client.close();
	});
	// client.close();
});
//only once it's done inserting the documents
// do we close the connection to our database.
// This line closes the connection to the MongoDB server.
// It's important to close the connection when you're done using it to free up resources.


// Define a function named insertDocuments that takes 'db' and 'callback' as parameters
// The insertDocuments function takes two parameters: a db object (presumably a database connection) & a callback function.
const insertDocuments = function (db, callback) {
	// Get the documents collection from the 'fruits' collection
	// Inside the function, the collection variable is assigned the reference to the "fruits" collection in the database
	const collection = db.collection("fruits");

	//find some documents
	collection.find({}).toArray(function (err, fruits) {
		assert.equal(err, null);
		console.log("Found the following records")
		console.log(fruits)
		callback(fruits);
	});

	// The collection.insertMany method is used to insert an array of documents into the collection. Each document represents a fruit with attributes such as name, score, & review.
	// Insert an array of documents into the collection
	collection.insertMany([
		{
			name: "Apple",
			score: 8,
			review: "Great fruit"
		},
		{
			name: "Orange",
			score: 6,
			review: "Kinda sour"
		},
		{
			name: "Banana",
			score: 9,
			review: "Great stuff!"
		}
	], function (err, result) {

		// The provided callback function for the insertion operation takes two arguments: an err object & a result object.
		// Check for errors during insertion. Inside the callback, the code checks for errors by ensuring that err is null
		assert.equal(err, null);

		// Check if 3 documents were inserted successfully
		// It then checks if exactly 3 documents were inserted successfully into the collection by comparing result.result.n with 3.
		assert.equal(3, result.result.n);

		// Check if the 'result' object contains an array with a length of 3
		// The code also verifies if the result object contains an array with a length of 3, ensuring that the inserted documents are correctly stored in the result.ops array.
		assert.equal(3, result.ops.length);

		// A log message is printed to the console to indicate the successful insertion of 3 documents.
		console.log("Inserted 3 documents into the collection");

		// Call the provided 'callback' function and pass the 'result'
		// Finally, the provided callback function is called with the result object as an argument.
		callback(result);
	});
}
//Please note that the assert statements are used to perform runtime assertions, ensuring that the conditions specified are met.
// If any assertion fails, it could indicate an issue in the insertion process. Also, make sure that the assert module is available & properly imported in your code for this code to work.
