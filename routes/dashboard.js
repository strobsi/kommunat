const express = require("express");
var db = require("../db/db_accessor")
const rateLimit = require("express-rate-limit");
const router = express.Router();

const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 1 hour window
  max: 10, // start blocking after 5 requests
  message:
    "Too many requests from this IP, please try again later"
});

// Display the dashboard page
router.get("/", apiLimiter, (req, res) => {

  var s = req.sanitize(req.userinfo.sub);
  candidatesPromise = db.getCandidate(s);
  candidatesPromise.then(function cb(c) {
      var valuesInserted, contentsInserted = true;
      if(c.values.length == 0) {
          valuesInserted = false;
      }   
      if (c.contents.length == 0) {
          contentsInserted = false;
      }
      res.render("dashboard", {needsValues: valuesInserted, needsContents: contentsInserted});
    }, function(err) {
      res.render("dashboard", {needsValues: true, needsContents: true});
    });
});

module.exports = router;