const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
//const _ = require('lodash');

var BlogSchema = new mongoose.Schema({
	title:{
		type: String,
		required: true,
		//default: 'Blog-Title'
	},
	tags:{
		type: Array,
		//default:["tags"]
	},
	body:{
		type: String,
		//default:'Blog-Body'
	},
   author:{
       type:String,
      // default:'Blog-Author'
         },
  
	// author:{
 //   type: mongoose.Schema.Types.ObjectId
		
	// },
	creationdate:{
		type: String,
		//default:"30/04/2018"
	},
	updatedate:{
		type: String,
		//default: "30/03/2018"
	},
	status:{
		type: Boolean,
		//default:true
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

var UserSchema = new mongoose.Schema({
 name:{
  type:'String',
  default:'sai'
 },
 title:{
  type:'String',
  default:'Title'
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

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};



BlogSchema.methods.generateAuthToken = function () {
  var blog = this;
  var access = 'auth';

  var token = jwt.sign({_id: blog._id.toHexString(), access}, 'abc123').toString();
  //console.log(token);
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

BlogSchema.statics.findByAuthor = function (token) {
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
//var User = mongoose.model('user1', UserSchema);

module.exports ={Blog};
//module.exports ={User};