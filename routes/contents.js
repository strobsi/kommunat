const express = require("express");
const redis = require("redis")
const router = express.Router();
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var db = require("../db/db_accessor")

// Display the dashboard page
router.get("/", (req, res) => {

  candidatesPromise = db.getCandidates();
  candidatesPromise.then(function cb(cdts) {
    var isAlreadyInserted = false;
    var cList = []
    cdts.forEach(function (reply, i) {
        j = {}
        try {
            j = JSON.parse(reply);
        } catch(e) {
            console.log(e); // error in the above string (in this case, yes)!
            return;
        }
        if(j.metadata.uuid === req.userinfo.sub) {
          if (j.contents !== undefined) {
            if (j.contents.length > 0) {
                isAlreadyInserted = true;
                cList = j.contents;  
            }  
          }
        }
   });
   if (!isAlreadyInserted) {
    res.render("contents", {contentsList: []  });
   }
   else {
     res.render("contents", {contentsList: cList  });
    }
  });
});

// Post result
router.post('/result',jsonParser, (req, res) => {
    // Store Results
    var vList = []

    candidatesPromise = db.getCandidates();
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
          if(j.metadata.uuid === req.userinfo.sub) {
                  cIndex = i;
                  if (j.contents !== undefined) {
                    if (j.contents.length > 0) {
                        isAlreadyInserted = true;
                        console.log("Already inserted")
                    }  
                  }
                  if (j.values !== undefined) {
                      if (j.values.length > 0) {
                          console.log("This one already has values")
                          vList = j.values.slice(0);  
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
              const userGet = 'https://dev-664243.oktapreview.com/api/v1/users/'+req.userinfo.sub;
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
              req.body.values = vList;
              
              if (vList.length > 0) {
                  indexPromise = db.getIndex(req.userinfo.sub);
                  indexPromise.then(function updateData(index) {
                      console.log("Finished promise")
                      setPromise = db.setCandidate(req.body,index)
                      setPromise.then(function cb(cdts) {
                        res.send();
                      });
                  })
              }
              else {
                  console.log("Pushing new")
                  req.body.metadata.uuid = req.userinfo.sub
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