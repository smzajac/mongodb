const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb://localhost:27017/robots";
const data = require("./data");


MongoClient.connect(uri)
  .then(function(db){
    return db.collection("people").insert({name: "Edwin", age: 31});
  })
    .then(function(person){
      console.log(person);
    })


  MongoClient.connect(uri)
      .then(function(db){
        return db.collection("users").insertMany(data.users);
      })
        .then(function(result){
          console.log(result);
        })
