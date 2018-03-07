var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var model = require("./model.js");
var serverStatic = require("serve-static");
app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


console.log("loaded");
// ------------------------------------------------------------------------------------------------------
// Clients

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   next();
// });

app.get("/clients", function(request, response) {
  model.Client.find().then(function (clients){
    response.set("Access-Control-Allow-Origin", "*");
    response.json(clients);
  });
});

app.post("/clients", function(request, response){
  // data.push(request.body);
  var client = new model.Client ({
    clientname: request.body.clientname,
    address: request.body.address,
    phone: request.body.phone,
    email: request.body.email
  });

  client.save(function (err) {
    if(err && err.errors){
      var messages = {}
      for (var e in err.errors){
        messages[e] = err.errors[e].messages;
      }
      response.status(422).json(messages);
    }
    else {
      response.set("Access-Control-Allow-Origin", "*");
      response.sendStatus(201);
    }
  })
  });



app.delete("/clients/:cid", function(request, response){
    response.set("Access-Control-Allow-Origin", "*");
    response.status(204);
    response.send("deleted");
    model.Client.remove( { _id: request.params.cid }, function(error) {
    if (error){
    console.log("error");
  };
});
});

app.put("/clients/:cid", function(request, response) {
  model.Client.findOneAndUpdate(
    { _id: request.params.cid },
    {
      clientname: request.body.clientname,
      address: request.body.address,
      phone: request.body.phone,
      email: request.body.email
    },
    function(error, client) {
      if (error){
        console.log("error");
      };
      response.set("Access-Control-Allow-Origin", "*");
      response.status(204);
      response.send("updated");
    });
});
// -----------------------------------------------------------------------------------------------------------------------
// meetings

app.get("/meetings", function(request, response) {
  model.Meeting.find().then(function (meetings){
    response.set("Access-Control-Allow-Origin", "*");
    response.json(meetings);
  });
});

app.post("/meetings", function(request, response){
  // data.push(request.body);
  var meeting = new model.Meeting ({
    fname: request.body.fname,
    atime: request.body.atime,
  });

  meeting.save(function (err) {
    if(err && err.errors){
      var messages = {}
      for (var e in err.errors){
        messages[e] = err.errors[e].messages;
      }
      response.status(422).json(messages);
    }
    else {
      response.set("Access-Control-Allow-Origin", "*");
      response.sendStatus(201);
    }
  })
  });

app.delete("/meetings/:mid", function(request, response){
    response.set("Access-Control-Allow-Origin", "*");
    response.status(204);
    response.send("deleted");
    model.Meeting.remove( { _id: request.params.mid }, function(error) {
    if (error){
    console.log("error");
  };
});
});





app.listen(app.get('port'), function () {
  console.log("express...");
});
