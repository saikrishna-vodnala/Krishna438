const express = require('express');
const {ObjectID} = require('mongodb');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {Blog} = require('./model/blog-model');

var app = express();

app.use(bodyParser.json());

app.post('/blogs', (req, res) => {
	//console.log(req.body);
  var blog = new Blog({
    title: req.body.title,
    tags: req.body.tags,
    body: req.body.body,
    author: req.body.author,
    creationdate: req.body.creationdate,
    updatedate: req.body.updatedate,
    status: req.body.status
  });

  blog.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});



// app.get('/blogs/:id', (req, res) => {
//   var id = req.params.id;

//   if (!ObjectID.isValid(id)) {
//     return res.status(404).send();
//   }

//   Blog.findById(id).then((blog) => {
//     if (!blog) {
//       return res.status(404).send();
//     }
//     res.send({blog});
//   }).catch((e) => {
//     res.status(400).send();
//   });
// });

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};






// var Blog1 = new Blog({
// 	title:'ArticleReader',
// 	tags:'if u read,u get knowledge',
// 	body:'All the articles',
// 	author:'krishnakanth',
// 	creationdate: new Date(),
// 	updatedate:'24/10/2016',
// 	status:'okay'
// });

// Blog1.save().then((doc) => {
// 	console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
// 	console.log('Unable to save',e);
// });