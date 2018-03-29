var mongoose = require('mongoose');

var Blog = mongoose.model('blog',{
	title:{
		type: String,
		required: true,
		default: 'Blog-Title'
	},
	tags:{
		type: String,
		default:'tag'
	},
	body:{
		type: String,
		default:'Blog-Body'
	},
	author:{
		type: String,
		default:'Blog-Author'
	},
	creationdate:{
		type: String
	},
	updatedate:{
		type: String
	},
	status:{
		type: String,
		default:'Blog-status'
	}
});

module.exports ={Blog};