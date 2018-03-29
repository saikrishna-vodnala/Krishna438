const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://nodemongo:node2018@ds121189.mlab.com:21189/nodemongo', (err, client) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB Sever');

	const db = client.db('nodemongo');

	db.collection('blog').insertOne({
		text: 'Something to do',
		completed: false
	}, (err, result) => {
		if (err) {
			return console.log('Unable to insert todo', err);
		}

		console.log(JSON.stringify(result.ops, undefined, 2));
	});

	client.close();
});