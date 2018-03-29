//const express = require('express');
//const {ObjectID} = require('mongodb');
//const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {Blog} = require('./model/blog-model');

var Blog1 = new Blog({
	title:'ArticleReader',
	tags:'if u read,u get knowledge',
	body:'All the articles',
	author:'krishnakanth',
	creationdate: new Date(),
	updatedate:'24/10/2016',
	status:'okay'
});

Blog1.save().then((doc) => {
	console.log(JSON.stringify(doc, undefined, 2));
}, (e) => {
	console.log('Unable to save',e);
});