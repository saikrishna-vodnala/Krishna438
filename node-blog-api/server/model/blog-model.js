var mongoose = require('mongoose');

var Blog = mongoose.model('blog1',{
	title:{
		type: String,
		required: true,
		default: 'Blog-Title'
	},
	tags:{
		type: Array,
		default:null
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
		type: String,
		default:"30/04/2018"
	},
	updatedate:{
		type: String,
		default: "30/03/2018"
	},
	status:{
		type: Boolean,
		default:false
	}
});

module.exports ={Blog};