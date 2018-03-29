const {MongoClient,ObjectID} = require('mongodb'); //Object destructuring

MongoClient.connect('mongodb://nodemongo:node2018@ds121189.mlab.com:21189/nodemongo', (err, client) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB Sever');

	const db = client.db('nodemongo');

	 db.collection('blogs').findOneAndUpdate({
    _id: new ObjectID('5abcee8af36d281e4f81eca6')
     }, {
    $set: {
      title:"Krishna",
      //completed: true
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });
});