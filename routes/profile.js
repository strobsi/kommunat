const express = require("express");
const request = require('request');
const router = express.Router();
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var formidable = require('formidable')
const expressSanitizer = require('express-sanitizer');

// Display the dashboard page
router.get("/", (req, res) => {
  const s = req.sanitize(req.userinfo.sub);

  var userID = String(s);
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
      firstName: req.sanitize(req.body.firstName), 
      lastName: req.sanitize(req.body.lastName),
      email: req.sanitize(req.body.email),
      birthdate: req.sanitize(req.body.birthdate),
      list: req.sanitize(req.body.list),
      list_number: req.sanitize(req.body.list_number),
      district: req.sanitize(req.body.district),
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
        console.log("Error: " + error)
        console.log(error)
      }
  }
  request(options, callback);
})  

router.post("/image",jsonParser,(req, res) => {
  const s = req.sanitize(req.userinfo.sub);

  var form = new formidable.IncomingForm();
  form.parse(req);
  form.on('fileBegin', function (name, file){
      file.path = __dirname + '/../assets/uploads/' + s+".png";
  });
  form.on('file', function (name, file){
      console.log('Uploaded ' + s+".png");
      res.render("profile");
  });
});

module.exports = router;