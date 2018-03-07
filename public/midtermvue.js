
var data = [];

var moredata = [];

var clientupdate = [];

var fetchmeetings = function () {
  return fetch('https://calm-bastion-12932.herokuapp.com/meetings').then(function (response) {
    return response.json();

  });
};

var fetchclients = function () {
  return fetch('https://calm-bastion-12932.herokuapp.com/clients').then(function (response) {
    return response.json();

  });
};


var app = new Vue({
  el: "#all",
  data: {
    Dison: false,
    people: false,
    pluscard: false,
    edit: false,
    myDate: Date(),
    wrongs: [],
    badmeetings: [],
    items: data,
    selected: "",
    meetings: moredata,
    newupdate: clientupdate,
    newmeeting:{
      fname: "",
      atime: ""
    },
    newitem: {
      clientname: "",
      address: "",
      phone: "",
      email: ""
    },
    updateitem: {
      clientname: "",
      address: "",
      phone: "",
      email: ""
    }
  },

  methods: {

    dropdown: function(){
      this.Dison = !this.Dison;
    },


    peoplecard: function(){
      this.people = !this.people;
    },


    addcard: function(day){
      this.pluscard = !this.pluscard;
      this.dayToAdd = day;
      console.log("addcard called", day);
    },

    checkmeeting: function(){
      this.badmeetings= [];
      if(this.newmeeting.fname.length == 0){
        this.badmeetings.push("Enter name");
      }
      if(this.newmeeting.atime.length == 0){
        this.badmeetings.push("Enter a time");
      }
    },

    validEmail:function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    checkform: function(email){
      this.wrongs= [];
      if(this.newitem.clientname.length == 0){
        this.wrongs.push("Enter full name");
      }
      if(this.newitem.address.length == 0){
        this.wrongs.push("Enter address");
      }
      if(this.newitem.phone.length == 0){
        this.wrongs.push("This has to be a number");
      }
      if(!this.validEmail(this.email)) {
        this.wrongs.push("Valid email required.");
      }
    },

    remove: function(item){
      var k = confirm("you sure you want to delete?");
      if (k == true) {
        fetch('https://calm-bastion-12932.herokuapp.com/clients/'+item._id, {
        method: 'DELETE', // or 'PUT
        headers: {
        },
        }).then(function(response) {
          if (
            response.status == 204
          ){
            fetchclients().then(function (data) {
              app.items = data;
              console.log(data);
            });
          }
        });
    } else {
        console.log("cancel");
     }
   },


    autofill: function(item) {
      app.updateitem = Object.assign({}, item);
    app.edit = !app.edit
},

    updateclient: function(){
      var query = "clientname="+ encodeURIComponent(this.updateitem.clientname) + "&address=" + encodeURIComponent(this.updateitem.address) + "&phone=" + encodeURIComponent(this.updateitem.phone) + "&email=" + encodeURIComponent(this.updateitem.email);
      fetch('https://calm-bastion-12932.herokuapp.com/clients/'+app.updateitem._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: query
      }).then(function(response) {
        console.log(response.status)
        if (
          response.status == 204
        ){
          fetchclients().then(function (clientupdate) {
            console.log(clientupdate)
            app.items = clientupdate;
          });
        }
      });
      this.updateitem = {
        clientname: "",
        address: "",
        phone: "",
        email: ""
      };
    },

    end: function(meeting){
      console.log(meeting._id);
      var r = confirm("are you sure you want to remove date?");
      if (r == true){
        fetch('https://calm-bastion-12932.herokuapp.com/meetings/'+meeting._id, {
        method: 'DELETE', // or 'PUT
        headers: {
        },
        }).then(function(response) {
          if (
            response.status == 204
          ){
            fetchmeetings().then(function (moredata) {
              app.meetings = moredata;
              console.log(moredata);
            });
          }
        });

      } else {
        console.log("cancel");
      }
    },

    submit: function (){
      this.checkform();
      var query = "clientname="+ encodeURIComponent(this.newitem.clientname) + "&address=" + encodeURIComponent(this.newitem.address) + "&phone=" + encodeURIComponent(this.newitem.phone) + "&email=" + encodeURIComponent(this.newitem.email);
      if (this.newitem.clientname.length  == 0){
        console.log("fill the form");
      }
      if(this.newitem.address.length == 0){

      }
      if(this.newitem.phone.length == 0){

      }
      if(this.newitem.email.length == 0){

      }
      else
      { fetch('https://calm-bastion-12932.herokuapp.com/clients', {
      method: 'POST', // or 'PUT
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: query
    }).then(function(response) {
      if (
        response.status == 201
      ){
        fetchclients().then(function (data) {
          app.items = data;
        });
      }
    });
    this.newitem = {
      clientname: "",
      address: "",
      phone: "",
      email: ""
    };
  }
  },

send: function (){
  this.checkmeeting();
  var query = "fname="+ encodeURIComponent(this.newmeeting.fname) + "&atime=" + encodeURIComponent(this.newmeeting.atime);
  console.log(this.newitem);
  if(this.newmeeting.fname.length == 0){
    console.log("fill out form")
  }
  if(this.newmeeting.atime.length == 0){

  } else {
  fetch('https://calm-bastion-12932.herokuapp.com/meetings', {
  method: 'POST', // or 'PUT
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: query
}).then(function(response) {
  if (
    response.status == 201
  ){
    fetchmeetings().then(function (moredata) {
      app.meetings = moredata;
      console.log(moredata);
    });
  }
});
this.newmeeting = {
  fname: "",
  atime: "",
};
}
}
},

created: function () {
  // this code runs when the vue object is created\
  fetchclients().then(function (data) {
    console.log(data);
    app.items = data;
  });
  fetchmeetings().then(function (moredata) {
      console.log(moredata);
       app.meetings = moredata;
     });
},
});
