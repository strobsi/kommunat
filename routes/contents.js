const express = require("express");
const redis = require("redis")
const router = express.Router();
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

// Display the dashboard page
router.get("/", (req, res) => {
  client = redis.createClient({
    host:"localhost",
    port:6379
  });
  client.lrange("candidate_results",0,-1, function (err, cdts) {
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
      res.render("contents", {userID: req.userinfo.sub, contentsList: []  });
   }
   else {
      res.render("contents", {userID: req.userinfo.sub, contentsList: cList  });
   }
  });
});

// Post result
router.post('/result',jsonParser, (req, res) => {
    // Store Results
    client = redis.createClient({
        host:"localhost",
        port:6379
    });
    client.on("error", function (err) {
        console.log("Error " + err);
    });
    var vList = []
    // Candidate, insert into database if not already there.
      client.lrange("candidate_results",0,-1, function (err, cdts) {
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
                const userGet = 'https://dev-664243.oktapreview.com/api/v1/users/'+req.body.metadata.uuid;
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
                    indexPromise = getIndex(req.body.metadata.uuid);
                    indexPromise.then(function updateData(index) {
                        console.log("Finished promise")
                        client.lset("candidate_results",index,JSON.stringify(req.body))
                        client.quit()
                        res.send();
                    })
                }
                else {
                    console.log("Pushing new")
                    client.rpush("candidate_results",JSON.stringify(req.body))
                    client.quit()
                    res.send();
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

  function getIndex(uuid) {

    client = redis.createClient({
        host:"localhost",
        port:6379
      });

    return new Promise(function (resolve, reject) {
        client.lrange("candidate_results",0,-1, function (err, cdts) {
            var cIndex = 0;
            cdts.forEach(function (reply, i) {
              j = {}
                  try {
                      j = JSON.parse(reply);
                  } catch(e) {
                      console.log(e); // error in the above string (in this case, yes)!
                      return;
                  }
                  if(j.metadata.uuid === uuid) {
                    console.log("he is at index: " + i)
                    resolve(i)
                  }
            }); 
          });
      })
  }

module.exports = router;