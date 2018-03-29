const {MongoClient,ObjectID} = require('mongodb'); //Object destructuring

MongoClient.connect('mongodb://nodemongo:node2018@ds121189.mlab.com:21189/nodemongo', (err, client) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB Sever');

	const db = client.db('nodemongo');

	 db.collection('blogs').findOneAndDelete({
     	//title:"Krishna"
     	_id: new ObjectID('5abceb81fd3d1e56b2e02a65')
     }).then((res) => {
     	console.log(res);
     });
 });