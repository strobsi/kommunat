const express = require("express");
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const router = express.Router();
const redis = require("redis")
const request = require('request');
const fetch = require('node-fetch');
var db = require("../db/db_accessor");
var static = require("../db/static");
const expressSanitizer = require('express-sanitizer');
const rateLimit = require("express-rate-limit");
var fs = require('fs');
const path = require('path');


const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 1 hour window
  max: 20, // start blocking after 5 requests
  message:
    "Too many requests from this IP, please try again later"
});

router.get('/debug',apiLimiter, (req, res) => {
// No candidate, get matches
  candidatesPromise = static.getCandidates();
  candidatesPromise.then(function cb(cdts) {
    var matches = [];
    cdts.forEach(function (r, i) {
      if (r.values.length != 0 && r.contents.length != 0 && r.metadata.uuid !== undefined && r.candidate.name !== undefined&& r.candidate.list !== undefined && r.candidate.list_number !== undefined && r.candidate.district !== undefined) {
        
      matches.push(r);
      }
    });
    res.send(matches);
  });
}),

// Post result
router.post('/',apiLimiter, (req, res) => {

    // Store Results      
      pushResultPromise = db.rpushResult(req.body);
      pushResultPromise.then(function updateData(index) {
        console.log("Pushed results")
      })
      // No candidate, get matches
      candidatesPromise = static.getCandidates();
      candidatesPromise.then(function cb(cdts) {

      var matches = [];
        cdts.forEach(function (r, i) {
            if (r.values.length != 0 && r.contents.length != 0 && r.metadata.uuid !== undefined && r.candidate.name !== undefined) {
              if(r.candidate.birthdate == undefined) {
                r.candidate.birthDate = "Unbekannt"
              }               
              if (r.candidate.motto == undefined) {
                r.candidate.motto = " - Nicht verfügbar - "
              }
              var dVal = getDistance(req.body.values,r.values)
              var iVal = getDistance(req.body.contents,r.contents)
              var totalDistance = dVal+iVal;
  
              var res = {
                distance: totalDistance,
                show_distance: Math.round(totalDistance),
                uuid: r.metadata.uuid,
                name: r.candidate.name,
                birthdate: getAge(r.candidate.birthdate),
                list: r.candidate.list,
                list_number: r.candidate.list_number,
                district: r.candidate.district,
                motto: r.candidate.motto,
                values: r.values,
                contents: r.contents
              }
              matches.push(res);
            }
        
        });

        matches.sort(function (a, b) {
          a.distance = a.distance
          b.distance = b.distance
          if (a.distance > b.distance) {
            return 1;
          }
          if (a.distance < b.distance) {
            return -1;
          }
          return 0;
        });

        var splicer = req.body.page * 30;
        var page = matches.slice(splicer-30,splicer);
        console.log("Page: " + req.body.page);
        console.log("Sending data") 
        console.log(page.length)
        res.send(JSON.stringify(page));
      });
      
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

function sortByDistance(array) {
  return array.sort(function(a, b) {
      var x = a.distance; var y = b.distance;
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}
function getAge(dateString) {
	
  var splitted = dateString.split(".");
  var d = splitted[0];
  var m = splitted[1];
  var y = splitted[2];
  
  dateString = y+"/"+m+"/"+d;

  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

function isCValid(r) {
  j = {}
    try {
        j = JSON.parse(r);
    } catch(e) {
        console.log(e); // error in the above string (in this case, yes)!
        return;
  }
  if(j.values !== undefined && j.contents !== undefined) {
    console.log("not undefined")
    if(j.values.length > 0 && j.contents.length > 0) {
      console.log("more than one item")
        return true
    }
  }
  return false;
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = router;