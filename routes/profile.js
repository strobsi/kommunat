const express = require("express");
const request = require('request');
const router = express.Router();
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var formidable = require('formidable')
const expressSanitizer = require('express-sanitizer');
const rateLimit = require("express-rate-limit");
var Validator = require('jsonschema').Validator;
var schemata = require('../utils/const');

const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 1 hour window
  max: 10, // start blocking after 5 requests
  message:
    "Too many requests from this IP, please try again later"
});

// Display the dashboard page
router.get("/", (req, res) => {
  const s = req.sanitize(req.userinfo.sub);

  var userID = String(s);
  var userImg = "http://localhost:3000/uploads/"+userID+".png"
  console.log(userImg)
  res.render("profile",{ userImg:userImg });
});

router.post("/",jsonParser,apiLimiter,(req, res) => {

  var user = req.user;
  var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'SSWS 00BBR-JpQ-tVhtCjkCtyTg3FHpxDaR54EWGOyKNRUK'
  };

  console.log(req.body);

  var v = new Validator();
    if(!v.validate(req.body, schemata.profileSchema()).valid) {
        res.status(400);
        res.send();
    }
    else {
    var dataString = { profile: 
      { 
        birthdate: req.sanitize(req.body.birthdate),
        list: req.sanitize(req.body.list),
        list_number: req.sanitize(req.body.list_number),
        district: req.sanitize(req.body.district),
        phone: req.sanitize(req.body.phone)
      } 
    };
    // TODO: insert into our db
  }

})  

router.post("/image",jsonParser,apiLimiter,(req, res) => {
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