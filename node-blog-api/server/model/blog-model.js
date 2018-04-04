const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

var BlogSchema = new mongoose.Schema({
	title:{
		type: String,
		required: true,
		default: 'Blog-Title',
		unique:true
	},
	tags:{
		type: Array,
		default:["tags"]
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
		default:true
	},
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

BlogSchema.methods.generateAuthToken = function () {
  var blog = this;
  var access = 'auth';
  var token = jwt.sign({_id: blog._id.toHexString(), access}, 'abc123').toString();

  blog.tokens.push({access, token});

  return blog.save().then(() => {
    return token;
  });
};

BlogSchema.statics.findByToken = function (token) {
  var Blog = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return Blog.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

BlogSchema.statics.findByToken = function (token) {
  var Blog = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return Blog.findOneAndRemove({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

var Blog = mongoose.model('blog1', BlogSchema);

module.exports ={Blog};