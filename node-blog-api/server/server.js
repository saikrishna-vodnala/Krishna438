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

// getting all the collaction data
app.get('/blogs', (req, res) => {
  Blog.find().then((blogs) => {
    res.send({blogs});
  }, (e) => {
    res.status(400).send(e);
  })
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};






