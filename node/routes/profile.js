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
var db = require("../db/db_accessor")

const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 1 hour window
  max: 20, // start blocking after 5 requests
  message:
    "Too many requests from this IP, please try again later"
});

// Display the profile page
router.get("/", (req, res) => {
  const s = req.sanitize(req.userinfo.sub);

  var userID = String(s);
  var userImg = "https://komunat.de/uploads/"+userID+".png"
  console.log(userImg)

  var c = db.getCandidate(s);
  c.then(function cb(r) {
    res.render("profile",{ userImg:userImg, u:r.candidate });
  }, function(err) {
     console.log("No candidate found")
     var un = {
       birthdate: "",
       list:"",
       list_number:"",
       district:"",
       phone:"",
       motto:""
     }
     res.render("profile",{ userImg:userImg, u:un });
  });
});

router.post("/",jsonParser,apiLimiter,(req, res) => {
  const s = req.sanitize(req.userinfo.sub);   
  var userID = String(s);
  var userImg = "https://komunat.de/uploads/"+userID+".png"

  var v = new Validator();
    if(!v.validate(req.body, schemata.profileSchema()).valid) {
        res.status(400);
        res.send();
    }
    else {
    var dataString = {
        birthdate: req.sanitize(req.body.birthdate),
        list: req.sanitize(req.body.list),
        list_number: req.sanitize(req.body.list_number),
        district: req.sanitize(req.body.district),
        phone: req.sanitize(req.body.phone),
        motto: req.sanitize(req.body.motto)
    };
    console.log("This is our data:")
    console.log(dataString)

    var c = db.getCandidate(s);
    c.then(function cb(r) {
         var index = db.getIndex(s);
         index.then(function cb(i) {
            r.candidate.birthdate = dataString.birthdate;
            r.candidate.list = dataString.list;
            r.candidate.list_number = dataString.list_number;
            r.candidate.district = dataString.district;
            r.candidate.phone = dataString.phone;
            r.candidate.motto = dataString.motto;

            var set = db.setCandidate(r,i)
            set.then(function cb(i) {
              res.render("profile",{ userImg:userImg, u:r.candidate });
            })
         });
    },function(err) {
        var c = {
          metadata: {
            uuid: s
          },
          candidate: {
            birthdate: dataString.birthdate,
            list: dataString.list,
            list_number: dataString.list_number,
            district: dataString.district,
            phone: dataString.phone,
            motto: dataString.motto
          },
          values:[],
          contents:[]
        }
        rpushPromise = db.rpushCandidate(c)
        rpushPromise.then(function cb(cdts) {
          res.render("profile",{ userImg:userImg, u:c });
        });
    });
  }
})  

router.post("/image",apiLimiter,(req, res) => {
  const s = req.sanitize(req.userinfo.sub);
  var userID = String(s);
  var userImg = "https://komunat.de/uploads/"+userID+".png"

  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {
    if (err) console.log(err)
    
    // parse fields
  });
  form.on('fileBegin', function (name, file){
      file.path = __dirname + '/../assets/uploads/' + s+".png";
  });
  form.on('file', function (name, file){
      console.log('Uploaded ' + s+".png");
      var c = db.getCandidate(s);
      c.then(function cb(r) {
        res.send();
    }, function(err) {
      console.log("No candidate found")
      var un = {
        birthdate: "",
        list:"",
        list_number:"",
        district:"",
        phone:"",
        motto:""
      }
      res.send();
   });
  });
});

module.exports = router;