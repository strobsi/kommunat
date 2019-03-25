const express = require("express");
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const router = express.Router();
const redis = require("redis")
const request = require('request');
const fetch = require('node-fetch');
var db = require("../db/db_accessor")
const expressSanitizer = require('express-sanitizer');

// Post result
router.post('/',jsonParser, (req, res) => {

     const s = req.sanitize(req.userinfo.sub);

    // Store Results
      pushResultPromise = db.rpushResult(req.body);
      pushResultPromise.then(function updateData(index) {
        console.log("Pushed results")
      })
      // No candidate, get matches
      candidatesPromise = db.getCandidates();
      candidatesPromise.then(function cb(cdts) {
        var matches = [];
        cdts.forEach(function (reply, i) {
            if (isCValid(reply)) {
              var r = {}
              try {
                  r = JSON.parse(reply);
              } catch(e) {
                  console.log(e); // error in the above string (in this case, yes)!
                  return;
              }
              var dVal = getDistance(req.body.values,r.values)
              var iVal = getDistance(req.body.contents,r.contents)
              var totalDistance = dVal+iVal;
              var res = {
                distance: totalDistance/144*100,
                uuid: s,
                name: r.candidate.name,
                birthdate: r.candidate.birthdate,
                list: r.candidate.list,
                list_number: r.candidate.list_number,
                district: r.candidate.district
              }
              matches.push(res);
          }
        }); 
        res.send(JSON.stringify(matches));
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