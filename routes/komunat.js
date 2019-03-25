const express = require("express");
const redis = require("redis")
const router = express.Router();
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var db = require("../db/db_accessor")
const expressSanitizer = require('express-sanitizer');
const rateLimit = require("express-rate-limit");

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
  const s = req.sanitize(req.userinfo.sub);
  // Store Results
  var cList = []
  candidatesPromise = db.getCandidates();
  // Candidate, insert into database if not already there.
  candidatesPromise.then(function cb(cdts) {
      console.log(cdts.length + " candidates:");
      var isAlreadyInserted = false;
      var cIndex = 0;
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
              var cInfo = {
                name: json.profile.firstName + " " + json.profile.lastName,
                birthdate: json.profile.birthdate,
                list: json.profile.list,
                list_number: json.profile.list_number,
                district: json.profile.district
              }
              req.body.candidate = cInfo;
              req.body.contents = cList;
              req.body.metadata.uuid = s;

              if (cList.length > 0) {
                console.log("Setting existing")
                indexPromise = db.getIndex(s);
                indexPromise.then(function updateData(index) {
                    setPromise = db.setCandidate(req.body,index)
                    setPromise.then(function cb(cdts) {
                      res.send();
                    });
                })
              }
              else {
                console.log("Pushing new")
                req.body.metadata.uuid = s
                rpushPromise = db.rpushCandidate(req.body)
                rpushPromise.then(function cb(cdts) {
                      res.send();
                });
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