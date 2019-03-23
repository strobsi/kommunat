const express = require("express");
var db = require("../db/db_accessor")
const expressSanitizer = require('express-sanitizer');

const router = express.Router();

// Display the dashboard page
router.get("/", (req, res) => {

  candidatesPromise = db.getCandidate(req.userinfo.sub);
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