const express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const http = require("http");
const mongoose = require('mongoose');
const { data } = require("jquery");
const { APP_ID } = require("@angular/core");
const CONNECTION_URL = "mongodb+srv://shisoni:shisoni@lootkamaal-wbiet.mongodb.net/test";
const DATABASE_NAME = "InventoryManagementSystem";

const app = express();
const jwt    = require('jsonwebtoken');

//const port = process.env.PORT || 4200;

const server = http.createServer(app);

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
//app.use(express.static('dist'));

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


var database,collection1,collection2,token;





app.post("/api/login/", (request, response) => {

    collection1.findOne({username:request.body.username,password:request.body.password},function(error, result)  {
       if(error) {
           return response.status(500).send(error);
       }
       else
       {
           const payload = {
               username : request.body.username,
               password : request.body.password
           };
        token = jwt.sign(payload,'abcxyz',{expiresIn:1440});
       }
      
       response.status(200).json({"status":"Authenticated","token":token});
   });
 
});

app.post("/api/assets/", (request, response) => {

    getNextSequence("assetId", function(err, result){
        if(!err){
           collection2.insert({
        "_id":result,
        "assetName":request.body.assetName,
        "registrationDate":request.body.registrationDate});
           }
           console.log(result);
        });

           
  
 
});

app.get("/api/assets/", (request, response) => {

    var access_token= request.headers.authorization;
    collection2.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        else if(access_token == token)
        {
            response.send(result);
        }
        
    });
 
});

app.get("/api/assets/:_id", (request, response) => {

    var id= request.params._id;
    var access_token= request.headers.authorization;
    collection2.find({_id:id}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        else if(access_token == token)
        {
            response.send(result);
        }
        
    });
 
});



function getNextSequence(name, callback) {
    collection3.findAndModify( { _id: name }, null, { $inc: { seq: 1 } }, function(err, result){
        if(err) callback(err, result);
        callback(err, result.value.seq);
    } );
}

  
server.on('listening',function(){
    console.log('ok,server is running');
})


server.listen(4000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true,useFindAndModify: false }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection1 = database.collection("User");
        collection2 = database.collection("Assets");
        collection3 = database.collection("Counters");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });

    
     

});