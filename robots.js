const express= require('express');
const path= require('path');
const MongoClient = require("mongodb").MongoClient;
const mustacheExpress = require('mustache-express');
const app=express();
const data = require("./data.js");
const url = "mongodb://localhost:27017/robots";



app.engine('mustache', mustacheExpress());
// app.set('views', './views')
app.set('view engine', 'mustache')
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));






app.get('/', function (req, res, next) {
  res.render('index', {users: data.users})
});

// app.get('users/:username' function (req, res) {
//   MongoClient.connect(uri)
//       .then(function(db){
//         return db.collection("users").insertMany(data.users);
//       })
//         .then(function(result){
//           // console.log(result);
//         })
//         db.close();
// });

app.get("/users/:username", function(req, res){
  MongoClient.connect(url, function(err, db){
    var users = db.collection("users");
    users.findOne({username: req.params.username}).then(function(docs) {
      console.log(docs);
      res.render('user', docs)
    });
    db.close();
  });
});


app.get("/unemployed", function(req, res){
 MongoClient.connect(url)
   .then(function(db){
     return db.collection("users").find({job:null}).toArray(function(err, doc){
       console.log(doc);
       res.render("unemployed", {users:doc});
     });
     db.close();
   });
 });

 app.get("/employed", function(req, res){
     MongoClient.connect(url)
       .then(function(db){
         return db.collection("users").find({job: {$ne: null}}).toArray(function(err, doc){
           console.log(doc);
           res.render("employed", {users:doc});
         });
         db.close();
       });
     });


// let data = "hello";

// app.get('/todo', function (req, res) {
//   res.render("index", data);
// })

app.get('/users/:id', function(req, res, next){
  let id = req.params.id;
  let actualID = id - 1;
  let user = data.users[actualID];
  res.render('user', user);
});


// app.get('/user/:id', function(req, res){
//     res.send('user ' + req.params.id);
// });

app.listen(3000, function () {
  console.log('Successfully started express application!');
})
