const express = require("express");
const request = require('request');
const router = express.Router();
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

// Display the dashboard page
router.get("/", (req, res) => {
  res.render("profile");
});

router.post("/",jsonParser,(req, res) => {

  console.log("Update profile")
  var user = req.user;
  var form = req.body;
  console.log(form)
  var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'SSWS 00BBR-JpQ-tVhtCjkCtyTg3FHpxDaR54EWGOyKNRUK'
    };

  var dataString = { profile: { firstName: "Isaac", lastName: "Brock", email: "simon.strobel@web.de"} };
  
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
        console.log("Error: ")
        console.log(error)
      }
  }
  request(options, callback);
})  

module.exports = router;