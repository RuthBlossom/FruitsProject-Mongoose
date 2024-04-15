console.log("Script is running...");

//Imports:
// The code starts by importing the necessary modules: MongoClient from the 'mongodb' package & assert.
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = "mongodb://127.0.0.1:27017";
//Connection URL and Database Name:
//
// It defines the connection URL for MongoDB (usually running locally on the default port) & the name of the database (fruitsDB in this case).
const dbName = 'fruitsDB';

// Create a new MongoClient
const client = new MongoClient(url, {useNewUrlParser: true});

// Creating a MongoClient Instance:
// It creates a new instance of the MongoClient & passes the connection URL along with an options object that includes useNewUrlParser: true. This option is needed to avoid a deprecation warning regarding URL parsing.

// Define a function named insertDocuments
const insertDocuments = function (db) {
	const collection = db.collection("fruits");

	//insertDocuments Function:
	// The insertDocuments function takes a database (db) as a parameter.
	// It retrieves a reference to the "fruits" collection within the database.
	// It performs a find({}) operation on the collection to retrieve all documents & prints them.
	// .find({}) is a method call on the collection. The curly braces {} define an empty query object, meaning "match all documents."
	// It defines an array of documents (docs) to insert into the collection.
	// It uses the insertMany method to insert the documents.
	// The Promise returned by insertMany is chained with .then() & .catch() to handle the success & error cases respectively.

	collection.find({}).toArray(function (err, fruits) {
		assert.equal(err, null);
		console.log("Found the following records:");
		console.log(fruits);
	});

	// toArray() is a method that converts the result of the query into an array of documents.
	// The callback function provided to .toArray() takes two parameters: err for error handling & fruits which will hold the array of documents retrieved from the collection.
	// Inside the callback, it uses assert.equal(err, null) to check if there was no error.
	// If there's no error, it logs the retrieved documents using console.log(fruits).

	let docs = [
		{
			name: "Pineapple",
			score: 8,
			review: "Great fruit"
		},
		{
			name: "Naartjie",
			score: 6,
			review: "Kinda sour"
		},
		{
			name: "Cherry",
			score: 9,
			review: "Great stuff!"
		}
	];

	//Connecting to the Database & Executing Operations:

	// The code then calls the connect() method of the MongoClient instance.
	// It uses the then() method to handle the successful connection. Within this callback, it retrieves a reference to the database (db).
	// It then calls the insertDocuments function using the db reference, chaining another then() to handle the successful insertion & closing the client connection.
	// If an error occurs at any point, the catch() block will handle it & log the error.

	// collection is a reference to a MongoDB collection obtained from the database.
	return collection.insertMany(docs)
		.then(result => {
			assert.equal(3, result.insertedCount);
			console.log(`Inserted ${result.insertedCount} documents into the collection`);
			// assert.equal(3, result.ops.length);
			return result;
		})
		.catch(err => {
			console.log(err);
			throw err;
		});
}

// Use connect method to connect to the server
// client.connect(function (err) {
// 	assert.equal(null, err);
// 	console.log("Connected successfully to server");
// 	const db = client.db(dbName);

// 	insertDocuments(db, function () {
// 		client.close();
// 	});
// });

//Commented-out Callback Code above:
//
// There's commented-out code using the older callback-style approach. This code was used in older versions of the MongoDB driver where you would pass a callback function to the connect & insertDocuments() methods.
// This approach is less preferred nowadays due to its callback hell structure.


client.connect()
	.then(() => {
		console.log("Connected successfully to server");
		const db = client.db(dbName);

		insertDocuments(db)
			.then(() => {
				client.close();
				console.log("Closed db");
			});
	})
	.catch(err => {
		console.log(err);
	});
