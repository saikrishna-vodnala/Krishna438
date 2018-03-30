const {MongoClient,ObjectID} = require('mongodb'); //Object destructuring
const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./../server/db/mongoose');


var app = express(),id;

app.use(bodyParser.json());

MongoClient.connect('mongodb://nodemongo:node2018@ds121189.mlab.com:21189/nodemongo', (err, client) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB Sever');

	const db = client.db('nodemongo');
    app.post('/blogs', (req, res) => {

//Fetching data by Id

id = req.body.id;
db.collection('blog1').find({_id: new ObjectID(id)}).toArray().then((docs) => {
	console.log(JSON.stringify(docs, undefined, 2));
});

// Fetching data by title

//    title = req.body.title;
//    db.collection('blog1').find({title}).toArray().then((docs) => {
// 	console.log(JSON.stringify(docs, undefined, 2));
// });

// Fetching data by tags
      
	// tags = req.body.tags;
	// db.collection('blog1').find({tags}).toArray().then((docs) => {
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// });
      
//client.close();
});
});

app.listen(3000, () => {
	console.log('Started on port 3000');
});

module.exports = {
	app
};