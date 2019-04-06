const express = require("express");
const redis = require("redis")
const router = express.Router();
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var db = require("../db/db_accessor")
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

  candidatesPromise = db.getCandidates();
  candidatesPromise.then(function cb(cdts) {
    var isAlreadyInserted = false;
    var vList = []
   cdts.forEach(function (reply, i) {
    j = {}
    try {
        j = JSON.parse(reply);
    } catch(e) {
        console.log(e); // error in the above string (in this case, yes)!
        return;
    }
    if(j.metadata.uuid === s) {
      if (j.values !== undefined) {
        if (j.values.length > 0) {
            isAlreadyInserted = true;
            vList = j.values;  
        }  
      }
    }
  });
   if (!isAlreadyInserted) {
      res.render("komunat", {valueList: [], showModal: true, attr: "Werte" });
   }
   else {
      res.render("komunat", {valueList: vList, showModal: false, attr: "Werte"  });
   }
  });
});

// Post result
router.post('/result',jsonParser, apiLimiter, (req, res) => {

  console.log(req.body);

  const s = req.sanitize(req.userinfo.sub);
  // Store Results
  var cList = []
  candidatesPromise = db.getCandidates();
  // Candidate, insert into database if not already there.
  candidatesPromise.then(function cb(cdts) {
      console.log(cdts.length + " candidates:");
      var isAlreadyInserted = false;
      var cIndex = 0;
      var exIst = {};
      var cdtsLength = cdts.length;
      cdts.forEach(function (reply, i) {
          j = {}
          try {
              j = JSON.parse(reply);
          } catch(e) {
              console.log(e); // error in the above string (in this case, yes)!
              return;
          }
          if(j.metadata.uuid === s) {
                  exIst = j;
                  cIndex = i;
                  if (j.values !== undefined) {
                    if (j.values.length > 0) {
                        isAlreadyInserted = true;
                        console.log("Already inserted")
                    }  
                  }
                  if (j.contents !== undefined) {
                      if (j.contents.length > 0) {
                          cList = j.contents.slice(0);  
                          console.log("This one already has contents")
                      }  
                  }
                }
      });
      
      if (!isAlreadyInserted) {
        const retreiveDetails = async () => {
            // Get details based on match uuid.
              var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'SSWS 00BBR-JpQ-tVhtCjkCtyTg3FHpxDaR54EWGOyKNRUK'
              };
              const userGet = 'https://dev-664243.oktapreview.com/api/v1/users/'+s;
              const response = await fetch(userGet, { headers: headers });
              const json = await response.json();

              if (typeof exIst.candidate === 'undefined') {
                exIst.candidate = {
                 name: json.profile.firstName + " " + json.profile.lastName
               }
             }
              req.body.candidate = exIst.candidate;
              req.body.contents = cList;
              req.body.metadata.uuid = s;

              if (cList.length > 0) {
                console.log("Content list there")
                console.log(req.body)
                var v = new Validator();
                if(!v.validate(req.body, schemata.valueSchemaExisting()).valid) {
                      console.log("No schemas")

                      res.status(400);
                      res.send();
                }
                else {
                console.log("Setting existing")
                console.log(req.body)

                for (var i = 0; i < req.body.contents.length; i++) {
                  req.body.contents[i].name = req.sanitize(req.body.contents[i].name);
                }
                for (var i = 0; i < req.body.values.length; i++) {
                  req.body.values[i].name = req.sanitize(req.body.values[i].name);
                }
                req.body.candidate.name = req.sanitize(req.body.candidate.name);
                req.body.candidate.birthdate = req.sanitize(req.body.candidate.birthdate);
                req.body.candidate.list = req.sanitize(req.body.candidate.list);
                req.body.candidate.list_number = req.sanitize(req.body.candidate.list_number);
                req.body.candidate.district = req.sanitize(req.body.candidate.district);

                indexPromise = db.getIndex(s);
                indexPromise.then(function updateData(index) {
                    setPromise = db.setCandidate(req.body,index)
                    setPromise.then(function cb(cdts) {
                      res.send();
                    });
                })
                }
              }
              else {
                var v = new Validator();
                if(!v.validate(req.body, schemata.valueSchema()).valid) {
                      res.status(400);
                      res.send();
                }
                else {
                console.log("Pushing new")
                console.log(req.body)
                for (var i = 0; i < req.body.values.length; i++) {
                  req.body.values[i].name = req.sanitize(req.body.values[i].name);
                }
                req.body.candidate.name = req.sanitize(req.body.candidate.name);
                req.body.candidate.birthdate = req.sanitize(req.body.candidate.birthdate);
                req.body.candidate.list = req.sanitize(req.body.candidate.list);
                req.body.candidate.list_number = req.sanitize(req.body.candidate.list_number);
                req.body.candidate.district = req.sanitize(req.body.candidate.district);
                
                rpushPromise = db.rpushCandidate(req.body)
                rpushPromise.then(function cb(cdts) {
                      res.send();
                });
                }
              }
        }
        retreiveDetails();
      } else {
        // Remove the initial and override it
        //lrem mylist -1 "uuid"
        //registeredIndex
        console.log("We already have registered this dude")
      }
      res.send();
  });
})

module.exports = router;