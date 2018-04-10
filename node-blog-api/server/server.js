const express = require('express');
const {ObjectID} = require('mongodb');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {Blog} = require('./model/blog-model');
//const {User} = require('./model/blog-model');
const _= require('lodash');


var app = express();

app.use(bodyParser.json());

app.post('/blogs/create', (req, res) => {
  var body = _.pick(req.body, ['title','author']);
  var blog = new Blog(body);
  blog.save().then(() => {
    return blog.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(blog);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.post('/user/create', (req, res) => {
  var body =_.pick(req.body, ['name','title']);
  var user = new User(body);
  user.save().then(() => {
    return user.generateAuthToken();
    console.log(token)
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});


// getting all the collection data
app.get('/blogs', (req, res) => {
  Blog.find().then((blogs) => {
    res.send({
      blogs
    });
  }, (e) => {
    res.status(400).send(e);
  })
});

// getting blogs by author
app.get('/blogs/:author', (req, res) => {
  var author = req.params.author;
  Blog.find({"author": author}).then((blogs) => {
    res.send(blogs);
  }, (err) => {
    res.status(400).send(e);
  })
});

// app.get('/blogs/:id', (req, res) => {
//   var id = req.params.id;
//   Blog.findOne({_id: new ObjectID(id)}).then((blogs) => {
//     res.send(blogs);
//   }, (e) => {
//     res.status(400).send(e);
//   })
// });

//getting blog by token
app.get('/blogs/me', (req, res) => {
  var token = req.header('x-auth');
  console.log(token);
  Blog.findByToken(token).then((blog) => {
    if (!blog) {
      return res.status(404).send();
    }
    res.send({
      blog
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

//deleting blog by token
app.delete('/blogs/delete/:author', (req, res) => {
  var author = req.params.author;
    Blog.deleteMany({"author": author}).then((blog) => {
    if (!blog) {
      return res.status(404).send();
    }
    res.send({
      blog
    });
  }).catch((e) => {
    res.status(400).send();
  });
});
    
 // updating blog by id    
app.patch('/blogs/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['title', 'author']);
  Blog.findByIdAndUpdate(id, {
    $set: body
  }
  , {
    new: true //returnOriginal:false
  }
  ).then((blog) => {
    if (!blog) {
      return res.status(404).send();
    }
    res.send({
      blog
    });
  }).catch((e) => {
    res.status(400).send();
  })
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {
  app
};
