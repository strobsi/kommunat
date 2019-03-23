const express = require("express");
const request = require('request');
const router = express.Router();
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var formidable = require('formidable')
const expressSanitizer = require('express-sanitizer');

// Display the dashboard page
router.get("/", (req, res) => {
  var userID = String(req.userinfo.sub);
  var userImg = "http://localhost:3000/uploads/"+userID+".png"
  console.log(userImg)
  res.render("profile",{ userImg:userImg });
});

router.post("/",jsonParser,(req, res) => {

  var user = req.user;
  var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'SSWS 00BBR-JpQ-tVhtCjkCtyTg3FHpxDaR54EWGOyKNRUK'
  };

  var dataString = { profile: 
    { 
      firstName: req.body.firstName, 
      lastName: req.body.lastName,
      email: req.body.email,
      birthdate: req.body.birthdate,
      list:req.body.list,
      phone: req.body.phone,
      list_number: req.body.list_number,
      district: req.body.district,
    } 
  };

  var options = {
      url: 'https://dev-664243.oktapreview.com/api/v1/users/'+user.id,
      method: 'POST',
      headers: headers,
      body: JSON.stringify(dataString),
  };

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
          res.render("profile");
      }
      else {
        console.log("Error: ")
        console.log(error)
      }
  }
  request(options, callback);
})  

router.post("/image",jsonParser,(req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req);
  form.on('fileBegin', function (name, file){
      file.path = __dirname + '/../assets/uploads/' + req.userinfo.sub+".png";
  });
  form.on('file', function (name, file){
      console.log('Uploaded ' + req.userinfo.sub+".png");
      res.render("profile");
  });
});

module.exports = router;