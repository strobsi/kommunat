const express = require("express");
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const router = express.Router();
const redis = require("redis")
const request = require('request');
const fetch = require('node-fetch');

// Post result
router.post('/',jsonParser, (req, res) => {
    // Store Results
    client = redis.createClient({
        host:"localhost",
        port:6379
    });
    // Check if it is a candidate
    if (req.body.metadata.isCandidate) {
      // Candidate, insert into database if not already there.
      console.log("We have a candidate here with the userID: " + req.body.metadata.uuid)
      client.lrange("candidate_results",0,-1, function (err, cdts) {
        console.log(cdts.length + " candidates:");
        var isAlreadyInserted = false;
        cdts.forEach(function (reply, i) {
            console.log("    " + i + ": " + JSON.parse(reply).metadata.uuid);
            if(JSON.parse(reply).metadata.uuid === req.body.metadata.uuid) {
              isAlreadyInserted = true;
            }
        });
        if (!isAlreadyInserted) {
            client.rpush("candidate_results",JSON.stringify(req.body))
            client.quit()
        } else {
          // Remove the initial and override it
          //lrem mylist -1 "uuid"
          //registeredIndex
          console.log("We already have registered this dude")
        }
        res.send();
    });
    } else {
      // No candidate, get matches
      client.rpush("results",JSON.stringify(req.body))
      client.lrange("candidate_results",0,-1, function (err, cdts) {
        var matches = [];
        cdts.forEach(function (reply, i) {
            var r = JSON.parse(reply)
            var d = getDistance(req.body.values,r.values)
            var res = {
              distance: d,
              uuid: r.metadata.uuid
            }
            matches.push(res);
        }); 
        
        const retreiveDetails = async () => {
          await asyncForEach(matches, async (num) => {
            // Get details based on match uuid.
            if (typeof num.uuid !== 'undefined' && num.uuid !== null){
              var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'SSWS 00BBR-JpQ-tVhtCjkCtyTg3FHpxDaR54EWGOyKNRUK'
              };
              const userGet = 'https://dev-664243.oktapreview.com/api/v1/users/'+num.uuid;
              const response = await fetch(userGet, { headers: headers });
              const json = await response.json();
              var cInfo = {
                name: json.profile.firstName + " " + json.profile.lastName,
                birthdate: json.profile.birthdate,
                list: json.profile.list,
                list_number: json.profile.list_number,
                district: json.profile.district
              }
              num.candidate = cInfo;
            }
            else {
              console.log("No uuid")
            }
          });
          console.log("Done with calculating and infos.")
          console.log(matches);
          client.quit()
          res.send(JSON.stringify(matches));
        }
        retreiveDetails();
    });
    }
  })

function getDistance(x,y) {
    // To get the distance, we have to sort the array by the id's
    x = sortById(x)
    y = sortById(y)
    var arrVal = []
    // Now just calculate the rating, pure math 
    for(var i = 0; i < x.length; i++) {
        arrVal.push( (x[i].rating - y[i].rating) * (x[i].rating-y[i].rating) )
    }
    var sum = 0;
    for(var n = 0; n < arrVal.length; n++) {
        sum+=arrVal[n]
    }
    return Math.sqrt(sum)
    //Distance = √[ (xA − xB)2 + (yA − yB)2 + (zA − zB)2 +...]
}

// Important to sort the arrays by the common id
function sortById(arr) {
  arr.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
  return arr
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = router;