var mongoose = require("mongoose");
mongoose.connect("mongodb://midtermTest:dixiestate@ds153198.mlab.com:53198/midterm4200");

var Client = mongoose.model("Client",
{
  clientname: {type: String, required: [true, "Enter Clients full name"]},
  address: {type: String, required: [true, "Enter address"]},
  phone: {type: Number, required: [true, "Enter phone number"]},
  email: {type: String, required: [true, "Enter email"]},
});

var Meeting = mongoose.model("Meeting", {
  fname: {type: String, required: [true, "Enter name"]},
  atime: {type: String, required: [true, "please enter a time"]}
 });

module.exports = {
  Meeting: Meeting,
  Client: Client
};
